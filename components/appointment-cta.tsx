import { Phone } from "lucide-react"

import { LinkButton } from "@/components/ui/link-button"
import { analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { cn } from "@/lib/utils"

interface AppointmentCtaProps {
  title: string
  description: string
  /** Flat analytics location shared by both buttons, e.g. "about_final_cta". */
  analyticsLocation: string
  className?: string
}

/**
 * End-of-page conversion block: request an appointment online (Typeform) or call.
 * Mirrors the centered CTA pattern used at the bottom of procedure and resource pages.
 */
export function AppointmentCta({ title, description, analyticsLocation, className }: AppointmentCtaProps) {
  return (
    <section
      className={cn(
        "mx-auto max-w-3xl rounded-sm border-t-4 border-brand-merlot bg-brand-cream px-6 py-8 text-center shadow-lg sm:py-12",
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
          analyticsLocation={analyticsLocation}
        >
          Call {PRACTICE_PHONE_DISPLAY}
        </LinkButton>
      </div>
      <p className="mt-6 text-sm text-brand-dark-text/80">
        Our team will follow up on online requests. In pain? Please call us.
      </p>
    </section>
  )
}
