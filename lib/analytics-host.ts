export const CANONICAL_ANALYTICS_HOSTS = [
  "winecountryrootcanal.com",
  "www.winecountryrootcanal.com",
] as const

export const ANALYTICS_TEST_HOST_OVERRIDE_KEY = "__WCRC_ANALYTICS_TEST_HOST__"

type CanonicalAnalyticsHost = (typeof CANONICAL_ANALYTICS_HOSTS)[number]

declare global {
  interface Window {
    [ANALYTICS_TEST_HOST_OVERRIDE_KEY]?: string
  }
}

const normalizeHostname = (hostname: string) => hostname.trim().toLowerCase().replace(/\.$/, "")

const isListedCanonicalHost = (hostname: string): hostname is CanonicalAnalyticsHost =>
  CANONICAL_ANALYTICS_HOSTS.includes(hostname as CanonicalAnalyticsHost)

const readTestHostOverride = () => {
  if (typeof window === "undefined") {
    return ""
  }

  const override = window[ANALYTICS_TEST_HOST_OVERRIDE_KEY]
  return typeof override === "string" ? normalizeHostname(override) : ""
}

export function getAnalyticsHostname(
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
) {
  const actual = normalizeHostname(hostname)
  const override = readTestHostOverride()

  // Playwright can impersonate a host on 127.0.0.1. Production hosts ignore it
  // so a preview or live page cannot opt into a different property via JS.
  if (override && !isListedCanonicalHost(actual)) {
    return override
  }

  return actual
}

export function isCanonicalAnalyticsHost(hostname?: string) {
  const resolved = hostname === undefined ? getAnalyticsHostname() : normalizeHostname(hostname)

  return isListedCanonicalHost(resolved)
}

function hostEqualityJs() {
  return CANONICAL_ANALYTICS_HOSTS.map((host) => `hostname === ${JSON.stringify(host)}`).join(" || ")
}

/**
 * Browser helper inlined into gtag bootstrap and #ga4-typeform-lead.
 * Script load + config never honor the test override (that would let
 * 127.0.0.1 load gtag.js). Runtime event emit may, so Playwright can
 * assert event shape without talking to Google.
 */
export function buildCanonicalAnalyticsHostCheckJs(options: { allowTestOverride: boolean }) {
  const hostsExpr = hostEqualityJs()
  const overrideBlock = options.allowTestOverride
    ? `
    var override = window[${JSON.stringify(ANALYTICS_TEST_HOST_OVERRIDE_KEY)}];
    if (typeof override === "string" && override && !(${hostsExpr})) {
      hostname = String(override).toLowerCase().replace(/\\.$/, "");
    }`
    : ""

  return `function isCanonicalAnalyticsHost() {
    var hostname = String((window.location && window.location.hostname) || "").toLowerCase().replace(/\\.$/, "");
    ${overrideBlock}
    return ${hostsExpr};
  }`
}
