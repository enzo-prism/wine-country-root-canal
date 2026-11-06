import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { formatReviewerName } from "./review-themes.ts"

describe("formatReviewerName", () => {
  it("returns a capitalized given name and last initial", () => {
    assert.equal(formatReviewerName("maya chen"), "Maya C.")
    assert.equal(formatReviewerName("maya c."), "Maya C.")
    assert.equal(formatReviewerName("Jordan Blake"), "Jordan B.")
    assert.equal(formatReviewerName("Riley Okonkwo"), "Riley O.")
  })

  it("title-cases an all-caps or mixed-case source name", () => {
    assert.equal(formatReviewerName("JORDAN BLAKE"), "Jordan B.")
    assert.equal(formatReviewerName("priya Nair"), "Priya N.")
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
