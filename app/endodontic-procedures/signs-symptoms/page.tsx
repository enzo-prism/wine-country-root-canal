import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { EducationalVideos } from "@/components/educational-videos"
import { AlertTriangle, ArrowLeft, Clock, Thermometer, Zap } from "lucide-react"
import Link from "next/link"

export default function SignsSymptomsPage() {
  const symptoms = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Severe Toothache",
      description: "Persistent, throbbing pain that may worsen when chewing or applying pressure to the tooth.",
      urgency: "high",
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Temperature Sensitivity",
      description: "Prolonged sensitivity to hot or cold foods and drinks that lingers after the stimulus is removed.",
      urgency: "medium",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Swelling & Tenderness",
      description: "Swelling in the gums near the affected tooth, sometimes accompanied by facial swelling.",
      urgency: "high",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tooth Discoloration",
      description: "Darkening or discoloration of the tooth, which may indicate nerve damage or death.",
      urgency: "medium",
    },
  ]

  const emergencySymptoms = [
    "Severe, constant pain that keeps you awake",
    "Facial swelling that affects your ability to swallow",
    "Fever accompanying dental pain",
    "Pus discharge from around the tooth",
    "Trauma to the tooth from an accident or injury",
  ]

  const educationalVideo = [
    {
      title: "Understanding Root Canal Treatment",
      description:
        "If you're experiencing symptoms that may require endodontic treatment, this video explains what root canal therapy involves and how it can relieve your pain while saving your natural tooth.",
      vimeoId: "1095465278",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Signs & Symptoms"
        description="Recognize when you need endodontic treatment and understand the warning signs of dental infection."
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
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">When to Seek Endodontic Care</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Early recognition of symptoms can mean the difference between saving your tooth and losing it. If you're
                experiencing any of these signs, it's important to see an endodontist promptly.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Not all tooth pain requires endodontic treatment, but certain symptoms are clear indicators that the
                pulp inside your tooth may be infected or damaged.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <EducationalVideos
              videos={educationalVideo}
              title="Understanding Your Treatment Options"
              description="If you're experiencing dental symptoms, learn what root canal treatment involves and how it can provide relief."
            />
          </FadeInSection>

          {/* Main Symptoms */}
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">Common Warning Signs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {symptoms.map((symptom, index) => (
                <div key={index} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        symptom.urgency === "high" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {symptom.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-brand-dark-text mb-2">{symptom.title}</h3>
                      <p className="text-brand-dark-text/80">{symptom.description}</p>
                      {symptom.urgency === "high" && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          Urgent Care Needed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Emergency Symptoms */}
          <FadeInSection className="bg-red-50 p-8 rounded-sm border-l-4 border-red-500">
            <h2 className="font-serif text-2xl text-red-700 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Seek Immediate Care If You Experience:
            </h2>
            <ul className="space-y-3">
              {emergencySymptoms.map((symptom, index) => (
                <li key={index} className="flex items-start text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LinkButton href="tel:+17075233636" variant="destructive" size="lg" className="mr-4">
                Call Now: (707) 523-3636
              </LinkButton>
              <LinkButton href="/dental-emergencies" variant="outline">
                Learn About Emergency Care
              </LinkButton>
            </div>
          </FadeInSection>

          {/* What Causes These Symptoms */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              What Causes These Symptoms?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Infection & Inflammation</h3>
                <p className="text-brand-dark-text/80 mb-4">
                  When bacteria enter the tooth through cracks, deep cavities, or trauma, they can infect the pulp
                  (nerve) inside the tooth. This leads to inflammation, pressure, and pain.
                </p>
                <ul className="space-y-2 text-brand-dark-text/80 text-sm">
                  <li>• Deep decay reaching the pulp</li>
                  <li>• Cracked or chipped teeth</li>
                  <li>• Repeated dental procedures</li>
                  <li>• Trauma from accidents or sports</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-4">Progressive Damage</h3>
                <p className="text-brand-dark-text/80 mb-4">
                  Without treatment, the infection spreads, potentially forming an abscess at the root tip. This can
                  lead to bone loss and more serious complications.
                </p>
                <ul className="space-y-2 text-brand-dark-text/80 text-sm">
                  <li>• Abscess formation</li>
                  <li>• Bone loss around the root</li>
                  <li>• Spread of infection</li>
                  <li>• Eventual tooth loss</li>
                </ul>
              </div>
            </div>
          </FadeInSection>

          {/* Next Steps */}
          <FadeInSection className="text-center py-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
              Don't Wait - Get the Care You Need
            </h2>
            <p className="text-lg text-brand-dark-text/80 mb-8 max-w-2xl mx-auto">
              Early intervention can save your tooth and prevent more serious complications. Dr. Anderson provides
              gentle, effective treatment to eliminate pain and preserve your smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Consultation
              </LinkButton>
              <LinkButton href="/endodontic-procedures/root-canal-therapy" variant="brand-outline" size="lg">
                Learn About Root Canal Treatment
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
