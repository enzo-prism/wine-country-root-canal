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

async function expectSpacerKeepsFooterClear(page: Page, bar: Locator) {
  const spacer = spacerOn(page)
  await expect(spacer).toBeVisible()
  await expect(spacer).toHaveClass(/lg:hidden/)

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect(bar).toBeVisible({ timeout: 10_000 })

  const lastFooterLink = page.locator("footer").getByRole("link", { name: "Accessibility" })
  await expect(lastFooterLink).toBeVisible()

  const footerBox = await lastFooterLink.boundingBox()
  const barBox = await bar.boundingBox()
  expect(footerBox, "last footer link box").toBeTruthy()
  expect(barBox, "sticky bar box").toBeTruthy()
  expect(footerBox!.y + footerBox!.height, "last footer link must sit above the sticky bar").toBeLessThanOrEqual(
    barBox!.y + 1,
  )
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
      await openServicePage(page, path, DEEP_LINK_HASH)
      await expect(page).toHaveURL(new RegExp(`${path.replaceAll("/", "\\/")}${DEEP_LINK_HASH}$`))
      await expectBarShownInTree(barOn(page))
      await expectSafeAreaPadding(barOn(page))
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
