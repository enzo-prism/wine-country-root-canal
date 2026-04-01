import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { FaqDetailsList } from "@/components/faq-details"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { ArrowRight, CheckCircle2, MapPin, ScanSearch, ShieldCheck, Stethoscope } from "lucide-react"

export const metadata: Metadata = {
  title: "CBCT Scanner in Santa Rosa, CA | 3D Dental Imaging | Wine Country Root Canal",
  description:
    "Wine Country Root Canal offers on-site CBCT scanner imaging in Santa Rosa, CA to support endodontic diagnosis, retreatment planning, apicoectomy evaluation, and complex root canal care when indicated.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/cbct-scanner-santa-rosa",
  },
  openGraph: {
    title: "CBCT Scanner and 3D Dental Imaging in Santa Rosa, CA",
    description:
      "Learn when our on-site cone beam CT scanner may help with endodontic diagnosis, retreatment, cracks, and apicoectomy planning in Santa Rosa, CA.",
    url: "https://www.winecountryrootcanal.com/cbct-scanner-santa-rosa",
  },
}

type CbctUseCase = {
  title: string
  description: string
}

type SourceLink = {
  label: string
  href: string
  sourceType: string
}

const cbctUseCases: CbctUseCase[] = [
  {
    title: "Persistent pain with unclear findings",
    description:
      "When symptoms don’t fully match what a standard X-ray shows, three-dimensional imaging may help us evaluate the tooth and surrounding structures more completely.",
  },
  {
    title: "Retreatment evaluation",
    description:
      "CBCT may help identify missed anatomy, recurrent infection, root-end changes, or restorative factors that influence whether retreatment is appropriate.",
  },
  {
    title: "Suspected cracks or fractures",
    description:
      "In selected cases, CBCT can add useful information when a tooth has symptoms that raise concern for a crack or fracture pattern.",
  },
  {
    title: "Complex canal anatomy",
    description:
      "Additional imaging may help us understand curved roots, extra canals, calcification, or other anatomy that affects treatment planning.",
  },
  {
    title: "Apicoectomy or surgical planning",
    description:
      "For root-end surgery, CBCT may help us understand root position, surrounding bone, and nearby structures before treatment.",
  },
  {
    title: "Dental trauma and urgent diagnosis",
    description:
      "When indicated, 3D dental imaging can help clarify the extent of trauma, root injury, or other emergency endodontic concerns.",
  },
]

const faqItems = [
  {
    question: "What is a CBCT scan?",
    answer:
      "CBCT stands for cone beam computed tomography. It is a dental imaging method that creates a three-dimensional view of the teeth, roots, bone, and nearby structures. In endodontics, this can provide information that may not be visible on a standard two-dimensional radiograph. We use CBCT when the expected diagnostic value may improve care, not as a routine scan for every patient.",
  },
  {
    question: "Is CBCT the same as a medical CT scan?",
    answer:
      "No. Dental CBCT is different from a hospital-style medical CT scan. Dental systems are designed for the mouth and jaws, and endodontic imaging is often performed with a limited field of view focused on a specific area. That helps provide targeted information while keeping the scan appropriate to the clinical question. If CBCT is recommended, we will explain why that type of imaging is useful for your situation.",
  },
  {
    question: "Why would an endodontist recommend CBCT?",
    answer:
      "An endodontist may recommend CBCT when a standard X-ray does not provide enough information to explain symptoms or plan treatment confidently. This can happen with retreatment, complex anatomy, suspected cracks, root-end problems, or surgical evaluation. The goal is to gather the right information when it may change diagnosis, treatment planning, or prognosis.",
  },
  {
    question: "Does every root canal patient need CBCT?",
    answer:
      "No. Many patients can be diagnosed and treated appropriately with a clinical exam and standard digital radiographs. We recommend CBCT only when it is clinically indicated and likely to add useful information. That decision depends on the tooth, symptoms, previous treatment, and the question we are trying to answer.",
  },
  {
    question: "Is dental CBCT safe?",
    answer:
      "CBCT uses X-rays, so it involves radiation exposure, but the scan is chosen only when the expected benefit outweighs the added exposure compared with standard radiographs. Professional guidance in endodontics supports using CBCT selectively rather than routinely. If CBCT is recommended for you, we will explain why it may be helpful and answer any questions about the scan.",
  },
  {
    question: "Can CBCT help with retreatment, cracks, or apicoectomy planning?",
    answer:
      "Yes, in selected cases. CBCT may help us evaluate factors such as root-end changes, anatomy that was difficult to see previously, possible fracture patterns, or the relationship of a tooth to nearby structures before surgery. It does not replace a clinical exam, but it can be an important planning tool when a case is more complex.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

const sourceLinks: SourceLink[] = [
  {
    label: "Cone Beam Computed Tomography",
    href: "https://www.aae.org/specialty/clinical-resources/cone-beam-computed-tomography/",
    sourceType: "American Association of Endodontists",
  },
  {
    label: "Joint Position Statement of the AAE and AAOMR on CBCT in Endodontics",
    href: "https://aaomr.org/common/Uploaded%20files/Position%20Papers/aaomr-aae_position_paper_cb.pdf",
    sourceType: "AAE / American Academy of Oral and Maxillofacial Radiology",
  },
]

export default function CbctScannerSantaRosaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="CBCT Scanner and 3D Dental Imaging in Santa Rosa"
        description="On-site cone beam CT, when indicated, to support precise endodontic diagnosis and treatment planning."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <FadeInSection className="max-w-4xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
              <p className="text-sm uppercase tracking-[0.18em] text-brand-merlot/80 mb-3">Clinically Reviewed</p>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-4">
                On-site CBCT imaging for endodontic care, when indicated
              </h2>
              <p className="text-brand-dark-text/80 mb-4">
                Reviewed by Dr. Craig Wm. Anderson, DDS. This page explains how cone beam computed tomography, also
                called CBCT or 3D dental imaging, may support diagnosis and treatment planning in selected endodontic
                cases at Wine Country Root Canal.
              </p>
              <p className="text-sm text-brand-dark-text/70">
                Patients from Santa Rosa and nearby Sonoma County communities often want to know whether a provider has
                on-site CBCT available. We do, and we use it conservatively based on the needs of the case rather than
                as a routine scan for every patient.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">What is CBCT?</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                CBCT stands for cone beam computed tomography. It is a dental imaging method that creates a
                three-dimensional view of a tooth and the surrounding structures. In endodontics, that added
                perspective may help clarify diagnosis and treatment planning when standard radiographs do not fully
                answer the clinical question.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Dental CBCT is not the same as a hospital CT scan. It is designed for the mouth and jaws, and when we
                recommend it, the decision is based on whether the information is likely to improve care for your
                specific case.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ScanSearch className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">
                Why an endodontist may use CBCT
              </h3>
              <p className="text-brand-dark-text/80">
                Professional guidance from the AAE and AAOMR supports selective CBCT use in endodontics when
                three-dimensional information may change diagnosis, treatment planning, or prognosis. Standard digital
                radiographs are often sufficient, but some cases benefit from more detailed imaging.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ShieldCheck className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Used when indicated, not routinely</h3>
              <p className="text-brand-dark-text/80">
                Not every patient needs CBCT. We recommend it only when the expected diagnostic value justifies the
                scan and helps us make a more confident decision about your care.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
              When CBCT may be especially useful
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cbctUseCases.map((useCase) => (
                <div key={useCase.title} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <h3 className="font-serif text-xl text-brand-merlot mb-3">{useCase.title}</h3>
                  <p className="text-brand-dark-text/80">{useCase.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              What CBCT can help us evaluate
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Root anatomy that is difficult to interpret on a two-dimensional image</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Findings related to persistent symptoms after prior treatment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Bone and root-end changes that may influence surgical planning</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Tooth structure and surrounding anatomy in selected trauma cases</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Possible complications that affect whether retreatment or surgery is the better path</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">The relationship of a tooth to nearby structures before an apicoectomy or other focused care</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ShieldCheck className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Safety and radiation considerations</h3>
              <p className="text-brand-dark-text/80 mb-4">
                CBCT uses X-rays, so we think carefully before recommending it. The scan is used when the additional
                information may improve diagnosis or treatment planning and when that benefit outweighs the added
                exposure compared with standard radiographs.
              </p>
              <p className="text-brand-dark-text/80">
                If we recommend CBCT, we will explain what question we are trying to answer and why the scan may be
                helpful in your case.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Stethoscope className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">What patients can expect</h3>
              <p className="text-brand-dark-text/80 mb-4">
                An on-site CBCT scan is quick and typically completed during your visit. We use the images alongside
                your exam, symptoms, and standard radiographs to decide whether root canal therapy, retreatment,
                surgery, or monitoring is the right next step.
              </p>
              <p className="text-brand-dark-text/80">
                The scan does not replace clinical judgment, but it can help us explain your condition more clearly and
                plan care with greater confidence when the case is complex.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Why on-site CBCT can help with diagnosis and treatment planning
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <ArrowRight className="w-10 h-10 text-brand-merlot mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">Faster answers</h3>
                <p className="text-sm text-brand-dark-text/80">
                  When a scan is indicated, having CBCT available in the office can streamline evaluation and reduce
                  delays in planning next steps.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="w-10 h-10 text-brand-merlot mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">More informed case planning</h3>
                <p className="text-sm text-brand-dark-text/80">
                  Three-dimensional imaging may help us choose the most appropriate path for treatment, retreatment, or
                  surgery in selected cases.
                </p>
              </div>
              <div className="text-center">
                <MapPin className="w-10 h-10 text-brand-merlot mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">Local care in Santa Rosa</h3>
                <p className="text-sm text-brand-dark-text/80">
                  We serve patients in Santa Rosa as well as nearby Sonoma County communities who want specialist
                  evaluation with on-site endodontic imaging when it is needed.
                </p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4 text-center">
              Related care that may involve CBCT-informed planning
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <Link
                href="/endodontic-procedures/root-canal-therapy"
                className="text-brand-merlot hover:text-brand-rose-beige underline"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "cbct_page_related_root_canal")}
              >
                Root Canal Therapy
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link
                href="/endodontic-procedures/retreatment"
                className="text-brand-merlot hover:text-brand-rose-beige underline"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "cbct_page_related_retreatment")}
              >
                Root Canal Retreatment
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link
                href="/endodontic-procedures/apicoectomy"
                className="text-brand-merlot hover:text-brand-rose-beige underline"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "cbct_page_related_apicoectomy")}
              >
                Apicoectomy
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link
                href="/dentists"
                className="text-brand-merlot hover:text-brand-rose-beige underline"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "cbct_page_related_dentists")}
              >
                Information for Referring Dentists
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection className="bg-white p-6 md:p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl text-brand-merlot mb-4">Sources and professional guidance</h2>
            <p className="text-brand-dark-text/80 mb-6">
              This page is educational and is based on professional association guidance for selective CBCT use in
              endodontics. The right imaging for your case depends on your symptoms, exam findings, and treatment
              history.
            </p>
            <ul className="space-y-4">
              {sourceLinks.map((source) => (
                <li key={source.href} className="border-l-4 border-brand-cream pl-4">
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                  >
                    {source.label}
                  </a>
                  <p className="text-sm text-brand-dark-text/70 mt-1">{source.sourceType}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-brand-dark-text/70 mt-6">
              This information is intended to support patient education and does not replace individualized dental or
              medical advice.
            </p>
          </FadeInSection>

          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
              Need an endodontic evaluation with on-site CBCT available?
            </h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-3xl mx-auto">
              If you have ongoing tooth pain, a previously treated tooth that still does not feel right, or a case
              that may require more detailed imaging, we can help determine whether CBCT is indicated.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="cbct_page_primary_cta"
              >
                Schedule a Consultation
              </LinkButton>
              <LinkButton
                href="/dentists"
                variant="brand-outline"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
                analyticsEvent={analyticsEvents.cbctContentClick}
                analyticsLocation="cbct_page_referring_dentists"
              >
                For Referring Dentists
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
