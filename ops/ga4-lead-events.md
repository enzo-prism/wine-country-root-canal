# GA4 `generate_lead` events

## Purpose

The existing GA4 property `G-VH6BCFFY75` (503923552) stays the only measurement ID on this site. The appointment Typeform (`qYX51Bgz`) is mounted as an outbound link, not an on-page iframe, on `/contact`, `/forms` (navbar/footer), and other CTAs. This hook opens that form in Typeform’s official popup embed so a real submit can fire `generate_lead`.

Do not add a second GA4 property or a second `gtag('config', ...)` call.

Do not star `generate_lead` as a key event from this repository. That is done in GA Admin after events arrive.

## Events

| Trigger | Event | Params |
| --- | --- | --- |
| Appointment Typeform `qYX51Bgz` opened (click / overlay) | `form_start` | `form_type=typeform_appointment`, optional `location` |
| Successful Typeform submit for `qYX51Bgz` | `generate_lead` | `form_type=typeform_appointment`, optional `location` |
| `tel:` click-to-call | `generate_lead` | `method=phone`, `contact_method=phone`, `lead_source=website_phone`, `location` |

`generate_lead` is not fired on page load, including `/thank-you`. The live Typeform ends on Typeform’s own thank-you screen and does not redirect here.

`location` is the existing `data-analytics-location` value when present (`contact_page_cta`, `navbar_desktop`, `footer_book_appointment`, …). Otherwise it is a low-cardinality slug of the current pathname.

## How the Typeform hook works

1. Appointment links keep their Typeform `href` (`https://fxuqp40sseh.typeform.com/to/qYX51Bgz`), `target="_blank"`, and `rel` for no-JS and crawlers. Form fields and the Typeform URL are unchanged.
2. `app/layout.tsx` loads `https://embed.typeform.com/next/embed.js` and an inline script `#ga4-typeform-lead`. That script is visible in `/contact` and `/forms` HTML and contains `generate_lead`, `form_start`, `qYX51Bgz`, and `form_type`.
3. A capture-phase click listener intercepts primary clicks on those links and opens Typeform’s official `createPopup` overlay.
4. Overlay `onSubmit` is the primary success signal. Typeform’s iframe `postMessage` (`form-submit` / `form-submitted`) is a backup if the form is already iframed.
5. `generate_lead` is deduped for 4 seconds so `onSubmit` plus `postMessage` count as one submit. A later successful submit can fire again.
6. If the embed SDK fails to load, the click falls back to the original Typeform tab. `form_start` still fires; `generate_lead` cannot, because submit then happens on typeform.com.

## Privacy

Only allowlisted params are sent (`form_id`, `form_name`, `form_type`, `lead_source`, `location`, `method`, `contact_method`). The sanitizer drops any other key and any value that is not a short `[A-Za-z0-9._-]` token.

Never send:

- patient names
- emails
- phone numbers (including the `tel:` href)
- appointment notes or Typeform answers
- Typeform response IDs

## Implementation

- `lib/ga4.ts`: measurement ID, Typeform id, allowlisted helpers
- `lib/ga4-typeform-lead-script.ts`: inline browser hook
- `app/layout.tsx`: existing `G-VH6BCFFY75` gtag bootstrap, Typeform embed script, `#ga4-typeform-lead`

## How to test a submit without inventing a patient

Do not complete the live appointment Typeform with fake patient details.

1. Open a Vercel preview of `/contact` or `/forms`.
2. Confirm page source includes `<script id="ga4-typeform-lead"` with `generate_lead` and `qYX51Bgz`.
3. Enable GA DebugView (or watch `dataLayer` in DevTools).
4. Click **Request Appointment Online** on `/contact`, or **Request Appointment** in the navbar/footer on `/forms`. Confirm `form_start` with `form_type=typeform_appointment`. Confirm `generate_lead` has not fired.
5. Close the overlay without submitting. Still no `generate_lead`.
6. To prove `generate_lead` without creating a Typeform response, dispatch the same backup the iframe uses:

   ```js
   window.dispatchEvent(
     new MessageEvent("message", {
       origin: "https://form.typeform.com",
       data: { type: "form-submit", formId: "qYX51Bgz" },
     }),
   )
   ```

   Or, in a local Playwright run, the suite mocks `window.tf.createPopup` and calls the captured `onSubmit`.
7. After deploy, use GA4 DebugView / Realtime to confirm `form_start` and `generate_lead`, then mark `generate_lead` as a key event in GA Admin.
