import { defineConfig, devices } from "@playwright/test"

const port = 3100
const localBaseUrl = `http://127.0.0.1:${port}`
const baseURL = process.env.A11Y_BASE_URL ?? localBaseUrl

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [
        ["line"],
        ["html", { open: "never", outputFolder: "playwright-report/browser-quality" }],
      ]
    : [["list"], ["html", { open: "never", outputFolder: "playwright-report/browser-quality" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: process.env.A11Y_BASE_URL
    ? undefined
    : {
        command: `pnpm build && pnpm exec next start -H 127.0.0.1 -p ${port}`,
        url: localBaseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
})
