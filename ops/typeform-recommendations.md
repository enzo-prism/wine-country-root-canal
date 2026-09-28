# Appointment Typeform — Recommended Changes

The appointment request form (Typeform ID `qYX51Bgz`, `https://fxuqp40sseh.typeform.com/to/qYX51Bgz`) is edited in the
practice's Typeform account, **not in this repository**. This document lists copy and logic changes for whoever manages
that account to apply. Nothing here requires a code change or a deploy.

## Do not change

- **The form ID / URL.** Every site CTA links to it via `APPOINTMENT_REQUEST_URL` in `lib/practice.ts`, and the GA4
  `generate_lead` hook (`lib/ga4-typeform-lead-script.ts`, see `ops/ga4-lead-events.md`) matches on `qYX51Bgz`. If a new
  form is ever created, update `lib/practice.ts` and `lib/ga4.ts` in the same change.
- **"Redirect on completion".** Leave it off. The site opens the form in Typeform's popup embed and fires
  `generate_lead` from the embed's `onSubmit`. Put next-step links on the ending screen as buttons instead (below).
- **Hidden fields that carry personal data into URLs.** Do not add any.

## Current issues (as of 2026-09-27)

1. The day/time preference question offers **Friday**, but the office is closed Friday–Sunday (hours: Monday–Thursday,
   8 AM–5 PM).
2. There is no **"Were you referred? By whom?"** question, so the front desk cannot match a request to an incoming
   referral from a dentist.
3. There is no **"Are you in pain or swollen right now?"** triage question, so urgent patients may wait for a callback
   instead of calling.
4. A placeholder/example uses a **"check-up"** visit type. The practice is endodontics-only, so this example can confuse
   patients about what the office does.
5. **Typeform branding** is shown on the form.
6. The **thank-you (ending) screen** does not tell the patient what happens next or how to prepare.

## Recommended questions

Keep existing contact questions (name, phone, email, and any consent statement) as they are. Add or change the
following. Suggested order: triage first, so an urgent patient is routed to the phone before filling out the rest.

### Q1 (new, first question) — urgent triage

- **Type:** Multiple choice, single selection, required.
- **Question text:** Are you in pain or do you have swelling right now?
- **Description:** This helps us know how quickly to reach you.
- **Choices:**
  - Yes, I have significant pain or swelling
  - I have some discomfort, but it is manageable
  - No, I'm not in pain right now

### Statement (new) — shown only when Q1 = "Yes, I have significant pain or swelling"

- **Type:** Statement.
- **Text:** Please call us now at (707) 523-3636 so we can help you as soon as possible.
- **Description:** Our office is open Monday–Thursday, 8 AM–5 PM. Outside those hours, call the same number and follow
  the recorded instructions. If swelling is affecting your breathing or swallowing, call 911 or go to the nearest
  emergency room.
- **Button text:** Continue with my request
- (Letting the patient continue is deliberate: a patient who has already called can still leave their details.)

### Q2 (new) — referral

- **Type:** Multiple choice, single selection, required.
- **Question text:** Were you referred to us by a dentist?
- **Choices:**
  - Yes
  - No
  - I'm not sure

### Q2a (new) — shown only when Q2 = "Yes"

- **Type:** Short text, optional.
- **Question text:** Who referred you?
- **Description:** Your dentist's name and office, if you know it. Dentists can send X-rays through our secure online
  referral form, so there is no need to upload anything here.

### Q3 (changed) — reason for the visit

- **Type:** Keep the current type.
- **Question text:** What would you like to be seen for?
- **Replace the "check-up" example with endodontic examples.** Suggested description:
  For example: a toothache, a tooth my dentist says needs a root canal, a tooth that was treated before and still
  hurts, or a dental injury.
- Do **not** ask for detailed medical history here; that belongs in the patient portal forms after scheduling.

### Q4 (changed) — preferred days

- **Type:** Multiple choice, **multiple selection allowed**, required.
- **Question text:** Which days usually work best for you?
- **Choices:** Monday, Tuesday, Wednesday, Thursday, Any of these days
- **Remove Friday** (and any Saturday/Sunday option, if present).

### Q5 (optional change) — preferred time

- **Question text:** What time of day usually works best?
- **Choices:** Morning, Afternoon, No preference
- **Description:** Our office hours are 8 AM–5 PM. We'll confirm an available time with you.

## Logic summary

| Condition | Action |
| --- | --- |
| Q1 = "Yes, I have significant pain or swelling" | Jump to the "Please call us now" statement, then continue to Q2 |
| Q1 = any other answer | Go to Q2 |
| Q2 = "Yes" | Show Q2a ("Who referred you?") |
| Q2 = "No" or "I'm not sure" | Skip Q2a |

Optional: if the account supports multiple ending screens, add an ending variable so a Q1 "Yes" answer shows the urgent
ending screen below.

## Branding

- Turn off "Typeform branding" in the form's settings if the account's plan allows it. If it does not, no other action is
  needed; this is cosmetic.
- Match the theme to the site: button/accent color `#762336` (merlot), background `#FDF9F5` (cream), text `#3D3D3D`.
  Use a serif heading font (Playfair Display, or the closest available) if the theme editor allows it.

## Ending (thank-you) screen

### Default ending

- **Title:** Thank you — we've received your request
- **Description:**
  This is a request, not a confirmed appointment. Our team will contact you to confirm an available time. Our office is
  open Monday–Thursday, 8 AM–5 PM.

  While you wait, you can read what to expect at your visit. Once your appointment is scheduled, you can complete your
  new patient forms online to make check-in faster.

  If your pain gets worse or you notice swelling, please call (707) 523-3636.
- **Button text:** What to expect at your visit
- **Button link:** `https://www.winecountryrootcanal.com/your-visit`
- If the ending screen supports only one button, put the forms link in the description as plain text:
  "New patient forms: winecountryrootcanal.com/forms".
- If it supports a second button or link: **Button text:** Patient forms → `https://www.winecountryrootcanal.com/forms`

### Urgent ending (optional, when Q1 = "Yes, I have significant pain or swelling")

- **Title:** Please call us now
- **Description:**
  We've received your request, but because you're in pain or have swelling, please call (707) 523-3636 so we can help as
  soon as possible. Outside office hours (Monday–Thursday, 8 AM–5 PM), call the same number and follow the recorded
  instructions. If swelling is affecting your breathing or swallowing, call 911 or go to the nearest emergency room.
- **Button text:** Call (707) 523-3636
- **Button link:** `tel:+17075233636`

## After applying

1. Submit one test request (mark it clearly as a test in the name field) and confirm the front desk receives it as
   before.
2. On the live site, open the form from any "Request an Appointment" button, submit the test, and confirm GA4 DebugView
   shows a single `generate_lead` with `form_type=typeform_appointment` (see `ops/ga4-lead-events.md`).
3. Delete the test response in Typeform.
