# Wine Country Root Canal website

## Overview

Production Next.js website for Wine Country Root Canal (Santa Rosa, CA), focused on endodontic services, patient conversion, SEO, and local practice credibility.

This repository is currently used as the source of truth for the public site and is typically synced with v0-generated iterations.

## Deployment

### Production

https://www.winecountryrootcanal.com

- Vercel Project: https://vercel.com/enzo-design-prisms-projects/v0-wine-country-website-dz
- v0 Source: https://v0.dev/chat/projects/K4jYwtmcTC7
- Linked local project source of truth: `.vercel/project.json`

## Core Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI (Radix primitives)
- React 19
- Vercel deployment

## Local Development

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Webpack fallback dev server: `pnpm dev:webpack`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Production server: `pnpm start`
- SEO check: `pnpm verify:seo`

## Architecture Snapshot

- `app/` contains App Router routes and metadata
  - `app/page.tsx`: homepage
  - `app/about/page.tsx`: about page and patient credibility content
  - `app/testimonials/page.tsx`: full patient testimonial page (all imported five-star Google reviews)
  - `app/contact/page.tsx`: contact/location information
- `app/HomePageClient.tsx`: homepage client sections
- `app/cbct-scanner-santa-rosa/page.tsx`: primary local SEO landing page for CBCT and 3D imaging intent
- `components/` contains reusable UI and shared sections
- `lib/analytics.ts`: shared Vercel custom event taxonomy + attribute helper
- `components/vercel-analytics.tsx`: Vercel Analytics client wrapper and privacy-safe `beforeSend` handling
- `components/vercel-custom-event-tracker.tsx`: global custom event dispatcher for instrumented links/buttons
- `components/reviews/` contains testimonial content and rendering logic:
  - `google-review-data.ts`
  - `google-review-highlights.tsx`
- `components/navbar.tsx`: top nav with new `About`-first ordering and `Testimonials` entry
- `components/footer.tsx`: footer with `Patient Testimonials` link
- `next.config.mjs`: image remote pattern config (`res.cloudinary.com`) + legacy redirects

## Major Content Features

### CBCT / 3D Imaging SEO Expansion

The site now includes a dedicated CBCT landing page intended to rank for local imaging-intent searches while keeping `/technology` positioned as a broader support page:

- `/cbct-scanner-santa-rosa`: primary local SEO landing page for CBCT, cone beam CT, and 3D dental imaging queries
- `/technology`: general endodontic technology overview with supporting links into the dedicated CBCT page
- `/dentists`: referral-facing content that now supports CBCT-informed case planning and referral trust

The CBCT page is also supported internally from:

- homepage
- contact page
- dentists page
- root canal therapy
- retreatment
- apicoectomy
- dental emergencies

Clinical wording for the CBCT content is intentionally conservative and should continue following:

```text
ops/clinical-content-playbook.md
```

### Testimonials / Reviews

The site now includes a dedicated testimonials page and review highlights across key pages:

- Home page hero-adjacent review section (compact)
- About page testimonial section (compact)
- `/testimonials` full list showing all imported five-star reviews

Review data is centralized in:

```text
components/reviews/google-review-data.ts
```

Current synced state (as of March 3, 2026):

- `googleReviewSummary.totalReviews`: `164`
- `googleReviewSummary.fiveStarCount`: `161`
- `topFiveStarReviews` dataset rows: `161`

Review analysis command:

```bash
pnpm analyze:reviews
```

Deep-dive analysis note:

```text
ops/google-reviews-deep-analysis-2026-03-03.md
```

If a new review is collected:

1. Add/adjust an entry in `topFiveStarReviews`
2. Keep name, rating, source, and quote fields populated consistently
3. Update `googleReviewSummary` when overall aggregate metrics change
4. Re-run `pnpm analyze:reviews` and confirm no integrity regressions

### Navigation and Footer

- Desktop top nav order starts with `About` and includes `Testimonials`
- Mobile menu includes `Patient Reviews` link to `/testimonials`
- Footer includes `Patient Testimonials` under "Our Practice"

## SEO and Trust Signals

- The about and testimonial sections are intended to support trust, conversion, and local relevance
- Local SEO checks are documented in:
  - `ops/local-seo-checklist.md`
- Vercel custom analytics implementation and governance are documented in:
  - `ops/vercel-analytics-custom-events.md`
- Clinical/research content governance is documented in:
  - `ops/clinical-content-playbook.md`
- Review markup is intentionally minimal and follows current local SEO policy in the checklist
- Use canonical URLs and redirect audits after route/content changes

## Analytics

The site uses Vercel Analytics for lightweight event tracking and CTA comparison.

Current custom event taxonomy:

- `book_appointment_click`
- `referral_form_click`
- `phone_click`
- `email_click`
- `cbct_content_click`

Events are intentionally low-cardinality and use a flat `location` property for placement context.

Examples:

- `homepage_hero`
- `navbar_desktop`
- `technology_primary_cta`
- `footer_phone`

Implementation details and guardrails live in:

```text
ops/vercel-analytics-custom-events.md
```

Important implementation note:

- This repo currently uses `@vercel/analytics/react` inside a client wrapper component rather than the Next-specific wrapper because the current package/App Router combination did not behave cleanly with a custom `beforeSend` hook.

## Clinical Content Updates

### Root Canal & Overall Health Section (March 2026)

- Canonical page updated:
  - `/endodontic-procedures/root-canal-therapy`
- Content intent:
  - Conservative clinical wording focused on "associated with" language.
  - Washington Post link presented as the primary reader-facing headline.
  - AAE + journal links provided as authoritative supporting sources.
- Source set for this update:
  - Journal of Translational Medicine study (published November 18, 2025): `https://doi.org/10.1186/s12967-025-06526-8`
  - Washington Post article (published November 20, 2025): `https://www.washingtonpost.com/wellness/2025/11/20/root-canal-heart-disease-diabetes/`
  - AAE newsroom article: `https://newsroom.aae.org/press-releases/new-study-suggests-root-canal-treatment-linked-to-lower-risk-of-heart-disease-diabetes/`
  - AAE patient resource: `https://www.aae.org/patients/root-canal-treatment/saving-natural-tooth/`

## Deployment Notes

When publishing content or route updates:

1. Update source in this repo
2. Confirm local `pnpm build` passes
3. (Recommended) Validate key page copy/links locally with `pnpm start`
4. Open and merge a PR into `main`
5. Vercel publishes automatically from `main`
6. If needed, run a manual production promotion with `vercel --prod`

## SEO Verification

- **FAQPage / LocalBusiness JSON‑LD**: After deploying, run Google’s Rich Results Test (https://search.google.com/test/rich-results) on canonical URLs and verify visible content matches structured metadata.
- **Redirects and canonical consistency (local)**: run `pnpm verify:seo`.
- **Image checks**: confirm externally hosted images use allowed domains in `next.config.mjs`.
