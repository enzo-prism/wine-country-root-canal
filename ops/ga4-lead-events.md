# GA4 appointment requests and phone-click intent

## Purpose

The existing GA4 property `G-VH6BCFFY75` (503923552) stays the only measurement ID on this site. The appointment Typeform (`qYX51Bgz`) is mounted as an outbound link, not an on-page iframe, on `/contact`, `/forms` (navbar/footer), and other CTAs. This hook opens that form in Typeform’s official popup embed so a real submit can fire `generate_lead`.

Do not add a second GA4 property or a second `gtag('config', ...)` call.

Do not star `generate_lead` as a key event from this repository. That is done in GA Admin after events arrive.

## Events

| Trigger | Event | Params |
| --- | --- | --- |
| Appointment Typeform `qYX51Bgz` opened (click / overlay) | `form_start` | `form_type=typeform_appointment`, optional `location` |
| Successful Typeform submit for `qYX51Bgz` | `appointment_request_submit` + legacy `generate_lead` | `form_type=typeform_appointment`, optional `location` |
| `tel:` click-to-call | `click_to_call` + legacy `generate_lead` | `method=phone`, `contact_method=phone`, `lead_source=website_phone`, `location` |

`generate_lead` is not fired on page load, including `/thank-you`. The live Typeform ends on Typeform’s own thank-you screen and does not redirect here.

`location` is the existing `data-analytics-location` value when present (`contact_page_cta`, `navbar_desktop`, `footer_book_appointment`, …). Otherwise it is a low-cardinality slug of the current pathname.

## Reporting from the November 6, 2026 release

Use production hostname filters (`www.winecountryrootcanal.com` and apex when present) for both current and historical reports. Separate `click_to_call` from `appointment_request_submit`; do not add either to legacy `generate_lead`, because each real action also emits the legacy event for dashboard continuity. Historical `generate_lead` combines phone intent and submitted requests, including 32 localhost events in August 2026. Existing off-host collection is already blocked by the host gate.

GA4 Admin key-event settings were not changed. Keep legacy charts labeled as combined actions. A future key-event migration must deliberately retire or exclude the combined event to avoid double-counting. Neither phone clicks nor requests establish booked patients; reconcile connected qualified calls and scheduled appointments with practice records outside this website. Compare complete equivalent reporting windows and annotate the release date.

## How the Typeform hook works

1. Appointment links keep their Typeform `href` (`https://fxuqp40sseh.typeform.com/to/qYX51Bgz`), `target="_blank"`, and `rel` for no-JS and crawlers. Form fields and the Typeform URL are unchanged.
2. `app/layout.tsx` loads `https://embed.typeform.com/next/embed.js` and an inline script `#ga4-typeform-lead`. That script is visible in `/contact` and `/forms` HTML and contains `generate_lead`, `form_start`, `qYX51Bgz`, and `form_type`.
3. A capture-phase click listener intercepts primary clicks on those links and opens Typeform’s official `createPopup` overlay.
4. Overlay `onSubmit` is the primary success signal. Typeform’s iframe `postMessage` (`form-submit` / `form-submitted`) is a backup if the form is already iframed.
5. `appointment_request_submit` and its legacy `generate_lead` companion are deduped together for 4 seconds so `onSubmit` plus `postMessage` count as one submit. A later successful submit can fire again.
6. If the embed SDK fails to load, the click falls back to the original Typeform tab. `form_start` still fires; `generate_lead` cannot, because submit then happens on typeform.com.

## Privacy

Only allowlisted params are sent (`form_id`, `form_name`, `form_type`, `lead_source`, `location`, `method`, `contact_method`). The sanitizer drops any other key and any value that is not a short `[A-Za-z0-9._-]` token.

Never send:

- patient names
- emails
- phone numbers (including the `tel:` href)
- appointment notes or Typeform answers
- Typeform response IDs

## Host gate

`G-VH6BCFFY75` is production-only. `lib/analytics-host.ts` allowlists `www.winecountryrootcanal.com` and `winecountryrootcanal.com`. Local (`127.0.0.1`, `localhost`, `[::1]`), `*.vercel.app` preview/git hosts, and any other hostname skip:

1. `gtag.js` script load
2. `gtag('config', 'G-VH6BCFFY75')`
3. every `gtag` event from `#ga4-typeform-lead` (`form_start`, `appointment_request_submit`, `click_to_call`, and legacy `generate_lead`)

The Typeform hook itself is unchanged (`qYX51Bgz`, `form_type=typeform_appointment`, 4-second dedupe). Residual `127.0.0.1` / localhost / `*.vercel.app` rows already in property `503923552` can be marked Internal traffic in GA4 Admin. This repo cannot apply that Admin setting.

## gtag.js load timing (deferred)

`GA4_BOOTSTRAP_SCRIPT` (`lib/ga4.ts`) runs the `dataLayer` / `gtag` stub, `gtag('js')` and `gtag('config', 'G-VH6BCFFY75')` immediately after hydration, so the page_view and every later event (`form_start`, `generate_lead`, `tel:` clicks) are queued in `dataLayer` from the start. Only the ~170 KB `gtag.js` download is deferred until whichever comes first:

- the first `pointerdown`, `keydown`, `touchstart`, or `scroll`, or
- 3.5 s after `load`, on an idle main thread (`requestIdleCallback`, 2 s timeout).

When `gtag.js` arrives it replays the queue in order, so no queued event is lost and the Typeform / `tel:` hooks are unchanged. The host gate is unchanged: off the canonical hosts the bootstrap returns before creating the stub, adding listeners, or loading `gtag.js`.

Why: `gtag.js` produced two 60–155 ms long tasks right after load on every page (Lighthouse TBT). Deferring it moves that work out of the load window.

Trade-off: a visitor who leaves within ~3.5 s without touching, scrolling, or pressing a key is not recorded at all (their queued page_view never reaches Google). Expect a small drop in very short bounce sessions and a slightly higher engagement rate versus the pre-change baseline; conversions are unaffected because a click or tap always loads `gtag.js` first. To revert, append the `gtag.js` script tag right after `gtag('config', …)` again.

## Implementation

- `lib/analytics-host.ts`: canonical analytics host allowlist
- `lib/ga4.ts`: measurement ID, Typeform id, allowlisted helpers, gated gtag bootstrap (deferred `gtag.js` load, see above)
- `lib/ga4-typeform-lead-script.ts`: inline browser hook (events no-op off-host)
- `app/layout.tsx`: gated `G-VH6BCFFY75` bootstrap, Typeform embed script, `#ga4-typeform-lead`

## How to test without inventing a patient or polluting GA4

The shared browser fixture blocks GA4 and Vercel Analytics network requests even when a test overrides the hostname. Keep every browser spec imported from `tests/fixtures.ts`.

1. Run `pnpm test:unit` and `pnpm test:browser tests/e2e/ga4-host-gate.spec.ts tests/e2e/ga4-lead-events.spec.ts`. The tests mock Typeform callbacks and the GA queue; no patient response or real conversion is submitted.
2. Confirm `click_to_call` appears once for a mocked phone click, with no appointment submit event. Confirm an open emits only `form_start`; a successful callback emits one `appointment_request_submit` plus its one legacy companion, even if both callback and postMessage arrive.
3. Local and preview hosts intentionally emit no production GA4 events. Do not expect DebugView events from an ordinary preview or use synthetic live-host events to manufacture proof.
4. Manually open and close the real popup on localhost to check vendor loading, reflow, and focus. Do not enter or submit fake patient details. The November 6 check loaded the live form; its first question title still shows `...`, an external Typeform-editor issue.
5. After release, verify dedicated events from genuine activity when they arrive in GA4. Website tests establish instrumentation behavior, not Google's ingestion or appointment fulfillment.
