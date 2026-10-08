import { expect, test, type Locator, type Page } from "@playwright/test"

import {
  MOBILE_STICKY_CALL_BAR_SPACER_TEST_ID,
  MOBILE_STICKY_CALL_BAR_TEST_ID,
  SERVICE_HERO_CALL_ID,
  SERVICE_PAGE_PATHS,
} from "@/lib/service-pages"

const PHONE_HREF = "tel:+17075233636"
const PHONE_NAME = /Call \(707\) 523-3636/
const DEEP_LINK_HASH = "#faq"
const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

function barOn(page: Page) {
  return page.getByTestId(MOBILE_STICKY_CALL_BAR_TEST_ID)
}

function spacerOn(page: Page) {
  return page.getByTestId(MOBILE_STICKY_CALL_BAR_SPACER_TEST_ID)
}

async function expectBarHiddenFromTree(bar: Locator) {
  await expect(bar).toBeHidden()
  await expect(bar).toHaveAttribute("hidden", "")
  await expect(bar).toHaveAttribute("aria-hidden", "true")
  await expect(bar.getByRole("link")).toHaveCount(0)
  const snapshot = await bar.ariaSnapshot()
  expect(snapshot, "hidden sticky bar should not expose Call/Request in the accessibility tree").not.toMatch(
    /Call|Request/,
  )
}

async function expectBarShownInTree(bar: Locator) {
  await expect(bar).toBeVisible({ timeout: 10_000 })
  await expect(bar).not.toHaveAttribute("hidden", "")
  await expect(bar).toHaveAttribute("aria-hidden", "false")
  const stickyCall = bar.getByRole("link", { name: PHONE_NAME })
  await expect(stickyCall).toBeVisible()
  await expect(stickyCall).toHaveAttribute("href", PHONE_HREF)
  const snapshot = await bar.ariaSnapshot()
  expect(snapshot, "shown sticky bar should expose Call in the accessibility tree").toMatch(PHONE_NAME)
}

async function expectSafeAreaPadding(bar: Locator) {
  const className = (await bar.getAttribute("class")) ?? ""
  expect(className, "sticky bar must keep env(safe-area-inset-bottom) padding").toContain("env(safe-area-inset-bottom")

  const paddingBottom = await bar.evaluate((element) => getComputedStyle(element).paddingBottom)
  expect(Number.parseFloat(paddingBottom), "sticky bar bottom padding").toBeGreaterThan(0)
}

async function readFooterAndBarBoxes(lastFooterLink: Locator, bar: Locator) {
  const footerBox = await lastFooterLink.boundingBox()
  const barBox = await bar.boundingBox()
  if (!footerBox || !barBox) return null
  return {
    footerBottom: footerBox.y + footerBox.height,
    barTop: barBox.y,
    footerY: footerBox.y,
    barHeight: barBox.height,
  }
}

async function expectSpacerKeepsFooterClear(page: Page, bar: Locator) {
  const spacer = spacerOn(page)
  await expect(spacer).toBeVisible()
  await expect(spacer).toHaveClass(/lg:hidden/)

  const lastFooterLink = page.locator("footer").getByRole("link", { name: "Accessibility" })
  await lastFooterLink.scrollIntoViewIfNeeded()
  await expect(bar).toBeVisible({ timeout: 10_000 })
  await expect(lastFooterLink).toBeVisible()

  let previous: { footerBottom: number; barTop: number } | null = null
  await expect
    .poll(
      async () => {
        const boxes = await readFooterAndBarBoxes(lastFooterLink, bar)
        if (!boxes) return false
        const stable =
          previous !== null &&
          Math.abs(previous.footerBottom - boxes.footerBottom) < 0.5 &&
          Math.abs(previous.barTop - boxes.barTop) < 0.5
        const clear = boxes.footerBottom <= boxes.barTop + 1
        previous = { footerBottom: boxes.footerBottom, barTop: boxes.barTop }
        return stable && clear
      },
      { timeout: 10_000 },
    )
    .toBe(true)
}

async function expectHeroLeftViewport(page: Page) {
  const heroCall = page.locator(`#${SERVICE_HERO_CALL_ID}`)
  await expect(heroCall).toBeAttached()
  await expect
    .poll(
      async () =>
        heroCall.evaluate((element) => {
          const rect = element.getBoundingClientRect()
          return rect.bottom <= 0
        }),
      { timeout: 10_000 },
    )
    .toBe(true)
}

async function expectBarLostHidden(bar: Locator) {
  await expect(bar).toBeVisible({ timeout: 10_000 })
  await expect.poll(async () => bar.getAttribute("hidden"), { timeout: 10_000 }).toBeNull()
}

async function scrollHeroCallOutOfView(page: Page) {
  await page.evaluate((id) => {
    const hero = document.getElementById(id)
    if (!hero) throw new Error(`Missing #${id}`)
    const bottom = hero.getBoundingClientRect().bottom + window.scrollY
    window.scrollTo(0, bottom + 40)
  }, SERVICE_HERO_CALL_ID)
}

async function openServicePage(page: Page, path: string, hash = "") {
  await page.setViewportSize(MOBILE)
  await page.goto(`${path}${hash}`, { waitUntil: "domcontentloaded" })
}

async function throttleCpu(page: Page, rate: number) {
  const session = await page.context().newCDPSession(page)
  await session.send("Emulation.setCPUThrottlingRate", { rate })
}

/** Hold IntersectionObserver deliveries so a missed first callback cannot hide the hash race. */
async function delayIntersectionObserverCallbacks(page: Page) {
  await page.addInitScript(() => {
    const Original = window.IntersectionObserver
    window.IntersectionObserver = class extends Original {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        super((entries, observer) => {
          window.setTimeout(() => callback(entries, observer), 60_000)
        }, options)
      }
    }
  })
}

async function expectHashDeepLinkShowsBar(page: Page, path: string) {
  await openServicePage(page, path, DEEP_LINK_HASH)
  await expect(page).toHaveURL(new RegExp(`${path.replaceAll("/", "\\/")}${DEEP_LINK_HASH}$`))
  const bar = barOn(page)
  await expectHeroLeftViewport(page)
  await expectBarLostHidden(bar)
  await expectBarShownInTree(bar)
  await expectSafeAreaPadding(bar)
}

for (const path of SERVICE_PAGE_PATHS) {
  test.describe(path, () => {
    test("mobile sticky Call bar stays hidden until the hero Call button leaves view", async ({ page }) => {
      await openServicePage(page, path)

      const heroCall = page.locator(`#${SERVICE_HERO_CALL_ID}`)
      const bar = barOn(page)
      const headerCall = page.locator(`header a[href="${PHONE_HREF}"]`, { hasText: "Call" })

      await expect(heroCall).toBeVisible()
      await expect(heroCall).toHaveAttribute("href", PHONE_HREF)
      await expect(headerCall).toHaveCount(0)
      await expect(page.getByRole("button", { name: "Toggle navigation menu" })).toBeVisible()
      await expectBarHiddenFromTree(bar)
      await expectSafeAreaPadding(bar)

      await scrollHeroCallOutOfView(page)
      await expectBarShownInTree(bar)

      const callBox = await bar.getByRole("link", { name: PHONE_NAME }).boundingBox()
      expect(callBox, "sticky Call tap target").toBeTruthy()
      expect(callBox!.height).toBeGreaterThanOrEqual(44)

      await expectSpacerKeepsFooterClear(page, bar)

      await heroCall.scrollIntoViewIfNeeded()
      await expectBarHiddenFromTree(bar)
    })

    test("mobile shows the sticky Call bar after a hash deep link", async ({ page }) => {
      await expectHashDeepLinkShowsBar(page, path)
    })

    test("mobile shows the sticky Call bar after reload while scrolled", async ({ page }) => {
      await openServicePage(page, path)
      await scrollHeroCallOutOfView(page)
      await expectBarShownInTree(barOn(page))

      const scrolledY = await page.evaluate(() => window.scrollY)
      expect(scrolledY).toBeGreaterThan(40)
      await page.reload({ waitUntil: "domcontentloaded" })
      await page.waitForFunction((minY) => window.scrollY >= minY, Math.max(40, scrolledY - 80))
      await expectBarShownInTree(barOn(page))
    })

    test("mobile shows the sticky Call bar after back navigation", async ({ page }) => {
      await openServicePage(page, path)
      await scrollHeroCallOutOfView(page)
      await expectBarShownInTree(barOn(page))

      await page.goto("/about", { waitUntil: "domcontentloaded" })
      await expect(page).toHaveURL(/\/about$/)
      await page.goBack({ waitUntil: "domcontentloaded" })
      await expect(page).toHaveURL(new RegExp(`${path.replaceAll("/", "\\/")}$`))
      await page.waitForFunction((id) => {
        const hero = document.getElementById(id)
        if (!hero) return false
        const rect = hero.getBoundingClientRect()
        return rect.bottom <= 0
      }, SERVICE_HERO_CALL_ID)
      await expectBarShownInTree(barOn(page))
    })

    test("desktop never shows the sticky Call bar", async ({ page }) => {
      await page.setViewportSize(DESKTOP)
      await page.goto(path, { waitUntil: "domcontentloaded" })

      const bar = barOn(page)
      await expect(page.locator(`#${SERVICE_HERO_CALL_ID}`)).toBeVisible()
      await expect(bar).toBeHidden()
      await expect(spacerOn(page)).toBeHidden()

      await scrollHeroCallOutOfView(page)
      await expect(bar).toBeHidden()
      await expect(page.getByRole("link", { name: PHONE_NAME }).first()).toBeVisible()
    })
  })
}

test.describe("throttled #faq deep link", () => {
  test.describe.configure({ retries: 0 })

  test("mobile shows the sticky Call bar after a #faq deep link under 4x CPU throttle", async ({ page }) => {
    await delayIntersectionObserverCallbacks(page)
    await throttleCpu(page, 4)
    await expectHashDeepLinkShowsBar(page, SERVICE_PAGE_PATHS[0])
  })
})
