import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  Stethoscope,
  AlertTriangle,
  DollarSign,
  Scale,
  HeartPulse,
  Zap,
  Siren,
  BriefcaseMedical,
  RefreshCw,
  ShieldCheck,
  ScanLine,
} from "lucide-react"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { analyticsEvents } from "@/lib/analytics"

export const metadata = buildMetadata({
  title: "Patient Resources | Wine Country Root Canal",
  description:
    "Root canal and endodontic patient education from Wine Country Root Canal in Santa Rosa, CA — costs, recovery, cracked teeth, dental injuries, and more.",
  path: "/resources",
})

export default function ResourcesPage() {
  const resources = [
    {
      title: "What Is an Endodontist?",
      description: "How endodontists differ from general dentists and why you might be referred.",
      icon: <Stethoscope className="w-8 h-8" />,
      href: "/resources/what-is-an-endodontist",
      color: "bg-brand-merlot",
    },
    {
      title: "Signs You Need a Root Canal",
      description: "Symptoms that mean you should be evaluated.",
      icon: <AlertTriangle className="w-8 h-8" />,
      href: "/endodontic-procedures/signs-symptoms",
      color: "bg-brand-rose-beige",
    },
    {
      title: "Root Canal Safety & Myths",
      description: "Evidence-based answers and the AAE's updated 2026 safety resources.",
      icon: <ShieldCheck className="w-8 h-8" />,
      href: "/resources/root-canal-safety",
      color: "bg-brand-merlot",
    },
    {
      title: "Root Canal Cost & Insurance",
      description: "What affects the price, insurance, and financing.",
      icon: <DollarSign className="w-8 h-8" />,
      href: "/resources/root-canal-cost",
      color: "bg-brand-merlot",
    },
    {
      title: "Root Canal vs. Extraction",
      description: "Saving your tooth vs. removing and replacing it.",
      icon: <Scale className="w-8 h-8" />,
      href: "/resources/root-canal-vs-extraction",
      color: "bg-brand-rose-beige",
    },
    {
      title: "Recovery & Aftercare",
      description: "What's normal after treatment and when to call.",
      icon: <HeartPulse className="w-8 h-8" />,
      href: "/resources/after-your-root-canal",
      color: "bg-brand-merlot",
    },
    {
      title: "Cracked Tooth Syndrome",
      description: "Symptoms, types of cracks, and treatment options.",
      icon: <Zap className="w-8 h-8" />,
      href: "/resources/cracked-tooth",
      color: "bg-brand-rose-beige",
    },
    {
      title: "Dental Injuries & Knocked-Out Teeth",
      description: "First aid and urgent care for dental trauma.",
      icon: <Siren className="w-8 h-8" />,
      href: "/resources/dental-injuries",
      color: "bg-brand-merlot",
    },
  ]

  const coreServices = [
    {
      title: "Root Canal Therapy",
      description: "Our primary treatment to relieve pain and save an infected or damaged tooth.",
      icon: <BriefcaseMedical className="w-7 h-7" />,
      href: "/endodontic-procedures/root-canal-therapy",
    },
    {
      title: "Root Canal Retreatment",
      description: "Focused care for a previously treated tooth that has developed a new problem.",
      icon: <RefreshCw className="w-7 h-7" />,
      href: "/endodontic-procedures/retreatment",
    },
    {
      title: "Apicoectomy",
      description: "Minor endodontic surgery when a conventional root canal isn't enough.",
      icon: <ShieldCheck className="w-7 h-7" />,
      href: "/endodontic-procedures/apicoectomy",
    },
    {
      title: "3D CBCT Imaging",
      description: "On-site cone beam CT scanning for precise diagnosis and treatment planning.",
      icon: <ScanLine className="w-7 h-7" />,
      href: "/cbct-scanner-santa-rosa",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Patient Resources"
        description="Clear, expert answers to common questions about root canals and endodontic care."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Breadcrumbs */}
          <FadeInSection>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Patient Resources", href: "/resources" },
              ]}
            />
          </FadeInSection>

          {/* Introduction */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
                Understand Your Endodontic Care
              </h2>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <p>
                  A root canal or endodontic referral can bring a lot of questions — What will it cost? Will it hurt?
                  Is saving the tooth really better than pulling it? These guides are written to give you clear,
                  trustworthy answers so you can walk into your appointment feeling informed and at ease.
                </p>
                <p>
                  Every article below is grounded in current endodontic practice and reviewed by Dr. Craig Wm.
                  Anderson, our Santa Rosa endodontist. Choose a topic to learn more, or reach out to our team any time
                  with questions specific to your situation.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Resource Card Grid */}
          <FadeInSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {resources.map((resource) => (
                <Link key={resource.href} href={resource.href} className="group">
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-brand-rose-beige group-hover:border-brand-merlot rounded-sm overflow-hidden">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div
                        className={`w-16 h-16 ${resource.color} text-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {resource.icon}
                      </div>
                      <h3 className="font-serif text-xl text-brand-dark-text group-hover:text-brand-merlot transition-colors duration-300 mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-brand-dark-text/80 text-sm leading-relaxed flex-grow">
                        {resource.description}
                      </p>
                      <div className="mt-4 text-brand-merlot font-semibold text-sm group-hover:underline">
                        Read More →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeInSection>

          {/* Core Services */}
          <FadeInSection className="bg-white p-8 md:p-12 rounded-sm shadow-xl">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Explore Our Core Services</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Ready to move from learning to treatment? These are the procedures we perform every day to save natural
                teeth and end tooth pain.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {coreServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex items-start gap-4 bg-brand-cream p-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-brand-merlot text-white rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-brand-dark-text group-hover:text-brand-merlot transition-colors duration-300 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-brand-dark-text/80 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>

          {/* CTA Section */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Have a Question We Didn’t Cover?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Every mouth is different. Schedule a consultation with Dr. Anderson to get answers specific to your tooth,
              or call us at{" "}
              <a
                href="tel:+17075233636"
                className="text-brand-merlot font-semibold hover:underline"
                {...{
                  "data-analytics-event": analyticsEvents.phoneClick,
                  "data-analytics-location": "resources_hub_phone",
                }}
              >
                (707) 523-3636
              </a>
              .
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="resources_hub_primary_cta"
              >
                Request an Appointment
              </LinkButton>
              <LinkButton
                href="/about"
                variant="brand-outline"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
              >
                Meet Dr. Anderson
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
