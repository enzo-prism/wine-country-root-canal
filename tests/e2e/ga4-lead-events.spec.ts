import { expect, test, type Page } from "@playwright/test"
import { ANALYTICS_TEST_HOST_OVERRIDE_KEY } from "@/lib/analytics-host"

const ALLOWED_LEAD_KEYS = new Set([
  "form_id",
  "form_name",
  "form_type",
  "lead_source",
  "location",
  "method",
  "contact_method",
])

type LeadParams = Record<string, string>

type GaWindow = Window & {
  __gaEvents?: unknown[]
  __typeformOnSubmit?: () => void
}

async function installGa4TestHooks(page: Page) {
  await page.addInitScript((overrideKey) => {
    Object.defineProperty(window, overrideKey, {
      configurable: true,
      value: "www.winecountryrootcanal.com",
    })

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
  }, ANALYTICS_TEST_HOST_OVERRIDE_KEY)
}

async function getNamedEvents(page: Page, eventName: string): Promise<LeadParams[]> {
  return page.evaluate((name) => {
    const events = ((window as GaWindow).__gaEvents ?? []) as unknown[]

    return events
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event" && args[1] === name)
      .map((args) => (args[2] && typeof args[2] === "object" ? (args[2] as LeadParams) : {}))
  }, eventName)
}

async function getLeadEvents(page: Page): Promise<LeadParams[]> {
  return getNamedEvents(page, "generate_lead")
}

async function getFormStartEvents(page: Page): Promise<LeadParams[]> {
  return getNamedEvents(page, "form_start")
}

function expectSafeLeadParams(params: LeadParams) {
  expect(Object.keys(params).every((key) => ALLOWED_LEAD_KEYS.has(key))).toBe(true)
  expect(JSON.stringify(params)).not.toMatch(/@|tel:|\+1\d{10}|notes|first_name|email/i)
}

async function expectVisibleTypeformLeadHook(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: "domcontentloaded" })
  expect(response, `${path} did not return a response`).not.toBeNull()
  expect(response?.status()).toBeLessThan(400)

  const hook = page.locator("script#ga4-typeform-lead")
  await expect(hook).toHaveCount(1)
  await expect(hook).toHaveAttribute("data-typeform-id", "qYX51Bgz")
  await expect(hook).toHaveAttribute("data-ga4-event", "generate_lead")

  const hookSource = (await hook.textContent()) ?? ""
  expect(hookSource).toContain("generate_lead")
  expect(hookSource).toContain("form_start")
  expect(hookSource).toContain("qYX51Bgz")
  expect(hookSource).toContain("typeform_appointment")
  expect(hookSource).toContain("createPopup")
  expect(hookSource).toContain("onSubmit")
  expect(hookSource).toContain("form-submit")
}

test("contact and forms HTML include the Typeform generate_lead hook", async ({ page }) => {
  await expectVisibleTypeformLeadHook(page, "/contact")
  await expectVisibleTypeformLeadHook(page, "/forms")
})

test("contact page load does not invent a generate_lead conversion", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/contact")
  await expect(page.getByRole("heading", { name: "Ready to Request an Appointment?" })).toBeVisible()
  await page.evaluate(() => new Promise((resolve) => window.setTimeout(resolve, 400)))
  expect(await getLeadEvents(page)).toEqual([])
  expect(await getFormStartEvents(page)).toEqual([])
})

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
  expect(lead.form_type).toBeUndefined()
})

test("contact Typeform open fires form_start and submit fires generate_lead once", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/contact")

  await page.getByRole("link", { name: "Request Appointment Online", exact: true }).click()
  await page.waitForFunction(() => typeof (window as GaWindow).__typeformOnSubmit === "function")

  await expect.poll(async () => (await getFormStartEvents(page)).length).toBe(1)
  expect(await getLeadEvents(page)).toEqual([])

  const [started] = await getFormStartEvents(page)
  expectSafeLeadParams(started)
  expect(started).toMatchObject({
    form_type: "typeform_appointment",
    location: "contact_page_cta",
  })

  await page.evaluate(() => {
    ;(window as GaWindow).__typeformOnSubmit?.()
    ;(window as GaWindow).__typeformOnSubmit?.()
  })

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)

  const [lead] = await getLeadEvents(page)
  expectSafeLeadParams(lead)
  expect(lead).toMatchObject({
    form_type: "typeform_appointment",
    location: "contact_page_cta",
  })
})

test("forms page Typeform CTA opens the same appointment hook", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/forms")

  await page.getByRole("link", { name: "Request Appointment", exact: true }).first().click()
  await page.waitForFunction(() => typeof (window as GaWindow).__typeformOnSubmit === "function")

  await expect.poll(async () => (await getFormStartEvents(page)).length).toBe(1)
  expect(await getLeadEvents(page)).toEqual([])

  await page.evaluate(() => {
    ;(window as GaWindow).__typeformOnSubmit?.()
  })

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)
  expect(await getLeadEvents(page)).toEqual([
    expect.objectContaining({
      form_type: "typeform_appointment",
    }),
  ])
})

test("Typeform postMessage submit is a backup generate_lead path", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/contact")
  await page.waitForFunction(() => (window as Window & { __wcrcTypeformLeadHook?: boolean }).__wcrcTypeformLeadHook === true)

  await page.evaluate(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: "https://form.typeform.com",
        data: { type: "form-submit", formId: "qYX51Bgz" },
      }),
    )
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: "https://form.typeform.com",
        data: { type: "form-submitted", data: { formId: "qYX51Bgz" } },
      }),
    )
  })

  await expect.poll(async () => (await getLeadEvents(page)).length).toBe(1)
  expect(await getLeadEvents(page)).toEqual([
    {
      form_type: "typeform_appointment",
      location: "typeform_embed",
    },
  ])
})

test("thank-you page load does not invent a generate_lead conversion", async ({ page }) => {
  await installGa4TestHooks(page)
  await page.goto("/thank-you")
  await expect(page.getByRole("heading", { name: "Thank You!" })).toBeVisible()
  await page.evaluate(() => new Promise((resolve) => window.setTimeout(resolve, 400)))
  expect(await getLeadEvents(page)).toEqual([])
})
