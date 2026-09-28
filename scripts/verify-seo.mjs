// Simple local/CI verification for canonical URL consolidation.
// Usage:
//   1) Run `npm run dev` (or `npm run build && npm run start`)
//   2) In another terminal: `node scripts/verify-seo.mjs`
// Optional: set BASE_URL=http://localhost:3000

const baseUrl = process.env.BASE_URL || "http://localhost:3000"
const canonicalBase = "https://www.winecountryrootcanal.com"

const redirects = [
  { from: "/wine-country-endodontist/meet-dr-anderson", to: "/about" },
  { from: "/wine-country-endodontist/meet-the-team", to: "/about" },
  { from: "/wine-country-endodontist", to: "/about" },
  { from: "/endodontics", to: "/endodontic-procedures" },
  {
    from: "/endodontics/root-canal-therapy",
    to: "/endodontic-procedures/root-canal-therapy",
  },
  { from: "/apicoectomy", to: "/endodontic-procedures/apicoectomy" },
  { from: "/root-canal-therapy", to: "/endodontic-procedures/root-canal-therapy" },
  { from: "/root-canal-retreatment", to: "/endodontic-procedures/retreatment" },
  // Legacy WordPress URLs (see legacyWordPressRedirects in next.config.mjs)
  { from: "/endodontics/dental-emergencies", to: "/dental-emergencies" },
  { from: "/endodontics/emergency-root-canal-therapy", to: "/dental-emergencies" },
  { from: "/endodontics/apicoectomy", to: "/endodontic-procedures/apicoectomy" },
  { from: "/endodontics/root-canal-retreatment", to: "/endodontic-procedures/retreatment" },
  { from: "/endodontics/cracked-tooth", to: "/resources/cracked-tooth" },
  { from: "/endodontics/what-is-an-endodontist", to: "/resources/what-is-an-endodontist" },
  { from: "/endodontics/root-canal-faqs", to: "/endodontic-procedures/root-canal-therapy" },
  { from: "/endodontics/dental-videos", to: "/about" },
  { from: "/endodontics/root-amputation", to: "/endodontic-procedures" },
  { from: "/root-canal-faqs", to: "/endodontic-procedures/root-canal-therapy" },
  { from: "/referring-dentists", to: "/dentists" },
  { from: "/appointment-request/referring-dentists", to: "/dentists" },
  { from: "/appointment-request", to: "/contact" },
  { from: "/online-patient-forms", to: "/forms" },
  { from: "/leave-a-review", to: "/testimonials" },
  { from: "/leave-a-review/testimonials", to: "/testimonials" },
  { from: "/leave-a-review/patient-testimonials", to: "/testimonials" },
  { from: "/new-wine-country-practice", to: "/about" },
  { from: "/new-wine-country-practice/meet-dr-anderson", to: "/about" },
  { from: "/welcome", to: "/" },
  { from: "/covid-safety-information", to: "/" },
  { from: "/surgically-clean-air", to: "/technology" },
  { from: "/what-sets-us-apart", to: "/about" },
  { from: "/what-sets-us-apart/our-practice", to: "/about" },
  { from: "/what-sets-us-apart/our-practice/covid-safety-information", to: "/about" },
  { from: "/what-sets-us-apart/referring-dentists", to: "/dentists" },
  { from: "/what-sets-us-apart/patient-reviews", to: "/testimonials" },
  { from: "/what-sets-us-apart/patient-testimonials", to: "/testimonials" },
  { from: "/what-sets-us-apart/testimonials", to: "/testimonials" },
  { from: "/what-sets-us-apart/technology", to: "/technology" },
  { from: "/what-sets-us-apart/technology/cbct-scanner", to: "/cbct-scanner-santa-rosa" },
  { from: "/what-sets-us-apart/technology/dental-operating-microscope", to: "/technology" },
  { from: "/what-sets-us-apart/technology/surgically-clean-air", to: "/technology" },
  { from: "/what-sets-us-apart/blog", to: "/resources" },
  { from: "/what-sets-us-apart/blog/all-about-endodontics", to: "/resources/what-is-an-endodontist" },
  {
    from: "/what-sets-us-apart/blog/all-you-need-to-know-about-root-canal-therapy",
    to: "/endodontic-procedures/root-canal-therapy",
  },
  {
    from: "/what-sets-us-apart/blog/2020/12/30/all-you-need-to-know-about-root-canal-therapy",
    to: "/endodontic-procedures/root-canal-therapy",
  },
  {
    from: "/what-sets-us-apart/blog/frequently-asked-questions-about-root-canal-therapy",
    to: "/endodontic-procedures/root-canal-therapy",
  },
  { from: "/what-sets-us-apart/blog/dispelling-the-myths-of-root-canal-therapy", to: "/resources/root-canal-safety" },
  {
    from: "/what-sets-us-apart/blog/2024/3/20/dispelling-the-myths-of-root-canal-therapy",
    to: "/resources/root-canal-safety",
  },
  { from: "/what-sets-us-apart/blog/reasons-for-root-canal-therapy", to: "/endodontic-procedures/signs-symptoms" },
  { from: "/what-sets-us-apart/blog/preparing-for-dental-emergencies", to: "/dental-emergencies" },
  { from: "/what-sets-us-apart/blog/2020/7/8/preparing-for-dental-emergencies", to: "/dental-emergencies" },
  { from: "/what-sets-us-apart/blog/how-to-handle-dental-emergencies", to: "/dental-emergencies" },
  { from: "/what-sets-us-apart/blog/important-steps-to-take-during-a-dental-emergency", to: "/dental-emergencies" },
  { from: "/what-sets-us-apart/blog/what-to-do-if-you-chip-or-break-a-tooth", to: "/resources/dental-injuries" },
]

// Legacy URLs as Google indexed them (with a trailing slash). Next.js first 308s
// to the slashless path, then the rule above applies: at most two hops, and the
// final page must be a 200.
const trailingSlashRedirects = [
  { from: "/endodontics/dental-emergencies/", to: "/dental-emergencies" },
  { from: "/endodontics/apicoectomy/", to: "/endodontic-procedures/apicoectomy" },
  { from: "/referring-dentists/", to: "/dentists" },
]

const canonicals = [
  "/about",
  "/endodontic-procedures",
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
  // Destination must resolve directly (no redirect chains or loops).
  const dest = await fetch(`${baseUrl}${to}`, { redirect: "manual" })
  if (dest.status !== 200) {
    throw new Error(`Redirect target ${to} (from ${from}) returned ${dest.status}, expected 200`)
  }
  console.log(`✓ Redirect ok: ${from} -> ${to} (${res.status})`)
}

async function checkTrailingSlashRedirect({ from, to }) {
  let path = from
  let hops = 0
  let res
  while (true) {
    res = await fetch(`${baseUrl}${path}`, { redirect: "manual" })
    if (res.status < 300 || res.status >= 400) break
    hops += 1
    if (hops > 2) throw new Error(`Redirect ${from} took more than 2 hops`)
    path = normalizeLocation(res.headers.get("location"))
  }
  if (res.status !== 200 || path !== to) {
    throw new Error(`Redirect ${from} -> ${to} failed (ended at ${path} with ${res.status})`)
  }
  console.log(`✓ Trailing-slash redirect ok: ${from} -> ${to} (${hops} hops)`)
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
    for (const rule of trailingSlashRedirects) await checkTrailingSlashRedirect(rule)
    for (const path of canonicals) await checkCanonical(path)
    console.log("All SEO consolidation checks passed.")
  } catch (err) {
    console.error(err.message || err)
    process.exit(1)
  }
}

main()
