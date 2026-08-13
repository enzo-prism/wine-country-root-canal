import { expect, test, type Page } from "@playwright/test"

const ALLOWED_LEAD_KEYS = new Set([
  "form_id",
  "form_name",
  "lead_source",
  "location",
  "method",
  "contact_method",
])

type LeadParams = Record<string, string>

async function installGa4TestHooks(page: Page) {
  await page.addInitScript(() => {
    const dataLayer = ((window as Window & { dataLayer?: unknown[] }).dataLayer =
      (window as Window & { dataLayer?: unknown[] }).dataLayer || [])
    const events: unknown[] = []

    Object.defineProperty(window, "__gaEvents", {
      configurable: true,
      value: events,
    })

    const originalPush = dataLayer.push.bind(dataLayer)
    dataLayer.push = (...args: unknown[]) => {
      for (const arg of args) {
        events.push(arg)
      }
      return originalPush(...args)
    }

    Object.defineProperty(window, "tf", {
      configurable: true,
      value: {
        createPopup: (_formId: string, options?: { onSubmit?: () => void }) => ({
          open: () => {
            Object.defineProperty(window, "__typeformOnSubmit", {
              configurable: true,
              writable: true,
              value: options?.onSubmit,
            })
          },
          close: () => undefined,
          unmount: () => undefined,
        }),
      },
    })
  })
}

function readLeadEvents(events: unknown[]): LeadParams[] {
  return events
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter((args) => args[0] === "event" && args[1] === "generate_lead")
    .map((args) => (args[2] && typeof args[2] === "object" ? (args[2] as LeadParams) : {}))
}

async function getLeadEvents(page: Page): Promise<LeadParams[]> {
  const events = await page.evaluate(() => {
    return ((window as Window & { __gaEvents?: unknown[] }).__gaEvents ?? []) as unknown[]
  })

  return readLeadEvents(events)
}

function expectSafeLeadParams(params: LeadParams) {
  expect(Object.keys(params).every((key) => ALLOWED_LEAD_KEYS.has(key))).toBe(true)
  expect(JSON.stringify(params)).not.toMatch(/@|tel:|\+1\d{10}|notes|first_name|email/i)
}

test("tel click-to-call fires generate_lead with phone method", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/contact")

  await page.locator('a[href="tel:+17075233636"]').first().click()

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)

  const [lead] = await getLeadEvents(page)
  expectSafeLeadParams(lead)
  expect(lead).toMatchObject({
    method: "phone",
    contact_method: "phone",
    lead_source: "website_phone",
    location: "contact_page_cta",
  })
  expect(lead.form_id).toBeUndefined()
})

test("successful appointment Typeform submit fires generate_lead with form method", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/")

  await page.getByRole("link", { name: "Schedule a Consultation", exact: true }).click()
  await page.waitForFunction(() => typeof (window as Window & { __typeformOnSubmit?: () => void }).__typeformOnSubmit === "function")

  expect(await getLeadEvents(page)).toEqual([])

  await page.evaluate(() => {
    ;(window as Window & { __typeformOnSubmit?: () => void }).__typeformOnSubmit?.()
  })

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)

  const [lead] = await getLeadEvents(page)
  expectSafeLeadParams(lead)
  expect(lead).toMatchObject({
    form_id: "appointment_request",
    form_name: "appointment_request",
    lead_source: "website_appointment_form",
    location: "homepage_hero",
    method: "form",
    contact_method: "form",
  })
})

test("thank-you page records a form generate_lead once per session", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/thank-you")

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)

  const [firstLead] = await getLeadEvents(page)
  expectSafeLeadParams(firstLead)
  expect(firstLead).toMatchObject({
    form_id: "appointment_request",
    method: "form",
    contact_method: "form",
    location: "thank_you_page",
  })

  await page.goto("/thank-you")
  await expect(page.getByRole("heading", { name: "Thank You!" })).toBeVisible()
  await page.evaluate(() => new Promise((resolve) => window.setTimeout(resolve, 500)))
  expect(await getLeadEvents(page)).toHaveLength(0)
})
