# Vercel Analytics Custom Events

## Purpose

This site uses Vercel Analytics for lightweight conversion and content-interest measurement without introducing a heavy analytics abstraction layer.

The current implementation is designed for:

- patient conversion tracking
- referral conversion tracking
- contact intent tracking
- CBCT content-interest tracking

It intentionally keeps the event taxonomy small and low-cardinality so the Vercel Analytics dashboard remains useful for comparison and filtering.

## Event Taxonomy

Defined in:

```text
lib/analytics.ts
```

Current event names:

- `book_appointment_click`
- `referral_form_click`
- `phone_click`
- `email_click`
- `cbct_content_click`

Each event should use a flat `location` property to describe placement/context.

Examples:

- `navbar_desktop`
- `homepage_hero`
- `technology_primary_cta`
- `dentists_referral_section`
- `footer_phone`

## Implementation Architecture

### Shared definitions

```text
lib/analytics.ts
```

- source of truth for event names
- `analyticsAttributes(event, location)` helper for declarative markup instrumentation

### Global click tracker

```text
components/vercel-custom-event-tracker.tsx
```

- client-side document click listener
- looks for `data-analytics-event` and `data-analytics-location`
- dispatches events via `track()` from `@vercel/analytics`
- logs to the console in development for easier local verification

### Vercel Analytics wrapper

```text
components/vercel-analytics.tsx
app/layout.tsx
```

- central place for Vercel Analytics setup
- includes `beforeSend` URL normalization
- strips query strings and hashes from pageview URLs before they are sent

## Important Implementation Note

This repository currently uses:

```text
@vercel/analytics@2.0.1
```

For this package version and App Router setup, the safest working pattern is to use:

```tsx
import { Analytics } from "@vercel/analytics/react"
```

inside a small client wrapper component.

Do not switch back to the Next-specific wrapper casually if `beforeSend` is still required. During implementation, the Next wrapper path produced a server/client boundary error when passing `beforeSend`.

If the package is upgraded later, this can be reevaluated against the current Vercel docs and package behavior.

## Where Events Are Currently Instrumented

Primary surfaces currently tracked:

- navbar appointment CTA
- footer phone/email/appointment/CBCT links
- homepage appointment, contact, and CBCT content links
- contact page appointment, phone, email, and CBCT links
- dentists page referral and CBCT links
- technology page CBCT links
- CBCT landing page primary CTA and related-content links
- procedure and emergency pages where CBCT or appointment intent is relevant

## Rules For Adding New Events

### Prefer existing event names first

Before adding a new event name, ask:

- Is this another appointment CTA? Use `book_appointment_click`.
- Is this another referral CTA? Use `referral_form_click`.
- Is this a phone or email interaction? Use `phone_click` or `email_click`.
- Is this interest in CBCT content? Use `cbct_content_click`.

Most new tracking needs should be handled by adding a new `location`, not inventing a new event.

### Keep properties flat and stable

Good:

```ts
track("book_appointment_click", { location: "homepage_hero" })
```

Avoid:

- nested objects
- user-specific values
- free-form text fields
- query terms
- anything high-cardinality

### Use declarative instrumentation when possible

Preferred pattern for links/buttons:

```tsx
<a {...analyticsAttributes(analyticsEvents.phoneClick, "footer_phone")} />
```

or for the shared link button:

```tsx
<LinkButton
  analyticsEvent={analyticsEvents.bookAppointmentClick}
  analyticsLocation="homepage_hero"
/>
```

Only call `track()` directly in component logic when attribute-based instrumentation is not practical.

## Local Verification

In development, the custom tracker writes to the browser console:

```text
[vercel-analytics] <event_name> { location: ... }
```

This is the fastest way to confirm an event fired without relying on remote dashboards.

Because Vercel Analytics runs in debug mode locally, development verification should focus on:

- the correct event name
- the correct `location`
- the expected navigation or interaction still working

## Dashboard Usage

Use Vercel Analytics to:

- filter by event name
- break down by `location`
- compare CTA placements across page regions
- compare patient conversion intent vs referral intent
- compare CBCT content engagement vs direct booking behavior

Recommended views:

- `book_appointment_click` by `location`
- `referral_form_click` by `location`
- `cbct_content_click` by `location`
- `phone_click` by `location`

## Privacy Guidance

This site serves a healthcare practice. Keep analytics intentionally conservative.

Do not add:

- patient identifiers
- form field values
- appointment details
- query strings or URL fragments that could contain sensitive context
- medical-condition detail in event properties

The current `beforeSend` cleanup exists to reduce accidental URL-level leakage from pageview events.
