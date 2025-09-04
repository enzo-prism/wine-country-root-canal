"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LinkButton } from "@/components/ui/link-button"
import { CheckCircle, Send, Users, Microscope, Zap, ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"

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
                Our investment in cutting-edge technology allows for superior diagnostics and treatment outcomes.
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
                  <p className="text-brand-dark-text/70 mt-2">Detailed 3D views for accurate diagnosis.</p>
                </div>
              </div>
              <LinkButton href="/technology" variant="brand-outline">
                Learn More About Our Technology
              </LinkButton>
            </FadeInSection>
          </section>
        </div>

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
