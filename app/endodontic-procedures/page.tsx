import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { EducationalVideos } from "@/components/educational-videos"
import { BriefcaseMedical, AlertTriangle, ClipboardList, HelpCircle, ShieldCheck, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function EndodonticProceduresPage() {
  const procedures = [
    {
      title: "Root Canal Therapy",
      description: "Comprehensive treatment to save infected or damaged teeth with gentle, effective care.",
      icon: <BriefcaseMedical className="w-8 h-8" />,
      href: "/endodontic-procedures/root-canal-therapy",
      color: "bg-brand-merlot",
    },
    {
      title: "Signs & Symptoms",
      description: "Learn to recognize when you might need endodontic treatment and what symptoms to watch for.",
      icon: <AlertTriangle className="w-8 h-8" />,
      href: "/endodontic-procedures/signs-symptoms",
      color: "bg-brand-rose-beige",
    },
    {
      title: "Procedure Steps",
      description: "Detailed walkthrough of what to expect during your endodontic treatment from start to finish.",
      icon: <ClipboardList className="w-8 h-8" />,
      href: "/endodontic-procedures/procedure-steps",
      color: "bg-brand-merlot",
    },
    {
      title: "Frequently Asked Questions",
      description: "Get answers to common questions about endodontic procedures, recovery, and aftercare.",
      icon: <HelpCircle className="w-8 h-8" />,
      href: "/endodontic-procedures/faq",
      color: "bg-brand-rose-beige",
    },
    {
      title: "Apicoectomy",
      description: "Specialized surgical treatment when conventional root canal therapy isn't sufficient.",
      icon: <ShieldCheck className="w-8 h-8" />,
      href: "/endodontic-procedures/apicoectomy",
      color: "bg-brand-merlot",
    },
    {
      title: "Root Canal Retreatment",
      description: "Advanced care for previously treated teeth that develop complications or new problems.",
      icon: <RefreshCw className="w-8 h-8" />,
      href: "/endodontic-procedures/retreatment",
      color: "bg-brand-rose-beige",
    },
  ]

  const educationalVideos = [
    {
      title: "Understanding Root Canal Treatment",
      description:
        "Get a clear explanation of what a root canal procedure involves, why it's necessary, and how modern endodontic techniques make the process comfortable and effective.",
      vimeoId: "1095465278",
    },
    {
      title: "What to Expect After Your Root Canal",
      description:
        "Dr. Anderson explains the normal symptoms and recovery process following root canal treatment, including what's normal to experience and when to contact our office for follow-up care.",
      vimeoId: "1095465301",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Endodontic Procedures"
        description="Comprehensive endodontic care to save your natural teeth and eliminate pain with advanced, gentle techniques."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Introduction Section */}
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
                Expert Endodontic Care in Wine Country
              </h2>
              <div className="text-base sm:text-lg text-brand-dark-text/80 space-y-4">
                <p>
                  Endodontics is the dental specialty focused on treating the inside of your tooth - the pulp, nerves,
                  and root canals. When these tissues become infected or damaged, specialized endodontic treatment can
                  often save your natural tooth and eliminate pain.
                </p>
                <p>
                  Dr. Craig Anderson brings years of specialized training and advanced technology to provide the most
                  comfortable, effective endodontic care possible. Our goal is always to preserve your natural smile
                  while ensuring your complete comfort throughout treatment.
                </p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection>
            <EducationalVideos
              videos={educationalVideos}
              description="Watch Dr. Anderson explain endodontic treatment and what you can expect during your care with us."
            />
          </FadeInSection>

          {/* Procedures Grid */}
          <FadeInSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {procedures.map((procedure, index) => (
                <Link key={index} href={procedure.href} className="group">
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-brand-rose-beige group-hover:border-brand-merlot rounded-sm overflow-hidden">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div
                        className={`w-16 h-16 ${procedure.color} text-white rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {procedure.icon}
                      </div>
                      <h3 className="font-serif text-xl text-brand-dark-text group-hover:text-brand-merlot transition-colors duration-300 mb-3">
                        {procedure.title}
                      </h3>
                      <p className="text-brand-dark-text/80 text-sm leading-relaxed flex-grow">
                        {procedure.description}
                      </p>
                      <div className="mt-4 text-brand-merlot font-semibold text-sm group-hover:underline">
                        Learn More →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeInSection>

          {/* Why Choose Endodontic Treatment */}
          <FadeInSection className="bg-white p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
              Why Choose Endodontic Treatment?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseMedical className="w-8 h-8 text-brand-merlot" />
                </div>
                <h3 className="font-serif text-lg text-brand-dark-text mb-2">Save Your Natural Tooth</h3>
                <p className="text-brand-dark-text/80 text-sm">
                  Preserve your natural tooth structure and avoid the need for extraction and replacement.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8 text-brand-merlot" />
                </div>
                <h3 className="font-serif text-lg text-brand-dark-text mb-2">Eliminate Pain</h3>
                <p className="text-brand-dark-text/80 text-sm">
                  Advanced techniques and anesthesia ensure comfortable treatment and lasting pain relief.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-brand-merlot" />
                </div>
                <h3 className="font-serif text-lg text-brand-dark-text mb-2">Restore Function</h3>
                <p className="text-brand-dark-text/80 text-sm">
                  Return your tooth to full function for eating, speaking, and maintaining your smile.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* CTA Section */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Ready to Save Your Smile?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Don't let tooth pain control your life. Dr. Anderson's expertise in endodontic procedures can help
              eliminate your discomfort and preserve your natural teeth.
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule Your Consultation
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
