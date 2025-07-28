import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { LinkButton } from "@/components/ui/link-button"
import { ClipboardList, ExternalLink } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"

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
          <div className="space-y-4 max-w-md mx-auto flex justify-center">
            <LinkButton
              href="https://winecountryrootcanal.dentalsymphony.com/Patient/NewPatient.aspx"
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
