import { expect, test, type APIRequestContext } from "@playwright/test"

import { servicePageReviews } from "@/components/service-page/service-page-review-data"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

/** Encoded so this spec does not contain reviewer surnames in source. */
const FORBIDDEN_SURNAME_TOKENS = ["ZmlzaGVy", "dHJveGVsbA==", "b2Zmc2F5"].map((token) =>
  Buffer.from(token, "base64").toString("utf8").toLowerCase(),
)

async function fetchPageText(request: APIRequestContext, path: string, rsc: boolean) {
  const response = await request.get(path, {
    headers: rsc ? { RSC: "1", "Next-Url": path } : undefined,
  })
  expect(response.ok(), `${rsc ? "RSC" : "HTML"} ${path}`).toBeTruthy()
  return response.text()
}

/** True when anything after the given name is 2+ letters — a surname, not an initial. */
function isSurnameShaped(sourceName: string): boolean {
  const parts = sourceName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return false
  if (parts.length > 2) return true
  return parts.slice(1).some((part) => part.replace(/\./g, "").length >= 2)
}

test("service-page review rows use neutral keys and initials-only source names", () => {
  expect(servicePageReviews.map((review) => review.id)).toEqual(["review-1", "review-2", "review-3"])
  for (const review of servicePageReviews) {
    expect(isSurnameShaped(review.sourceName), review.id).toBe(false)
    const parts = review.sourceName.trim().split(/\s+/).filter(Boolean)
    expect(parts.length, review.id).toBeLessThanOrEqual(2)
    if (parts[1]) expect(parts[1]).toMatch(/^[A-Za-z]\.?$/)
  }
  expect(isSurnameShaped("Maya Chen")).toBe(true)
  expect(isSurnameShaped("Maya C.")).toBe(false)
})

for (const path of SERVICE_PAGE_PATHS) {
  test(`${path} HTML and RSC omit reviewer surnames`, async ({ request }) => {
    const html = await fetchPageText(request, path, false)
    const rsc = await fetchPageText(request, path, true)

    for (const surname of FORBIDDEN_SURNAME_TOKENS) {
      expect(html.toLowerCase(), `HTML ${path}`).not.toContain(surname)
      expect(rsc.toLowerCase(), `RSC ${path}`).not.toContain(surname)
    }
  })
}
