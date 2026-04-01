export const analyticsEvents = {
  bookAppointmentClick: "book_appointment_click",
  referralFormClick: "referral_form_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  cbctContentClick: "cbct_content_click",
} as const

export type AnalyticsEventName = (typeof analyticsEvents)[keyof typeof analyticsEvents]

export function analyticsAttributes(event: AnalyticsEventName, location: string) {
  return {
    "data-analytics-event": event,
    "data-analytics-location": location,
  } as const
}
