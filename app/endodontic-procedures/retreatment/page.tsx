import { ServicePageLayout } from "@/components/service-page/service-page-layout"
import { AlertTriangle, RefreshCw, Clock, Target, Shield } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import Link from "next/link"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { buildMetadata } from "@/lib/seo"
import type { QuickAnswer } from "@/components/quick-answers"
import type { OnThisPageItem } from "@/components/on-this-page"

export const metadata = buildMetadata({
  title: "Santa Rosa Root Canal Retreatment | Wine Country Root Canal",
  description:
    "If a previous root canal still hurts or shows infection, Dr. Anderson offers expert root canal retreatment in Santa Rosa, CA to save your natural tooth.",
  path: "/endodontic-procedures/retreatment",
  ogTitle: "Root Canal Retreatment in Santa Rosa, CA",
  ogDescription:
    "Expert retreatment for previously treated teeth that haven’t healed. Get specialist care in Santa Rosa, CA.",
})

export default function RetreatmentPage() {
  const faqItems = [
    {
      question: "Why would I need root canal retreatment?",
      answer:
        "Even after a well-done root canal, a tooth can develop a new infection or fail to heal completely. Retreatment may be needed if there are tiny canals that were hard to clean the first time, a crack or leak allows bacteria back in, or a restoration was delayed or broke down. New decay around a crown or filling can also re-infect the canals. Retreatment lets us reopen the tooth, remove old filling material, disinfect thoroughly, and reseal it to give the tooth a second chance.",
    },
    {
      question: "How successful is root canal retreatment?",
      answer:
        "Retreatment is very successful for many teeth, often in the 85–90% range. The exact outcome depends on the reason the first treatment failed, how long the infection has been present, and the tooth’s overall structure and restoration. Using microscopes and 3D imaging helps us find hidden canals and treat complex anatomy. We’ll review your X-rays and symptoms and explain your specific prognosis before starting so you know what to expect.",
    },
    {
      question: "Is retreatment more painful than the original root canal?",
      answer:
        "Most patients find retreatment no more uncomfortable than the original root canal. We numb the area thoroughly and can use additional comfort measures if needed. During the visit you should feel pressure, not pain. Afterward, it’s common to have mild tenderness for a few days as the tooth and surrounding tissues settle. This is usually manageable with ibuprofen or similar medication. If discomfort increases or swelling develops, let us know so we can evaluate you promptly.",
    },
    {
      question: "How long does retreatment take?",
      answer:
        "Retreatment usually takes one to three visits, depending on how complex the tooth is and how much infection is present. Each appointment typically lasts about 60–90 minutes. Because we must remove the previous filling material and carefully re-clean the canals, retreatment can take longer than an initial root canal. If a tooth is very inflamed or has a large abscess, we may place medication inside the tooth between visits to ensure thorough healing before final sealing.",
    },
    {
      question: "What are the alternatives to retreatment?",
      answer:
        "If retreatment isn’t the right option, alternatives include apicoectomy (root-end surgery) to address infection at the tip of the root, or extraction. After extraction, replacement choices may include a dental implant, bridge, or partial denture. We always aim to preserve natural teeth when it’s predictable, but sometimes removal is the healthiest path. Dr. Anderson will review your imaging and explain which option offers the best long-term result for your tooth and overall oral health.",
    },
    {
      question: "Will my insurance cover retreatment?",
      answer:
        "Many dental insurance plans provide coverage for retreatment, but benefits vary by plan and by how recently the original root canal was completed. Our office will verify your benefits, explain any expected out-of-pocket costs, and help you understand your options before treatment begins. If you don’t have coverage or have limited benefits, we can discuss payment arrangements. We want you to feel comfortable moving forward with a clear financial picture.",
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

  const quickAnswers: QuickAnswer[] = [
    {
      question: "Why would I need retreatment?",
      answer:
        "A tooth can develop a new infection or fail to heal completely after a previous root canal. Retreatment reopens the tooth, disinfects the canals, and reseals them.",
      href: "#faq",
      linkLabel: "Read the full answer",
    },
    {
      question: "How long does it take?",
      answer:
        "Retreatment usually takes one to three visits. Each appointment typically lasts about 60–90 minutes.",
      href: "#faq",
      linkLabel: "Read about timing",
    },
    {
      question: "Will it hurt?",
      answer:
        "Most patients find retreatment no more uncomfortable than the original root canal. You should feel pressure, not pain, during the visit.",
      href: "#faq",
      linkLabel: "Read about comfort",
    },
    {
      question: "What does it cost?",
      answer:
        "Benefits vary by plan. Our office verifies coverage and explains expected out-of-pocket costs before treatment begins.",
      href: "#faq",
      linkLabel: "Read about insurance",
    },
    {
      question: "Where are you?",
      answer: "4655 Hoen Ave, Suite 2, Santa Rosa. Open Monday–Thursday, 8 AM–5 PM.",
      href: "/your-visit",
      linkLabel: "See what to expect at your visit",
    },
  ]

  const onThisPage: OnThisPageItem[] = [
    { id: "what-is-retreatment", label: "What is retreatment?" },
    { id: "why-see-an-endodontist", label: "Why see an endodontist" },
    { id: "when-you-need-it", label: "When you need it" },
    { id: "retreatment-process", label: "The process" },
    { id: "faq", label: "Frequently asked questions" },
    { id: "request-appointment", label: "Request an appointment" },
  ]

  return (
    <ServicePageLayout
      title="Root Canal Retreatment"
      subtitle="Advanced endodontic care to address complications and save your previously treated tooth with expert precision."
      intro={
        <p>
          Dr. Anderson provides root canal retreatment at Wine Country Root Canal in{" "}
          <strong className="font-semibold">Santa Rosa</strong>, CA, for patients from across{" "}
          <strong className="font-semibold">Sonoma County</strong>. Retreatment addresses a previously treated tooth
          that still needs care.
        </p>
      }
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Endodontic Procedures", href: "/endodontic-procedures" },
        { name: "Root Canal Retreatment", href: "/endodontic-procedures/retreatment" },
      ]}
      analyticsLocation="retreatment"
      medicalReviewPath="/endodontic-procedures/retreatment"
      jsonLd={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      quickAnswers={quickAnswers}
      onThisPage={onThisPage}
      faqItems={faqItems}
      cta={{
        title: "Experiencing Problems with a Previous Root Canal?",
        description:
          "Don’t give up on your tooth. Dr. Anderson’s expertise in complex retreatment cases can often resolve complications and save your natural tooth. Request an evaluation to explore your options.",
        analyticsLocation: "retreatment_primary_cta",
        after: (
          <p className="mt-6 text-center text-sm text-brand-dark-text/80 sm:text-base">
            <Link href="/endodontic-procedures/signs-symptoms" className="text-brand-merlot underline hover:text-brand-rose-beige">
              Learn about warning signs
            </Link>
          </p>
        ),
      }}
      beforeShared={
        <>
          <FadeInSection>
            <div className="mx-auto max-w-4xl [&>p]:max-w-3xl">
              <h2 id="what-is-retreatment" className="mb-4 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl">
                What is Root Canal Retreatment?
              </h2>
              <p className="mb-6 text-base text-brand-dark-text/80 sm:text-lg">
                Root canal retreatment is a procedure to address complications or new problems in a tooth that has
                previously received root canal therapy. While initial root canal treatment has a high success rate,
                sometimes additional treatment is needed to save the tooth.
              </p>
              <p className="text-base text-brand-dark-text/80 sm:text-lg">
                Dr. Anderson specializes in complex retreatment cases, using advanced techniques and technology to give
                your tooth the best possible chance for long-term success.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection className="mx-auto max-w-4xl rounded-sm bg-white p-6 shadow-sm md:p-8">
            <p className="text-center text-base text-brand-dark-text/80 sm:text-lg">
              Retreatment cases are one of the most common reasons an endodontist may recommend{" "}
              <Link
                href="/cbct-scanner-santa-rosa"
                className="text-brand-merlot underline hover:text-brand-rose-beige"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "retreatment_cbct")}
              >
                cone beam CT imaging
              </Link>{" "}
              when additional three-dimensional detail could change the diagnosis or plan.
            </p>
          </FadeInSection>
        </>
      }
      afterShared={
        <>
          <FadeInSection className="rounded-sm bg-white p-6 shadow-xl sm:p-8 md:p-12">
            <h2 id="when-you-need-it" className="mb-6 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl">
              Signs You May Need Root Canal Retreatment
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-serif text-xl text-brand-dark-text">Common Symptoms:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-rose-beige" />
                    <span className="text-brand-dark-text/80">Pain or discomfort in a previously treated tooth</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-rose-beige" />
                    <span className="text-brand-dark-text/80">Sensitivity to hot or cold temperatures</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-rose-beige" />
                    <span className="text-brand-dark-text/80">Swelling or tenderness in nearby gums</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-rose-beige" />
                    <span className="text-brand-dark-text/80">Discoloration of the treated tooth</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-rose-beige" />
                    <span className="text-brand-dark-text/80">Recurring abscess or infection</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-serif text-xl text-brand-dark-text">Common Causes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <RefreshCw className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                    <span className="text-brand-dark-text/80">Narrow or curved canals not fully cleaned initially</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                    <span className="text-brand-dark-text/80">Complicated canal anatomy that was missed</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                    <span className="text-brand-dark-text/80">New decay exposing the root canal filling</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                    <span className="text-brand-dark-text/80">Delayed crown placement allowing reinfection</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="mr-3 mt-1 h-5 w-5 shrink-0 text-brand-merlot" />
                    <span className="text-brand-dark-text/80">Fracture in the tooth or restoration</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <h2
              id="retreatment-process"
              className="mb-8 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl"
            >
              The Retreatment Process: Step by Step
            </h2>
            <ol className="mx-auto max-w-4xl space-y-6">
              {[
                {
                  step: "Comprehensive Evaluation:",
                  description:
                    "Dr. Anderson will examine your tooth and take new X-rays or 3D imaging to determine the cause of the problem and assess whether retreatment is the best option for your specific case.",
                },
                {
                  step: "Accessing the Tooth:",
                  description:
                    "The crown and filling materials are carefully removed to access the root canal space. This may require removing posts, cores, or other restorative materials that were placed after the initial treatment.",
                },
                {
                  step: "Removing Previous Filling:",
                  description:
                    "The previous root canal filling material is meticulously removed to expose the entire canal system for thorough examination and cleaning. This step requires precision and patience.",
                },
                {
                  step: "Thorough Cleaning & Disinfection:",
                  description:
                    "The canals are thoroughly cleaned, disinfected, and shaped using advanced techniques. Any additional canals that may have been missed initially are located and treated.",
                },
                {
                  step: "New Root Canal Filling:",
                  description:
                    "After ensuring the canals are completely clean and free of infection, they are filled with fresh biocompatible material and sealed to prevent future bacterial contamination.",
                },
                {
                  step: "Temporary Restoration:",
                  description:
                    "A temporary filling is placed to protect the tooth. You'll return to your general dentist for a permanent restoration, typically a crown, to protect and strengthen the tooth.",
                },
              ].map((item, index) => (
                <li key={item.step} className="flex">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-rose-beige font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-brand-dark-text sm:text-lg">{item.step}</h3>
                    <p className="text-sm text-brand-dark-text/80 sm:text-base">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeInSection>

          <FadeInSection className="grid gap-8 md:grid-cols-2">
            <div className="rounded-sm bg-white p-6 shadow-lg md:p-8">
              <Target className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">Second Chance for Success</h3>
              <p className="text-brand-dark-text/80">
                Retreatment gives your tooth another opportunity to heal properly. With Dr. Anderson’s advanced
                techniques and technology, we can often address issues that weren’t resolved in the initial treatment,
                providing your tooth with the best chance for long-term success.
              </p>
            </div>
            <div className="rounded-sm bg-white p-6 shadow-lg md:p-8">
              <Shield className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">Preserve Your Natural Tooth</h3>
              <p className="text-brand-dark-text/80">
                Retreatment is often more cost-effective than tooth extraction followed by replacement with an implant
                or bridge. It preserves your natural tooth structure, maintains proper bite function, and avoids more
                complex procedures.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection className="rounded-sm bg-white p-8 shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-brand-merlot">Recovery & Aftercare</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <Clock className="mx-auto mb-3 h-12 w-12 text-brand-rose-beige" />
                <h3 className="mb-2 font-semibold text-brand-dark-text">Immediate Recovery</h3>
                <p className="text-sm text-brand-dark-text/80">
                  Most patients experience minimal discomfort and can return to normal activities within 24-48 hours.
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="mx-auto mb-3 h-12 w-12 text-brand-rose-beige" />
                <h3 className="mb-2 font-semibold text-brand-dark-text">Healing Process</h3>
                <p className="text-sm text-brand-dark-text/80">
                  Complete healing typically takes several months. We’ll monitor your progress with follow-up
                  appointments.
                </p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-3 h-12 w-12 text-brand-rose-beige" />
                <h3 className="mb-2 font-semibold text-brand-dark-text">Long-term Care</h3>
                <p className="text-sm text-brand-dark-text/80">
                  With proper care and a permanent restoration, your retreated tooth can last a lifetime.
                </p>
              </div>
            </div>
          </FadeInSection>
        </>
      }
    />
  )
}
