import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { FaqDetailsList } from "@/components/faq-details"
import { LinkButton } from "@/components/ui/link-button"
import { MedicalReviewByline } from "@/components/reviewed-by"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { buildMetadata } from "@/lib/seo"
import { analyticsEvents } from "@/lib/analytics"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, DollarSign, ShieldCheck, Wallet } from "lucide-react"

export const metadata = buildMetadata({
  title: "Root Canal Cost in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Understand what affects root canal cost in Santa Rosa, CA, including tooth type, crowns, insurance, and financing. Contact us for a personalized estimate.",
  path: "/resources/root-canal-cost",
})

type CostRange = {
  tooth: string
  range: string
  note: string
}

const costRanges: CostRange[] = [
  {
    tooth: "Front tooth (anterior)",
    range: "$700 – $1,100",
    note: "Front teeth usually have a single canal, so treatment is often more straightforward.",
  },
  {
    tooth: "Premolar (bicuspid)",
    range: "$800 – $1,300",
    note: "Premolars typically have one or two canals and fall in the middle of the range.",
  },
  {
    tooth: "Molar",
    range: "$1,000 – $1,600",
    note: "Molars often have three or more canals and more complex anatomy, which can increase cost.",
  },
]

const faqItems = [
  {
    question: "How much does a root canal cost?",
    answer:
      "Root canal fees vary from case to case, so the most accurate number comes from an exam. As a general guide, national estimates often fall around $700 to $1,100 for a front tooth, $800 to $1,300 for a premolar, and $1,000 to $1,600 for a molar. These are approximate ranges that change with tooth position, the number of canals, complexity, and whether the tooth needs retreatment. Fees in the Bay Area and California can run higher than national averages. A crown or other final restoration is usually a separate additional cost. We are happy to provide a personalized estimate before treatment begins.",
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
      "We understand that cost is an important part of your decision, and we want treatment to be manageable. Many patients use a combination of dental insurance benefits and payment options such as payment plans or third-party financing to spread out the cost of care. The right approach depends on your situation. Please contact our Santa Rosa office and our team can walk you through the available options and help you plan for your treatment.",
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
        title="Root Canal Cost & Insurance"
        description="A clear, general guide to what affects the cost of root canal treatment and how we can help you estimate your benefits."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Patient Resources", href: "/resources" },
              { name: "Root Canal Cost", href: "/resources/root-canal-cost" },
            ]}
          />

          <MedicalReviewByline date="July 2026" />

          {/* Intro */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                What Does a Root Canal Cost?
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                One of the first questions patients ask is what a root canal will cost. The honest answer is that it
                depends on the tooth and the details of your case, so the figures below are general U.S. estimates
                meant to help you plan rather than exact prices. The most accurate number comes from an examination,
                and we are always glad to provide a personalized estimate before treatment begins.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                For patients in Santa Rosa and throughout Sonoma County, it also helps to know that fees in the Bay
                Area and California can run higher than national averages. Below, we explain the factors that typically
                influence cost, how insurance often works, and the options that may make treatment more manageable.
              </p>
            </div>
          </FadeInSection>

          {/* General cost ranges */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4 text-center">
              General Cost Ranges by Tooth
            </h2>
            <p className="text-brand-dark-text/80 text-center max-w-3xl mx-auto mb-8">
              These are approximate national estimates that vary by case and region. They do not reflect a quote from
              our office. A crown or other final restoration is usually a separate, additional cost.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {costRanges.map((item) => (
                <div key={item.tooth} className="bg-brand-cream p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <h3 className="font-serif text-xl text-brand-merlot mb-2">{item.tooth}</h3>
                  <p className="text-2xl font-semibold text-brand-dark-text mb-3">{item.range}</p>
                  <p className="text-sm text-brand-dark-text/80">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-brand-dark-text/80 mt-6 text-center max-w-3xl mx-auto">
              Ranges are general estimates and can change based on your specific tooth, symptoms, and treatment plan.
              Please contact our office for a personalized estimate.
            </p>
          </FadeInSection>

          {/* Factors that affect cost */}
          <FadeInSection className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
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
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3 text-center">
              The Final Crown or Restoration Is Usually Separate
            </h2>
            <p className="text-base text-brand-dark-text/80 text-center max-w-3xl mx-auto">
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
                We want treatment to be manageable. Many patients combine their insurance benefits with payment
                options such as payment plans or third-party financing to spread out the cost of care over time.
              </p>
              <p className="text-brand-dark-text/80">
                The right approach depends on your situation. Please reach out and our team can walk you through the
                options that may work for you.
              </p>
            </div>
          </FadeInSection>

          {/* Save your natural tooth */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="max-w-3xl mx-auto text-center">
              <DollarSign className="w-10 h-10 text-brand-merlot mx-auto mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
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
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="rounded-sm border-l-4 border-brand-rose-beige bg-brand-cream/60 px-5 py-4">
              <p className="text-sm text-brand-dark-text/80">
                This information is educational and does not replace an individual cost estimate or dental advice. The
                figures on this page are general ranges that vary by case and region. For a number specific to your
                tooth and treatment plan, please contact our Santa Rosa office.
              </p>
            </div>
          </FadeInSection>

          {/* FAQ */}
          <FadeInSection>
            <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Sources */}
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg">
              <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Sources & Further Reading</h2>
              <p className="text-sm text-brand-dark-text/80 mb-4">
                For authoritative, patient-focused information about endodontic treatment and the value of saving your
                natural tooth, see the American Association of Endodontists (AAE):
              </p>
              <ul className="space-y-3">
                <li className="border-l-4 border-brand-cream pl-4">
                  <a
                    href="https://www.aae.org/patients/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                  >
                    AAE Patient Resources
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
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4 text-center">
              Related Patient Resources
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
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
            <div className="mt-6 text-center">
              <Link href="/resources" className="inline-flex items-center text-brand-merlot hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Patient Resources
              </Link>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
              Get a Personalized Estimate
            </h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              The best way to understand your cost is a consultation. We can evaluate your tooth, review your insurance
              benefits, and discuss options so you can plan for treatment with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="root_canal_cost_primary_cta"
              >
                Request an Appointment
              </LinkButton>
              <LinkButton
                href="tel:+17075233636"
                variant="brand-outline"
                size="lg"
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="root_canal_cost_phone"
              >
                Call (707) 523-3636
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
