import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, HelpCircle, RefreshCw, Clock, ArrowLeft, Target, Shield } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import Link from "next/link"

export default function RetreatmentPage() {
  const faqItems = [
    {
      question: "Why would I need root canal retreatment?",
      answer:
        "Sometimes a tooth that has had root canal treatment may not heal properly or may develop new problems. This can happen due to narrow or curved canals that weren't fully cleaned initially, complicated canal anatomy, delayed crown placement, or new decay that exposes the root canal filling to bacteria.",
    },
    {
      question: "How successful is root canal retreatment?",
      answer:
        "Root canal retreatment has a high success rate, typically 85-90%. The success depends on various factors including the condition of the tooth, the reason for retreatment, and the patient's overall oral health. Dr. Anderson's expertise and advanced techniques help maximize success rates.",
    },
    {
      question: "Is retreatment more painful than the original root canal?",
      answer:
        "With modern anesthetic techniques, retreatment should be as comfortable as the original procedure. You may experience some mild discomfort afterward, which can be managed with over-the-counter pain medication. Most patients report minimal discomfort.",
    },
    {
      question: "How long does retreatment take?",
      answer:
        "Retreatment typically requires 2-3 appointments, depending on the complexity of the case. Each appointment usually lasts 60-90 minutes. The process may take longer than initial treatment due to the need to remove previous filling materials.",
    },
    {
      question: "What are the alternatives to retreatment?",
      answer:
        "Alternatives include apicoectomy (root-end surgery) or tooth extraction followed by replacement with an implant, bridge, or partial denture. Dr. Anderson will discuss all options to help you make the best decision for your specific situation.",
    },
    {
      question: "Will my insurance cover retreatment?",
      answer:
        "Most dental insurance plans cover retreatment, though coverage may vary. We'll work with your insurance provider to maximize your benefits and provide you with a clear estimate before treatment begins.",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Root Canal Retreatment"
        description="Advanced endodontic care to address complications and save your previously treated tooth with expert precision."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Breadcrumb */}
          <FadeInSection>
            <Link
              href="/endodontic-procedures"
              className="inline-flex items-center text-brand-merlot hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Endodontic Procedures
            </Link>
          </FadeInSection>

          {/* Introduction */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                What is Root Canal Retreatment?
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Root canal retreatment is a procedure to address complications or new problems in a tooth that has
                previously received root canal therapy. While initial root canal treatment has a high success rate,
                sometimes additional treatment is needed to save the tooth.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Dr. Anderson specializes in complex retreatment cases, using advanced techniques and technology to give
                your tooth the best possible chance for long-term success.
              </p>
            </div>
          </FadeInSection>

          {/* When You Need Retreatment */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Signs You May Need Root Canal Retreatment
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Common Symptoms:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Pain or discomfort in a previously treated tooth</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Sensitivity to hot or cold temperatures</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Swelling or tenderness in nearby gums</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Discoloration of the treated tooth</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-rose-beige mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Recurring abscess or infection</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Common Causes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <RefreshCw className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Narrow or curved canals not fully cleaned initially</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Complicated canal anatomy that was missed</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">New decay exposing the root canal filling</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Delayed crown placement allowing reinfection</span>
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Fracture in the tooth or restoration</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          {/* Retreatment Process */}
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
              The Retreatment Process: Step by Step
            </h2>
            <ol className="space-y-6 max-w-4xl mx-auto">
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
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Second Chance for Success</h3>
              <p className="text-brand-dark-text/80">
                Retreatment gives your tooth another opportunity to heal properly. With Dr. Anderson's advanced
                techniques and technology, we can often address issues that weren't resolved in the initial treatment,
                providing your tooth with the best chance for long-term success.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Shield className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Preserve Your Natural Tooth</h3>
              <p className="text-brand-dark-text/80">
                Retreatment is often more cost-effective than tooth extraction followed by replacement with an implant
                or bridge. It preserves your natural tooth structure, maintains proper bite function, and avoids more
                complex procedures.
              </p>
            </div>
          </FadeInSection>

          {/* Recovery & Aftercare */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl text-brand-merlot mb-6 text-center">Recovery & Aftercare</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-12 h-12 text-brand-rose-beige mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">Immediate Recovery</h3>
                <p className="text-sm text-brand-dark-text/80">
                  Most patients experience minimal discomfort and can return to normal activities within 24-48 hours.
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-brand-rose-beige mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">Healing Process</h3>
                <p className="text-sm text-brand-dark-text/80">
                  Complete healing typically takes several months. We'll monitor your progress with follow-up
                  appointments.
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-brand-rose-beige mx-auto mb-3" />
                <h3 className="font-semibold text-brand-dark-text mb-2">Long-term Care</h3>
                <p className="text-sm text-brand-dark-text/80">
                  With proper care and a permanent restoration, your retreated tooth can last a lifetime.
                </p>
              </div>
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
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Don't give up on your tooth. Dr. Anderson's expertise in complex retreatment cases can often resolve
              complications and save your natural tooth. Schedule a consultation to explore your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Evaluation
              </LinkButton>
              <LinkButton href="/endodontic-procedures/signs-symptoms" variant="brand-outline" size="lg">
                Learn About Warning Signs
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
