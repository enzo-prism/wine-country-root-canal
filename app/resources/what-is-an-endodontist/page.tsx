import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { FaqDetailsList } from "@/components/faq-details"
import { MedicalReviewByline } from "@/components/reviewed-by"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Microscope, GraduationCap, Stethoscope, Users } from "lucide-react"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"

export const metadata = buildMetadata({
  title: "What Is an Endodontist? | Wine Country Root Canal",
  description:
    "An endodontist is a dental specialist in root canals and tooth pulp. Learn how endodontists differ from general dentists and why you may be referred.",
  path: "/resources/what-is-an-endodontist",
})

export default function WhatIsAnEndodontistPage() {
  const faqItems = [
    {
      question: "What is an endodontist?",
      answer:
        "An endodontist is a dentist who specializes in the inside of the tooth — the dental pulp and the tissues surrounding the roots. The word comes from the Greek 'endo' (inside) and 'odont' (tooth). Endodontists focus on diagnosing tooth pain and performing root canal treatment and related procedures to save natural teeth. All endodontists are dentists, but only a small percentage of dentists go on to become endodontists.",
    },
    {
      question: "What's the difference between an endodontist and a general dentist?",
      answer:
        "Both are licensed dentists, and many general dentists perform routine root canals. The main difference is focus and additional training: endodontists complete extra years of specialty education after dental school and concentrate on root canal treatment, tooth pain, and dental trauma. Because they perform these procedures every day and often use tools like surgical microscopes and 3D imaging, endodontists frequently handle more complex or difficult cases. Your general dentist and an endodontist typically work together on your care.",
    },
    {
      question: "Why did my dentist refer me to an endodontist?",
      answer:
        "General dentists often refer patients to an endodontist when a case is more involved — for example, complex or curved root anatomy, a tooth that needs retreatment, a possible cracked tooth, a hard-to-pinpoint source of pain, or when endodontic surgery may be needed. A referral is a normal part of coordinated care and simply means your dentist wants a specialist's focus for that particular tooth. In most cases, your general dentist will place the final crown or restoration after treatment is complete.",
    },
    {
      question: "Do endodontists only perform root canals?",
      answer:
        "Root canal therapy is the most common procedure an endodontist performs, but it isn't the only one. Endodontists also perform root canal retreatment, endodontic surgery such as an apicoectomy, and care for dental injuries and cracked teeth. A large part of the specialty is diagnosis — identifying the true source of tooth or facial pain, which is not always obvious. The unifying goal across all of these procedures is to relieve pain and save your natural tooth whenever possible.",
    },
    {
      question: "How much more training does an endodontist have?",
      answer:
        "After completing dental school and earning a dental degree, an endodontist completes additional specialty training — typically two or more years — focused specifically on the dental pulp, root canal treatment, and diagnosing tooth pain. This advanced education is on top of the general education every dentist receives. It's why endodontists are often described as specialists in saving teeth and in managing challenging cases.",
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
        title="What Is an Endodontist?"
        description="The dental specialist who focuses on saving teeth, diagnosing tooth pain, and performing root canals."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Breadcrumbs */}
          <FadeInSection>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Patient Resources", href: "/resources" },
                { name: "What Is an Endodontist", href: "/resources/what-is-an-endodontist" },
              ]}
            />
          </FadeInSection>

          {/* Medical review byline */}
          <FadeInSection>
            <MedicalReviewByline date="July 2026" />
          </FadeInSection>

          {/* Definition / Overview */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4 text-center">
                A Specialist in the Inside of Your Tooth
              </h2>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <p>
                  An endodontist is a dental specialist focused on the inside of the tooth — the dental pulp and the
                  tissues that surround the roots. The name says it plainly: <em>endo</em> means &ldquo;inside&rdquo; and{" "}
                  <em>odont</em> means &ldquo;tooth.&rdquo; In practical terms, endodontists are the dentists you turn to
                  when a tooth needs to be saved from the inside out, most often through root canal treatment.
                </p>
                <p>
                  Every endodontist is first a dentist. What sets them apart is focus and additional training: only a
                  small percentage of dentists go on to specialize in endodontics. That narrow focus means an
                  endodontist spends their days diagnosing tooth pain and treating the pulp — the soft tissue of nerves
                  and blood vessels at the core of each tooth — rather than providing the full range of general dental
                  services.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Extra training */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-brand-merlot text-white rounded-full flex items-center justify-center shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot">Years of Extra Training</h2>
                <p>
                  After finishing dental school and earning a dental degree, an endodontist completes additional years
                  of specialty education — typically two or more — dedicated to the dental pulp, root canal treatment,
                  and the diagnosis of tooth pain. This training builds on the general education that every dentist
                  receives, adding depth in the anatomy, techniques, and technology used to treat and save teeth.
                </p>
                <p>
                  Because that education is so concentrated, endodontists gain extensive experience with the kinds of
                  cases that come up less often in a general practice — unusual root anatomy, difficult diagnoses, and
                  teeth that need a second attempt at treatment.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* What they do */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4 text-center">
                What Endodontists Do
              </h2>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <p>Endodontists perform a focused set of procedures aimed at relieving pain and preserving natural teeth:</p>
                <ul className="space-y-2 pl-1">
                  <li>
                    • <strong>Root canal therapy</strong> — removing infected or inflamed pulp, then cleaning, filling,
                    and sealing the canals.
                  </li>
                  <li>
                    • <strong>Root canal retreatment</strong> — re-treating a tooth when a previous root canal has not
                    fully healed.
                  </li>
                  <li>
                    • <strong>Endodontic surgery</strong> — procedures such as an apicoectomy, which treats the tip of
                    the root when a standard root canal isn&rsquo;t enough.
                  </li>
                  <li>
                    • <strong>Dental trauma and cracked teeth</strong> — caring for injured, dislodged, or cracked teeth.
                  </li>
                  <li>
                    • <strong>Diagnosing difficult tooth pain</strong> — pinpointing the source of pain when it isn&rsquo;t obvious.
                  </li>
                </ul>
                <p>
                  Endodontists perform these procedures frequently, and many use advanced technology such as surgical
                  microscopes and{" "}
                  <Link
                    href="/cbct-scanner-santa-rosa"
                    className="text-brand-merlot hover:text-brand-rose-beige underline"
                    {...analyticsAttributes(analyticsEvents.cbctContentClick, "what_is_an_endodontist_cbct")}
                  >
                    3D imaging (CBCT)
                  </Link>{" "}
                  to see fine details of a tooth&rsquo;s anatomy and plan treatment more precisely.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Endodontist vs general dentist */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Stethoscope className="w-10 h-10 text-brand-merlot mb-3" />
              <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Endodontist vs. General Dentist</h2>
              <p className="text-brand-dark-text/80">
                Both general dentists and endodontists are licensed dentists, and many general dentists do perform
                routine root canals. The difference is focus: endodontists concentrate on root canal treatment and
                related care, and they typically handle more complex cases. Whether a particular tooth is best treated by
                your general dentist or referred to a specialist depends on the individual situation.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Users className="w-10 h-10 text-brand-merlot mb-3" />
              <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Why You Might Be Referred</h2>
              <p className="text-brand-dark-text/80">
                Your dentist may refer you to an endodontist for complex root anatomy, a tooth that needs retreatment,
                possible endodontic surgery, or a hard-to-diagnose source of pain. Endodontists and general dentists work
                together as a team — and in most cases your general dentist places the final crown once endodontic
                treatment is complete.
              </p>
            </div>
          </FadeInSection>

          {/* Technology / About Dr. Anderson */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 bg-brand-merlot text-white rounded-full flex items-center justify-center shrink-0">
                <Microscope className="w-8 h-8" />
              </div>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot">Your Endodontist in Santa Rosa</h2>
                <p>
                  Our practice is dedicated to endodontics.{" "}
                  <Link href="/about" className="text-brand-merlot hover:text-brand-rose-beige underline">
                    Dr. Craig Wm. Anderson
                  </Link>{" "}
                  completed additional endodontic specialty training and focuses his practice on root canal treatment and
                  related procedures for patients throughout Santa Rosa and Sonoma County. The goal at every visit is
                  simple: an accurate diagnosis, comfortable care, and — whenever possible — saving your natural tooth.
                </p>
                <p>
                  If your general dentist has referred you, or if you&rsquo;re dealing with tooth pain and aren&rsquo;t
                  sure where to turn, our team is glad to help you understand your options.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Educational caveat */}
          <FadeInSection>
            <p className="text-sm text-brand-dark-text/80 text-center max-w-3xl mx-auto">
              This information is educational and does not replace individualized dental advice. For guidance specific to
              your tooth and medical history, please consult a dentist or endodontist.
            </p>
          </FadeInSection>

          {/* FAQ Section */}
          <FadeInSection>
            <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Related Links */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl text-brand-merlot mb-6 text-center">Learn More</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/about" className="p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-1">About Dr. Anderson</h3>
                <p className="text-sm text-brand-dark-text/80">Meet your endodontic specialist.</p>
              </Link>
              <Link href="/endodontic-procedures" className="p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-1">Endodontic Procedures</h3>
                <p className="text-sm text-brand-dark-text/80">Explore the treatments we provide.</p>
              </Link>
              <Link
                href="/endodontic-procedures/root-canal-therapy"
                className="p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <h3 className="font-semibold text-brand-dark-text mb-1">Root Canal Therapy</h3>
                <p className="text-sm text-brand-dark-text/80">What to expect from treatment.</p>
              </Link>
              <Link href="/dentists" className="p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-1">For Referring Dentists</h3>
                <p className="text-sm text-brand-dark-text/80">Information for our dental colleagues.</p>
              </Link>
              <Link href="/resources" className="p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-1">Patient Resources</h3>
                <p className="text-sm text-brand-dark-text/80">Browse all of our patient guides.</p>
              </Link>
              <Link href="/contact" className="p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-1">Contact Us</h3>
                <p className="text-sm text-brand-dark-text/80">Reach our Santa Rosa office.</p>
              </Link>
            </div>
          </FadeInSection>

          {/* Sources note */}
          <FadeInSection>
            <p className="text-xs text-brand-dark-text/80 text-center max-w-3xl mx-auto">
              Source: American Association of Endodontists (AAE),{" "}
              <a
                href="https://www.aae.org/patients/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-merlot hover:underline"
              >
                aae.org/patients
              </a>
              .
            </p>
          </FadeInSection>

          {/* CTA Section */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Referred to an Endodontist?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with Dr. Anderson, or call our Santa Rosa office at{" "}
              <a
                href="tel:+17075233636"
                className="text-brand-merlot font-semibold hover:underline"
                {...analyticsAttributes(analyticsEvents.phoneClick, "what_is_an_endodontist_phone")}
              >
                (707) 523-3636
              </a>
              .
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation="what_is_an_endodontist_primary_cta"
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
