# Google Reviews Deep Analysis — 2026-03-03

This note captures the March 3, 2026 review corpus sync and analysis for Wine Country Root Canal.

## Scope and Source

- Source snapshot used for this sync: user-provided export labeled **"WINE COUNTRY ROOT CANAL - ALL 164 GOOGLE REVIEWS"**.
- Snapshot-level rating summary in source: **4.9 stars / 164 total reviews**.
- Website testimonial dataset (`components/reviews/google-review-data.ts`) stores verified imported Google review rows and preserves source-authentic rating values.

## 2026-05-07 Public Refresh

Requested Google share URL: <https://share.google/zFrtG4MqCQgwouUiA>.

The managed Google Business Profile screenshot provided on May 7, 2026 shows:

- Rating: **4.9**
- Total Google reviews: **172**

Direct unauthenticated Google Maps access returned limited/blocked review views during this refresh. The accessible Birdeye Google-review mirror for Wine Country Endo still showed an older partial mirror:
<https://reviews.birdeye.com/wine-country-endo-155343402477419>.

Birdeye mirror aggregate:

- Rating: **4.9**
- Total Google reviews: **147**

Newest visible Google reviews from the Birdeye mirror already added to the top of the site dataset:

- **Chris Field** - "Excellent communication and care. I felt relaxed and grateful that the experience was pain free!"
- **Richard Miranda** - "Awesome care would highly recommend."
- **Shay Kosta** - "My first root canal..." review describing one-day scheduling, family-like care, doctor follow-up, and Cindy's first-call support.
- **John Russell** - "Dr Anderson's team started on time..." review describing clear communication and minimal discomfort.
- **Kristy Meza** - "Very pleased! Definitely would go back!"

Additional local review sources checked:

- `/Users/enzo/Downloads/wine_country_root_canal_google_reviews_partial.md` - confirms **172** total reviews in the Google Business Profile and includes Ren Ta as a current Google review.
- `/Users/enzo/Downloads/Wine_Country_Root_Canal_All_164_Reviews.txt` - older explicit review export; despite the 164 label, it contains 120 numbered entries, including three verified one-star Google reviews that were not previously imported into the site dataset.
- `/Users/enzo/Downloads/Dentist Website Finds New Google Reviews.mp4` - inspected as a possible source, but it was a different dentist website walkthrough and not a Wine Country Root Canal review corpus.

Verified non-five-star rows imported on May 7, 2026:

- **Christopher Reid** - 1-star Google review.
- **Norzin Phurtag** - 1-star Google review.
- **Tom Law** - 1-star Google review.

The site now shows the current Google aggregate count (**172**) and imports all review rows available from the verified local and public sources (**169 rows**). Three Google review rows remain unavailable from the accessible exports/scrapes reviewed in this pass; they should be added from a full authenticated Google Business Profile export/API response when available. No placeholder or fabricated review rows were added.

## Dataset State After 2026-05-07 Refresh

Generated from:

```bash
pnpm analyze:reviews
```

Results:

- `summary.totalReviews`: **172**
- `summary.importedReviewRows`: **169**
- Imported rows in site dataset: **169** (166 five-star rows plus 3 one-star rows)
- Text reviews: **127**
- Rating-only reviews: **42** (**24.9%**)
- Integrity checks:
  - Duplicate IDs: none
  - Missing IDs: none
  - Duplicate normalized names: none
  - Ratings in range: yes
  - Summary imported row count matches dataset: yes

## Theme Signals (Text Reviews)

Counts below represent text reviews mentioning the pattern at least once.

- Staff/team mentions: **72**
- Comfort/calm/gentle language: **30**
- Pain-free / minimal discomfort language: **31**
- Communication/explanation language: **28**
- Emergency/same-day access language: **14**
- Follow-up call language: **11**
- Cleanliness/sanitation language: **8**

Interpretation:

- The strongest trust drivers are **staff professionalism**, **comfort**, and **pain management**.
- Operational differentiators that appear repeatedly:
  - emergency fit-in capability
  - post-procedure follow-up calls
  - organized front office experience

## Lexical Highlights

Most frequent non-trivial tokens in text reviews include:

- `anderson` (117)
- `canal` (76)
- `tooth` (31)
- `care` (29)
- `kind` (23)
- `thank` (22)

This supports messaging that emphasizes calm, compassionate care with procedural confidence.

## Editorial/Data Quality Notes

- One diacritic display name is present and preserved: `Arminée Chahbazian`.
- Some reviewer display names are lowercase by source convention and intentionally preserved (for fidelity).
- Several review texts contain user-typed spelling/grammar issues (source-authentic). These are intentionally retained.

## Reputation Risk Notes

The verified imported corpus now includes the three 1-star Google reviews from the older source snapshot. Main complaint patterns:

1. Perceived dismissive communication tone.
2. Expectations mismatch on scope (endodontic treatment vs extraction expectations).
3. Cases where symptoms persisted and patient perceived inadequate resolution.

Recommendation:

- Keep compact homepage/about sections focused on the newest imported Google reviews, while the full testimonials page remains the broader imported corpus.
- Continue GBP response discipline for all reviews, especially negative ones, with HIPAA-safe language and offline resolution invites.
- Maintain internal tracking of 1–2 star themes for service-improvement feedback loops.

## Maintenance Workflow

1. Sync/add reviews in `components/reviews/google-review-data.ts`.
2. Run `pnpm analyze:reviews`.
3. Verify homepage/about/testimonials copy remains accurate with dynamic counts.
4. Build check: `pnpm build`.
5. If aggregate numbers changed, update `googleReviewSummary`.
