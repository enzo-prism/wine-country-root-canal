/**
 * SMS (10DLC / A2P) program for post-visit review requests sent through ReviewFlow.
 *
 * STAGED: the wording below has not been approved by Dr. Anderson. Everything SMS-related
 * (the /sms-terms page, the "Text Messages" section of /privacy, the footer link and the
 * sitemap entry) is gated by one build-time flag and stays hidden until it is turned on.
 *
 * Turn on: set NEXT_PUBLIC_SMS_TERMS_ENABLED=true for the Vercel environment and redeploy.
 * NEXT_PUBLIC_* values are inlined at build time, so a flag change needs a new build.
 * Launch checklist: ops/sms-terms-launch.md.
 *
 * Kept free of imports so `node --experimental-strip-types --test lib/*.test.ts` can load it.
 */

export const SMS_TERMS_PATH = "/sms-terms"
export const SMS_PRIVACY_PATH = "/privacy"
export const SMS_PRIVACY_SECTION_ID = "text-messages"

/** Only the exact string "true" (case-insensitive, trimmed) turns the program on. */
export function isSmsTermsEnabled(value: string | undefined = process.env.NEXT_PUBLIC_SMS_TERMS_ENABLED): boolean {
  return value?.trim().toLowerCase() === "true"
}

/** Name of the messaging program as it should appear to carriers and patients. */
export const SMS_PROGRAM_NAME = "Wine Country Root Canal Review Requests"
/** Brand (sender) name. Must match the 10DLC brand registration. */
export const SMS_BRAND_NAME = "Wine Country Root Canal"

/**
 * How patients give consent to receive texts. PLACEHOLDER: Dr. Anderson must confirm how the
 * office actually collects opt-in (intake form checkbox, front-desk verbal consent, etc.).
 * While this is null, the page renders a clearly marked "pending confirmation" placeholder.
 */
export const SMS_CONSENT_METHOD: string | null = null

/** Shown when SMS_CONSENT_METHOD is null. */
export const SMS_CONSENT_PLACEHOLDER =
  "Placeholder pending Dr. Anderson's confirmation: describe exactly how and where patients agree to receive review-request texts (for example, a consent checkbox on the patient intake form or verbal consent at the front desk)."

/** Effective date of the approved wording. null until Dr. Anderson approves it. */
export const SMS_TERMS_EFFECTIVE_DATE: string | null = null

export const SMS_MESSAGE_PURPOSE =
  "After a visit, we may send a text asking about your experience with Wine Country Root Canal, with a link to leave a review. These messages relate only to your appointments with our office. We do not use this program to send advertising or promotions."

export const SMS_FREQUENCY = "Message frequency varies."
export const SMS_RATES = "Msg & data rates may apply."

export const SMS_STOP_INSTRUCTIONS =
  "Reply STOP to any message to opt out. After you reply STOP, we will not send more review-request texts to that number unless you opt in again."
export const SMS_HELP_INSTRUCTIONS = "Reply HELP to any message for help."

export const SMS_CONSENT_NOT_REQUIRED = "Agreeing to receive texts is not a condition of receiving care."

export const SMS_CARRIER_DISCLAIMER = "Mobile carriers are not liable for delayed or undelivered messages."

/** Privacy statements required for 10DLC registration. */
export const SMS_PRIVACY_NO_SHARING =
  "We do not sell, rent, or share mobile phone numbers or SMS opt-in consent with third parties or affiliates for their marketing or promotional purposes."
export const SMS_PRIVACY_SERVICE_PROVIDERS =
  "We share mobile numbers only with service providers that help us send these texts, such as our review-request platform, and only so they can deliver messages for us."
export const SMS_PRIVACY_OPT_IN_EXCLUSION =
  "Text messaging opt-in data and consent are never shared with any third party."
