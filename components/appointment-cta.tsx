import Link from "next/link"
import { Phone } from "lucide-react"

import { LinkButton } from "@/components/ui/link-button"
import { analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { cn } from "@/lib/utils"

const DEFAULT_TITLE = "Ready to Schedule Your Visit?"
const DEFAULT_DESCRIPTION =
  "Request an appointment online or call our Santa Rosa office. Our team will follow up to confirm an available time."

interface AppointmentCtaProps {
  /** Section heading (rendered as an h2). Defaults to a generic scheduling prompt. */
  title?: string
  /** Supporting sentence under the heading. Defaults to the standard request/call copy. */
  description?: string
  /** Flat analytics location shared by both buttons, e.g. "about_final_cta". */
  analyticsLocation: string
  /**
   * Optional separate analytics location for the call button, for pages whose GA history
   * used distinct request/phone locations (e.g. "root_canal_cost_phone"). Defaults to
   * `analyticsLocation`.
   */
  phoneAnalyticsLocation?: string
  /**
   * Adds a quiet "What to expect at your visit" link to /your-visit under the buttons.
   * Leave off on /your-visit itself.
   */
  showVisitLink?: boolean
  /** Optional id for the section (e.g. an in-page anchor target). */
  id?: string
  className?: string
}

/**
 * End-of-page conversion block: request an appointment online (Typeform) or call.
 * Mirrors the centered CTA pattern used at the bottom of procedure and resource pages.
 */
export function AppointmentCta({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  analyticsLocation,
  phoneAnalyticsLocation,
  showVisitLink = false,
  id,
  className,
}: AppointmentCtaProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-4xl scroll-mt-24 rounded-sm border-t-4 border-brand-merlot bg-brand-cream px-6 py-8 text-center shadow-lg sm:py-12",
        className,
      )}
    >
      <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">{title}</h2>
      <p className="text-lg text-brand-dark-text/80 mb-8 max-w-xl mx-auto">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <LinkButton
          href={APPOINTMENT_REQUEST_URL}
          variant="brand-primary"
          size="lg"
          className="w-full sm:w-auto px-8 text-base font-semibold"
          target="_blank"
          rel="noopener noreferrer"
          analyticsEvent={analyticsEvents.bookAppointmentClick}
          analyticsLocation={analyticsLocation}
        >
          Request an Appointment
        </LinkButton>
        <LinkButton
          href={PRACTICE_PHONE_HREF}
          variant="brand-outline"
          size="lg"
          className="w-full sm:w-auto px-6 text-base font-semibold"
          icon={<Phone />}
          analyticsEvent={analyticsEvents.phoneClick}
          analyticsLocation={phoneAnalyticsLocation ?? analyticsLocation}
        >
          Call {PRACTICE_PHONE_DISPLAY}
        </LinkButton>
      </div>
      <p className="mt-6 text-sm text-brand-dark-text/80">
        Our team will follow up on online requests. In pain? Please call us.
      </p>
      {showVisitLink && (
        <p className="mt-2 text-sm">
          <Link
            href="/your-visit"
            className="inline-flex min-h-11 items-center font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
          >
            What to expect at your visit
          </Link>
        </p>
      )}
    </section>
  )
}
