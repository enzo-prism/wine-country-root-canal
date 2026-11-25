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
  - `www` is canonical. The apex `winecountryrootcanal.com` is a Vercel project-domain redirect to `www` set to **308 Permanent** (changed from the default 307 on 2026-11-20; Vercel → v0-wine-country-website-dz → Domains). `http` → `https` is also 308. Keep it permanent; check with `curl -sI https://winecountryrootcanal.com/` after any domain change.

## NAP Consistency (Name / Address / Phone)
Check quarterly or after any update:

**Website**
- Footer NAP matches above exactly.
- `app/contact` page matches above exactly (address + phone formatting).
- `lib/schema.ts` LocalBusiness JSON‑LD matches above exactly.

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
  “Your feedback helps other patients learn about our practice. Would you like a link to share your experience?” Invite feedback consistently, without selecting patients by expected rating.

**Follow‑up**
- If no review after 5–7 days, send **one gentle reminder**.

**Responding**
- Reply to all reviews within 1 week.
- Thank positive reviewers; keep responses HIPAA‑safe (no treatment details).
- For negatives: acknowledge, invite offline resolution, avoid arguing.

## Verification on November 6, 2026

The public Maps listing showed Endodontist, the address/phone/hours above, and 4.9 stars from 206 Google reviews. The website source now uses that listing total; its imported testimonial dataset remains 163 rows. Reverify the listing before changing the count again. The public services link still uses legacy `/endodontics/`, which redirects successfully; replace it with `/endodontic-procedures` when the authorized GBP editor is available. No review replies or patient messages were sent in this release.

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
- If aggregate ratings on the site change materially, update all related JSON-LD fields in `lib/schema.ts` (if applicable) and confirm `verify:seo` + Rich Results still reflect reality.

## November 24, 2026 local search follow-up

- **Google Business Profile.** On the verified Santa Rosa listing, submitted the canonical services URL `https://www.winecountryrootcanal.com/endodontic-procedures` in **Edit profile → Menu or services link**. The editor showed the new value pending Google review. Verify the public Products and Services destination before marking this complete.
- **Professional directories.** Change the website field to `https://www.winecountryrootcanal.com/` in both [REDS Endodontists](https://www.redwoodempiredentalsociety.org/endodontists.html) and [REDS Santa Rosa A–D](https://www.redwoodempiredentalsociety.org/a---d.html), currently pointing to `winecountryendo.com`. The [ADA member listing](https://findadentist.ada.org/dentists/dr-craig-wm-anderson-santa-rosa-0038V00002yjChEQAU-a1C8V00000kY8GfUAK) points to `www.andersonendo.com`. Both old domains failed to resolve in the audit. REDS maintains its directory. ADA offers member self-service and member profile support. Check the published href and final destination on each listing after correction.
- **Practice facts.** The first-visit guidance gives people with and without a referral a next step. Confirm the office’s self-referral policy and any insurance-specific requirements before publishing a categorical answer. The cost guide shows questions for a personalized estimate. Add specific fees, network participation, payment terms or financing only after the office confirms them. The aftercare checklist reuses the guide’s existing clinical instructions and retains its existing clinical review date.
- **Measurement.** Annotate the November 20 snippet release and November 24 page changes separately. Evaluate the November 20 release over November 21–December 18, and the November 24 release over November 25–December 22, once Search Console finalizes each window. The windows overlap. Track the same Santa Rosa queries by device and landing page, plus clicks to the therapy, cost and aftercare pages. Report informational aftercare traffic separately. Use the existing production GA4 events and front-desk bookings as described in [GA4 lead events](ga4-lead-events.md). Hold any additional homepage title test until there is a complete window and a review of the mobile results.

## What NOT to Do
- **Doorway pages**: don’t create thin pages like “Root Canal in [nearby town]” with near‑identical content.
- **Near‑duplicate location pages**: only create a new location page if there is a real, staffed physical office there.
- **Self‑serving review markup**: don’t add AggregateRating/Review schema for the business sitewide.
- **Keyword stuffing**: avoid unnatural titles like “Root Canal Santa Rosa CA Best Endodontist Emergency.”
- **Overstated medical claims**: avoid language that implies guaranteed outcomes from a single study (for example: “proven to prevent disease”).

If anything changes (hours, phone, address, services), update **site → JSON‑LD → sitemap → GBP → citations** in that order.

For study-driven content updates, follow:

- `ops/clinical-content-playbook.md`
