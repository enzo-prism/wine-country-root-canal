import type { Metadata } from "next"
import Link from "next/link"
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
import { AlertTriangle, Apple, ArrowRight, Clock, Phone, ShieldCheck, Stethoscope } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Root Canal Recovery & Aftercare | Wine Country Root Canal",
  description:
    "What to expect after a root canal in Santa Rosa, CA: normal soreness, how to manage discomfort, why the crown matters, and when to call our office.",
  path: "/resources/after-your-root-canal",
})

const faqItems = [
  {
    question: "How long does it take to recover from a root canal?",
    answer:
      "Many people feel noticeably better within a few days, and mild soreness or tenderness typically continues to improve over that time. Because the tooth was often already inflamed or infected before treatment, some lingering discomfort while the tissues settle is common and usually manageable. Everyone heals a little differently, so your exact timeline may depend on the tooth, the extent of infection, and your overall health. If discomfort is getting worse rather than better after the first few days, that is a reason to check in with our office.",
  },
  {
    question: "What can I eat after a root canal?",
    answer:
      "In the first day or two, softer foods and cooler or room-temperature choices are often more comfortable while any numbness wears off and the area settles. It is generally wise to avoid chewing directly on the treated tooth until your dentist places the final restoration, since a tooth with only a temporary filling can be more vulnerable. Very hard, crunchy, or sticky foods on that side are best avoided for a while. As the tooth feels more normal and once the permanent restoration is in place, most people can return to their usual diet.",
  },
  {
    question: "Is it normal to have pain after a root canal?",
    answer:
      "Mild to moderate soreness, tenderness when biting, and some sensitivity for a few days after treatment are common and typically ease with time. Over-the-counter pain relievers taken as directed are often enough to stay comfortable. What is not expected is severe or increasing pain, throbbing that does not respond to medication, or swelling and fever. Those may be signs of a problem that should be evaluated, so it is best to call the office rather than wait it out.",
  },
  {
    question: "When should I call the office after my root canal?",
    answer:
      "Reach out if you have severe or increasing pain, swelling of the gums or face, a fever, or a bite that feels high or uneven. Also call if a temporary filling comes out, the tooth cracks or breaks, or you develop a reaction to a prescribed medication. Contacting us promptly lets us check whether anything needs adjustment and helps keep a small issue from becoming a larger one. When in doubt, it is always reasonable to call and ask.",
  },
  {
    question: "Do I need a crown after a root canal?",
    answer:
      "Often, yes, especially for back teeth that take on heavy chewing forces. After root canal treatment a tooth can become more brittle, and a permanent restoration such as a crown may help protect it from fracturing and seal it against new infection. Front teeth sometimes need only a filling, depending on how much tooth structure remains. Your restoring dentist will recommend what is appropriate for your specific tooth, and placing that final restoration in a timely way is an important part of a lasting result.",
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

export default function AfterYourRootCanalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="After Your Root Canal: Recovery & Aftercare"
        description="What tends to be normal after treatment, how to stay comfortable, and when to reach out to our office."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Patient Resources", href: "/resources" },
              { name: "After Your Root Canal", href: "/resources/after-your-root-canal" },
            ]}
          />

          <MedicalReviewByline date="July 2026" />

          {/* Intro / what's normal */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">What to Expect in the First Few Days</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Recovering from a{" "}
                <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  root canal
                </Link>{" "}
                is usually straightforward. In the days after treatment, it is common to notice mild soreness or
                tenderness in the area, and the tooth may feel sensitive when you bite or chew. This often reflects
                the fact that the tooth was already inflamed or infected before treatment, and these symptoms
                typically improve over the following few days as the surrounding tissues settle.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Most people are comfortable returning to their normal routine soon after their visit. Knowing what
                tends to be normal, how to manage minor discomfort, and which symptoms deserve a phone call can help
                your recovery go smoothly.
              </p>
            </div>
          </FadeInSection>

          {/* Managing discomfort */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
              How to Manage Discomfort
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-brand-cream p-6 rounded-sm shadow-lg">
                <ShieldCheck className="w-10 h-10 text-brand-merlot mb-3" />
                <h3 className="font-serif text-xl text-brand-merlot mb-3">Pain relief and comfort</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Take over-the-counter pain relievers as directed, unless your physician advises otherwise.</li>
                  <li>• Cool or room-temperature foods and drinks may feel more comfortable at first.</li>
                  <li>• A cold compress on the outside of the cheek can help if there is minor swelling.</li>
                  <li>• Rest for the remainder of the day if you feel tender.</li>
                </ul>
              </div>
              <div className="bg-brand-cream p-6 rounded-sm shadow-lg">
                <Apple className="w-10 h-10 text-brand-merlot mb-3" />
                <h3 className="font-serif text-xl text-brand-merlot mb-3">Eating and oral care</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Choose softer foods for the first day or two while the area settles.</li>
                  <li>• Avoid chewing on the treated tooth until the final restoration is placed.</li>
                  <li>• Wait for numbness to fully wear off before eating to avoid biting your cheek or tongue.</li>
                  <li>• Keep up gentle brushing and flossing, including near the treated tooth.</li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          {/* Importance of the permanent restoration */}
          <FadeInSection className="max-w-4xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-brand-merlot shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot">
                  Protect the Tooth With Its Final Restoration
                </h2>
              </div>
              <p className="text-brand-dark-text/80 mb-4">
                After a root canal, the tooth is often sealed with a temporary filling. That temporary is not meant to
                last, and a treated tooth can become more brittle over time. Placing the permanent restoration, which
                is frequently a crown for back teeth, is one of the most important steps for protecting the tooth
                long-term. A well-fitted restoration may help guard against fracture and seal the tooth against new
                bacteria.
              </p>
              <p className="text-brand-dark-text/80">
                For that reason, it is generally best to follow up with your restoring dentist for the final
                restoration without unnecessary delay, and to avoid heavy chewing on the tooth until it is in place.
                Your dentist will recommend the restoration that fits your specific tooth and situation.
              </p>
            </div>
          </FadeInSection>

          {/* Recovery timeline */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-brand-merlot" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot text-center">A General Recovery Timeline</h2>
            </div>
            <ol className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  step: "The first 24 hours",
                  description:
                    "Numbness wears off over a few hours. Mild soreness or tenderness is common as it does. Take pain relievers as directed and favor softer, cooler foods.",
                },
                {
                  step: "The first few days",
                  description:
                    "Tenderness when biting and general soreness typically ease day by day. Most people find over-the-counter medication is enough while the area settles.",
                },
                {
                  step: "The following weeks",
                  description:
                    "The tooth usually continues to feel more normal. This is the window to arrange the permanent restoration with your restoring dentist if it has not been placed yet.",
                },
              ].map((item, index) => (
                <li key={item.step} className="flex">
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
            <p className="text-sm text-brand-dark-text/70 mt-6 text-center max-w-2xl mx-auto">
              Timelines vary from person to person. Yours may depend on the tooth, the extent of the original
              infection, and your overall health.
            </p>
          </FadeInSection>

          {/* When to call the office */}
          <FadeInSection className="max-w-4xl mx-auto">
            <div className="bg-brand-cream p-6 sm:p-8 md:p-10 rounded-sm shadow-lg border-l-4 border-brand-merlot">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-brand-merlot shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot">When to Call the Office</h2>
              </div>
              <p className="text-brand-dark-text/80 mb-4">
                Some soreness is expected, but certain symptoms are worth a phone call so we can check on you. Please
                contact us if you notice any of the following:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-brand-dark-text/80 mb-6">
                <li>• Severe or increasing pain, or pain not relieved by medication</li>
                <li>• Swelling of the gums, face, or jaw</li>
                <li>• A fever or a feeling of being generally unwell</li>
                <li>• A bite that feels high or uneven</li>
                <li>• A temporary filling that comes out</li>
                <li>• The tooth cracks, chips, or breaks</li>
                <li>• A rash or reaction to a prescribed medication</li>
                <li>• Symptoms that get worse instead of better after a few days</li>
              </ul>
              <p className="text-brand-dark-text/80 mb-6">
                If you are unsure whether something is normal, it is always reasonable to call and ask. For a severe
                problem such as spreading swelling or intense pain, our{" "}
                <Link href="/dental-emergencies" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  emergency care page
                </Link>{" "}
                explains how to reach us quickly.
              </p>
              <LinkButton
                href="tel:+17075233636"
                variant="brand-primary"
                size="lg"
                className="px-6 py-3"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="after_your_root_canal_call_office"
              >
                Call (707) 523-3636
              </LinkButton>
            </div>
          </FadeInSection>

          {/* Local note + caveat */}
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Stethoscope className="w-6 h-6 text-brand-merlot" aria-hidden="true" />
              <h2 className="font-serif text-xl md:text-2xl text-brand-merlot">Aftercare Support in Santa Rosa</h2>
            </div>
            <p className="text-brand-dark-text/80 mb-4">
              We care for patients throughout Santa Rosa and the surrounding Sonoma County communities, and we are glad
              to answer questions during your recovery. Your restoring dentist and Dr. Anderson can coordinate on the
              next steps for your tooth.
            </p>
            <p className="text-sm text-brand-dark-text/70">
              This information is educational and does not replace individualized dental advice. Please follow the
              specific instructions you receive after your procedure.
            </p>
          </FadeInSection>

          {/* FAQ */}
          <FadeInSection>
            <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Sources note */}
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-sm shadow-lg">
              <h2 className="font-serif text-xl text-brand-merlot mb-3">Sources</h2>
              <p className="text-brand-dark-text/80 mb-3">
                General guidance on this page reflects patient education from the American Association of Endodontists
                (AAE). It is not a substitute for the instructions provided by your treating dentist.
              </p>
              <a
                href="https://www.aae.org/patients/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
              >
                American Association of Endodontists — Patient Resources
              </a>
            </div>
          </FadeInSection>

          {/* Cross-links */}
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4 text-center">Related Patient Resources</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Root Canal Therapy
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/dental-emergencies" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Dental Emergencies
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/contact" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Contact Us
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/resources" className="text-brand-merlot hover:text-brand-rose-beige underline">
                All Patient Resources
              </Link>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Questions About Your Recovery?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              If something does not feel right, or you would like to schedule a follow-up, we are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="after_your_root_canal_primary_cta"
              >
                Book Your Appointment
              </LinkButton>
              <LinkButton
                href="/endodontic-procedures/root-canal-therapy"
                variant="brand-outline"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                Learn About Root Canal Therapy
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
