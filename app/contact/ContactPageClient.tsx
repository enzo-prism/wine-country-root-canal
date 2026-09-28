import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Printer, Navigation } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { AreasWeServe } from "@/components/areas-we-serve"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { AfterHoursNote } from "@/components/after-hours-note"
import {
  APPLE_MAPS_URL,
  GOOGLE_MAPS_PLACE_URL,
  MapFacade,
  PRACTICE_ADDRESS_LOCALITY,
  PRACTICE_ADDRESS_STREET,
} from "@/components/map-facade"
import {
  APPOINTMENT_REQUEST_URL,
  PRACTICE_EMAIL,
  PRACTICE_FAX_DISPLAY,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"

const cardClassName = "bg-white p-6 md:p-8 rounded-sm shadow-lg border-t-4 border-brand-rose-beige"
const cardHeadingClassName = "font-serif text-2xl md:text-3xl text-brand-merlot mb-6"

export default function ContactPageClient() {
  return (
    <>
      <Navbar />
      <PageShell
        title="Contact Our Santa Rosa Endodontics Office"
        description="We're here to answer your questions and help you schedule an appointment."
      >
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Appointment Request CTA. Keep first in <main>: its tel: link is the page's primary call CTA. */}
          <FadeInSection>
            <Card className="text-center py-8 px-6 mb-12 max-w-4xl mx-auto bg-brand-cream rounded-sm shadow-lg border-t-4 border-brand-merlot">
              <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-4">
                Ready to Request an Appointment?
              </h2>
              <p className="text-lg text-brand-dark-text/80 mb-6 max-w-2xl mx-auto">
                Share your preferred day and time online, or call us directly. Our team will contact you to confirm an
                available appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LinkButton
                  href={APPOINTMENT_REQUEST_URL}
                  variant="brand-primary"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={analyticsEvents.bookAppointmentClick}
                  analyticsLocation="contact_page_cta"
                >
                  Request an Appointment
                </LinkButton>
                <span className="text-brand-dark-text/80">or</span>
                <a
                  href={PRACTICE_PHONE_HREF}
                  className="text-brand-merlot hover:underline text-lg font-semibold"
                  {...analyticsAttributes(analyticsEvents.phoneClick, "contact_page_cta")}
                >
                  Call {PRACTICE_PHONE_DISPLAY}
                </a>
              </div>
              <p className="mt-6 text-sm text-brand-dark-text/80">
                Our team will follow up on online requests. In pain? Please call us.
              </p>
            </Card>
          </FadeInSection>

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-8">
              {/* Contact Information */}
              <FadeInSection>
                <Card className={cardClassName}>
                  <h2 className={cardHeadingClassName}>Contact Information</h2>
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <MapPin aria-hidden="true" className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-brand-dark-text mb-1">Our Location</h3>
                        <a
                          href={GOOGLE_MAPS_PLACE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-brand-dark-text/90 underline decoration-brand-rose-beige/60 underline-offset-4 hover:text-brand-merlot"
                        >
                          <address className="not-italic">
                            Wine Country Root Canal
                            <br />
                            {PRACTICE_ADDRESS_STREET}
                            <br />
                            {PRACTICE_ADDRESS_LOCALITY}
                          </address>
                          <span className="sr-only"> (opens Google Maps in a new tab)</span>
                        </a>
                        {/* On desktop the map card beside this one carries the same directions buttons. */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:hidden">
                          <LinkButton
                            href={GOOGLE_MAPS_PLACE_URL}
                            variant="brand-primary"
                            size="lg"
                            className="h-auto whitespace-normal px-6"
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={<Navigation />}
                          >
                            Get directions<span className="sr-only"> in Google Maps (opens in a new tab)</span>
                          </LinkButton>
                          <LinkButton
                            href={APPLE_MAPS_URL}
                            variant="brand-outline"
                            size="lg"
                            className="h-auto whitespace-normal px-6"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Apple Maps<span className="sr-only"> directions (opens in a new tab)</span>
                          </LinkButton>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone aria-hidden="true" className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Phone</h3>
                        <a
                          href={PRACTICE_PHONE_HREF}
                          className="text-brand-dark-text/90 hover:underline text-lg"
                          {...analyticsAttributes(analyticsEvents.phoneClick, "contact_page_details")}
                        >
                          {PRACTICE_PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail aria-hidden="true" className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-brand-dark-text mb-1">Email</h3>
                        <a
                          href={`mailto:${PRACTICE_EMAIL}`}
                          className="text-brand-dark-text/90 hover:underline break-all"
                          {...analyticsAttributes(analyticsEvents.emailClick, "contact_page_details")}
                        >
                          {PRACTICE_EMAIL}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Printer aria-hidden="true" className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Fax</h3>
                        <span className="text-brand-dark-text/90">{PRACTICE_FAX_DISPLAY}</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock aria-hidden="true" className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Emergency Care</h3>
                        <p className="text-brand-dark-text/90">
                          We make every effort to see emergency cases as soon as possible
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>

              {/* Office Hours */}
              <FadeInSection>
                <Card className={cardClassName}>
                  <h2 className={cardHeadingClassName}>Office Hours</h2>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center gap-4 py-2 border-b border-brand-cream">
                      <span className="font-medium text-brand-dark-text">Monday - Thursday</span>
                      <span className="text-brand-dark-text/90">8:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center gap-4 py-2 border-b border-brand-cream">
                      <span className="font-medium text-brand-dark-text">Friday</span>
                      <span className="text-brand-dark-text/80">Closed</span>
                    </li>
                    <li className="flex justify-between items-center gap-4 py-2">
                      <span className="font-medium text-brand-dark-text">Saturday - Sunday</span>
                      <span className="text-brand-dark-text/80">Closed</span>
                    </li>
                  </ul>
                  <AfterHoursNote analyticsLocation="contact_page_hours" variant="compact" className="mt-5" />
                  <p className="mt-3 text-sm">
                    <Link
                      href="/dental-emergencies"
                      className="inline-flex min-h-11 items-center font-semibold text-brand-merlot underline underline-offset-2"
                    >
                      What to do in a dental emergency
                    </Link>
                  </p>
                </Card>
              </FadeInSection>
            </div>

            {/* Map: static card first; the Google Maps iframe loads only on request. */}
            <FadeInSection className="lg:sticky lg:top-28">
              <Card className="bg-white p-4 md:p-6 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                <h2 className={`${cardHeadingClassName} text-center`}>Find Us</h2>
                <MapFacade className="lg:h-[32rem]" />
              </Card>
            </FadeInSection>
          </div>

          <div className="mt-12 space-y-12">
            <FadeInSection>
              <Card className="bg-white p-8 md:p-10 max-w-4xl mx-auto rounded-sm shadow-lg border-t-4 border-brand-rose-beige text-center">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-4">
                  Questions About CBCT or 3D Dental Imaging?
                </h2>
                <p className="text-lg text-brand-dark-text/80 mb-6 max-w-3xl mx-auto">
                  If you have been told you may need more detailed imaging for retreatment, a surgical consultation, or
                  a difficult diagnosis, learn how our on-site CBCT scanner may be used when indicated.
                </p>
                <LinkButton
                  href="/cbct-scanner-santa-rosa"
                  variant="brand-outline"
                  size="lg"
                  analyticsEvent={analyticsEvents.cbctContentClick}
                  analyticsLocation="contact_page_cbct"
                >
                  Explore CBCT and 3D Imaging
                </LinkButton>
              </Card>
            </FadeInSection>

            {/* Areas We Serve */}
            <AreasWeServe compact />
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
