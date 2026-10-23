# Font hardening evidence

Late-font protocol: Playwright intercepts every `font` / `.woff2` request and holds it **1.5s**, then records layout-shift (no recent input). Three runs per cell; medians below. Local production builds of this branch (`:3200`) vs `main` @ `792609e` (`:3300`).

## Late-font CLS (must not regress vs main)

| Page | Viewport | This PR (median) | main (median) |
| --- | --- | ---: | ---: |
| `/` | 390 | 0.0013 | 0.0009 |
| `/` | 1280 | 0.0016 | 0.0028 |
| `/endodontic-procedures/root-canal-therapy` | 390 | 0.0010 | 0.0014 |
| `/endodontic-procedures/root-canal-therapy` | 1280 | 0.0024 | 0.0032 |

Root-canal @ 390 was the Eggbot regression (0.201 on the `system-ui` fallback vs 0.0014 on main). After dropping `system-ui` it is **0.0010**, no worse than main.

Home @ 1280 under this protocol is **0.0016** here and **0.0028** on main. Eggbot’s ~0.128 figure for home @ 1280 was reported on main as well (pre-existing); this run did not reproduce 0.128 when only fonts were delayed.

## Fallback stacks

- Playfair: `playfair, "playfair Fallback", Georgia, "Times New Roman", serif` with `adjustFontFallback: "Times New Roman"`
- Source Sans: `sourceSans, "sourceSans Fallback", Arial, sans-serif` with `adjustFontFallback: "Arial"` — **no `system-ui`**

## Review wording

Home uses `googleReviewSummary.totalReviews` (**166**). The 204 / 200+ bump stays on PR #10.
