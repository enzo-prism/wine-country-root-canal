# Wine Country Root Canal website

## Overview

Production Next.js website for Wine Country Root Canal (Santa Rosa, CA), focused on endodontic services, patient conversion, SEO, and local practice credibility.

This repository is currently used as the source of truth for the public site and is typically synced with v0-generated iterations.

## Deployment

### Production

https://www.winecountryrootcanal.com

- Vercel Project: https://vercel.com/enzo-design-prisms-projects/v0-wine-country-website-dz
- v0 Source: https://v0.dev/chat/projects/K4jYwtmcTC7

## Core Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI (Radix primitives)
- React 19
- Vercel deployment

## Local Development

- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Production server: `pnpm start`
- SEO check: `pnpm verify:seo`

## Architecture Snapshot

- `app/` contains App Router routes and metadata
  - `app/page.tsx`: homepage
  - `app/about/page.tsx`: about page and patient credibility content
  - `app/testimonials/page.tsx`: full patient testimonial page (all Top 25 five-star Google reviews)
  - `app/contact/page.tsx`: contact/location information
  - `app/HomePageClient.tsx`: homepage client sections
- `components/` contains reusable UI and shared sections
- `components/reviews/` contains testimonial content and rendering logic:
  - `google-review-data.ts`
  - `google-review-highlights.tsx`
- `components/navbar.tsx`: top nav with new `About`-first ordering and `Testimonials` entry
- `components/footer.tsx`: footer with `Patient Testimonials` link
- `next.config.mjs`: image remote pattern config (`res.cloudinary.com`) + legacy redirects

## Major Content Features

### Testimonials / Reviews

The site now includes a dedicated testimonials page and review highlights across key pages:

- Home page hero-adjacent review section (compact)
- About page testimonial section (compact)
- `/testimonials` full list showing all 25 reviews

Review data is centralized in:

```text
components/reviews/google-review-data.ts
```

If a new review is collected:

1. Add/adjust an entry in `topFiveStarReviews`
2. Keep name, rating, source, and quote fields populated consistently
3. Update `googleReviewSummary` when overall aggregate metrics change

### Navigation and Footer

- Desktop top nav order starts with `About` and includes `Testimonials`
- Mobile menu includes `Patient Reviews` link to `/testimonials`
- Footer includes `Patient Testimonials` under "Our Practice"

## SEO and Trust Signals

- The about and testimonial sections are intended to support trust, conversion, and local relevance
- Local SEO checks are documented in:
  - `ops/local-seo-checklist.md`
- Review markup is intentionally minimal and follows current local SEO policy in the checklist
- Use canonical URLs and redirect audits after route/content changes

## Deployment Notes

When publishing content or route updates:

1. Update source in this repo
2. Confirm local build/lint passes
3. Push to `main`
4. Vercel publishes automatically from `main`

## SEO Verification

- **FAQPage / LocalBusiness JSON‑LD**: After deploying, run Google’s Rich Results Test (https://search.google.com/test/rich-results) on canonical URLs and verify visible content matches structured metadata.
- **Redirects and canonical consistency (local)**: run `pnpm verify:seo`.
- **Image checks**: confirm externally hosted images use allowed domains in `next.config.mjs`.
