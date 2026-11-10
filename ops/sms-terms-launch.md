# SMS terms (10DLC / A2P) — staged launch checklist

Status: **staged, not live.** Wording awaits Dr. Anderson's approval. Needed before WCRC can
register its ReviewFlow review-request texting program (10DLC brand + campaign).

## What is staged

One build-time flag, `NEXT_PUBLIC_SMS_TERMS_ENABLED` (only `"true"` turns it on; default off), controls:

| Surface | Flag off (today) | Flag on |
| --- | --- | --- |
| `/sms-terms` (`app/sms-terms/page.tsx`) | 404, noindex, no canonical | Rendered, indexable |
| `/privacy` "Text Messages" section (`#text-messages`) | Not rendered | Rendered after "Will Your Information Be Shared With Anyone?" |
| Footer "SMS Terms" link | Hidden | Shown |
| `sitemap.xml` | `/sms-terms` omitted | Listed |

All wording lives in `lib/sms-program.ts`.

## Tests

- `lib/sms-program.test.ts` (`pnpm test:unit`): flag parsing and required disclosures.
- `tests/e2e/sms-terms-gate.spec.ts` (default "site" project, flag forced off): 404 + noindex, not in sitemap, no privacy section, no footer link. Against `A11Y_BASE_URL` it proves the deployed site is still off.
- `tests/sms-on/sms-terms.spec.ts` ("sms-on" project, second build in `.next-sms` on port 3101): content, privacy section, sitemap, footer link, axe, no overflow at 390/1440.
- Screenshots: `pnpm evidence:sms-terms` writes `docs/evidence/sms-terms/*.png`.

## Before turning the flag on (needs Dr. Anderson)

1. Approve all copy in `lib/sms-program.ts` (program name, sender, message purpose, frequency, STOP/HELP, privacy statements). Confirm it's OK to name ReviewFlow publicly.
2. Confirm how consent is collected and set `SMS_CONSENT_METHOD` (the page shows a dashed "Pending confirmation" box while it is `null`).
3. Confirm ReviewFlow's actual STOP/HELP behaviour matches the page (the page doesn't promise a confirmation text).
4. Set `SMS_TERMS_EFFECTIVE_DATE`. Update the `/privacy` "Last updated" date and add `/privacy` + `/sms-terms` to `lib/content-updates.ts`.
5. Update the pending-state assertions in `lib/sms-program.test.ts`.

## Launch

1. Set `NEXT_PUBLIC_SMS_TERMS_ENABLED=true` in Vercel (Production; Preview first if a review link is wanted) and redeploy. A flag change needs a new build.
2. Retire `tests/e2e/sms-terms-gate.spec.ts`. Add `/sms-terms` to both route lists under `tests/` and move its checks into the default project.
3. Update the sitemap count in `scripts/verify-seo.mjs` (25 → 26 when the flag is on; it reads the same env var), README route map and `public/llms.txt`.
4. Use `https://www.winecountryrootcanal.com/sms-terms` and `/privacy#text-messages` in the 10DLC campaign form.
