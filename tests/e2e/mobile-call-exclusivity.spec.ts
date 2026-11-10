import { expect, test, type Locator, type Page } from "../fixtures"

import {
  MOBILE_STICKY_CALL_BAR_TEST_ID,
  SERVICE_HERO_CALL_ID,
  SERVICE_PAGE_PATHS,
  STICKY_CALL_BAR_VISIBLE_ATTR,
} from "@/lib/service-pages"

const PHONE_HREF = "tel:+17075233636"
const PHONE_NAME = /Call \(707\) 523-3636/
const MOBILE = { width: 390, height: 844 }
const SERVICE_PATH = SERVICE_PAGE_PATHS[0]

function headerMobileCall(page: Page) {
  return page.locator(`header a[href="${PHONE_HREF}"][data-analytics-location="navbar_mobile_call"]`)
}

function stickyCall(page: Page) {
  return page.getByTestId(MOBILE_STICKY_CALL_BAR_TEST_ID).locator(`a[href="${PHONE_HREF}"]`)
}

function chromeCallState(headerVisible: boolean, stickyVisible: boolean) {
  return {
    headerVisible,
    stickyVisible,
    count: Number(headerVisible) + Number(stickyVisible),
  }
}

async function readChromeCallState(page: Page) {
  return chromeCallState(await headerMobileCall(page).isVisible(), await stickyCall(page).isVisible())
}

async function expectOnlyHeaderChromeCall(page: Page) {
  await expect.poll(() => readChromeCallState(page)).toEqual(chromeCallState(true, false))
  await expect(page.locator("html")).not.toHaveAttribute(STICKY_CALL_BAR_VISIBLE_ATTR)
  const header = headerMobileCall(page)
  await expect(header).toBeVisible()
  await expect(header).toHaveCSS("visibility", "visible")
}

async function expectHeaderCallRemovedFromTree(header: Locator) {
  await expect(header).toBeHidden()
  await expect(header).toHaveCSS("visibility", "hidden")
  await expect(header).toHaveCSS("pointer-events", "none")
  await expect.poll(() => header.evaluate((element) => element.closest("[inert]") !== null)).toBe(true)
  await expect(header).toHaveAttribute("tabindex", "-1")
  const snapshot = await header.page().locator("header").ariaSnapshot()
  expect(snapshot, "hidden header Call should not appear in the header accessibility tree").not.toMatch(PHONE_NAME)
}

async function expectOnlyStickyChromeCall(page: Page) {
  await expect.poll(() => readChromeCallState(page)).toEqual(chromeCallState(false, true))
  await expect(page.locator("html")).toHaveAttribute(STICKY_CALL_BAR_VISIBLE_ATTR, "true")
  await expectHeaderCallRemovedFromTree(headerMobileCall(page))
}

async function scrollHeroCallOutOfView(page: Page) {
  await page.evaluate((id) => {
    const hero = document.getElementById(id)
    if (!hero) throw new Error(`Missing #${id}`)
    const bottom = hero.getBoundingClientRect().bottom + window.scrollY
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = "auto"
    window.scrollTo(0, bottom + 40)
    root.style.scrollBehavior = previousBehavior
  }, SERVICE_HERO_CALL_ID)
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => {
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    root.style.scrollBehavior = previousBehavior
  })
}

async function openAtPhone(page: Page, path: string) {
  await page.setViewportSize(MOBILE)
  await page.goto(path, { waitUntil: "domcontentloaded" })
}

test.describe("exactly one chrome Call control at 390px", () => {
  test("service page: header at top, sticky bar after scroll, header again at top", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await openAtPhone(page, SERVICE_PATH)

    const menu = page.getByRole("button", { name: "Toggle navigation menu" })
    await expect(menu).toBeVisible()
    const menuBefore = await menu.boundingBox()
    expect(menuBefore, "menu button box at top").toBeTruthy()

    await expectOnlyHeaderChromeCall(page)

    await scrollHeroCallOutOfView(page)
    await expectOnlyStickyChromeCall(page)

    const menuAfterHide = await menu.boundingBox()
    expect(menuAfterHide, "menu button box while header Call is hidden").toBeTruthy()
    expect(menuAfterHide!.x).toBe(menuBefore!.x)
    expect(menuAfterHide!.y).toBe(menuBefore!.y)
    expect(menuAfterHide!.width).toBe(menuBefore!.width)

    await scrollToTop(page)
    await expectOnlyHeaderChromeCall(page)

    const menuAfterShow = await menu.boundingBox()
    expect(menuAfterShow, "menu button box after header Call returns").toBeTruthy()
    expect(menuAfterShow!.x).toBe(menuBefore!.x)
  })

  test("home page: header Call stays the only chrome Call after scroll (no sticky bar)", async ({ page }) => {
    await openAtPhone(page, "/")

    await expectOnlyHeaderChromeCall(page)
    await expect(page.getByTestId(MOBILE_STICKY_CALL_BAR_TEST_ID)).toHaveCount(0)

    await page.evaluate(() => {
      const root = document.documentElement
      const previousBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = "auto"
      window.scrollTo(0, 900)
      root.style.scrollBehavior = previousBehavior
    })
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

    await expectOnlyHeaderChromeCall(page)
    await expect(page.getByTestId(MOBILE_STICKY_CALL_BAR_TEST_ID)).toHaveCount(0)

    await scrollToTop(page)
    await expectOnlyHeaderChromeCall(page)
  })
})
