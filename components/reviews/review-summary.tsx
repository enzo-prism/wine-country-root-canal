import { ExternalLink } from "lucide-react"

import { GOOGLE_REVIEW_URL } from "@/components/reviews/google-review-links"
import { ReviewStars } from "@/components/reviews/review-stars"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL } from "@/lib/practice"

interface ReviewSummaryProps {
  averageRating?: number
  totalReviews?: number
  /** Flat analytics location shared by the appointment CTA and the "Leave a Google review" link. */
  analyticsLocation: string
}

/** Google rating pill + appointment CTA + "Leave a Google review" link, left-aligned. */
export function ReviewSummary({ averageRating, totalReviews, analyticsLocation }: ReviewSummaryProps) {
  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
        {averageRating !== undefined && totalReviews !== undefined && (
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-brand-rose-beige/30 bg-white px-4 py-2 shadow-sm">
            <span className="text-2xl font-semibold text-brand-merlot">{averageRating.toFixed(1)}</span>
            <ReviewStars rating={averageRating} decorative className="h-5 w-[6.67rem]" />
            <span className="text-sm text-brand-dark-text/80">
              from <strong>{totalReviews}</strong> Google reviews
            </span>
          </p>
        )}
        <LinkButton
          href={APPOINTMENT_REQUEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="brand-primary"
          size="lg"
          analyticsEvent={analyticsEvents.bookAppointmentClick}
          analyticsLocation={analyticsLocation}
          className="w-full px-6 py-3 text-base font-semibold sm:w-auto"
        >
          Request an Appointment
        </LinkButton>
      </div>
      <p className="mt-3 text-sm text-brand-dark-text/80">
        Already a patient?{" "}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-merlot underline underline-offset-2"
          {...analyticsAttributes(analyticsEvents.googleReviewClick, analyticsLocation)}
        >
          Leave a Google review
          <ExternalLink aria-hidden="true" focusable="false" className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </div>
  )
}
