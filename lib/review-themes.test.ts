import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { formatReviewerName } from "./review-themes.ts"

describe("formatReviewerName", () => {
  it("returns a capitalized given name and last initial", () => {
    assert.equal(formatReviewerName("gail fisher"), "Gail F.")
    assert.equal(formatReviewerName("gail f."), "Gail F.")
    assert.equal(formatReviewerName("Ann Troxell"), "Ann T.")
    assert.equal(formatReviewerName("Charlotte Offsay"), "Charlotte O.")
  })

  it("title-cases an all-caps or mixed-case source name", () => {
    assert.equal(formatReviewerName("ANN TROXELL"), "Ann T.")
    assert.equal(formatReviewerName("ingrid Nuernberg"), "Ingrid N.")
  })

  it("keeps a single given name and capitalizes it", () => {
    assert.equal(formatReviewerName("Sharon"), "Sharon")
    assert.equal(formatReviewerName("sharon"), "Sharon")
  })

  it("returns an empty string for blank input", () => {
    assert.equal(formatReviewerName(""), "")
    assert.equal(formatReviewerName("   "), "")
  })
})
