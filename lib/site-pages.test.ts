import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { contentUpdates } from "./content-updates.ts"
import { sitePages } from "./site-pages.ts"

describe("sitePages registry", () => {
  it("lists each path once", () => {
    const paths = sitePages.map((page) => page.path)
    assert.equal(new Set(paths).size, paths.length)
  })

  it("gives every page a real ISO edit date that is not in the future", () => {
    const today = new Date().toISOString().slice(0, 10)
    for (const page of sitePages) {
      const date = contentUpdates[page.path]
      assert.match(date ?? "", /^\d{4}-\d{2}-\d{2}$/, `missing contentUpdates date for ${page.path}`)
      assert.ok(date <= today, `${page.path} has a future edit date ${date}`)
    }
  })

  it("has no stale contentUpdates entries for removed pages", () => {
    const paths = new Set(sitePages.map((page) => page.path))
    for (const path of Object.keys(contentUpdates)) assert.ok(paths.has(path), `stale contentUpdates entry ${path}`)
  })

  it("keeps summaries useful for answer engines", () => {
    for (const page of sitePages) {
      assert.ok(page.summary.length >= 40 && page.summary.length <= 320, `${page.path} summary length ${page.summary.length}`)
    }
  })
})
