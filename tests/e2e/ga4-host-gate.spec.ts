import { expect, test, type Page } from "@playwright/test"
import {
  CANONICAL_ANALYTICS_HOSTS,
  isCanonicalAnalyticsHost,
} from "@/lib/analytics-host"
import { GA4_BOOTSTRAP_SCRIPT, GA4_MEASUREMENT_ID } from "@/lib/ga4"

const LOCAL_AND_PREVIEW_HOSTS = [
  "127.0.0.1",
  "localhost",
  "[::1]",
  "::1",
  "wine-country-root-canal.vercel.app",
  "v0-wine-country-website-dz-git-main.vercel.app",
]

type GaWindow = Window & {
  __gaEvents?: unknown[]
  dataLayer?: unknown[]
}

async function captureGaTraffic(page: Page) {
  const gtagRequests: string[] = []

  await page.route("**/*", async (route) => {
    const url = route.request().url()
    if (url.includes("googletagmanager.com") || url.includes("google-analytics.com")) {
      gtagRequests.push(url)
      await route.abort()
      return
    }
    await route.continue()
  })

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
  })

  return gtagRequests
}

async function getNamedEvents(page: Page, eventName: string) {
  return page.evaluate((name) => {
    const events = ((window as GaWindow).__gaEvents ?? []) as unknown[]

    return events
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((args) => args[0] === "event" && args[1] === name)
  }, eventName)
}

test("allowlist would collect on live hosts and skip local or preview hosts", () => {
  expect([...CANONICAL_ANALYTICS_HOSTS]).toEqual([
    "winecountryrootcanal.com",
    "www.winecountryrootcanal.com",
  ])

  for (const host of CANONICAL_ANALYTICS_HOSTS) {
    expect(isCanonicalAnalyticsHost(host)).toBe(true)
  }

  for (const host of LOCAL_AND_PREVIEW_HOSTS) {
    expect(isCanonicalAnalyticsHost(host)).toBe(false)
  }

  expect(GA4_MEASUREMENT_ID).toBe("G-VH6BCFFY75")
  expect(GA4_BOOTSTRAP_SCRIPT).toContain("G-VH6BCFFY75")
  expect(GA4_BOOTSTRAP_SCRIPT).toContain("googletagmanager.com/gtag/js?id=")
  expect(GA4_BOOTSTRAP_SCRIPT).toContain('gtag("config"')
  expect(GA4_BOOTSTRAP_SCRIPT).not.toContain("__WCRC_ANALYTICS_TEST_HOST__")
})

test("127.0.0.1 does not load gtag or emit generate_lead / form_start", async ({ page }) => {
  const gtagRequests = await captureGaTraffic(page)

  await page.goto("/contact")
  await expect(page.getByRole("heading", { name: "Ready to Request an Appointment?" })).toBeVisible()

  const hook = page.locator("script#ga4-typeform-lead")
  await expect(hook).toHaveCount(1)
  await expect(hook).toHaveAttribute("data-typeform-id", "qYX51Bgz")

  const bootstrap = page.locator("script#google-analytics")
  await expect(bootstrap).toHaveCount(1)
  const bootstrapSource = (await bootstrap.evaluate((el) => el.textContent)) ?? ""
  expect(bootstrapSource).toContain("isCanonicalAnalyticsHost")
  expect(bootstrapSource).toContain("G-VH6BCFFY75")

  await page.locator('a[href="tel:+17075233636"]').first().click()
  await page.getByRole("link", { name: "Request Appointment Online", exact: true }).click()
  await page.evaluate(() => new Promise((resolve) => window.setTimeout(resolve, 400)))

  expect(gtagRequests.filter((url) => url.includes(GA4_MEASUREMENT_ID))).toEqual([])
  expect(await getNamedEvents(page, "generate_lead")).toEqual([])
  expect(await getNamedEvents(page, "form_start")).toEqual([])

  const queuedCommands = await page.evaluate(() => {
    const events = ((window as GaWindow).__gaEvents ?? []) as unknown[]
    return events.map((entry) => Array.from(entry as ArrayLike<unknown>))
  })

  expect(queuedCommands.some((args) => args[0] === "config" && args[1] === GA4_MEASUREMENT_ID)).toBe(
    false,
  )
  expect(queuedCommands.some((args) => args[0] === "js")).toBe(false)
})
