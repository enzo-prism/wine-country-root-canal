# Accessibility and Browser-Test Runbook

## Goal

Wine Country Root Canal uses WCAG 2.2 Level AA as the website’s technical accessibility goal. Automated checks reduce regression risk; they do not certify ADA compliance or replace human testing.

## Local release checks

Use Node.js 22 and pnpm 10.34.5.

```bash
pnpm install --frozen-lockfile
pnpm install:a11y-browser
pnpm lint
pnpm exec tsc --noEmit
pnpm analyze:reviews
pnpm build
pnpm test:browser
```

Start the production build and run the SEO checks separately:

```bash
pnpm start
pnpm verify:seo
```

The Playwright configuration builds and starts the production application automatically. To test a deployed URL instead:

```bash
A11Y_BASE_URL=https://www.winecountryrootcanal.com pnpm test:browser
```

## Automated coverage

- Every shipped route, including the noindex `/thank-you` page
- axe checks using WCAG A/AA tags
- Skip-link activation, target focus, and visible focus indication
- 320px reflow and reduced-motion behavior
- Expanded desktop and mobile navigation
- Booking, patient-form, and referral destination contracts
- Phone and email alternatives
- All legacy redirects
- Uncaught browser errors on key conversion routes

When adding a route, update:

1. `tests/accessibility/public-pages.spec.ts`
2. `tests/e2e/public-site.spec.ts`
3. `app/sitemap.tsx` when the route should be indexed

## Manual review

For material design, navigation, form, or media changes, also review:

- Keyboard-only operation and focus order
- VoiceOver or another screen reader
- Browser zoom and text enlargement
- Mobile touch targets and orientation
- Color contrast in final imagery and states
- Vimeo captions and human-reviewed transcripts
- Typeform, Jotform, Henry Schein, and map flows

## Known external limitations

- The educational Vimeo videos do not currently expose verified captions or published word-for-word transcripts. Related written guides and phone/email accommodation requests are provided.
- The public Typeform booking form’s first question heading displays `...`. Correcting it requires authenticated access to the Typeform editor.
- Third-party vendors can change independently of this repository. Keep the automated destination checks and manually review their accessible names, errors, focus behavior, time limits, and reflow.

## Production verification

After `main` is pushed:

1. Wait for the GitHub browser-quality workflow.
2. Wait for both Vercel projects connected to `main`.
3. Confirm `www.winecountryrootcanal.com` serves the released commit.
4. Confirm the apex domain redirects to `www`.
5. Run `A11Y_BASE_URL=https://www.winecountryrootcanal.com pnpm test:browser`.
6. Recheck forms, phone/email links, sitemap, robots, canonical tags, and legacy redirects.
