// Simple local/CI verification for canonical URL consolidation.
// Usage:
//   1) Run `npm run dev` (or `npm run build && npm run start`)
//   2) In another terminal: `node scripts/verify-seo.mjs`
// Optional: set BASE_URL=http://localhost:3000

const baseUrl = process.env.BASE_URL || "http://localhost:3000"
const canonicalBase = "https://www.winecountryrootcanal.com"

const redirects = [
  { from: "/apicoectomy", to: "/endodontic-procedures/apicoectomy" },
  { from: "/root-canal-therapy", to: "/endodontic-procedures/root-canal-therapy" },
  { from: "/root-canal-retreatment", to: "/endodontic-procedures/retreatment" },
]

const canonicals = [
  "/endodontic-procedures/apicoectomy",
  "/endodontic-procedures/root-canal-therapy",
  "/endodontic-procedures/retreatment",
]

function normalizeLocation(loc) {
  if (!loc) return null
  try {
    const url = new URL(loc, baseUrl)
    return url.pathname
  } catch {
    return loc
  }
}

async function checkRedirect({ from, to }) {
  const res = await fetch(`${baseUrl}${from}`, { redirect: "manual" })
  const okStatus = res.status === 301 || res.status === 308
  const location = normalizeLocation(res.headers.get("location"))
  if (!okStatus || location !== to) {
    throw new Error(`Redirect ${from} -> ${to} failed (status ${res.status}, location ${location})`)
  }
  console.log(`✓ Redirect ok: ${from} -> ${to} (${res.status})`)
}

function extractCanonicalHref(html) {
  const linkMatch = html.match(/<link[^>]*rel=[\"']canonical[\"'][^>]*>/i)
  if (!linkMatch) return null
  const hrefMatch = linkMatch[0].match(/href=[\"']([^\"']+)[\"']/i)
  return hrefMatch ? hrefMatch[1] : null
}

async function checkCanonical(path) {
  const res = await fetch(`${baseUrl}${path}`)
  const html = await res.text()
  const href = extractCanonicalHref(html)
  const expected = `${canonicalBase}${path}`
  if (href !== expected) {
    throw new Error(`Canonical mismatch for ${path} (got ${href}, expected ${expected})`)
  }
  console.log(`✓ Canonical ok: ${path}`)
}

async function main() {
  try {
    for (const rule of redirects) await checkRedirect(rule)
    for (const path of canonicals) await checkCanonical(path)
    console.log("All SEO consolidation checks passed.")
  } catch (err) {
    console.error(err.message || err)
    process.exit(1)
  }
}

main()

