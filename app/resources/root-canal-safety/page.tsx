import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FaqDetailsList } from "@/components/faq-details"
import { ShieldCheck, FileText, MessageCircleQuestion, Stethoscope } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { analyticsEvents } from "@/lib/analytics"
import {
  aaeRootCanalMythsUrl,
  aaeRootCanalSafetyFactSheetUrl,
  aaeRootCanalSafetyHubUrl,
} from "@/lib/clinical-resources"

export const metadata = buildMetadata({
  title: "Are Root Canals Safe? Evidence & Myths | Wine Country Root Canal",
  description:
    "Review evidence-based answers about root canal safety, common myths, systemic health, and the American Association of Endodontists' 2026 safety fact sheet.",
  path: "/resources/root-canal-safety",
})

const faqItems = [
  {
    question: "Are root canals safe?",
    answer:
      "Root canal treatment is a well-established, evidence-based procedure used to remove infection and preserve a natural tooth. The American Association of Endodontists states that there is no valid scientific evidence linking properly treated root canal teeth with systemic disease. As with any procedure, your endodontist should review the benefits, alternatives, and risks for your specific tooth and health history.",
  },
  {
    question: "Can a root canal cause cancer or chronic illness?",
    answer:
      "Current evidence does not show that root canal treatment causes cancer or chronic systemic illness. Many claims online trace back to the early twentieth-century focal infection theory, which was based on research methods that were later discredited. If a claim worries you, bring it to a licensed dentist or physician so the source and your individual health history can be reviewed together.",
  },
  {
    question: "Is extraction safer than saving the tooth?",
    answer:
      "Extraction is not automatically safer. Root canal treatment removes infected tissue while preserving the natural tooth, whereas extraction removes the tooth and may require replacement. The best option depends on whether the tooth can be predictably restored, the extent of infection or damage, and your overall treatment plan.",
  },
  {
    question: "What should I do if I am worried about root canal treatment?",
    answer:
      "Write down your concerns and the sources you have seen, then discuss them during an endodontic evaluation. Dr. Anderson can explain the diagnosis, treatment options, expected benefits, alternatives, and material risks before you decide. Online education can help you prepare, but it cannot replace an examination or advice based on your medical and dental history.",
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

const mythCards = [
  {
    title: "Myth: Root canals cause disease elsewhere in the body",
    text: "The AAE reports that decades of research do not support a causal link between properly treated root canal teeth and systemic disease. Many recurring claims rely on the discredited focal infection theory.",
  },
  {
    title: "Myth: Removing the tooth is always the healthier choice",
    text: "When a tooth can be predictably restored, endodontic treatment removes infection while preserving the natural tooth. Extraction may be appropriate in some cases, but it is not automatically the safer option.",
  },
  {
    title: "Myth: A viral post is as reliable as clinical evidence",
    text: "Dental claims should be checked against peer-reviewed research, professional associations, and advice from qualified clinicians who can consider your individual history.",
  },
]

export default function RootCanalSafetyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Root Canal Safety: Evidence, Myths & Questions"
        description="Clear, evidence-based information to help you make an informed decision about your tooth."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Patient Resources", href: "/resources" },
              { name: "Root Canal Safety", href: "/resources/root-canal-safety" },
            ]}
          />

          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 text-brand-merlot mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-5">
                The evidence supports root canal treatment as a safe way to treat infection and save a natural tooth
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 leading-relaxed">
                Misinformation about root canals often repeats claims from an early twentieth-century theory that was
                later discredited. Modern endodontic care uses current imaging, infection-control practices, and
                evidence-based techniques. Your treatment decision should still be individualized after an examination
                and a discussion of benefits, alternatives, and risks.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <section aria-labelledby="myths-heading">
              <h2 id="myths-heading" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
                Common Claims, Put in Context
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {mythCards.map((card) => (
                  <article key={card.title} className="bg-white p-6 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                    <h3 className="font-serif text-xl text-brand-merlot mb-3">{card.title}</h3>
                    <p className="text-brand-dark-text/80 leading-relaxed">{card.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section className="bg-brand-cream p-6 sm:p-8 md:p-10 rounded-sm shadow-xl" aria-labelledby="aae-resources-heading">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <FileText className="w-10 h-10 text-brand-merlot mx-auto mb-3" aria-hidden="true" />
                  <h2 id="aae-resources-heading" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                    Read the AAE’s Updated Safety Resources
                  </h2>
                  <p className="text-base sm:text-lg text-brand-dark-text/80">
                    The American Association of Endodontists updated its Root Canal Safety Fact Sheet in 2026. The
                    stable safety hub below is the best starting point; the fact sheet and patient myths guide provide
                    more detail.
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-5">
                  <LinkButton
                    href={aaeRootCanalSafetyHubUrl}
                    variant="brand-primary"
                    className="h-auto min-h-14 whitespace-normal px-5 py-4 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    analyticsEvent={analyticsEvents.rootCanalSafetyClick}
                    analyticsLocation="safety_guide_aae_hub"
                  >
                    AAE Root Canal Safety Hub
                  </LinkButton>
                  <LinkButton
                    href={aaeRootCanalSafetyFactSheetUrl}
                    variant="brand-outline"
                    className="h-auto min-h-14 whitespace-normal px-5 py-4 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    analyticsEvent={analyticsEvents.rootCanalSafetyClick}
                    analyticsLocation="safety_guide_aae_fact_sheet"
                  >
                    2026 AAE Safety Fact Sheet (PDF)
                  </LinkButton>
                  <LinkButton
                    href={aaeRootCanalMythsUrl}
                    variant="brand-outline"
                    className="h-auto min-h-14 whitespace-normal px-5 py-4 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    analyticsEvent={analyticsEvents.rootCanalSafetyClick}
                    analyticsLocation="safety_guide_aae_myths"
                  >
                    AAE Myths About Root Canals
                  </LinkButton>
                </div>
                <p className="text-sm text-brand-dark-text/80 mt-6 text-center">
                  These resources are educational and do not replace individualized medical or dental advice.
                </p>
              </div>
            </section>
          </FadeInSection>

          <FadeInSection>
            <section aria-labelledby="faq">
              <div className="text-center mb-6">
                <MessageCircleQuestion className="w-9 h-9 text-brand-merlot mx-auto mb-3" aria-hidden="true" />
                <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot">
                  Root Canal Safety Questions
                </h2>
              </div>
              <FaqDetailsList items={faqItems} />
            </section>
          </FadeInSection>

          <FadeInSection className="text-center py-8 sm:py-12">
            <Stethoscope className="w-10 h-10 text-brand-merlot mx-auto mb-3" aria-hidden="true" />
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Discuss Your Specific Tooth With a Specialist</h2>
            <p className="text-base sm:text-lg text-brand-dark-text/80 mb-7 max-w-2xl mx-auto">
              An evaluation can clarify the diagnosis, whether the tooth can be saved, and which treatment options fit
              your situation. Submit a request and our team will contact you to confirm an available time.
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation="root_canal_safety_primary_cta"
            >
              Request an Appointment
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
