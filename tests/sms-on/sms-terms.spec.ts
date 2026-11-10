import { mkdirSync } from "node:fs"
import path from "node:path"

import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "../fixtures"

// Runs only in the "sms-on" project: a production build with NEXT_PUBLIC_SMS_TERMS_ENABLED=true
// served from .next-sms (playwright.config.ts). The flag-off counterpart is
// tests/e2e/sms-terms-gate.spec.ts.
//
// Evidence screenshots: SMS_EVIDENCE=1 pnpm exec playwright test tests/sms-on
// writes PNGs to docs/evidence/sms-terms/.

const axeTags = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]
const evidenceDir = path.join(process.cwd(), "docs", "evidence", "sms-terms")

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
})

async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(axeTags).analyze()
  const details = results.violations
    .map((violation) => `${violation.id}: ${violation.help}\n${violation.nodes.map((node) => `  ${node.target.join(" ")}`).join("\n")}`)
    .join("\n\n")
  expect(results.violations.length, details).toBe(0)
}

test("/sms-terms renders the required program disclosures", async ({ page }) => {
  const response = await page.goto("/sms-terms")
  expect(response?.status()).toBe(200)

  await expect(page.locator("h1")).toHaveCount(1)
  await expect(page.getByRole("heading", { level: 1, name: "SMS Terms" })).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.winecountryrootcanal.com/sms-terms",
  )
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0)

  const main = page.locator("main")
  for (const text of [
    "Wine Country Root Canal Review Requests",
    "ReviewFlow",
    "link to leave a review",
    "Message frequency varies.",
    "Msg & data rates may apply.",
    "Reply STOP to any message to opt out.",
    "Reply HELP to any message for help.",
    "Mobile carriers are not liable for delayed or undelivered messages.",
    "not a condition of receiving care",
    "4655 Hoen Ave Ste 2",
    "Santa Rosa, CA 95405",
    "(707) 523-3636",
  ]) {
    await expect(main, `missing: ${text}`).toContainText(text)
  }

  const placeholder = page.getByTestId("sms-consent-placeholder")
  await expect(placeholder).toBeVisible()
  await expect(placeholder).toContainText("Pending confirmation by Dr. Anderson")

  await expect(main.locator('a[href="tel:+17075233636"]').first()).toBeVisible()
  await expect(main.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy#text-messages")

  // Reference-diff guard: nothing from the other practice's program may appear.
  const html = await page.content()
  for (const foreign of ["Wong", "Palo Alto", "chriswongdds"]) expect(html).not.toContain(foreign)
})

test("/privacy renders the SMS section with the no-sharing statement", async ({ page }) => {
  await page.goto("/privacy")
  const section = page.locator("#text-messages")
  await expect(section).toHaveCount(1)
  await expect(section.getByRole("heading", { level: 2, name: "Text Messages" })).toBeVisible()
  await expect(section).toContainText(
    "We do not sell, rent, or share mobile phone numbers or SMS opt-in consent with third parties or affiliates for their marketing or promotional purposes.",
  )
  await expect(section).toContainText("Text messaging opt-in data and consent are never shared with any third party.")
  await expect(section).toContainText("Reply STOP")
  await expect(section).toContainText("Reply HELP")
  await expect(section.getByRole("link", { name: "SMS Terms" })).toHaveAttribute("href", "/sms-terms")

  // Placed directly after the information-sharing section.
  const headings = await page.locator("main h2").allTextContents()
  const sharing = headings.indexOf("Will Your Information Be Shared With Anyone?")
  expect(headings[sharing + 1]).toBe("Text Messages")
})

test("the sitemap lists /sms-terms and the footer links to it", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text()
  expect(sitemap).toContain("<loc>https://www.winecountryrootcanal.com/sms-terms</loc>")

  await page.goto("/")
  const footerLink = page.locator("footer").getByRole("link", { name: "SMS Terms" })
  await expect(footerLink).toHaveAttribute("href", "/sms-terms")
  await footerLink.click()
  await expect(page).toHaveURL(/\/sms-terms$/)
})

for (const route of ["/sms-terms", "/privacy"]) {
  test(`${route} has no detectable WCAG A/AA violations with the flag on`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" })
    await expect(page.locator("main")).toBeVisible()
    await expectNoAxeViolations(page)
  })
}

for (const width of [390, 1440]) {
  test(`/sms-terms and the privacy SMS section fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 })

    await page.goto("/sms-terms")
    await expect(page.getByRole("heading", { level: 1, name: "SMS Terms" })).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, "horizontal overflow on /sms-terms").toBeLessThanOrEqual(0)
    if (process.env.SMS_EVIDENCE) {
      mkdirSync(evidenceDir, { recursive: true })
      await page.screenshot({ path: path.join(evidenceDir, `sms-terms-${width}.png`), fullPage: true })
    }

    await page.goto("/privacy#text-messages")
    const section = page.locator("#text-messages")
    await expect(section).toBeInViewport()
    if (process.env.SMS_EVIDENCE) {
      await section.screenshot({ path: path.join(evidenceDir, `privacy-sms-section-${width}.png`) })
    }
  })
}
