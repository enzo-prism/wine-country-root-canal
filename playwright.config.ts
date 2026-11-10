import { defineConfig, devices } from "@playwright/test"

const port = 3100
const localBaseUrl = `http://127.0.0.1:${port}`
const baseURL = process.env.A11Y_BASE_URL ?? localBaseUrl

// Second production build with the staged SMS program switched on (lib/sms-program.ts).
// It is skipped when A11Y_BASE_URL points the suite at a deployed site, whose flag we don't control.
const smsPort = 3101
const smsBaseUrl = `http://127.0.0.1:${smsPort}`
const runSmsOnBuild = !process.env.A11Y_BASE_URL

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
  projects: [
    { name: "site", testIgnore: /sms-on\// },
    ...(runSmsOnBuild
      ? [{ name: "sms-on", testMatch: /sms-on\/.*\.spec\.ts$/, use: { baseURL: smsBaseUrl } }]
      : []),
  ],
  webServer: process.env.A11Y_BASE_URL
    ? undefined
    : [
        {
          command: `pnpm build && pnpm exec next start -H 127.0.0.1 -p ${port}`,
          url: localBaseUrl,
          // Explicitly off so a local .env cannot flip the default build.
          env: { NEXT_PUBLIC_SMS_TERMS_ENABLED: "false" },
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
        {
          command: `pnpm build && pnpm exec next start -H 127.0.0.1 -p ${smsPort}`,
          url: smsBaseUrl,
          env: { NEXT_PUBLIC_SMS_TERMS_ENABLED: "true", NEXT_DIST_DIR: ".next-sms" },
          reuseExistingServer: !process.env.CI,
          timeout: 240_000,
        },
      ],
})
