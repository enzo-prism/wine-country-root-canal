import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, HelpCircle, RefreshCw, Clock } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsEvents } from "@/lib/analytics"

export default function RootCanalRetreatmentPage() {
  const faqItems = [
    {
      question: "Why would I need root canal retreatment?",
      answer:
        "Sometimes a tooth that has had root canal treatment may not heal properly or may develop new problems. This can happen due to narrow or curved canals that weren't fully cleaned initially, complicated canal anatomy, or new decay that exposes the root canal filling to bacteria.",
    },
    {
      question: "How successful is root canal retreatment?",
      answer:
        "Root canal retreatment has a high success rate, often 85-90%. The success depends on various factors including the condition of the tooth, the reason for retreatment, and the patient's overall oral health.",
    },
    {
      question: "Is retreatment more painful than the original root canal?",
      answer:
        "With modern anesthetic techniques, retreatment should be as comfortable as the original procedure. You may experience some mild discomfort afterward, which can be managed with over-the-counter pain medication.",
    },
    {
      question: "How long does retreatment take?",
      answer:
        "Retreatment typically requires 2-3 appointments, depending on the complexity of the case. Each appointment usually lasts 60-90 minutes.",
    },
    {
      question: "What are the alternatives to retreatment?",
      answer:
        "Alternatives include apicoectomy (root-end surgery) or tooth extraction followed by replacement with an implant, bridge, or partial denture. Dr. Anderson will discuss all options to help you make the best decision.",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Root Canal Retreatment"
        description="Advanced endodontic care to address complications and save your previously treated tooth."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* When You Need Retreatment */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                Signs You May Need Root Canal Retreatment
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Even after successful root canal treatment, some teeth may require additional care. Here are signs that
                retreatment might be necessary:
              </p>
              <ul className="space-y-3 text-base sm:text-lg text-left inline-block">
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Pain or discomfort in a previously treated tooth
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Sensitivity to hot or cold temperatures
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Swelling or tenderness in nearby gums
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Discoloration of the treated tooth
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                  Recurring abscess or infection
                </li>
              </ul>
            </div>
          </FadeInSection>

          {/* Retreatment Process */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              The Retreatment Process: Step by Step
            </h2>
            <ol className="space-y-6">
              {[
                {
                  step: "Comprehensive Evaluation:",
                  description:
                    "Dr. Anderson will examine your tooth and take new X-rays to determine the cause of the problem and assess whether retreatment is the best option.",
                },
                {
                  step: "Accessing the Tooth:",
                  description:
                    "The crown and filling materials are carefully removed to access the root canal space. This may require removing posts or other restorative materials.",
                },
                {
                  step: "Removing Previous Filling:",
                  description:
                    "The previous root canal filling material is removed to expose the canal system for thorough cleaning and examination.",
                },
                {
                  step: "Cleaning & Disinfection:",
                  description:
                    "The canals are thoroughly cleaned, disinfected, and shaped. Any additional canals that may have been missed initially are located and treated.",
                },
                {
                  step: "New Root Canal Filling:",
                  description:
                    "After ensuring the canals are completely clean, they are filled with fresh biocompatible material and sealed.",
                },
                {
                  step: "Restoration:",
                  description:
                    "A temporary filling is placed, and you'll return to your general dentist for a permanent restoration to protect the tooth.",
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

          {/* Why Choose Retreatment */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <RefreshCw className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Second Chance for Success</h3>
              <p className="text-brand-dark-text/80">
                Retreatment gives your tooth another opportunity to heal properly. With advanced techniques and
                technology, we can often address issues that weren't resolved in the initial treatment.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Clock className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Cost-Effective Solution</h3>
              <p className="text-brand-dark-text/80">
                Retreatment is often more cost-effective than tooth extraction followed by replacement with an implant
                or bridge. It preserves your natural tooth structure and bite.
              </p>
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
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
              Experiencing Problems with a Previous Root Canal?
            </h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              Don't give up on your tooth. Dr. Anderson's expertise in retreatment can often resolve complications and
              save your natural tooth.
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation="legacy_root_canal_retreatment_primary_cta"
            >
              Schedule Evaluation
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
