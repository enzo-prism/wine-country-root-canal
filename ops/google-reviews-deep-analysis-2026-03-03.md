# Google Reviews Deep Analysis — 2026-03-03

This note captures the March 3, 2026 review corpus sync and analysis for Wine Country Root Canal.

## Scope and Source

- Source snapshot used for this sync: user-provided export labeled **"WINE COUNTRY ROOT CANAL - ALL 164 GOOGLE REVIEWS"**.
- Snapshot-level rating summary in source: **4.9 stars / 164 total reviews**.
- Website testimonial dataset (`components/reviews/google-review-data.ts`) is intentionally five-star-only for highlight rendering.

## Dataset State After Sync

Generated from:

```bash
pnpm analyze:reviews
```

Results:

- `summary.totalReviews`: **164**
- `summary.fiveStarCount`: **161**
- Imported rows in site dataset: **161**
- Text reviews: **119**
- Rating-only reviews: **42** (**26.1%**)
- Integrity checks:
  - Duplicate IDs: none
  - Missing IDs: none
  - Duplicate normalized names: none
  - Non-5-star rows in testimonial dataset: none

## Theme Signals (Text Reviews)

Counts below represent text reviews mentioning the pattern at least once.

- Staff/team mentions: **68**
- Comfort/calm/gentle language: **30**
- Pain-free / minimal discomfort language: **29**
- Communication/explanation language: **26**
- Emergency/same-day access language: **14**
- Follow-up call language: **9**
- Cleanliness/sanitation language: **8**

Interpretation:

- The strongest trust drivers are **staff professionalism**, **comfort**, and **pain management**.
- Operational differentiators that appear repeatedly:
  - emergency fit-in capability
  - post-procedure follow-up calls
  - organized front office experience

## Lexical Highlights

Most frequent non-trivial tokens in text reviews include:

- `care` (26)
- `tooth` (25)
- `kind` (22)
- `thank` (21)
- `comfortable` (16)

This supports messaging that emphasizes calm, compassionate care with procedural confidence.

## Editorial/Data Quality Notes

- One diacritic display name is present and preserved: `Arminée Chahbazian`.
- Some reviewer display names are lowercase by source convention and intentionally preserved (for fidelity).
- Several review texts contain user-typed spelling/grammar issues (source-authentic). These are intentionally retained.

## Reputation Risk Notes (From Full 164 Snapshot)

The full source snapshot includes three 1-star reviews (not stored in the five-star testimonial dataset). Main complaint patterns:

1. Perceived dismissive communication tone.
2. Expectations mismatch on scope (endodontic treatment vs extraction expectations).
3. Cases where symptoms persisted and patient perceived inadequate resolution.

Recommendation:

- Keep five-star highlight rendering for conversion pages.
- Continue GBP response discipline for all reviews, especially negative ones, with HIPAA-safe language and offline resolution invites.
- Maintain internal tracking of 1–2 star themes for service-improvement feedback loops.

## Maintenance Workflow

1. Sync/add reviews in `components/reviews/google-review-data.ts`.
2. Run `pnpm analyze:reviews`.
3. Verify homepage/about/testimonials copy remains accurate with dynamic counts.
4. Build check: `pnpm build`.
5. If aggregate numbers changed, update `googleReviewSummary`.
