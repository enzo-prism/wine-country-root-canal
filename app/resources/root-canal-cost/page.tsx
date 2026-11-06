import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { OnThisPage } from "@/components/on-this-page"
import { AppointmentCta } from "@/components/appointment-cta"
import { FadeInSection } from "@/components/fade-in-section"
import { FaqDetailsList } from "@/components/faq-details"
import { PatientEducationNote } from "@/components/patient-education-note"
import { buildMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, DollarSign, ShieldCheck, Wallet } from "lucide-react"

export const metadata = buildMetadata({
  title: "Root Canal Cost in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Understand what affects root canal cost in Santa Rosa, CA, including tooth type, crowns, insurance, and financing. Contact us for a personalized estimate.",
  path: "/resources/root-canal-cost",
})

type ToothCostFactor = {
  tooth: string
  complexity: string
  note: string
}

const toothCostFactors: ToothCostFactor[] = [
  {
    tooth: "Front tooth (anterior)",
    complexity: "Often less complex",
    note: "Front teeth usually have a single canal, so treatment is often more straightforward.",
  },
  {
    tooth: "Premolar (bicuspid)",
    complexity: "Depends on canal anatomy",
    note: "Premolars can have more than one canal; the anatomy helps determine the treatment needed.",
  },
  {
    tooth: "Molar",
    complexity: "Often more complex",
    note: "Molars often have three or more canals and more complex anatomy, which can increase cost.",
  },
]

const faqItems = [
  {
    question: "How much does a root canal cost?",
    answer:
      "Wine Country Root Canal provides a personalized estimate after evaluating your tooth. The fee depends on tooth type, canal anatomy, diagnostic needs, and whether this is first-time treatment or retreatment. Ask which examination, imaging, and treatment fees are included. A crown or other final restoration by your general dentist is usually a separate cost. Call our Santa Rosa office to discuss the estimate process and your insurance questions; this page does not publish an office fee schedule.",
  },
  {
    question: "Does dental insurance cover root canals?",
    answer:
      "Many dental plans cover a portion of endodontic treatment, though the exact percentage and any deductible depend on your specific policy. Plans also often have an annual maximum, which is the most the plan will pay toward your care in a year. Coverage for the separate crown may differ from coverage for the root canal itself. Our team can help review your benefits and give you an estimate of what your plan may cover before you decide on treatment, so there are fewer surprises.",
  },
  {
    question: "Why does a molar root canal cost more than a front tooth?",
    answer:
      "A molar typically has more canals, curved roots, and more complex anatomy than a front tooth, which usually has a single canal. Treating a molar can take more time and require more detailed instrumentation, so the fee is often higher. The exact difference depends on your tooth and situation. We can explain what factors apply to your case and provide an estimate after an evaluation.",
  },
  {
    question: "Is a root canal cheaper than a tooth extraction and implant?",
    answer:
      "In many cases, saving your natural tooth with a root canal is more cost-effective over the long term than removing the tooth and replacing it. Extraction is sometimes less expensive up front, but a dental implant or bridge to replace a missing tooth often adds significant additional cost and time. Keeping your natural tooth also helps maintain normal function and neighboring teeth. The best choice depends on your specific tooth, and we can discuss the options and estimated costs with you.",
  },
  {
    question: "Do you offer payment plans or financing?",
    answer:
      "We understand that cost is an important part of your decision, and we want treatment to be manageable. Please contact our Santa Rosa office to ask which payment arrangements are currently available, when payment is due, and whether any third-party financing applies to your case. Availability and terms need to be confirmed with the office; this guide does not guarantee financing or name an unverified provider.",
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Root Canal Cost & Insurance in Santa Rosa, CA"
        description="A clear, general guide to what affects the cost of root canal treatment and how we can help you estimate your benefits."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Patient Resources", href: "/resources" },
          { name: "Root Canal Cost", href: "/resources/root-canal-cost" },
        ]}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* One max-w-4xl column shared with the page header, so every section starts on the same left edge. */}
          <div className="mx-auto max-w-4xl space-y-12 md:space-y-20">
            <PatientEducationNote path="/resources/root-canal-cost" />

            <OnThisPage
              items={[
                { id: "what-does-it-cost", label: "What does a root canal cost?" },
                { id: "estimate-checklist", label: "Get a useful estimate" },
                { id: "cost-ranges", label: "Tooth type and complexity" },
                { id: "cost-factors", label: "What affects the cost" },
                { id: "final-restoration", label: "The final restoration" },
                { id: "cost-effectiveness", label: "Long-term value" },
                { id: "faq", label: "Frequently asked questions" },
              ]}
            />

            {/* Intro */}
            <FadeInSection>
              <div className="mx-auto max-w-4xl [&>p]:max-w-3xl">
                <h2 id="what-does-it-cost" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                  What Does a Root Canal Cost?
                </h2>
                <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                  One of the first questions patients ask is what a root canal will cost. The honest answer is that it
                  depends on the tooth and the details of your case. Wine Country Root Canal provides a personalized
                  estimate after evaluating your tooth. We do not publish a practice fee schedule on this page.
                  A price found online may not include the examination, imaging, or final crown.
                </p>
                <p className="text-base sm:text-lg text-brand-dark-text/80">
                  For care at our Santa Rosa office, call (707) 523-3636 to discuss the estimate process and the
                  insurance information to bring. Below are specific questions to ask before deciding on treatment.
                </p>
              </div>
            </FadeInSection>

            <section id="estimate-checklist" className="scroll-mt-28 rounded-sm bg-white p-6 shadow-lg sm:p-8" aria-labelledby="estimate-heading">
              <h2 id="estimate-heading" className="mb-4 font-serif text-2xl text-brand-merlot">Get a Clear Estimate Before Treatment</h2>
              <ol className="list-decimal space-y-3 pl-5 text-brand-dark-text/80">
                <li>Tell us which tooth your dentist referred and whether it has had a root canal before. If you are in pain, call first.</li>
                <li>Ask for an itemized estimate: examination, X-rays or CBCT when indicated, treatment, and any follow-up fees.</li>
                <li>Confirm your specific plan, network status, deductible, annual maximum, and estimated patient portion with the office and your insurer.</li>
                <li>Ask your general dentist separately about the final filling or crown. Confirm payment timing and available payment arrangements before care.</li>
              </ol>
              <p className="mt-4 text-sm text-brand-dark-text/80">Insurance benefits are estimates, not a guarantee of payment. Coverage and in-network participation are different questions.</p>
              <div className="mt-6">
                <AppointmentCta title="Ask About Your Estimate" description="Call our Santa Rosa team or request an appointment. Our team will follow up to confirm an available time." analyticsLocation="root_canal_cost_estimate" showVisitLink />
              </div>
            </section>

            {/* Tooth complexity, without unsupported national price ranges. */}
            <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
              <h2 id="cost-ranges" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                How Tooth Type Affects Treatment Cost
              </h2>
              <p className="text-brand-dark-text/80 max-w-3xl mb-8">
                Tooth type is one part of an estimate. Anatomy and prior treatment also matter, so these descriptions
                are not prices or a quote for your tooth.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {toothCostFactors.map((item) => (
                  <div key={item.tooth} className="bg-brand-cream p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                    <h3 className="font-serif text-xl text-brand-merlot mb-2">{item.tooth}</h3>
                    <p className="text-lg font-semibold text-brand-dark-text mb-3">{item.complexity}</p>
                    <p className="text-sm text-brand-dark-text/80">{item.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-brand-dark-text/80 mt-6 max-w-3xl">
                The American Association of Endodontists explains why tooth type, complexity, and restoration affect
                cost. Your individual estimate comes from an evaluation.
              </p>
            </FadeInSection>

            {/* Factors that affect cost */}
            <FadeInSection className="max-w-4xl mx-auto">
              <h2 id="cost-factors" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
                What Affects the Cost of a Root Canal?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl text-brand-dark-text mb-4">Common Factors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>Tooth type and position.</strong> A front tooth typically costs less than a molar
                        because it usually has fewer canals.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>Number of canals.</strong> More canals often mean more time and steps to clean and seal
                        the tooth thoroughly.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>Complexity of the anatomy.</strong> Curved roots, calcified canals, or extra anatomy can
                        make treatment more involved.
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-brand-dark-text mb-4">Case-Specific Factors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>First-time treatment vs. retreatment.</strong> A previously treated tooth that needs{" "}
                        <Link href="/endodontic-procedures/retreatment" className="text-brand-merlot hover:text-brand-rose-beige underline">
                          retreatment
                        </Link>{" "}
                        may involve additional steps.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>Whether a crown is needed.</strong> The final restoration is usually a separate cost
                        from the root canal itself.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                      <span className="text-brand-dark-text/80">
                        <strong>Diagnostic needs.</strong> Additional imaging, when indicated, can be part of planning
                        more complex cases.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeInSection>

            {/* The separate crown cost */}
            <FadeInSection className="bg-white shadow-sm p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
              <h2 id="final-restoration" className="scroll-mt-24 font-serif text-xl md:text-2xl text-brand-merlot mb-3">
                The Final Crown or Restoration Is Usually Separate
              </h2>
              <p className="text-base text-brand-dark-text/80 max-w-3xl">
                After{" "}
                <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  root canal therapy
                </Link>
                , many teeth, especially molars, need a crown or other permanent restoration to protect the tooth and
                restore full function. This restoration is typically completed by your general dentist and is usually
                billed as a separate fee. When you compare estimates, it can help to think of the root canal and the
                final restoration as two related but distinct costs.
              </p>
            </FadeInSection>

            {/* Insurance & financing */}
            <FadeInSection className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg">
                <ShieldCheck className="w-10 h-10 text-brand-merlot mb-3" />
                <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Dental Insurance</h3>
                <p className="text-brand-dark-text/80 mb-4">
                  Many dental plans cover a percentage of endodontic treatment, though the exact amount depends on your
                  policy, any deductible, and your plan&apos;s annual maximum. Coverage for the separate crown may differ
                  from coverage for the root canal itself.
                </p>
                <p className="text-brand-dark-text/80">
                  Our team can help review your benefits and estimate what your plan may cover before treatment, so you
                  can make an informed decision with fewer surprises.
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg">
                <Wallet className="w-10 h-10 text-brand-merlot mb-3" />
                <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Financing & Payment Options</h3>
                <p className="text-brand-dark-text/80 mb-4">
                  Before treatment, ask our team which payment arrangements are currently available and when payment
                  is due. If financing is available for your case, ask for the provider, eligibility, and full terms.
                </p>
                <p className="text-brand-dark-text/80">
                  This guide does not promise approval, a particular financing product, or specific payment terms.
                  Please confirm the arrangements directly with our Santa Rosa office.
                </p>
              </div>
            </FadeInSection>

            {/* Save your natural tooth */}
            <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
              <div className="mx-auto max-w-4xl [&>p]:max-w-3xl">
                <DollarSign className="w-10 h-10 text-brand-merlot mb-4" />
                <h2 id="cost-effectiveness" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                  Saving Your Natural Tooth Is Often More Cost-Effective
                </h2>
                <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                  When you look only at the up-front fee, an extraction can sometimes seem less expensive than a root
                  canal. Over the long term, however, saving your natural tooth is often the more cost-effective choice.
                  Removing a tooth usually leads to a follow-up decision about how to replace it, and replacements such
                  as a dental implant or bridge can add significant additional cost and treatment time.
                </p>
                <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                  Keeping your own tooth also helps maintain normal chewing, appearance, and the alignment of neighboring
                  teeth. For many patients, a root canal followed by a crown is a durable, long-lasting way to preserve a
                  tooth that would otherwise be lost.
                </p>
                <Link
                  href="/resources/root-canal-vs-extraction"
                  className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                >
                  Compare root canal vs. extraction &rarr;
                </Link>
              </div>
            </FadeInSection>

            {/* Educational caveat */}
            <FadeInSection>
              <div className="rounded-sm border-l-4 border-brand-rose-beige bg-white shadow-sm px-5 py-4">
                <p className="text-sm text-brand-dark-text/80">
                  This information is educational and does not replace an individual cost estimate or dental advice. The
                  information on this page describes cost factors, not a quote or a guarantee of insurance benefits.
                  For an estimate specific to your tooth and treatment plan, please contact our Santa Rosa office.
                </p>
              </div>
            </FadeInSection>

            {/* FAQ */}
            <FadeInSection className="mx-auto max-w-4xl">
              <h2 id="faq" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
                Frequently Asked Questions
              </h2>
              <FaqDetailsList items={faqItems} />
            </FadeInSection>

            {/* Sources */}
            <FadeInSection>
              <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg">
                <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Sources & Further Reading</h2>
                <p className="text-sm text-brand-dark-text/80 mb-4">
                  For authoritative, patient-focused information about endodontic treatment and the value of saving your
                  natural tooth, see the American Association of Endodontists (AAE):
                </p>
                <ul className="space-y-3">
                  <li className="border-l-4 border-brand-cream pl-4">
                    <a
                      href="https://www.aae.org/patients/root-canal-treatment/root-canal-cost/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                    >
                      AAE Root Canal Cost Guide
                    </a>
                    <p className="text-sm text-brand-dark-text/80 mt-1">American Association of Endodontists</p>
                  </li>
                  <li className="border-l-4 border-brand-cream pl-4">
                    <a
                      href="https://www.aae.org/patients/root-canal-treatment/saving-natural-tooth/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                    >
                      Saving Your Natural Tooth
                    </a>
                    <p className="text-sm text-brand-dark-text/80 mt-1">AAE Patient Education</p>
                  </li>
                </ul>
              </div>
            </FadeInSection>

            {/* Cross-links */}
            <FadeInSection className="bg-white shadow-sm p-6 md:p-8 rounded-sm">
              <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4">
                Related Patient Resources
              </h2>
              <div className="flex flex-wrap gap-4 text-sm md:text-base">
                <Link href="/resources/root-canal-vs-extraction" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  Root Canal vs. Extraction
                </Link>
                <span className="text-brand-dark-text/40">•</span>
                <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  Root Canal Therapy
                </Link>
                <span className="text-brand-dark-text/40">•</span>
                <Link href="/endodontic-procedures/retreatment" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  Root Canal Retreatment
                </Link>
                <span className="text-brand-dark-text/40">•</span>
                <Link href="/contact" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  Contact Our Office
                </Link>
              </div>
              <div className="mt-6">
                <Link href="/resources" className="inline-flex items-center text-brand-merlot hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Patient Resources
                </Link>
              </div>
            </FadeInSection>

            {/* CTA */}
            <FadeInSection>
              <AppointmentCta
                id="request-appointment"
                title="Get a Personalized Estimate"
                description="The best way to understand your cost is a consultation. We can evaluate your tooth, review your insurance benefits, and discuss options so you can plan for treatment with confidence."
                analyticsLocation="root_canal_cost_primary_cta"
                phoneAnalyticsLocation="root_canal_cost_phone"
                showVisitLink
              />
            </FadeInSection>
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
