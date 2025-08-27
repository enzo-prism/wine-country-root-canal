import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, HelpCircle, Target, Shield, ChevronRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import Link from "next/link"

export default function ApicoectomyPage() {
  const faqItems = [
    {
      question: "What is an apicoectomy?",
      answer:
        "An apicoectomy is a minor surgical procedure that removes the tip of a tooth's root and any infected tissue. It's typically performed when a standard root canal treatment hasn't fully resolved the infection.",
    },
    {
      question: "How is an apicoectomy different from a root canal?",
      answer:
        "While a root canal treats infection from inside the tooth, an apicoectomy approaches the problem from the outside, through the gum and bone, to remove the infected root tip and surrounding tissue.",
    },
    {
      question: "Is the procedure painful?",
      answer:
        "The procedure is performed under local anesthesia, so you shouldn't feel pain during treatment. Some mild discomfort and swelling after the procedure is normal and can be managed with prescribed medications.",
    },
    {
      question: "How long is the recovery time?",
      answer:
        "Most patients can return to normal activities within 2-3 days. Complete healing of the surgical site typically takes 2-4 weeks, during which we'll monitor your progress.",
    },
    {
      question: "What is the success rate?",
      answer:
        "Apicoectomies have a high success rate of 85-95% when performed by an experienced endodontist. The procedure can often save a tooth that would otherwise need to be extracted.",
    },
  ]

  return (
    <>
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
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-4 rounded-sm shadow-lg">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-left hover:no-underline text-base sm:text-lg">
                    <div className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-3 text-brand-rose-beige shrink-0" /> {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-brand-dark-text/80 pt-2 pb-4 px-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
