import { expect, test, type Page } from "@playwright/test"

const PATH = "/endodontic-procedures/root-canal-therapy"
const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
] as const

function tocNav(page: Page) {
  return page.getByRole("navigation", { name: "On this page" })
}

async function visibleTocLinks(page: Page) {
  const links = tocNav(page).getByRole("link")
  const visible = []
  for (const link of await links.all()) {
    if (await link.isVisible()) visible.push(link)
  }
  return visible
}

async function openMobileToc(page: Page) {
  const summary = tocNav(page).locator("summary")
  if (await summary.isVisible()) {
    const details = tocNav(page).locator("details")
    if ((await details.getAttribute("open")) === null) {
      await summary.click()
    }
  }
}

async function headingMetrics(page: Page, id: string) {
  return page.evaluate((targetId) => {
    const element = document.getElementById(targetId)
    if (!element) return null
    const heading = element.matches("h1, h2, h3, h4")
      ? element
      : element.querySelector("h1, h2, h3, h4")
    if (!heading) return null

    let opacity = 1
    let node: Element | null = heading
    while (node) {
      opacity *= Number.parseFloat(getComputedStyle(node).opacity)
      node = node.parentElement
    }

    return { top: heading.getBoundingClientRect().top, opacity }
  }, id)
}

for (const viewport of VIEWPORTS) {
  test.describe(`TOC anchors at ${viewport.width}`, () => {
    test.describe.configure({ retries: 0 })

    test(`each On this page link lands the heading at >= 96px with opacity 1`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(PATH, { waitUntil: "domcontentloaded" })
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

      await openMobileToc(page)
      const links = await visibleTocLinks(page)
      expect(links.length, "visible TOC links").toBe(8)
      await expect(links[1]).toHaveText(/Patient reviews/)

      for (const link of links) {
        await openMobileToc(page)
        await expect(link).toBeVisible()
        const href = await link.getAttribute("href")
        expect(href, "TOC href").toBeTruthy()
        const id = href!.replace(/^.*#/, "")
        expect(id, "TOC target id").toBeTruthy()

        await link.click()
        await expect(page).toHaveURL(new RegExp(`#${id}$`))

        await expect
          .poll(async () => headingMetrics(page, id), { timeout: 8_000 })
          .toEqual(
            expect.objectContaining({
              top: expect.any(Number),
              opacity: expect.any(Number),
            }),
          )

        const metrics = await headingMetrics(page, id)
        expect(metrics, `#${id} heading`).toBeTruthy()
        expect(metrics!.top, `#${id} heading top`).toBeGreaterThanOrEqual(96)
        expect(metrics!.opacity, `#${id} heading opacity`).toBe(1)
      }
    })

    test("shows imported Google review cards with first name and last initial", async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(PATH, { waitUntil: "domcontentloaded" })

      const section = page.getByTestId("service-page-reviews")
      await expect(section.getByRole("heading", { name: "Patient reviews" })).toBeVisible()
      const cards = section.getByRole("figure")
      await expect(cards).toHaveCount(3)

      for (const card of await cards.all()) {
        const name = (await card.locator("[data-reviewer-name]").textContent())?.trim() ?? ""
        expect(name, "reviewer display name").toMatch(/^[A-Z][\S]* [A-Z]\.$/)
      }
    })
  })
}
