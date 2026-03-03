# Local SEO Checklist — Wine Country Root Canal

Short, practical upkeep for local search visibility in Santa Rosa, CA.

## Google Business Profile (GBP)
**Verification**
- Ensure GBP is verified under the practice’s primary Google account.
- Keep ownership/admin list minimal: 1 owner, 1–2 managers (office manager + marketing).

**Primary category**
- Use **Endodontist** (primary).  
  If unavailable in your GBP UI, use **Dentist** and add endodontic services in “Services.”

**Secondary categories**
- Add **Dental clinic** and/or **Emergency dental service** if offered and visible on the website.
- Avoid adding unrelated categories (e.g., cosmetic dentist) unless actually offered.

**Services**
- Add/confirm these exact services (match site wording):
  - Root Canal Therapy
  - Root Canal Retreatment
  - Apicoectomy (Root‑End Surgery)
  - Emergency Endodontic Care
  - CBCT / 3D Imaging (as a supporting service)
- Include short, patient‑friendly descriptions and pricing only if you publish pricing on the site.

**Business details**
- Name: **Wine Country Root Canal**
- Address: **4655 Hoen Ave Ste 2, Santa Rosa, CA 95405**
- Phone: **+1‑707‑523‑3636**
- Hours: **Mon–Thu 8:00–17:00; Fri–Sun Closed**
- Website: **https://www.winecountryrootcanal.com/**

## NAP Consistency (Name / Address / Phone)
Check quarterly or after any update:

**Website**
- Footer NAP matches above exactly.
- `app/contact` page matches above exactly (address + phone formatting).
- `app/layout.tsx` LocalBusiness JSON‑LD matches above exactly.

**Google Business Profile**
- NAP fields match website exactly (no “Ste.” vs “Suite” mismatches).
- Phone is the same primary line as website (not tracking numbers).

**Citations**
- Yelp, Facebook, LinkedIn, Apple Maps, Bing Places, dental directories:
  - NAP matches above exactly.
  - Website URL points to canonical homepage.

## Photos & Posts
**Photo cadence**
- Add **3–5 new photos every 1–2 months**:
  - Office exterior (street view + entrance)
  - Reception / operatories
  - CBCT scanner / microscope
  - Team / provider headshots
- Keep older photos; don’t delete unless inaccurate.
- Use clear filenames before upload (e.g., `wcrc-office-exterior-2025-01.jpg`).

**GBP posts**
- Optional but helpful: 1 post/month (holiday hours, new tech, emergency availability).

## Reviews Workflow
**Request timing**
- Ask after a successful visit, ideally **same day or next day**.

**How to request**
- Use a simple text/email with the direct Google review link.
- Front desk script:  
  “If you were happy with your visit, a Google review really helps other patients find us. I can text you the link.”

**Follow‑up**
- If no review after 5–7 days, send **one gentle reminder**.

**Responding**
- Reply to all reviews within 1 week.
- Thank positive reviewers; keep responses HIPAA‑safe (no treatment details).
- For negatives: acknowledge, invite offline resolution, avoid arguing.

## Website Review Assets

### Testimonials / Review Content
- Keep the site review set current and honest:
  - Update source data in `components/reviews/google-review-data.ts`
  - Verify that `/`, `/about`, and `/testimonials` reflect the updated list and maintain clear review intent.
- Run `pnpm analyze:reviews` after any review dataset update and confirm:
  - no duplicate IDs
  - no ID gaps
  - expected total row count
  - `googleReviewSummary` values remain accurate
- Keep `/testimonials` as the canonical page for full patient feedback.
- Keep `about` and home hero-adjacent review blocks aligned to avoid inconsistent patient messaging.
- Do not include fake or machine-generated reviews.
- Keep source-authentic reviewer text and display names (including capitalization/typos), unless legal/compliance requires redaction.
- If the website intentionally shows only 5-star testimonials, keep a separate internal note of low-star themes for quality improvement.

### Internal Linking for Local Trust
- Ensure at least one high-visibility internal link points to `/testimonials` from:
  - Top nav (desktop + mobile)
  - Footer `Our Practice` section
- Use anchor text such as `Patient Testimonials` or `Reviews` consistently.

### Structured Data and SERP Consistency
- If aggregate ratings on the site change materially, update all related JSON-LD fields in `app/layout.tsx` (if applicable) and confirm `verify:seo` + Rich Results still reflect reality.

## What NOT to Do
- **Doorway pages**: don’t create thin pages like “Root Canal in [nearby town]” with near‑identical content.
- **Near‑duplicate location pages**: only create a new location page if there is a real, staffed physical office there.
- **Self‑serving review markup**: don’t add AggregateRating/Review schema for the business sitewide.
- **Keyword stuffing**: avoid unnatural titles like “Root Canal Santa Rosa CA Best Endodontist Emergency.”
- **Overstated medical claims**: avoid language that implies guaranteed outcomes from a single study (for example: “proven to prevent disease”).

If anything changes (hours, phone, address, services), update **site → JSON‑LD → sitemap → GBP → citations** in that order.

For study-driven content updates, follow:

- `ops/clinical-content-playbook.md`
