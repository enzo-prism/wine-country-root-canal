import { expect, test } from "@playwright/test"

import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

const WIDTHS = [1024, 1035, 1280] as const
const PATHS = ["/", SERVICE_PAGE_PATHS[0]] as const

for (const path of PATHS) {
  for (const width of WIDTHS) {
    test(`${path} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(path, { waitUntil: "domcontentloaded" })
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

      const box = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }))
      expect(box.scrollWidth, `${path} @${width} scrollWidth`).toBeLessThanOrEqual(box.innerWidth)
    })
  }
}
