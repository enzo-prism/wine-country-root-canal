import { ServicePageLayout } from "@/components/service-page/service-page-layout"
import { AlertTriangle, Target, Shield } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import Link from "next/link"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { buildMetadata } from "@/lib/seo"
import type { QuickAnswer } from "@/components/quick-answers"
import type { OnThisPageItem } from "@/components/on-this-page"

export const metadata = buildMetadata({
  title: "Apicoectomy (Root-End Surgery) | Santa Rosa, CA Endodontist",
  description:
    "Apicoectomy is a microsurgical solution when a root canal can’t fully resolve infection. Learn about root-end surgery at our Santa Rosa, CA endodontic practice.",
  path: "/endodontic-procedures/apicoectomy",
  ogTitle: "Apicoectomy in Santa Rosa, CA",
  ogDescription:
    "Root-end surgery to save teeth when standard root canal treatment isn’t enough. Santa Rosa, CA.",
})

export default function ApicoectomyPage() {
  const faqItems = [
    {
      question: "What is an apicoectomy?",
      answer:
        "An apicoectomy, also called root-end surgery, is a small procedure that removes the very tip of a tooth’s root and the surrounding inflamed or infected tissue. It’s usually recommended when a tooth has already had a root canal but symptoms persist because the infection is trapped at the root end or the anatomy makes retreatment difficult. The goal is to save your natural tooth by sealing the root from the outside and allowing the area to heal.",
    },
    {
      question: "How is an apicoectomy different from a root canal?",
      answer:
        "A root canal treats infection from inside the tooth by cleaning and sealing the canals. An apicoectomy approaches the problem from the outside, through the gum and bone, to remove infection at the root tip. This is helpful when a previous root canal can’t be effectively redone, or when there is a hidden canal, blockage, or persistent lesion. In many cases, apicoectomy is the final step to resolve infection and keep the tooth functional long-term.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "The procedure is done with local anesthesia, and we make sure you are completely numb before we begin. Most patients feel pressure but not pain during surgery. Afterward, it’s normal to have mild soreness or swelling for a few days. This is typically well controlled with over-the-counter pain relievers or medications we recommend. We’ll provide clear post-operative instructions so you know what to expect and when to call us.",
    },
    {
      question: "How long is the recovery time?",
      answer:
        "Most people return to normal activities within 2–3 days, although you may want to take it easy the first 24 hours. Swelling and tenderness usually peak around day two and then improve. The gum tissue generally heals over 1–2 weeks, while the bone around the root tip heals more gradually over a few months. We’ll check your progress at follow-up visits and coordinate with your general dentist for any needed restorations.",
    },
    {
      question: "What is the success rate?",
      answer:
        "Apicoectomy success rates are high—often in the 85–95% range—especially when performed with modern microsurgical techniques. Success depends on factors like the size of the infection, the tooth’s anatomy, and the quality of the existing root canal and restoration. Our goal is long-term healing and comfort, so we evaluate the tooth carefully before recommending surgery. When successful, apicoectomy can prevent extraction and preserve your natural bite.",
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
      question: "What is an apicoectomy?",
      answer:
        "Root-end surgery that removes the tip of a tooth’s root and nearby infected tissue when a previous root canal has not fully resolved the problem.",
      href: "#faq",
      linkLabel: "Read the full answer",
    },
    {
      question: "Will it hurt?",
      answer:
        "The procedure is done with local anesthesia. Most patients feel pressure but not pain during surgery.",
      href: "#faq",
      linkLabel: "Read about comfort",
    },
    {
      question: "How long is recovery?",
      answer: "Most people return to normal activities within 2–3 days. Gum tissue generally heals over 1–2 weeks.",
      href: "#faq",
      linkLabel: "Read about recovery",
    },
    {
      question: "Where are you?",
      answer: "4655 Hoen Ave, Suite 2, Santa Rosa. Open Monday–Thursday, 8 AM–5 PM.",
      href: "/your-visit",
      linkLabel: "See what to expect at your visit",
    },
  ]

  const onThisPage: OnThisPageItem[] = [
    { id: "when-you-need-it", label: "When you might need it" },
    { id: "why-see-an-endodontist", label: "Why see an endodontist" },
    { id: "the-procedure", label: "What to expect" },
    { id: "faq", label: "Frequently asked questions" },
    { id: "request-appointment", label: "Request an appointment" },
  ]

  return (
    <ServicePageLayout
      title="Apicoectomy"
      subtitle="Precise surgical treatment to save your tooth when conventional root canal therapy isn't sufficient."
      intro={
        <p>
          Dr. Anderson provides apicoectomy (root-end surgery) at Wine Country Root Canal in{" "}
          <strong className="font-semibold">Santa Rosa</strong>, CA, for patients from across{" "}
          <strong className="font-semibold">Sonoma County</strong>. This procedure is used when conventional root canal
          therapy isn&apos;t sufficient.
        </p>
      }
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Endodontic Procedures", href: "/endodontic-procedures" },
        { name: "Apicoectomy", href: "/endodontic-procedures/apicoectomy" },
      ]}
      analyticsLocation="apicoectomy"
      medicalReviewPath="/endodontic-procedures/apicoectomy"
      jsonLd={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      quickAnswers={quickAnswers}
      onThisPage={onThisPage}
      faqItems={faqItems}
      cta={{
        title: "Need Expert Endodontic Surgery?",
        description:
          "Dr. Anderson’s expertise in microsurgical techniques can help save your tooth. Request a consultation to discuss your options.",
        analyticsLocation: "apicoectomy_primary_cta",
      }}
      beforeShared={
        <>
          <FadeInSection>
            <div className="mx-auto max-w-4xl [&>p]:max-w-3xl">
              <h2 id="when-you-need-it" className="mb-4 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl">
                When Might You Need an Apicoectomy?
              </h2>
              <p className="mb-6 text-base text-brand-dark-text/80 sm:text-lg">
                An apicoectomy may be recommended when conventional root canal treatment hasn’t fully resolved the
                problem or isn’t possible due to anatomical factors.
              </p>
              <ul className="inline-block space-y-3 text-left text-base sm:text-lg">
                <li className="flex items-start">
                  <AlertTriangle aria-hidden="true" className="mr-3 mt-1 h-6 w-6 shrink-0 text-brand-rose-beige" />
                  Persistent infection after root canal treatment
                </li>
                <li className="flex items-start">
                  <AlertTriangle aria-hidden="true" className="mr-3 mt-1 h-6 w-6 shrink-0 text-brand-rose-beige" />
                  Cyst or abscess at the root tip
                </li>
                <li className="flex items-start">
                  <AlertTriangle aria-hidden="true" className="mr-3 mt-1 h-6 w-6 shrink-0 text-brand-rose-beige" />
                  Blocked or calcified root canals
                </li>
                <li className="flex items-start">
                  <AlertTriangle aria-hidden="true" className="mr-3 mt-1 h-6 w-6 shrink-0 text-brand-rose-beige" />
                  Fractured root tip
                </li>
                <li className="flex items-start">
                  <AlertTriangle aria-hidden="true" className="mr-3 mt-1 h-6 w-6 shrink-0 text-brand-rose-beige" />
                  Post or crown preventing retreatment
                </li>
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection className="mx-auto max-w-4xl rounded-sm bg-white p-6 shadow-sm md:p-8">
            <p className="text-center text-base text-brand-dark-text/80 sm:text-lg">
              Because root-end surgery often depends on a clear understanding of the tooth and nearby structures,{" "}
              <Link
                href="/cbct-scanner-santa-rosa"
                className="text-brand-merlot underline hover:text-brand-dark-text"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "apicoectomy_cbct")}
              >
                advanced endodontic imaging
              </Link>{" "}
              may be part of surgical planning when indicated.
            </p>
          </FadeInSection>
        </>
      }
      afterShared={
        <>
          <FadeInSection className="rounded-sm bg-white p-6 shadow-xl sm:p-8 md:p-12">
            <h2 id="the-procedure" className="mb-6 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl">
              The Apicoectomy Procedure: What to Expect
            </h2>
            <ol className="space-y-6">
              {[
                {
                  step: "Consultation & Imaging:",
                  description:
                    "Dr. Anderson will examine your tooth and take detailed X-rays or 3D imaging to plan the precise surgical approach.",
                },
                {
                  step: "Local Anesthesia:",
                  description:
                    "The area around your tooth is numbed with local anesthesia to ensure you're completely comfortable during the procedure.",
                },
                {
                  step: "Accessing the Root:",
                  description:
                    "A small incision is made in the gum tissue to access the root tip and surrounding bone.",
                },
                {
                  step: "Root Tip Removal:",
                  description:
                    "The infected root tip and any diseased tissue are carefully removed using specialized microsurgical instruments.",
                },
                {
                  step: "Root End Filling:",
                  description:
                    "The end of the root is cleaned and sealed with a biocompatible filling material to prevent future infection.",
                },
                {
                  step: "Closure & Healing:",
                  description:
                    "The gum tissue is sutured closed, and the healing process begins. Follow-up appointments monitor your recovery.",
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
              <Target aria-hidden="true" className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">Precision Treatment</h3>
              <p className="text-brand-dark-text/80">
                Using advanced microsurgical techniques and 3D imaging, we can precisely target the problem area while
                preserving healthy tissue. This minimally invasive approach promotes faster healing and better outcomes.
              </p>
            </div>
            <div className="rounded-sm bg-white p-6 shadow-lg md:p-8">
              <Shield aria-hidden="true" className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">Save Your Natural Tooth</h3>
              <p className="text-brand-dark-text/80">
                An apicoectomy can often save a tooth that would otherwise need extraction. Preserving your natural
                tooth maintains proper chewing function and avoids the need for more complex replacement procedures.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection className="rounded-sm bg-brand-cream/50 p-6 md:p-8">
            <h2 className="mb-4 font-serif text-xl text-brand-merlot md:text-2xl">Related Endodontic Procedures</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/endodontic-procedures/root-canal-therapy"
                className="text-sm text-brand-merlot underline hover:text-brand-dark-text md:text-base"
              >
                Root Canal Therapy
              </Link>
              <span aria-hidden="true" className="text-brand-merlot">
                •
              </span>
              <Link
                href="/endodontic-procedures/retreatment"
                className="text-sm text-brand-merlot underline hover:text-brand-dark-text md:text-base"
              >
                Root Canal Retreatment
              </Link>
              <span aria-hidden="true" className="text-brand-merlot">
                •
              </span>
              <Link
                href="/endodontic-procedures/signs-symptoms"
                className="text-sm text-brand-merlot underline hover:text-brand-dark-text md:text-base"
              >
                Signs & Symptoms
              </Link>
            </div>
          </FadeInSection>
        </>
      }
    />
  )
}
