"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LinkButton } from "@/components/ui/link-button"
import { CheckCircle, Send, Users, Microscope, Zap, ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { analyticsEvents } from "@/lib/analytics"

export default function DentistsPageClient() {
  const valueProps = [
    {
      title: "Seamless Collaboration",
      description: "We prioritize clear communication and timely updates for you and your patients.",
      icon: <Users className="w-7 h-7 text-brand-merlot" />,
    },
    {
      title: "Advanced Diagnostics",
      description: "Utilizing CBCT and operating microscopes for precise treatment planning and execution.",
      icon: <Microscope className="w-7 h-7 text-brand-merlot" />,
    },
    {
      title: "Efficient Turnaround",
      description: "Prompt scheduling for your referred patients, especially urgent cases.",
      icon: <Zap className="w-7 h-7 text-brand-merlot" />,
    },
    {
      title: "Exceptional Patient Care",
      description: "Ensuring your patients receive compassionate, high-quality endodontic treatment.",
      icon: <CheckCircle className="w-7 h-7 text-brand-merlot" />,
    },
  ]

  const cbctReferralScenarios = [
    "Persistent symptoms when the source of pain is still unclear",
    "Evaluation of previously treated teeth before retreatment",
    "Suspected cracks, fractures, or other structural concerns",
    "Complex anatomy, calcification, or possible missed canals",
    "Root-end surgery and apicoectomy planning",
  ]

  const referralFormUrl = "https://form.jotform.com/251807740544054"

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="bg-brand-cream text-center py-16 sm:py-24 px-4">
          <FadeInSection>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-merlot leading-tight mb-4">
              Elevating Endodontic Care, Together.
            </h1>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with Wine Country Root Canal for advanced diagnostics, seamless referrals, and exceptional
              outcomes for your patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href={referralFormUrl}
                variant="brand-primary"
                size="lg"
                icon={<ArrowRight />}
                iconPosition="right"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.referralFormClick}
                analyticsLocation="dentists_hero"
              >
                Submit a Referral
              </LinkButton>
              <LinkButton href="/technology" variant="brand-outline" size="lg">
                Explore Our Technology
              </LinkButton>
            </div>
          </FadeInSection>
        </section>

        {/* Main Content Wrapper */}
        <div className="container mx-auto px-4 md:px-6">
          {/* Value Propositions Section */}
          <section className="py-16 sm:py-24">
            <FadeInSection className="text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-merlot mb-12">
                Your Trusted Partner in Endodontics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {valueProps.map((prop) => (
                  <div
                    key={prop.title}
                    className="bg-brand-cream/50 p-6 rounded-lg flex flex-col sm:flex-row text-center sm:text-left items-center gap-6 border border-brand-cream"
                  >
                    <div className="flex-shrink-0 bg-white rounded-full p-4 shadow-sm">{prop.icon}</div>
                    <div>
                      <h3 className="font-serif text-xl text-brand-merlot mb-2">{prop.title}</h3>
                      <p className="text-brand-dark-text/80">{prop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </section>

          {/* Technology Section */}
          <section className="py-16 sm:py-24 border-t border-brand-cream">
            <FadeInSection className="text-center">
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-merlot mb-4">Leveraging Advanced Technology</h2>
              <p className="text-lg text-brand-dark-text/80 mb-12 max-w-3xl mx-auto">
                Our investment in technology supports diagnosis and treatment planning, especially when a case benefits
                from more detailed imaging or microsurgical precision.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-brand-cream/50 p-8 rounded-lg border border-brand-cream">
                  <Microscope className="w-10 h-10 text-brand-merlot mx-auto mb-4" />
                  <h3 className="font-semibold text-xl text-brand-dark-text">Surgical Microscopes</h3>
                  <p className="text-brand-dark-text/70 mt-2">Enhanced visualization for complex cases.</p>
                </div>
                <div className="bg-brand-cream/50 p-8 rounded-lg border border-brand-cream">
                  <Zap className="w-10 h-10 text-brand-merlot mx-auto mb-4" />
                  <h3 className="font-semibold text-xl text-brand-dark-text">CBCT Imaging</h3>
                  <p className="text-brand-dark-text/70 mt-2">
                    On-site three-dimensional imaging for complex diagnosis and case planning when indicated.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <LinkButton
                  href="/cbct-scanner-santa-rosa"
                  variant="brand-outline"
                  analyticsEvent={analyticsEvents.cbctContentClick}
                  analyticsLocation="dentists_technology"
                >
                  See How Our CBCT Scanner Supports Case Planning
                </LinkButton>
                <LinkButton href="/technology" variant="brand-outline">
                  Learn More About Our Technology
                </LinkButton>
              </div>
            </FadeInSection>
          </section>
        </div>

        <section className="bg-white py-16 sm:py-24 border-t border-brand-cream">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-merlot mb-4">
                  When Referring Doctors May Want CBCT-Informed Evaluation
                </h2>
                <p className="text-lg text-brand-dark-text/80 max-w-3xl mx-auto">
                  Our on-site CBCT scanner is available for selected endodontic cases where three-dimensional imaging
                  may support diagnosis, retreatment planning, fracture assessment, or surgical decision-making.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-brand-cream/50 p-8 rounded-lg border border-brand-cream">
                  <h3 className="font-serif text-2xl text-brand-merlot mb-4">Common referral scenarios</h3>
                  <ul className="space-y-3 text-brand-dark-text/80">
                    {cbctReferralScenarios.map((scenario) => (
                      <li key={scenario}>• {scenario}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-brand-cream/50 p-8 rounded-lg border border-brand-cream">
                  <h3 className="font-serif text-2xl text-brand-merlot mb-4">Communication back to your office</h3>
                  <p className="text-brand-dark-text/80 mb-4">
                    We prioritize timely communication, shared diagnostic findings, and clear restorative guidance so
                    your team knows what was evaluated, what treatment was recommended, and what follow-up is needed.
                  </p>
                  <p className="text-brand-dark-text/80">
                    If CBCT is used as part of the evaluation, we incorporate those findings into treatment planning
                    and communicate the clinical implications back to the referring doctor.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <LinkButton
                  href="/cbct-scanner-santa-rosa"
                  variant="brand-outline"
                  analyticsEvent={analyticsEvents.cbctContentClick}
                  analyticsLocation="dentists_cbct_section"
                >
                  Review Our CBCT Imaging Information
                </LinkButton>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Referral Process Section */}
        <section className="bg-brand-cream py-16 sm:py-24">
          <FadeInSection className="text-center container mx-auto px-4">
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-merlot mb-4">Easy Online Referral</h2>
            <p className="text-lg text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Submit referrals quickly and securely through our online form. We typically contact patients within 24
              hours to schedule.
            </p>
            <LinkButton
              href={referralFormUrl}
              variant="brand-primary"
              size="lg"
              icon={<Send />}
              iconPosition="left"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.referralFormClick}
              analyticsLocation="dentists_referral_section"
            >
              Go to Online Referral Form
            </LinkButton>
            <p className="text-sm text-brand-dark-text/70 mt-4">For urgent cases, please call our office directly.</p>
          </FadeInSection>
        </section>
      </main>
      <Footer />
    </>
  )
}
