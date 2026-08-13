# GA4 `generate_lead` events

## Purpose

The existing GA4 property `G-VH6BCFFY75` (503923552) stays the only measurement ID on this site. This layer adds the recommended `generate_lead` event so appointment-form success and click-to-call can be marked as key events in GA Admin after the events start arriving.

Do not add a second GA4 property or a second `gtag('config', ...)` call.

## Events

| Trigger | Event | Distinguishing params |
| --- | --- | --- |
| Successful appointment Typeform submit | `generate_lead` | `method=form`, `contact_method=form`, `form_id=appointment_request`, `form_name=appointment_request`, `lead_source=website_appointment_form`, `location` |
| `tel:` click-to-call | `generate_lead` | `method=phone`, `contact_method=phone`, `lead_source=website_phone`, `location` |
| `/thank-you` landing (backup if Typeform later redirects here) | `generate_lead` | same form params, `location=thank_you_page` |

`location` is the existing `data-analytics-location` value when present (`homepage_hero`, `footer_phone`, `contact_page_cta`, …). Otherwise it is a low-cardinality slug of the current pathname.

## Privacy

Only the allowlisted params above are sent. The sanitizer drops any other key and any value that is not a short `[A-Za-z0-9._-]` token.

Never send:

- patient names
- emails
- phone numbers (including the `tel:` href)
- appointment notes or Typeform answers
- Typeform response IDs

## Implementation

- `lib/ga4.ts`: measurement ID, allowlisted `generate_lead` helper, appointment Typeform id
- `components/ga4-lead-tracker.tsx`: mounted from `app/layout.tsx`
  - all `a[href^="tel:"]` clicks
  - appointment Typeform links (`qYX51Bgz`) open in Typeform’s official overlay so `onSubmit` can fire after a completed form; the visible Typeform questions are unchanged
  - Typeform `form-submit` `postMessage` backup
- `components/ga4-thank-you-lead.tsx`: one-time form lead on `/thank-you` (session-deduped with overlay submit)

The live Typeform currently ends on Typeform’s own thank-you screen and does not redirect to `/thank-you`. Overlay `onSubmit` is therefore the primary form-success signal. Appointment links keep their Typeform `href`, `target="_blank"`, and `rel` for no-JS and crawlers.

## Local verification

In development the helper logs:

```text
[ga4] generate_lead { ... }
```

After deploy, use GA4 DebugView / Realtime to confirm `generate_lead` arrives, then mark it as a key event in GA Admin. Marking the key event is not done in this repository.
