import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { EducationalVideos } from "@/components/educational-videos"
import { DollarSign, Smile, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RootCanalTherapyPage() {
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
        title="Root Canal Therapy"
        description="Gentle, effective treatment to relieve pain and save your natural tooth."
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

          {/* Overview */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">What is Root Canal Therapy?</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Root canal therapy is a highly successful treatment used to save teeth that have become infected or
                severely damaged. The procedure involves removing the infected or inflamed pulp from inside the tooth,
                cleaning and disinfecting the root canals, then filling and sealing the space.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Contrary to popular belief, modern root canal therapy is typically no more uncomfortable than having a
                large filling. With proper anesthesia and Dr. Anderson's gentle technique, most patients experience
                little to no discomfort during the procedure.
              </p>
            </div>
          </FadeInSection>

          {/* Educational Videos */}
          <FadeInSection>
            <EducationalVideos
              videos={educationalVideos}
              description="Watch Dr. Anderson explain the root canal process and what you can expect during your treatment and recovery."
            />
          </FadeInSection>

          {/* When You Need RCT */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              When Do You Need Root Canal Therapy?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Common Causes:</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Deep decay that has reached the tooth's pulp</li>
                  <li>• Repeated dental procedures on the tooth</li>
                  <li>• Large fillings that compromise tooth structure</li>
                  <li>• Crack or chip in the tooth</li>
                  <li>• Trauma to the face that damages the nerve</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Warning Signs:</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Severe toothache when chewing or applying pressure</li>
                  <li>• Prolonged sensitivity to hot or cold temperatures</li>
                  <li>• Discoloration of the tooth</li>
                  <li>• Swelling and tenderness in nearby gums</li>
                  <li>• A persistent or recurring pimple on the gums</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <LinkButton href="/endodontic-procedures/signs-symptoms" variant="brand-outline" className="mr-4">
                Learn More About Signs & Symptoms
              </LinkButton>
            </div>
          </FadeInSection>

          {/* Benefits & Success Rate */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Smile className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">High Success Rate</h3>
              <p className="text-brand-dark-text/80">
                Root canal therapy has a success rate of over 95%. Most teeth that receive root canal treatment can last
                a lifetime with proper care. This makes it an excellent alternative to tooth extraction.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <DollarSign className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Cost-Effective Treatment</h3>
              <p className="text-brand-dark-text/80">
                Root canal therapy is often more cost-effective than tooth extraction followed by replacement with an
                implant or bridge. We accept most insurance plans and offer financing options.
              </p>
            </div>
          </FadeInSection>

          {/* Related Links */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl text-brand-merlot mb-6 text-center">Learn More About Your Treatment</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/endodontic-procedures/signs-symptoms"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <div className="w-12 h-12 bg-brand-merlot text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  !
                </div>
                <h3 className="font-semibold text-brand-dark-text mb-2">Signs & Symptoms</h3>
                <p className="text-sm text-brand-dark-text/80">Recognize when you need treatment</p>
              </Link>
              <Link href="/about" className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <div className="w-12 h-12 bg-brand-merlot text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  ?
                </div>
                <h3 className="font-semibold text-brand-dark-text mb-2">About Dr. Anderson</h3>
                <p className="text-sm text-brand-dark-text/80">Meet your endodontic specialist</p>
              </Link>
              <Link
                href="/endodontic-procedures/retreatment"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <div className="w-12 h-12 bg-brand-merlot text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  ↻
                </div>
                <h3 className="font-semibold text-brand-dark-text mb-2">Retreatment</h3>
                <p className="text-sm text-brand-dark-text/80">When additional treatment is needed</p>
              </Link>
            </div>
          </FadeInSection>

          {/* CTA Section */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Ready to Find Relief?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              Don't let tooth pain control your life. Schedule your consultation today for expert root canal therapy.
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Your Appointment
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
