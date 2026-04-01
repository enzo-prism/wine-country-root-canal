import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { AlertTriangle, Target, Shield, ChevronRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import Link from "next/link"
import { FaqDetailsList } from "@/components/faq-details"

export const metadata: Metadata = {
  title: "Apicoectomy (Root‑End Surgery) in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Apicoectomy is a microsurgical solution when a root canal can’t fully resolve infection. Learn about root‑end surgery at our Santa Rosa, CA endodontic practice.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/endodontic-procedures/apicoectomy",
  },
  openGraph: {
    title: "Apicoectomy in Santa Rosa, CA",
    description:
      "Root‑end surgery to save teeth when standard root canal treatment isn’t enough. Santa Rosa, CA.",
    url: "https://www.winecountryrootcanal.com/endodontic-procedures/apicoectomy",
  },
}

export default function ApicoectomyPage() {
  const faqItems = [
    {
      question: "What is an apicoectomy?",
      answer:
        "An apicoectomy, also called root‑end surgery, is a small procedure that removes the very tip of a tooth’s root and the surrounding inflamed or infected tissue. It’s usually recommended when a tooth has already had a root canal but symptoms persist because the infection is trapped at the root end or the anatomy makes retreatment difficult. The goal is to save your natural tooth by sealing the root from the outside and allowing the area to heal.",
    },
    {
      question: "How is an apicoectomy different from a root canal?",
      answer:
        "A root canal treats infection from inside the tooth by cleaning and sealing the canals. An apicoectomy approaches the problem from the outside, through the gum and bone, to remove infection at the root tip. This is helpful when a previous root canal can’t be effectively redone, or when there is a hidden canal, blockage, or persistent lesion. In many cases, apicoectomy is the final step to resolve infection and keep the tooth functional long‑term.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "The procedure is done with local anesthesia, and we make sure you are completely numb before we begin. Most patients feel pressure but not pain during surgery. Afterward, it’s normal to have mild soreness or swelling for a few days. This is typically well controlled with over‑the‑counter pain relievers or medications we recommend. We’ll provide clear post‑operative instructions so you know what to expect and when to call us.",
    },
    {
      question: "How long is the recovery time?",
      answer:
        "Most people return to normal activities within 2–3 days, although you may want to take it easy the first 24 hours. Swelling and tenderness usually peak around day two and then improve. The gum tissue generally heals over 1–2 weeks, while the bone around the root tip heals more gradually over a few months. We’ll check your progress at follow‑up visits and coordinate with your general dentist for any needed restorations.",
    },
    {
      question: "What is the success rate?",
      answer:
        "Apicoectomy success rates are high—often in the 85–95% range—especially when performed with modern microsurgical techniques. Success depends on factors like the size of the infection, the tooth’s anatomy, and the quality of the existing root canal and restoration. Our goal is long‑term healing and comfort, so we evaluate the tooth carefully before recommending surgery. When successful, apicoectomy can prevent extraction and preserve your natural bite.",
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Apicoectomy"
        description="Precise surgical treatment to save your tooth when conventional root canal therapy isn't sufficient."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Breadcrumb Navigation */}
          <FadeInSection>
            <nav className="flex items-center space-x-2 text-sm text-brand-dark-text/60 mb-8">
              <Link href="/endodontic-procedures" className="hover:text-brand-merlot transition-colors">
                Endodontic Procedures
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-brand-merlot font-medium">Apicoectomy</span>
            </nav>
          </FadeInSection>

          {/* When You Need This Section */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                When Might You Need an Apicoectomy?
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                An apicoectomy may be recommended when conventional root canal treatment hasn't fully resolved the
                problem or isn't possible due to anatomical factors.
              </p>
              <ul className="space-y-3 text-base sm:text-lg text-left inline-block">
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Persistent infection after root canal treatment
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Cyst or abscess at the root tip
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Blocked or calcified root canals
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Fractured root tip
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Post or crown preventing retreatment
                </li>
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-brand-dark-text/80 text-center">
              Because root-end surgery often depends on a clear understanding of the tooth and nearby structures,{" "}
              <Link href="/cbct-scanner-santa-rosa" className="text-brand-merlot hover:text-brand-rose-beige underline">
                advanced endodontic imaging
              </Link>{" "}
              may be part of surgical planning when indicated.
            </p>
          </FadeInSection>

          {/* Procedure Steps */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
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
                <li key={index} className="flex">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-rose-beige text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-brand-dark-text">{item.step}</h3>
                    <p className="text-brand-dark-text/80 text-sm sm:text-base">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeInSection>

          {/* Benefits & Success Rate */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Target className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Precision Treatment</h3>
              <p className="text-brand-dark-text/80">
                Using advanced microsurgical techniques and 3D imaging, we can precisely target the problem area while
                preserving healthy tissue. This minimally invasive approach promotes faster healing and better outcomes.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Shield className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Save Your Natural Tooth</h3>
              <p className="text-brand-dark-text/80">
                An apicoectomy can often save a tooth that would otherwise need extraction. Preserving your natural
                tooth maintains proper chewing function and avoids the need for more complex replacement procedures.
              </p>
            </div>
          </FadeInSection>

          {/* Related Procedures */}
          <FadeInSection className="bg-brand-cream/50 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4 text-center">
              Related Endodontic Procedures
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/endodontic-procedures/root-canal-therapy"
                className="text-brand-merlot hover:text-brand-rose-beige underline text-sm md:text-base"
              >
                Root Canal Therapy
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link
                href="/endodontic-procedures/retreatment"
                className="text-brand-merlot hover:text-brand-rose-beige underline text-sm md:text-base"
              >
                Root Canal Retreatment
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link
                href="/endodontic-procedures/signs-symptoms"
                className="text-brand-merlot hover:text-brand-rose-beige underline text-sm md:text-base"
              >
                Signs & Symptoms
              </Link>
            </div>
          </FadeInSection>

          {/* FAQ Accordion */}
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* CTA Section */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Need Expert Endodontic Surgery?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              Dr. Anderson's expertise in microsurgical techniques can help save your tooth. Schedule a consultation to
              discuss your options.
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Consultation
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
