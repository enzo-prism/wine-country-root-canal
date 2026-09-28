import { expect, test } from "@playwright/test"

test("testimonials topic chips toggle aria-pressed and filter the review count", async ({ page }) => {
  await page.goto("/testimonials")

  const chips = page.getByRole("group", { name: "Filter reviews by topic" }).getByRole("button")
  const all = chips.first()
  const topic = chips.nth(1)
  const status = page.getByText(/^Showing \d+ of \d+ written reviews/)

  await expect(all).toHaveAttribute("aria-pressed", "true")
  await expect(topic).toHaveAttribute("aria-pressed", "false")
  const totalText = await status.textContent()
  const total = Number(totalText?.match(/of (\d+)/)?.[1])
  expect(total).toBeGreaterThan(0)

  // Wait for hydration: clicking before React attaches handlers would be a no-op.
  await expect
    .poll(
      async () => {
        await topic.click()
        return topic.getAttribute("aria-pressed")
      },
      { timeout: 10_000 },
    )
    .toBe("true")
  await expect(all).toHaveAttribute("aria-pressed", "false")

  const filteredText = await status.textContent()
  const filtered = Number(filteredText?.match(/of (\d+)/)?.[1])
  expect(filtered).toBeGreaterThan(0)
  expect(filtered).toBeLessThan(total)
  expect(filteredText).toMatch(/about “/)

  // Pressing the active chip again returns to all reviews.
  await topic.click()
  await expect(topic).toHaveAttribute("aria-pressed", "false")
  await expect(all).toHaveAttribute("aria-pressed", "true")
  await expect(status).toHaveText(new RegExp(`of ${total} written reviews`))
})

test("Vimeo facade loads the player only after the visitor presses play", async ({ page }) => {
  await page.goto("/endodontic-procedures/root-canal-therapy")

  const main = page.getByRole("main")
  await expect(main.locator('iframe[src*="player.vimeo.com"]')).toHaveCount(0)

  const play = main.getByRole("button", { name: /^Play video: / }).first()
  await play.scrollIntoViewIfNeeded()
  await expect
    .poll(
      async () => {
        if ((await play.count()) > 0 && (await play.isVisible())) await play.click()
        return main.locator('iframe[src*="player.vimeo.com"]').count()
      },
      { timeout: 10_000 },
    )
    .toBe(1)

  const iframe = main.locator('iframe[src*="player.vimeo.com"]')
  await expect(iframe).toHaveAttribute("src", /autoplay=1/)
  await expect(iframe).toHaveAttribute("title", /.+/)
  await expect(iframe).toBeFocused()
})

test("contact map facade loads the Google map only on request", async ({ page }) => {
  await page.goto("/contact")

  const main = page.getByRole("main")
  await expect(main.locator('iframe[src*="maps.google.com"]')).toHaveCount(0)
  // Directions work before (and without) the interactive map.
  await expect(main.getByRole("link", { name: /Google Maps/ }).first()).toHaveAttribute("href", /google\.com\/maps/)

  const load = main.getByRole("button", { name: "Load interactive map" })
  await load.scrollIntoViewIfNeeded()
  await expect
    .poll(
      async () => {
        if ((await load.count()) > 0) await load.click()
        return main.locator('iframe[src*="maps.google.com"]').count()
      },
      { timeout: 10_000 },
    )
    .toBe(1)
  await expect(main.locator('iframe[src*="maps.google.com"]')).toHaveAttribute("title", /Google Map/)
})

test("unknown URLs return a branded 404 with a Call link", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist")

  expect(response?.status()).toBe(404)
  await expect(page.getByRole("heading", { level: 1, name: /^We couldn.t find that page$/ })).toBeVisible()
  await expect(page.getByRole("main").locator('a[href="tel:+17075233636"]')).toHaveCount(1)
  await expect(page.getByRole("navigation", { name: "Helpful pages" }).getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/",
  )
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
})

test("mobile menu leads with Call and Request an Appointment", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const menuButton = page.getByRole("button", { name: "Toggle navigation menu" })
  const dialog = page.getByRole("dialog")
  await expect
    .poll(
      async () => {
        if ((await dialog.count()) === 0) await menuButton.click()
        return dialog.count()
      },
      { timeout: 10_000 },
    )
    .toBe(1)

  const call = dialog.getByRole("link", { name: "Call (707) 523-3636" })
  const request = dialog.getByRole("link", { name: "Request an Appointment", exact: true })
  await expect(call).toHaveAttribute("href", "tel:+17075233636")
  await expect(request).toHaveAttribute("href", "https://fxuqp40sseh.typeform.com/to/qYX51Bgz")
  await expect(call).toBeInViewport()
  await expect(request).toBeInViewport()

  // Both actions come before every navigation link in the menu.
  const order = await dialog.evaluate((element) => {
    const links = Array.from(element.querySelectorAll("a"))
    const index = (predicate: (a: HTMLAnchorElement) => boolean) => links.findIndex(predicate)
    return {
      call: index((a) => a.href.startsWith("tel:")),
      request: index((a) => a.href.includes("typeform.com")),
      firstNav: index((a) => Boolean(a.closest("nav"))),
    }
  })
  expect(order.call).toBeGreaterThanOrEqual(0)
  expect(order.call).toBeLessThan(order.firstNav)
  expect(order.request).toBeLessThan(order.firstNav)
})
