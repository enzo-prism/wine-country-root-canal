import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const publicRoutes = [
  "/",
  "/accessibility",
  "/about",
  "/cbct-scanner-santa-rosa",
  "/contact",
  "/dental-emergencies",
  "/dentists",
  "/endodontic-procedures",
  "/endodontic-procedures/apicoectomy",
  "/endodontic-procedures/retreatment",
  "/endodontic-procedures/root-canal-therapy",
  "/endodontic-procedures/signs-symptoms",
  "/forms",
  "/privacy",
  "/resources",
  "/resources/after-your-root-canal",
  "/resources/cracked-tooth",
  "/resources/dental-injuries",
  "/resources/root-canal-cost",
  "/resources/root-canal-safety",
  "/resources/root-canal-vs-extraction",
  "/resources/what-is-an-endodontist",
  "/technology",
  "/testimonials",
  "/thank-you",
] as const

const axeTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
})

async function preparePage(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" })
  await expect(page.locator("main")).toBeVisible()
}

async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(axeTags).analyze()
  const details = results.violations
    .map(
      (violation) =>
        `${violation.id}: ${violation.help}\n${violation.nodes
          .map((node) => `  ${node.target.join(" ")}\n  ${node.failureSummary ?? ""}`)
          .join("\n")}`,
    )
    .join("\n\n")

  expect(results.violations.length, details).toBe(0)
}

for (const path of publicRoutes) {
  test(`${path} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await preparePage(page, path)
    await expectNoAxeViolations(page)
  })
}

test("every page offers a working keyboard skip link", async ({ page }) => {
  for (const path of publicRoutes) {
    await preparePage(page, path)

    const skipLink = page.getByRole("link", { name: "Skip to main content" })
    await page.keyboard.press("Tab")
    await expect(skipLink, `Missing skip link on ${path}`).toBeFocused()
    await expect(skipLink, `Skip link is not visible on ${path}`).toBeVisible()

    const target = await skipLink.getAttribute("href")
    expect(target, `Skip link target is wrong on ${path}`).toBe("#main-content")
    const main = page.locator("#main-content")
    await expect(main, `Skip target is missing on ${path}`).toHaveCount(1)

    await page.keyboard.press("Enter")
    await expect(main, `Skip target does not receive focus on ${path}`).toBeFocused()
    const focusIndicator = await main.evaluate((element) => {
      const style = getComputedStyle(element)
      return { color: style.outlineColor, style: style.outlineStyle, width: style.outlineWidth }
    })
    expect(focusIndicator.style, `Skip target focus outline is missing on ${path}`).not.toBe("none")
    expect(focusIndicator.width, `Skip target focus outline has no width on ${path}`).not.toBe("0px")
    expect(focusIndicator.color, `Skip target focus outline is transparent on ${path}`).not.toBe("rgba(0, 0, 0, 0)")
  }
})

test("public pages do not overflow a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })

  for (const path of publicRoutes) {
    await preparePage(page, path)
    const overflow = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    }))

    expect(
      overflow.documentWidth,
      `${path} is ${overflow.documentWidth - overflow.viewportWidth}px wider than the viewport`,
    ).toBeLessThanOrEqual(overflow.viewportWidth)
  }
})

test("reduced-motion preference disables smooth scrolling", async ({ page }) => {
  await preparePage(page, "/")

  const reducedMotion = await page.evaluate(() => ({
    preferenceMatches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }))

  expect(reducedMotion.preferenceMatches).toBe(true)
  expect(reducedMotion.scrollBehavior).toBe("auto")
})

test.describe("interactive navigation states", () => {
  test("desktop patient navigation passes axe when expanded", async ({ page }) => {
    await preparePage(page, "/")
    await page.getByRole("button", { name: "For Patients" }).click()
    await expect(page.getByRole("link", { name: "Root Canal Therapy", exact: true })).toBeVisible()
    await expectNoAxeViolations(page)
  })

  test("mobile navigation dialog passes axe and manages focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await preparePage(page, "/")

    const menuButton = page.getByRole("button", { name: "Toggle navigation menu" })
    const dialog = page.getByRole("dialog")
    await expect
      .poll(
        async () => {
          if ((await dialog.count()) === 0) {
            await menuButton.click()
          }
          return dialog.count()
        },
        { message: "Mobile menu did not open after hydration", timeout: 10_000 },
      )
      .toBe(1)
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole("heading", { name: "Site navigation" })).toBeAttached()
    await expectNoAxeViolations(page)

    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(menuButton).toBeFocused()
  })
})
