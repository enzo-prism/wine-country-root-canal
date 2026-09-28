import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { LinkButton } from "@/components/ui/link-button"
import { ClipboardList, ExternalLink, AlertCircle, Smartphone, Phone } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import Image from "next/image"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import {
  APPOINTMENT_REQUEST_URL,
  PRACTICE_EMAIL,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"

export const metadata = buildMetadata({
  title: "New Patient Forms | Wine Country Root Canal Santa Rosa, CA",
  description:
    "Complete your new‑patient forms online before your visit to Wine Country Root Canal in Santa Rosa, CA. Secure portal access and QR code for mobile.",
  path: "/forms",
  ogTitle: "New Patient Forms | Wine Country Root Canal",
  ogDescription: "Complete your new‑patient forms online before your visit in Santa Rosa, CA.",
})

export default function OnlineFormsPage() {
  return (
    <>
      <Navbar />
      <PageShell
        title="New Patient Forms"
        description="Save time by completing your forms online before your appointment."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6 text-center">
          <ClipboardList aria-hidden="true" className="w-16 h-16 text-brand-merlot mx-auto mb-6" />
          <p className="text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
            To expedite your check-in process and make your first visit as smooth as possible, we invite you to complete
            your new patient registration securely online through our patient portal.
          </p>

          <div className="bg-brand-rose-beige/10 border border-brand-rose-beige/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle aria-hidden="true" className="w-5 h-5 text-brand-merlot flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-brand-dark-text mb-2">Important Information</h2>
                <p className="text-brand-dark-text/80 text-sm leading-relaxed">
                  To complete forms online, you must have an appointment scheduled in our system. The phone number you
                  enter must match the number in our Dentrix records so the forms can be properly linked to your file.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-t-4 border-brand-merlot rounded-lg shadow-sm p-6 mb-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-xl text-brand-merlot mb-2">No Appointment Yet?</h2>
            <p className="text-brand-dark-text/80 mb-5">
              Call our office or request an appointment online. Once your visit is scheduled, you can complete these
              forms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <LinkButton
                href={PRACTICE_PHONE_HREF}
                variant="brand-outline"
                size="lg"
                className="w-full sm:w-auto px-6"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="forms_no_appointment"
              >
                Call {PRACTICE_PHONE_DISPLAY}
              </LinkButton>
              <LinkButton
                href={APPOINTMENT_REQUEST_URL}
                variant="brand-outline"
                size="lg"
                className="w-full sm:w-auto px-6"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="forms_no_appointment"
              >
                Request an Appointment
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-brand-dark-text/80">
              Our team will follow up on online requests. In pain? Please call us.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto mb-8">
            <div className="flex-1 space-y-4">
              <LinkButton
                href="https://forms.henryscheinone.com/login"
                variant="brand-primary"
                size="lg"
                icon={<ExternalLink />}
                iconPosition="left"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
                analyticsEvent={analyticsEvents.patientFormsClick}
                analyticsLocation="forms_portal"
              >
                Complete Forms Online
              </LinkButton>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-px bg-brand-rose-beige/30 hidden md:block" />
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-brand-rose-beige/20 shadow-sm inline-block mb-3">
                  <Image
                    src="/images/91f17c7b-dd42-4bf9-8a4d-d4a6a308362b.png"
                    alt="QR code to access patient forms on mobile"
                    width={160}
                    height={160}
                    className="w-40 h-40"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-brand-dark-text/80">
                  <Smartphone aria-hidden="true" className="w-4 h-4" />
                  <p className="text-sm font-medium">Scan to open on your phone</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-brand-dark-text/80">
            Completing your forms ahead of time will ensure a faster, more streamlined experience when you arrive at our
            office.
          </p>
          <div className="mt-8 max-w-2xl mx-auto rounded-lg border border-brand-merlot/20 bg-white p-6">
            <h2 className="font-serif text-xl text-brand-merlot mb-3">Need Help or Another Format?</h2>
            <p className="text-brand-dark-text/80">
              If the online portal is difficult to use, call{" "}
              <a
                href={PRACTICE_PHONE_HREF}
                className="font-medium text-brand-merlot underline underline-offset-4"
                {...analyticsAttributes(analyticsEvents.phoneClick, "forms_help")}
              >
                {PRACTICE_PHONE_DISPLAY}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${PRACTICE_EMAIL}`}
                className="font-medium text-brand-merlot underline underline-offset-4"
                {...analyticsAttributes(analyticsEvents.emailClick, "forms_help")}
              >
                {PRACTICE_EMAIL}
              </a>
              . We can help you access the forms in another format. Please do not email private medical information.
            </p>
            <p className="mt-3 text-sm">
              <Link href="/accessibility" className="font-medium text-brand-merlot underline underline-offset-4">
                Read our accessibility statement
              </Link>
              .
            </p>
          </div>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
