# SEO and AEO follow-up — November 20, 2026

Builds on `ops/seo-aeo-release-2026-11-06.md`. That release handled the visible service pages, cost and retreatment copy, reviews and measurement. This round fixes the machine-readable layer that search engines and AI answer engines read, plus a few titles and headings the earlier pass left behind.

## What the audit found (live site, November 20)

- **llms.txt was stale.** It listed 15 of 25 pages (none of the seven patient guides, the CBCT page, Your Visit or the resources hub), gave no hours, address or availability, and still advertised "success rates" that the November 6 release removed from the site.
- **Page structured data was fragmented.** Eleven pages had no WebPage node at all. The rest had one of two partial shapes: reviewed guides had only `reviewedBy`/`lastReviewed` (no name, description or publisher), and editorial pages declared `about: Dr. Anderson`, which tells search engines those pages are *about the doctor* rather than about root canals, cost or retreatment.
- **No WebSite entity**, which Google uses for the site name shown in results. The practice node used `medicalSpecialty: "Endodontic"`, which is not a schema.org value, and did not list its services or link Dr. Anderson.
- **Root canal therapy's MedicalProcedure node** still said "highly successful". Retreatment and apicoectomy had no procedure entity.
- **Nine sitemap URLs had no `lastmod`.**
- **Titles and descriptions:** the root canal therapy description promised "success rates" that are no longer on the page; the cost description promised "financing"; the emergency title (69 characters) and description (178) were truncated in results; `/dentists` used a slogan as its H1 ("Elevating Endodontic Care, Together.") and `/technology` had no location in its H1.

## What changed

- `lib/site-pages.ts` is now the one registry of indexable pages. The sitemap, `/llms.txt` and per-page JSON-LD all come from it, so a new page cannot be missing from one and present in another.
- `lib/schema.ts` builds one linked graph: `WebSite` → practice (`Dentist`/`MedicalBusiness`) → Dr. Anderson (`employee`) → procedures (`availableService`). Every indexable page renders exactly one `WebPage`-family node (`MedicalWebPage`, `CollectionPage`, `AboutPage`, `ContactPage`, `WebPage`) whose `about` points at the procedure or condition it explains. Each procedure/condition is described in full on its own page and referenced by `@id` elsewhere (for example, the cost, safety, aftercare and extraction guides all point at the root canal therapy procedure).
- `reviewedBy`/`lastReviewed` still appear only for pages in `lib/medical-review.ts`. No new clinical review is claimed. Outcome wording ("highly successful", lifetime promises) was removed from structured data.
- Practice `medicalSpecialty` uses the valid `Dentistry` value; `isAcceptingNewPatients`, `knowsAbout`, `faxNumber` and `availableService` were added. The Google Maps `sameAs`/`hasMap` URL is now the stable CID link (`?cid=12442561191126238237`, checked in a browser to open the practice listing) instead of a URL with session tracking parameters.
- Dr. Anderson's Person node gained name parts, the DDS suffix already shown on the site, and the membership URLs already linked on `/about`.
- `/llms.txt` is generated (`app/llms.txt/route.ts`): practice facts (specialty and training, address, phone/fax/email, hours, "most patients can be seen within 1 to 3 days", after-hours instructions, how estimates work, referral process, areas served, Google rating with its check date) and every page with a plain summary and its real edit date. It only restates facts already published on the site.
- Every sitemap URL now has a `lastmod`. Missing dates were back-filled from each page's git history of visible changes. `/technology` and `/dentists` are dated today because their H1s changed.
- Copy: therapy, cost, emergency and homepage descriptions rewritten to match the pages and fit within about 155 characters; emergency title shortened to "Emergency Root Canal & Toothache Care | Santa Rosa, CA"; aftercare title changed to "Root Canal Recovery: What's Normal and When to Call" (1,206 impressions and 0 clicks in Aug–Oct, so the title was the lever to test); `/resources` title names the content ("Root Canal Patient Guides"); `/dentists` H1 is now "Endodontic Referrals in Santa Rosa, CA" with the slogan kept as an eyebrow; `/technology` H1 is "Endodontic Technology in Santa Rosa".

## Guard rails added

- `lib/site-pages.test.ts`: every registry page has a real, non-future edit date; no stale dates; summaries are a usable length.
- `scripts/verify-seo.mjs`: every sitemap URL has a `lastmod`, is listed in `/llms.txt`, has exactly one `#webpage` JSON-LD node and the practice node.
- `tests/e2e/seo-aeo.spec.ts`: the graph links (WebSite → practice → doctor → procedures), the editorial/reviewed split, no outcome percentages in JSON-LD, and llms.txt coverage.

## Still needs the practice (do not invent)

- **"Do I need a referral to see an endodontist?"** is one of the most common endodontist questions and the site never answers it. The online request form suggests self-referral works, but the practice must confirm the answer before it is published.
- The items in the November 6 handoff remain open: office fees or ranges, insurance network status, financing providers, a real clinician review of the revised therapy, cost, retreatment and safety pages, human-corrected video transcripts, and replacing the Google Business Profile services link (`/endodontics/`) with `/endodontic-procedures`.

## Measuring this

Compare complete windows after Google recrawls (allow two to four weeks): CTR and clicks for the therapy, cost, aftercare and emergency pages; the "root canal santa rosa", "root canal santa rosa ca" and "santa rosa endodontist" queries; Search Console's site-name display; Google AI impressions by page; and ChatGPT/Perplexity referral sessions in production-only GA4. These changes do not guarantee any ranking or AI-citation lift. FAQ rich results were deprecated in May 2026; FAQ markup stays only because it mirrors visible answers.
