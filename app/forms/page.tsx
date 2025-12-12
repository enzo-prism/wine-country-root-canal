import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { LinkButton } from "@/components/ui/link-button"
import { ClipboardList, ExternalLink, AlertCircle, Smartphone } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import Image from "next/image"

export const metadata: Metadata = {
  title: "New Patient Forms | Wine Country Root Canal Santa Rosa, CA",
  description:
    "Complete your new‑patient forms online before your visit to Wine Country Root Canal in Santa Rosa, CA. Secure portal access and QR code for mobile.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/forms",
  },
  openGraph: {
    title: "New Patient Forms | Wine Country Root Canal",
    description:
      "Complete your new‑patient forms online before your visit in Santa Rosa, CA.",
    url: "https://www.winecountryrootcanal.com/forms",
  },
}

export default function OnlineFormsPage() {
  return (
    <>
      <Navbar />
      <PageShell
        title="New Patient Forms"
        description="Save time by completing your forms online before your appointment."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6 text-center">
          <ClipboardList className="w-16 h-16 text-brand-merlot mx-auto mb-6" />
          <p className="text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
            To expedite your check-in process and make your first visit as smooth as possible, we invite you to complete
            your new patient registration securely online through our patient portal.
          </p>

          <div className="bg-brand-sage/10 border border-brand-sage/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-brand-merlot flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-brand-dark-text mb-2">Important Information</h3>
                <p className="text-brand-dark-text/80 text-sm leading-relaxed">
                  To complete forms online, you must have an appointment scheduled in our system. The phone number you
                  enter must match the number in our Dentrix records so the forms can be properly linked to your file.
                </p>
              </div>
            </div>
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
              >
                Complete Forms Online
              </LinkButton>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-px bg-brand-sage/30 hidden md:block" />
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-brand-sage/20 shadow-sm inline-block mb-3">
                  <Image
                    src="/images/91f17c7b-dd42-4bf9-8a4d-d4a6a308362b.png"
                    alt="QR code to access patient forms on mobile"
                    width={160}
                    height={160}
                    className="w-40 h-40"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-brand-dark-text/70">
                  <Smartphone className="w-4 h-4" />
                  <p className="text-sm font-medium">Scan to open on your phone</p>
                </div>
              </div>
            </div>
          </div>
          {/* </CHANGE> */}

          <p className="mt-8 text-brand-dark-text/70">
            Completing your forms ahead of time will ensure a faster, more streamlined experience when you arrive at our
            office.
          </p>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
