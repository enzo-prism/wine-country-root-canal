import { expect, test, type Page } from "@playwright/test"

const SERVICE_PATH = "/endodontic-procedures/root-canal-therapy"
const HERO_CALL_ID = "service-hero-call"
const STICKY_BAR_TEST_ID = "mobile-sticky-call-bar"
const PHONE_HREF = "tel:+17075233636"

async function scrollHeroCallOutOfView(page: Page) {
  await page.evaluate((id) => {
    const hero = document.getElementById(id)
    if (!hero) throw new Error(`Missing #${id}`)
    const bottom = hero.getBoundingClientRect().bottom + window.scrollY
    window.scrollTo(0, bottom + 40)
  }, HERO_CALL_ID)
}

test("mobile sticky Call bar stays hidden until the hero Call button leaves view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(SERVICE_PATH, { waitUntil: "domcontentloaded" })

  const heroCall = page.locator(`#${HERO_CALL_ID}`)
  const bar = page.getByTestId(STICKY_BAR_TEST_ID)
  const headerCall = page.locator('header a[href="tel:+17075233636"]', { hasText: "Call" })

  await expect(heroCall).toBeVisible()
  await expect(heroCall).toHaveAttribute("href", PHONE_HREF)
  await expect(headerCall).toHaveCount(0)
  await expect(page.getByRole("button", { name: "Toggle navigation menu" })).toBeVisible()
  await expect(bar).toBeHidden()

  await scrollHeroCallOutOfView(page)

  await expect(bar).toBeVisible({ timeout: 10_000 })
  const stickyCall = bar.locator(`a[href="${PHONE_HREF}"]`)
  await expect(stickyCall).toBeVisible()
  await expect(stickyCall).toHaveAttribute("href", PHONE_HREF)
  const callBox = await stickyCall.boundingBox()
  expect(callBox, "sticky Call tap target").toBeTruthy()
  expect(callBox!.height).toBeGreaterThanOrEqual(44)

  await heroCall.scrollIntoViewIfNeeded()
  await expect(bar).toBeHidden({ timeout: 10_000 })
})

test("desktop never shows the sticky Call bar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(SERVICE_PATH, { waitUntil: "domcontentloaded" })

  const bar = page.getByTestId(STICKY_BAR_TEST_ID)
  await expect(page.locator(`#${HERO_CALL_ID}`)).toBeVisible()
  await expect(bar).toBeHidden()

  await scrollHeroCallOutOfView(page)
  await expect(bar).toBeHidden()
})
