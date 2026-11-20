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

test("structured data forms one linked entity graph", async ({ page }) => {
  const base = "https://www.winecountryrootcanal.com"
  const graphFor = async (path: string) => {
    await page.goto(path)
    const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "{}")),
    )
    return blocks.flatMap((block) => block["@graph"] ?? [block])
  }

  const therapy = await graphFor("/endodontic-procedures/root-canal-therapy")
  const business = therapy.find((node) => node["@id"] === `${base}/#localbusiness`)
  expect(therapy.find((node) => node["@type"] === "WebSite")?.publisher).toEqual({ "@id": `${base}/#localbusiness` })
  expect(business.medicalSpecialty).toBe("https://schema.org/Dentistry")
  expect(business.employee["@id"]).toBe(`${base}/about#dr-anderson`)
  expect(business.availableService.map((service: { url: string }) => service.url)).toContain(
    `${base}/endodontic-procedures/apicoectomy`,
  )
  const therapyPage = therapy.filter((node) => node["@id"] === `${base}/endodontic-procedures/root-canal-therapy#webpage`)
  expect(therapyPage).toHaveLength(1)
  expect(therapyPage[0].about["@id"]).toBe(`${base}/endodontic-procedures/root-canal-therapy#procedure`)
  expect(therapyPage[0].about.performer["@id"]).toBe(`${base}/about#dr-anderson`)
  expect(JSON.stringify(therapy)).not.toMatch(/highly successful|\d+\s?%/)
  // Editorial pages must not claim a clinician review they did not receive.
  expect(therapyPage[0].reviewedBy).toBeUndefined()

  const reviewed = await graphFor("/resources/cracked-tooth")
  const crackedPage = reviewed.find((node) => node["@id"] === `${base}/resources/cracked-tooth#webpage`)
  expect(crackedPage.reviewedBy["@id"]).toBe(`${base}/about#dr-anderson`)
  expect(crackedPage.lastReviewed).toBe("2026-07")

  const cost = await graphFor("/resources/root-canal-cost")
  const costPage = cost.find((node) => node["@id"] === `${base}/resources/root-canal-cost#webpage`)
  expect(costPage.about).toEqual({ "@id": `${base}/endodontic-procedures/root-canal-therapy#procedure` })
})

test("llms.txt lists every sitemap page with current practice facts", async ({ request }) => {
  const llms = await request.get("/llms.txt")
  expect(llms.status()).toBe(200)
  expect(llms.headers()["content-type"]).toContain("text/plain")
  const text = await llms.text()
  const sitemap = await (await request.get("/sitemap.xml")).text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  expect(urls.length).toBeGreaterThan(20)
  for (const url of urls) expect(text).toContain(`(${url})`)
  expect(text).toContain("(707) 523-3636")
  expect(text).toContain("Most patients can be seen within 1 to 3 days.")
  expect(text).not.toMatch(/\d+\s?% success|success rates/i)
})
