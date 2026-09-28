import { expect, test, type Locator } from "@playwright/test"

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
  "/your-visit",
] as const

const legacyRedirects = [
  ["/wine-country-endodontist/meet-dr-anderson", "/about"],
  ["/wine-country-endodontist/meet-the-team", "/about"],
  ["/wine-country-endodontist", "/about"],
  ["/endodontics", "/endodontic-procedures"],
  ["/endodontics/root-canal-therapy", "/endodontic-procedures/root-canal-therapy"],
  ["/root-canal-therapy", "/endodontic-procedures/root-canal-therapy"],
  ["/root-canal-retreatment", "/endodontic-procedures/retreatment"],
  ["/apicoectomy", "/endodontic-procedures/apicoectomy"],
  ["/endodontics/dental-emergencies", "/dental-emergencies"],
  ["/endodontics/apicoectomy", "/endodontic-procedures/apicoectomy"],
  ["/referring-dentists", "/dentists"],
  ["/new-wine-country-practice/meet-dr-anderson", "/about"],
  ["/what-sets-us-apart/technology/cbct-scanner", "/cbct-scanner-santa-rosa"],
  ["/what-sets-us-apart/blog/preparing-for-dental-emergencies", "/dental-emergencies"],
] as const

async function expectExternalLink(
  link: Locator,
  expectedHref: string,
) {
  await expect(link).toHaveCount(1)
  await expect(link).toHaveAttribute("href", expectedHref)
  await expect(link).toHaveAttribute("target", "_blank")
  await expect(link).toHaveAttribute("rel", /noopener/)
  await expect(link).toHaveAttribute("rel", /noreferrer/)
}

for (const path of publicRoutes) {
  test(`${path} renders its primary document structure`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" })

    expect(response, `${path} did not return a response`).not.toBeNull()
    expect(response?.status(), `${path} returned ${response?.status()}`).toBeLessThan(400)
    await expect(page.locator("main")).toHaveCount(1)
    await expect(page.locator("h1")).toHaveCount(1)
    await expect(page.locator("#main-content")).toHaveCount(1)
  })
}

test("desktop navigation reaches key patient pages", async ({ page }) => {
  await page.goto("/")

  await page.getByRole("link", { name: "About", exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole("heading", { level: 1, name: "Meet Dr. Craig Anderson" })).toBeVisible()

  const mainNav = page.getByRole("navigation", { name: "Main" })
  await page.goto("/")
  const patientInfo = page.getByRole("button", { name: "Patient Info" })
  await expect(patientInfo).toHaveAttribute("aria-expanded", "false")
  await patientInfo.click()
  await expect(patientInfo).toHaveAttribute("aria-expanded", "true")
  await mainNav.getByRole("link", { name: /^Patient Forms/ }).click()
  await expect(page).toHaveURL(/\/forms$/)
  await expect(page.getByRole("heading", { level: 1, name: "New Patient Forms" })).toBeVisible()

  await page.goto("/")
  await page.getByRole("button", { name: "Treatments" }).click()
  await mainNav.getByRole("link", { name: /^Root Canal Therapy/ }).click()
  await expect(page).toHaveURL(/\/endodontic-procedures\/root-canal-therapy$/)

  await page.goto("/")
  await page.getByRole("button", { name: "Patient Info" }).click()
  await mainNav.getByRole("link", { name: /^Your Visit/ }).click()
  await expect(page).toHaveURL(/\/your-visit$/)
})

test("mobile navigation reaches contact and restores a usable page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  await page.getByRole("button", { name: "Toggle navigation menu" }).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await dialog.getByRole("link", { name: "Contact & Map", exact: true }).click()

  await expect(page).toHaveURL(/\/contact$/)
  await expect(
    page.getByRole("heading", { level: 1, name: "Contact Our Santa Rosa Endodontics Office" }),
  ).toBeVisible()
  await expect(page.getByRole("dialog")).toHaveCount(0)
})

test("conversion links retain their verified vendor destinations", async ({ page }) => {
  await page.goto("/")
  // The appointment CTA repeats (header, hero, closing section); the hero's is the primary one.
  await expectExternalLink(
    page.locator("#home").getByRole("link", { name: "Request an Appointment", exact: true }),
    "https://fxuqp40sseh.typeform.com/to/qYX51Bgz",
  )

  await page.goto("/forms")
  await expectExternalLink(
    page.getByRole("link", { name: "Complete Forms Online", exact: true }),
    "https://forms.henryscheinone.com/login",
  )

  await page.goto("/dentists")
  await expectExternalLink(
    page.getByRole("link", { name: "Submit a Referral", exact: true }),
    "https://form.jotform.com/251807740544054",
  )
})

test("contact alternatives remain available without third-party forms", async ({ page }) => {
  await page.goto("/contact")

  await expect(page.locator('a[href="tel:+17075233636"]')).not.toHaveCount(0)
  await expect(page.locator('a[href="mailto:winecountryrootcanal@gmail.com"]')).not.toHaveCount(0)

  await page.goto("/forms")
  await expect(page.getByRole("heading", { level: 2, name: "Need Help or Another Format?" })).toBeVisible()
  await expect(page.locator('a[href="tel:+17075233636"]')).not.toHaveCount(0)
  await expect(page.locator('a[href="mailto:winecountryrootcanal@gmail.com"]')).not.toHaveCount(0)
})

test("root canal safety guide links to current AAE resources", async ({ page }) => {
  await page.goto("/resources/root-canal-safety")

  await expectExternalLink(
    page.getByRole("link", { name: "AAE Root Canal Safety Hub", exact: true }),
    "https://www.aae.org/specialty/clinical-resources/root-canal-safety/",
  )
  await expectExternalLink(
    page.getByRole("link", { name: "2026 AAE Safety Fact Sheet (PDF)", exact: true }),
    "https://www.aae.org/specialty/wp-content/uploads/sites/2/2023/10/RootCanalSafety_FactSheet_2026_final.pdf",
  )
  await expectExternalLink(
    page.getByRole("link", { name: "AAE Myths About Root Canals", exact: true }),
    "https://www.aae.org/patients/root-canal-treatment/myths-root-canals/",
  )

  await expect(page.getByRole("link", { name: "AAE Root Canal Safety Hub", exact: true })).toHaveAttribute(
    "data-analytics-event",
    "root_canal_safety_click",
  )
})

for (const [source, destination] of legacyRedirects) {
  test(`${source} redirects to ${destination}`, async ({ page }) => {
    await page.goto(source)
    await expect(page).toHaveURL(new RegExp(`${destination.replaceAll("/", "\\/")}$`))
  })
}

function cumulativeOpacity(locator: Locator) {
  return locator.evaluate((element) => {
    let node: Element | null = element
    let value = 1
    while (node) {
      value *= Number.parseFloat(getComputedStyle(node).opacity)
      node = node.parentElement
    }
    return value
  })
}

test("mobile header exposes a Call link and the homepage H1 is visible without scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/", { waitUntil: "domcontentloaded" })

  const call = page.locator('header a[href="tel:+17075233636"]', { hasText: "Call" })
  await expect(call).toBeVisible()

  // Only the short CSS entrance animation may run; nothing waits on scroll or hydration.
  const h1 = page.getByRole("heading", { level: 1 })
  await expect(h1).toBeVisible()
  await expect.poll(() => cumulativeOpacity(h1), { timeout: 2_000 }).toBeGreaterThan(0.99)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false })

  for (const path of ["/", "/endodontic-procedures/root-canal-therapy", "/contact"]) {
    test(`${path} server HTML has no content hidden by the scroll reveal`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      const hidden = await page.evaluate(
        () =>
          Array.from(document.querySelectorAll("main div")).filter(
            // Ignore the CSS-only hero entrance animation; flag anything statically hidden.
            (element) => getComputedStyle(element).opacity === "0" && element.getAnimations().length === 0,
          ).length,
      )
      expect(hidden).toBe(0)
    })
  }
})

test("key pages do not raise uncaught browser errors", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))

  for (const path of ["/", "/about", "/forms", "/dentists", "/contact"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" })
    await expect(page.locator("main")).toBeVisible()
  }

  expect(errors, errors.join("\n")).toEqual([])
})
