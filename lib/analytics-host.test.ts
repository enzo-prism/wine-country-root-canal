import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  CANONICAL_ANALYTICS_HOSTS,
  buildCanonicalAnalyticsHostCheckJs,
  isCanonicalAnalyticsHost,
} from "./analytics-host.ts"

describe("canonical analytics host allowlist", () => {
  it("allows only the live Wine Country hosts", () => {
    assert.deepEqual([...CANONICAL_ANALYTICS_HOSTS], [
      "winecountryrootcanal.com",
      "www.winecountryrootcanal.com",
    ])

    assert.equal(isCanonicalAnalyticsHost("www.winecountryrootcanal.com"), true)
    assert.equal(isCanonicalAnalyticsHost("winecountryrootcanal.com"), true)
    assert.equal(isCanonicalAnalyticsHost("WWW.WineCountryRootCanal.com."), true)
  })

  it("blocks local, preview, and any other non-production host", () => {
    const blocked = [
      "127.0.0.1",
      "localhost",
      "[::1]",
      "::1",
      "0.0.0.0",
      "wine-country-root-canal.vercel.app",
      "v0-wine-country-website-dz-git-main-enzo-design-prisms-projects.vercel.app",
      "winecountryrootcanal.com.vercel.app",
      "preview.winecountryrootcanal.com",
    ]

    for (const hostname of blocked) {
      assert.equal(isCanonicalAnalyticsHost(hostname), false, hostname)
    }
  })

  it("bootstrap JS checks the live hosts and does not honor a test override", () => {
    const bootstrap = buildCanonicalAnalyticsHostCheckJs({ allowTestOverride: false })

    assert.match(bootstrap, /winecountryrootcanal\.com/)
    assert.match(bootstrap, /www\.winecountryrootcanal\.com/)
    assert.doesNotMatch(bootstrap, /__WCRC_ANALYTICS_TEST_HOST__/)
  })

  it("runtime event JS may impersonate a live host only on non-canonical pages", () => {
    const runtime = buildCanonicalAnalyticsHostCheckJs({ allowTestOverride: true })

    assert.match(runtime, /__WCRC_ANALYTICS_TEST_HOST__/)
    assert.match(runtime, /winecountryrootcanal\.com/)
  })
})
