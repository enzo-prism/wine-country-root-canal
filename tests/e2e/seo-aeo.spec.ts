import { expect, test } from "../fixtures"

test("local treatment pages expose clear patient actions and canonical identity", async ({ page }) => {
  for (const [path, title] of [
    ["/endodontic-procedures/root-canal-therapy", "Root Canal Treatment in Santa Rosa, CA"],
    ["/endodontic-procedures/retreatment", "Root Canal Retreatment in Santa Rosa, CA"],
    ["/dental-emergencies", "Emergency Root Canal Care in Santa Rosa, CA"],
  ]) {
    await page.goto(path)
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible()
    await expect(page.locator('main a[href="tel:+17075233636"]').first()).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.winecountryrootcanal.com${path}`)
  }
})

test("estimate guide distinguishes office estimates, insurance and final restoration", async ({ page }) => {
  await page.goto("/resources/root-canal-cost")
  await expect(page.getByRole("heading", { name: "Get a Clear Estimate Before Treatment", exact: true })).toBeVisible()
  await expect(page.getByText("Insurance benefits are estimates, not a guarantee of payment.", { exact: false })).toBeVisible()
  await expect(page.getByRole("main")).not.toContainText("$700")
  await expect(page.getByRole("main")).not.toContainText("Medically reviewed by")
  await expect(page.getByRole("link", { name: "AAE Root Canal Cost Guide", exact: true })).toHaveAttribute("href", "https://www.aae.org/patients/root-canal-treatment/root-canal-cost/")
})

test("patient guides and doctor facts do not claim invented clinical review or outcomes", async ({ page }) => {
  await page.goto("/about")
  const person = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent ?? "{}")).find((schema) => schema["@type"] === "Person"),
  )
  expect(person.description).toContain("dentistry since 1997")
  expect(person.description).toContain("endodontics since 2005")
  await expect(page.getByRole("heading", { name: "Focused Endodontic Care" })).toBeVisible()
  await page.goto("/endodontic-procedures/retreatment")
  await expect(page.getByRole("main")).not.toContainText("85–90%")
  await expect(page.getByRole("main")).not.toContainText("Medically reviewed by")
  await expect(page.getByRole("link", { name: "saving a tooth versus extraction", exact: true })).toHaveAttribute("href", "/resources/root-canal-vs-extraction")
})

test("doctor videos offer readable and downloadable source captions", async ({ page, request }) => {
  await page.goto("/endodontic-procedures/root-canal-therapy")
  const captions = page.getByRole("main").locator("details").filter({ hasText: "Read video captions" })
  await expect(captions).toHaveCount(2)
  for (const panel of await captions.all()) {
    await panel.locator("summary").click()
    await expect(panel.getByText("English automatic captions", { exact: true })).toBeVisible()
    await expect(panel).toContainText("may contain transcription errors")
    const href = await panel.getByRole("link", { name: "Download timed English captions (VTT)" }).getAttribute("href")
    const file = await request.get(href!)
    expect(file.status()).toBe(200)
    expect(await file.text()).toContain("WEBVTT")
    expect(await file.text()).toContain("Hi, I'm Dr. Craig Anderson.")
  }
})
