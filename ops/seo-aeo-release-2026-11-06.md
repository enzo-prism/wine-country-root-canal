# SEO and AEO release — November 6, 2026

## Shipped behavior

The audit prioritized treatment pages with local search visibility but few clicks, mobile access to care, the cost and retreatment guides, accurate specialist identity, and interpretable lead measurement. The user authorized implementation and release to main/production.

- Integrated PR #10's existing shared procedure-page template, review cards, specialist explanation, responsive navigation, hero Call/Request actions, and mobile sticky actions.
- Added clear Santa Rosa H1s to therapy, retreatment, apicoectomy, symptoms, emergency care, the treatments hub, and the cost guide. Kept canonical URLs stable.
- Explained that online appointment requests require office confirmation; calling is the fastest route when in pain. Retained real Monday–Thursday hours and existing emergency guidance.
- Reworked retreatment around a previously treated painful tooth, comfort questions, evaluation, imaging when useful, and links to surgery, extraction comparisons, and costs.
- Replaced unsupported national price ranges with an actionable estimate checklist, tooth-complexity factors, separate restoration costs, insurance/network questions, and confirmed-with-office payment arrangements.
- Removed unsupported numerical success claims. Editorial notes link the provider biography without inventing a new clinical review. Removed old clinical review attribution from materially revised cost/retreatment content.
- Aligned Dr. Anderson's Person schema with the visible biography: dentistry since 1997, solely endodontics since 2005. Replaced general-dentistry boilerplate with endodontic scope and coordination with the general dentist.
- Verified the public Google listing at 4.9/206 reviews on November 6 and synchronized badges; retained the authentic 163-row imported dataset.
- Exposed both doctor videos' existing automatic English captions as readable HTML and downloadable VTT, and enabled the existing caption track by default. Source files are preserved, explicitly unverified, and contain transcription errors.
- Added truthful substantive edit dates in `lib/content-updates.ts` for sitemap freshness; no build-time date inflation.
- Added dedicated `click_to_call` and `appointment_request_submit` events while retaining legacy combined `generate_lead`. Kept canonical-host gating, four-second submit dedupe, and no-PII rules.
- Extended SEO verification to every sitemap page: 200, matching canonical, exactly one H1, indexability, unique canonical hosts, plus a real 404 for an unknown URL.

## Route and component usage

`ServicePageLayout` serves all four `/endodontic-procedures/*` leaves. `PatientEducationNote` serves therapy, retreatment, cost and safety without new medical-review claims. `MedicalReviewByline` remains only on entries in `lib/medical-review.ts`. The existing aftercare page already includes recovery expectations, warning signs, a direct Call action, restoration guidance and relevant treatment links; it was retained. No thin nearby-city pages were added.

## Validation

Node 22 and pnpm 10.34.5; frozen-lockfile installation, lint, TypeScript, eight unit tests, review-data integrity, production build, SEO consolidation checks, full browser suite, and manual 390px popup loading. Browser coverage includes 26 public routes, axe checks, 320px reflow, keyboard navigation, responsive breakpoints, redirects, new content/caption contracts, analytics isolation, and sticky-action races/deep links under CPU throttling. The sticky visibility setup now uses an instant scroll and confirms the hero is actually outside the viewport before checking the bar. Do not equate automated checks with complete accessibility certification.

Exact main commit, CI/deployment evidence, public-domain results and Search Console outcomes are recorded in the existing client Scope & Strategy page in Notion after release. This document does not claim that a deployment or Google indexing succeeded before those observations.

The shared `tests/fixtures.ts` blocks GA4 and Vercel Analytics network endpoints for every browser test, including tests that emulate the canonical hostname. This keeps automated public-domain verification and mocked leads out of real reporting.

CI pins supported Ubuntu 24.04 after the floating runner spent several minutes downloading OS font packages. The analytics host test validates both local and canonical targets; route fallback preserves shared network isolation.

## Reporting and remaining inputs

- Historical audit window: August 1–October 31, 2026 versus May 1–July 31 (92 days each). Scope & Strategy contains the full source-linked analysis and aggregation limits.
- Production-only organic reporting is the clean baseline. Dedicated events are separate action counts; do not sum them with legacy `generate_lead` or label requests/clicks as booked patients. GA4 Admin key-event settings were not changed.
- Google AI inclusion was already Include. AI impressions overlap ordinary Search; never add them as extra reach. Existing robots/llms/entity/FAQ foundations were retained. There is no promised SEO/AEO lift or special AI markup requirement.
- Symptoms was unknown to Google on November 6. Extraction comparison was crawled September 13 successfully but currently not indexed; sitemap and resources hub were recognized. Both need a live eligibility check and a post-release indexing request, then outcome monitoring. Redirects and the noindex thank-you exclusion are expected, not blanket indexing errors.
- Practice-approved office fees, network participation, financing providers, new clinician review, verified video transcripts and current professional-role corroboration remain source-dependent. Do not invent them. The Google Business services URL can be changed from legacy `/endodontics/` to the canonical hub when its editor is available; the redirect works.
- The Typeform first-question heading displays `...`; resolving it needs authenticated editor access. No real calls, patient submissions, review replies or client messages were made for testing.
- Core Web Vitals had insufficient field data; the audit's PageSpeed API calls hit quota errors. No new speed score or field-performance pass is claimed.

## Primary content references

- [AAE cost guide](https://www.aae.org/patients/root-canal-treatment/root-canal-cost/)
- [AAE root canal explanation](https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/root-canal-explained/)
- [AAE retreatment guide](https://www.aae.org/patients/root-canal-treatment/endodontic-treatment-options/endodontic-retreatment/)
- Vimeo automatic English tracks for videos `1095465278` and `1095465301`, retrieved November 6, 2026. Local VTT files are source copies, not new clinician-approved transcripts.
