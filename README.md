# Wine Country Root Canal website

## Overview

Production Next.js website for Wine Country Root Canal (Santa Rosa, CA), focused on endodontic services, patient conversion, SEO, and local practice credibility.

This repository is currently used as the source of truth for the public site and is typically synced with v0-generated iterations.

## Deployment

### Production

https://www.winecountryrootcanal.com

- Production Vercel Project: https://vercel.com/enzo-design-prisms-projects/v0-wine-country-website-dz
- v0 Source: https://v0.dev/chat/projects/K4jYwtmcTC7
- Local Vercel link file: `.vercel/project.json` (gitignored; recreate with `vercel link --scope enzo-design-prisms-projects --project v0-wine-country-website-dz`)

## Core Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI (Radix primitives)
- React 19
- Vercel deployment

## Local Development

- Runtime: Node.js 22
- Package manager: pnpm 10.34.5
- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Webpack fallback dev server: `pnpm dev:webpack`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Type check: `pnpm exec tsc --noEmit`
- Production server: `pnpm start`
- SEO check: `pnpm verify:seo`
- Install the browser once: `pnpm install:a11y-browser`
- Accessibility tests: `pnpm test:a11y`
- Critical E2E tests: `pnpm test:e2e`
- Complete browser suite: `pnpm test:browser`

## Architecture Snapshot

- `app/` contains App Router routes and metadata
  - `app/page.tsx`: homepage
  - `app/about/page.tsx`: about page and patient credibility content
  - `app/testimonials/page.tsx`: full patient testimonial page (all imported Google reviews)
  - `app/contact/page.tsx`: contact/location information
  - `app/accessibility/page.tsx`: accessibility statement, known limitations, and accommodation contacts
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
- `tests/accessibility/`: axe, keyboard, focus, reflow, reduced-motion, and navigation regression tests
- `tests/e2e/`: public-route, conversion-link, contact-alternative, redirect, and browser-error tests
- `playwright.config.ts`: production-build browser-test configuration
- `eslint.config.mjs`: Next.js and JSX accessibility lint rules
- `.github/workflows/accessibility.yml`: pull-request and `main` browser-quality workflow

## Accessibility

WCAG 2.2 Level AA is the technical goal for the website. Automation is a regression guard, not proof of complete WCAG or ADA conformance.

The browser suite builds and starts the production application locally unless `A11Y_BASE_URL` is provided:

```bash
# One-time local browser setup
pnpm install:a11y-browser

# Static and browser checks
pnpm lint
pnpm exec tsc --noEmit
pnpm test:browser

# Run the same browser checks against a preview or production URL
A11Y_BASE_URL=https://example.vercel.app pnpm test:browser
```

Coverage includes all 24 shipped routes, automated WCAG A/AA scans, real skip-link activation and focus visibility, 320px reflow, reduced motion, desktop/mobile navigation, vendor-link contracts, contact alternatives, and all legacy redirects.

Ongoing rules:

- Add every new shipped route to both browser route lists under `tests/`.
- Add indexable routes to `app/sitemap.tsx`.
- Keep `app/accessibility/page.tsx` review date, known limitations, and accommodation contacts current.
- Preserve phone/email alternatives when a task depends on Typeform, Jotform, Henry Schein, Vimeo, maps, or another third party.
- Human keyboard, screen-reader, zoom, caption/transcript, and vendor-flow reviews remain required for material changes.

See `ops/accessibility-runbook.md` for the release checklist and known external limitations.

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

### Patient Resources / Education Hub

A top-of-funnel education cluster under `/resources` captures informational search demand and feeds AI answer engines. All pages follow `ops/clinical-content-playbook.md` (hedged language, visible caveats, AAE sources) and carry `FAQPage` + `BreadcrumbList` JSON-LD and a medical-review byline.

- `/resources`: hub linking every guide (also linked from navbar "For Patients" and the footer)
- `/resources/what-is-an-endodontist`
- `/resources/root-canal-cost`: cost, insurance, and financing (general ranges only — no practice-specific prices)
- `/resources/root-canal-vs-extraction`: root canal vs. extraction vs. implant
- `/resources/cracked-tooth`: cracked tooth & cracked tooth syndrome
- `/resources/after-your-root-canal`: recovery & aftercare
- `/resources/dental-injuries`: knocked-out teeth & dental trauma (emergency-flavored)

### Shared SEO helpers and local signals

- `lib/seo.ts` → `buildMetadata({ title, description, path, ogTitle?, ogDescription?, image?, noindex? })`: single source of truth for canonical + complete OpenGraph (always includes an image) + Twitter. All page metadata routes through it to avoid Next.js's shallow-merge dropping `og:image`/per-page `og:url`. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to emit the GSC verification tag.
- `components/reviewed-by.tsx` (`MedicalReviewByline`): E-E-A-T byline on clinical pages.
- `components/breadcrumbs.tsx` (`Breadcrumbs`): visible trail + `BreadcrumbList` JSON-LD; used on nested procedure and resources pages.
- `components/areas-we-serve.tsx` (`AreasWeServe`): one honest "areas we serve" section naming real Sonoma County communities (home + contact). Not doorway pages — see `ops/local-seo-checklist.md`. The `LocalBusiness` JSON-LD in `app/layout.tsx` also carries `geo`, `areaServed`, `medicalSpecialty`, and `priceRange`.

### Testimonials / Reviews

The site now includes a dedicated testimonials page and review highlights across key pages:

- Home page hero-adjacent review section (compact)
- About page testimonial section (compact)
- `/testimonials` full list showing all imported Google reviews

Review data is centralized in:

```text
components/reviews/google-review-data.ts
```

Current synced state (as of July 25, 2026):

- `googleReviewSummary.totalReviews`: `166`
- `googleReviewSummary.importedReviewRows`: `163`
- `googleReviews` dataset rows: `163`
- Current verified imported distribution: `160` five-star rows and `3` one-star rows

These numbers are lower than the earlier "172-review corpus" because `6e6846d` removed
6 misattributed reviews (other doctors / LA metro) and renumbered IDs. `pnpm analyze:reviews`
is the authority — if it and this section disagree, the script is right and this section is stale.

Review analysis command:

```bash
pnpm analyze:reviews
```

Deep-dive analysis note:

```text
ops/google-reviews-deep-analysis-2026-03-03.md
```

If a new review is collected:

1. Add/adjust an entry in `googleReviews`
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
- `google_review_click`

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
2. Run `pnpm install --frozen-lockfile`
3. Run `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm analyze:reviews`, and `pnpm build`
4. Run `pnpm verify:seo` against the production build
5. Run `pnpm test:browser`
6. Review the diff and update project/operational documentation
7. Push or merge the verified commit to `main`
8. Wait for the GitHub workflow and both Vercel deployments
9. Test the public custom domain after deployment

## Known Constraints and Gotchas

These are live traps that have already caused shipped bugs. Read before editing.

- **Production builds no longer suppress TypeScript failures.** Lint remains an explicit
  release gate. Before pushing to `main`, run `pnpm lint`, `pnpm exec tsc --noEmit`,
  `pnpm build`, `pnpm verify:seo`, and `pnpm test:browser`.
- **Only four brand color tokens exist**, defined in `tailwind.config.ts`: `brand-cream`,
  `brand-merlot`, `brand-rose-beige`, `brand-dark-text`. Anything else (`brand-sage`, etc.)
  silently compiles to nothing and renders an unstyled element. Add the token to the config
  before using a new `brand-*` class.
- **Do not wrap `<Navbar />` in a positioned container.** The header is `position: sticky`,
  so a wrapper only as tall as the header itself gives it zero room to travel and the nav
  scrolls away. Render it as a direct child of the page's full-height flex column.
- **Internal links must use `next/link`.** Raw `<a href="/...">` triggers a full page reload
  and drops client-side routing.
- **There is no brand logo asset in `/public`.** The `Organization` / `LocalBusiness`
  structured data in `app/layout.tsx` therefore carries `image` but no `logo` — the previous
  `logo` value pointed at the patient-forms QR code. Add a real logo file and restore `logo`.
- **`app/privacy/page.tsx` still contains placeholder legal language**, while the site loads
  GA4, Hotjar, and Vercel Analytics. It is not approved legal copy. The practice and
  qualified counsel must review and replace it; do not describe it as finalized.

## SEO Verification

- **FAQPage / LocalBusiness JSON‑LD**: After deploying, run Google’s Rich Results Test (https://search.google.com/test/rich-results) on canonical URLs and verify visible content matches structured metadata.
- **Redirects and canonical consistency (local)**: run `pnpm verify:seo`.
- **Image checks**: confirm externally hosted images use allowed domains in `next.config.mjs`.
