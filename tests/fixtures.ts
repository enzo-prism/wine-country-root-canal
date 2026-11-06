import { test as base } from "@playwright/test"

/** Keep local host-override tests and public-domain QA out of real reporting. */
export const test = base.extend<{ analyticsIsolation: void }>({
  analyticsIsolation: [
    async ({ context }, use) => {
      await context.route(
        /^https:\/\/(?:[^/]+\.)?(?:googletagmanager\.com|google-analytics\.com|analytics\.google\.com|vercel-insights\.com|vercel-scripts\.com)\//,
        (route) => route.abort(),
      )
      await context.route("**/_vercel/insights/**", (route) => route.abort())
      await use()
    },
    { auto: true },
  ],
})

export { expect, type APIRequestContext, type Locator, type Page } from "@playwright/test"
