import Link from "next/link"
import { Mail, MapPin, Phone, Printer } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { AfterHoursNote } from "@/components/after-hours-note"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import {
  APPOINTMENT_REQUEST_URL,
  PRACTICE_EMAIL,
  PRACTICE_FAX_DISPLAY,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"

const hours = [
  { days: "Monday – Thursday", time: "8 AM – 5 PM" },
  { days: "Friday – Sunday", time: "Closed" },
]

/** Closing CTA + contact details + hours, in one section (replaces the old three-card grid). */
export function HomeContact() {
  return (
    <section id="contact" aria-labelledby="home-contact-heading" className="bg-brand-cream py-16 md:py-20 lg:py-28">
      <FadeInSection className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div>
            <h2 id="home-contact-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
              Request an Appointment
            </h2>
            <p className="mt-4 max-w-lg text-lg text-brand-dark-text/80">
              Share your preferred day and time online and our team will follow up to confirm availability. This is a
              request, not a confirmed appointment. In pain? Calling is fastest.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton
                href={APPOINTMENT_REQUEST_URL}
                variant="brand-primary"
                size="lg"
                className="w-full text-base sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="homepage_contact"
              >
                Request an Appointment
              </LinkButton>
              <LinkButton
                href={PRACTICE_PHONE_HREF}
                variant="brand-outline"
                size="lg"
                className="w-full px-6 text-base sm:w-auto"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="homepage_contact"
              >
                Call {PRACTICE_PHONE_DISPLAY}
              </LinkButton>
            </div>

            <address className="mt-10 grid gap-4 border-t border-brand-merlot/15 pt-8 not-italic text-brand-dark-text/90 sm:grid-cols-2">
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                <span>
                  4655 Hoen Ave Ste 2
                  <br />
                  Santa Rosa, CA 95405
                  <br />
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
                  >
                    Map &amp; directions
                  </Link>
                </span>
              </p>
              <div className="space-y-3">
                <p className="flex min-w-0 items-center gap-3">
                  <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-merlot" />
                  <a
                    href={`mailto:${PRACTICE_EMAIL}`}
                    className="inline-flex min-h-11 min-w-0 items-center break-all hover:underline"
                    {...analyticsAttributes(analyticsEvents.emailClick, "homepage_contact")}
                  >
                    {PRACTICE_EMAIL}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Printer aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-merlot" />
                  <span>Fax {PRACTICE_FAX_DISPLAY}</span>
                </p>
              </div>
            </address>
          </div>

          <div className="rounded-md border border-brand-merlot/10 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-2xl text-brand-merlot">Office hours</h3>
            <dl className="mt-4 divide-y divide-brand-merlot/15 text-brand-dark-text/90">
              {hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4 py-3">
                  <dt>{row.days}</dt>
                  <dd className="font-medium">{row.time}</dd>
                </div>
              ))}
            </dl>
            <AfterHoursNote analyticsLocation="homepage_hours" variant="compact" className="mt-5" />
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
