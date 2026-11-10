import { expect, test } from "../fixtures"

// Default build: NEXT_PUBLIC_SMS_TERMS_ENABLED is off (forced in playwright.config.ts). Against a
// deployed site (A11Y_BASE_URL) this proves the staged SMS wording is not public yet.
// The flag-on counterpart is tests/sms-on/sms-terms.spec.ts. When Dr. Anderson approves the
// wording and the flag ships on, retire this spec (ops/sms-terms-launch.md).

test("/sms-terms is a noindex 404 while the flag is off", async ({ page, request }) => {
  const response = await request.get("/sms-terms")
  expect(response.status()).toBe(404)
  // What crawlers see in the server HTML.
  expect(await response.text()).toMatch(/<meta name="robots" content="noindex[^"]*"\s*\/?>/)

  // Next.js adds its own 404 noindex and the page's generateMetadata adds "noindex, nofollow";
  // every robots tag present must say noindex.
  await page.goto("/sms-terms")
  const robots = await page.locator('meta[name="robots"]').evaluateAll((tags) =>
    tags.map((tag) => tag.getAttribute("content") ?? ""),
  )
  expect(robots.length).toBeGreaterThan(0)
  for (const content of robots) expect(content).toMatch(/noindex/)
  await expect(page.locator('link[rel="canonical"][href$="/sms-terms"]')).toHaveCount(0)
  await expect(page.getByRole("heading", { level: 1, name: "SMS Terms" })).toHaveCount(0)
  await expect(page.getByText("Msg & data rates may apply")).toHaveCount(0)
})

test("the sitemap omits /sms-terms while the flag is off", async ({ request }) => {
  const response = await request.get("/sitemap.xml")
  expect(response.status()).toBe(200)
  const sitemap = await response.text()
  expect(sitemap).toContain("<loc>https://www.winecountryrootcanal.com/privacy</loc>")
  expect(sitemap).not.toContain("sms-terms")
})

test("/privacy has no SMS section or SMS Terms link while the flag is off", async ({ page }) => {
  const response = await page.goto("/privacy")
  expect(response?.status()).toBe(200)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

  await expect(page.locator("#text-messages")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Text Messages" })).toHaveCount(0)
  await expect(page.locator('a[href^="/sms-terms"]')).toHaveCount(0)

  const html = await page.content()
  for (const phrase of ["Reply STOP", "Reply HELP", "SMS opt-in", "Msg & data rates"]) {
    expect(html, `"${phrase}" leaked into /privacy`).not.toContain(phrase)
  }
})

test("the footer has no SMS Terms link while the flag is off", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("footer").getByRole("link", { name: "SMS Terms" })).toHaveCount(0)
})
