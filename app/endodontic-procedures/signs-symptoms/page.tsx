import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { OnThisPage } from "@/components/on-this-page"
import { AppointmentCta } from "@/components/appointment-cta"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { EducationalVideos } from "@/components/educational-videos"
import { FaqDetailsList } from "@/components/faq-details"
import { AlertTriangle, Clock, ScanSearch, Thermometer, Zap } from "lucide-react"
import Link from "next/link"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { buildMetadata } from "@/lib/seo"
import { PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import {
  aaeCrackedTeethUrl,
  aaeDentalSymptomsUrl,
  aaeRootCanalExplainedUrl,
  aaeWhatIsARootCanalUrl,
} from "@/lib/clinical-resources"

export const metadata = buildMetadata({
  title: "Signs You May Need a Root Canal | Santa Rosa Endodontist",
  description:
    "Learn the warning signs of tooth infection—lingering pain, sensitivity, swelling, and more—and when to see an endodontist in Santa Rosa, CA.",
  path: "/endodontic-procedures/signs-symptoms",
  ogTitle: "Signs You May Need a Root Canal",
  ogDescription: "Warning signs of tooth infection and when to see an endodontist in Santa Rosa, CA.",
})

const inlineLinkClass = "text-brand-merlot underline hover:text-brand-rose-beige"

const faqItems = [
  {
    question: "Can a tooth need a root canal even if it doesn't hurt?",
    answer:
      "Yes. Some teeth with an infected or damaged pulp cause little or no pain and are first noticed as a darkened tooth, a bump on the gum, or a change on a routine dental x-ray. A lack of pain does not rule out infection.",
  },
  {
    question: "My toothache went away on its own. Do I still need to be seen?",
    answer:
      "Often, yes. Pain sometimes fades because the nerve inside the tooth has stopped responding, not because the problem has resolved, and an infection can remain at the root tip. An exam can confirm whether anything still needs attention.",
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

const sources = [
  { label: "What Is a Root Canal?", href: aaeWhatIsARootCanalUrl, sourceType: "AAE Patient Education" },
  { label: "Root Canal Explained", href: aaeRootCanalExplainedUrl, sourceType: "AAE Patient Education" },
  { label: "Dental Symptoms", href: aaeDentalSymptomsUrl, sourceType: "AAE Patient Education" },
  { label: "Cracked Teeth", href: aaeCrackedTeethUrl, sourceType: "AAE Patient Education" },
]

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

  const diagnosticSteps = [
    {
      title: "Your history",
      description:
        "When the pain started, what triggers it, how long it lasts, and the tooth’s past fillings, injuries, or treatment.",
    },
    {
      title: "Temperature testing",
      description:
        "A cold test on the tooth and its neighbors shows whether the nerve responds normally, lingers, or does not respond.",
    },
    {
      title: "Tapping and bite tests",
      description:
        "Gentle tapping and biting on a small instrument help locate inflammation at the root tip or a crack.",
    },
    {
      title: "Gum and bone checks",
      description:
        "Measuring the gum pockets helps separate an endodontic problem from gum disease or a root fracture.",
    },
    {
      title: "Dental x-rays",
      description:
        "Digital radiographs from more than one angle show decay, prior treatment, and bone changes near the root tip.",
    },
    {
      title: "3D imaging when needed",
      description:
        "When 2D x-rays leave questions, a focused CBCT scan can show root anatomy and bone in three dimensions.",
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Signs You May Need a Root Canal"
        description="Recognize when you need endodontic treatment and understand the warning signs of dental infection."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Endodontic Procedures", href: "/endodontic-procedures" },
          { name: "Signs & Symptoms", href: "/endodontic-procedures/signs-symptoms" },
        ]}
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <OnThisPage
            items={[
              { id: "when-to-seek-care", label: "When to seek care" },
              { id: "warning-signs", label: "Common warning signs" },
              { id: "what-symptoms-mean", label: "What symptoms can mean" },
              { id: "seek-immediate-care", label: "When to seek immediate care" },
              { id: "causes", label: "What causes these symptoms" },
              { id: "diagnosis", label: "How we find the source of pain" },
              { id: "faq", label: "Frequently asked questions" },
            ]}
          />

          {/* Introduction */}
          <FadeInSection>
            <div className="mx-auto max-w-4xl [&>p]:max-w-3xl">
              <h2 id="when-to-seek-care" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">When to Seek Endodontic Care</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Early recognition of symptoms can mean the difference between saving your tooth and losing it. If you’re
                experiencing any of these signs, it’s important to see an endodontist promptly.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Not all tooth pain requires endodontic treatment, but certain symptoms can indicate that the pulp — the
                soft tissue with nerves and blood vessels inside your tooth — may be inflamed or infected. Only an exam
                can confirm the cause, so use this page as a guide for when to call, not as a diagnosis.
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
            <h2 id="warning-signs" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-8">Common Warning Signs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {symptoms.map((symptom, index) => (
                <div key={index} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        symptom.urgency === "high" ? "bg-brand-merlot text-white" : "bg-brand-cream text-brand-merlot"
                      }`}
                    >
                      {symptom.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-brand-dark-text mb-2">{symptom.title}</h3>
                      <p className="text-brand-dark-text/80">{symptom.description}</p>
                      {symptom.urgency === "high" && (
                        <span className="inline-block mt-2 px-2 py-1 bg-brand-merlot text-white text-xs font-semibold rounded">
                          Urgent Care Needed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Symptoms in detail */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-lg">
            <h2 id="what-symptoms-mean" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
              What These Symptoms Can Mean
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-brand-dark-text/80">
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-2">Lingering sensitivity to hot or cold</h3>
                <p>
                  A quick twinge from ice water that fades within seconds is common and often comes from exposed root
                  surfaces or worn enamel. Sensitivity that lingers after the hot or cold is gone, or keeps getting
                  worse, can mean the pulp is inflamed — the American Association of Endodontists lists it among the
                  symptoms that may point to a need for root canal treatment.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-2">Pain when biting or chewing</h3>
                <p>
                  Tenderness when you bite down can come from inflammation that has spread to the tissues around the root
                  tip. Sharp, hard-to-locate pain when chewing — especially a jolt as you release your bite — is also a
                  classic sign of a{" "}
                  <Link href="/resources/cracked-tooth" className={inlineLinkClass}>
                    cracked tooth
                  </Link>
                  . A high filling, clenching, or sinus congestion can feel similar, which is why testing matters.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-2">A pimple or bump on the gum</h3>
                <p>
                  A small bump on the gum, sometimes with a salty taste, can be a drainage path (a sinus tract or
                  fistula) from an infection at the root tip. Because it drains, it may not hurt and may come and go —
                  but the source of the infection usually remains until it is treated.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-2">A tooth that is darkening</h3>
                <p>
                  A single tooth that turns gray or darker than its neighbors, often long after an injury, can be a sign
                  that the pulp has been damaged, even without pain. Stains and old fillings can also change a
                  tooth’s color, so an exam helps sort out the cause.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-brand-dark-text mb-2">Swelling of the gum or face</h3>
                <p>
                  Swelling or tenderness in the gum near a tooth can indicate an abscess. Swelling that is spreading into
                  the cheek, jaw, or under the eye, or that comes with fever, needs same-day attention.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Emergency Symptoms */}
          <FadeInSection className="bg-brand-cream p-8 rounded-sm border-l-4 border-brand-merlot">
            <h2 id="seek-immediate-care" className="scroll-mt-24 font-serif text-2xl text-brand-merlot mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              Seek Immediate Care If You Experience:
            </h2>
            <ul className="space-y-3">
              {emergencySymptoms.map((symptom, index) => (
                <li key={index} className="flex items-start text-brand-merlot">
                  <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-semibold text-brand-merlot">
              If swelling makes it hard to breathe or swallow, call 911 or go to the nearest emergency room right away.
            </p>
            <p className="mt-3 text-brand-merlot">
              For other urgent tooth pain, call our office. Our{" "}
              <Link href="/dental-emergencies" className="underline hover:text-brand-dark-text">
                dental emergency guide
              </Link>{" "}
              explains what to do before your visit, including how to handle a knocked-out or broken tooth.
            </p>
            <div className="mt-6">
              <LinkButton
                href={PRACTICE_PHONE_HREF}
                variant="brand-primary"
                size="lg"
                className="mr-4"
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="signs_symptoms_emergency"
              >
                Call Now: {PRACTICE_PHONE_DISPLAY}
              </LinkButton>
              <LinkButton href="/dental-emergencies" variant="outline">
                Learn About Emergency Care
              </LinkButton>
            </div>
          </FadeInSection>

          {/* What Causes These Symptoms */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 id="causes" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
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

          {/* How we diagnose */}
          <FadeInSection>
            <div className="mx-auto max-w-4xl [&>p]:max-w-3xl mb-8">
              <ScanSearch className="w-10 h-10 text-brand-merlot mb-3" aria-hidden="true" />
              <h2 id="diagnosis" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                How an Endodontist Finds the Source of Pain
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Tooth pain can be surprisingly hard to pin down — it can seem to come from the wrong tooth, or even the
                wrong jaw. Diagnosing that kind of pain is a core part of{" "}
                <Link href="/resources/what-is-an-endodontist" className={inlineLinkClass}>
                  what an endodontist does
                </Link>
                . Dr. Anderson combines several simple tests rather than relying on any single one:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {diagnosticSteps.map((step) => (
                <div key={step.title} className="bg-brand-cream p-5 rounded-sm shadow-md">
                  <h3 className="font-serif text-lg text-brand-merlot mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-brand-dark-text/80">{step.description}</p>
                </div>
              ))}
            </div>
            <p className="text-base sm:text-lg text-brand-dark-text/80 max-w-3xl mx-auto mt-8 text-center">
              Our office has an on-site{" "}
              <Link
                href="/cbct-scanner-santa-rosa"
                className={inlineLinkClass}
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "signs_symptoms_diagnosis_cbct")}
              >
                CBCT scanner for 3D dental imaging
              </Link>
              , used only when the added detail is likely to change the diagnosis or plan. The result may be root
              canal therapy, a different treatment, or reassurance that the tooth simply needs monitoring — and we explain the
              options before anything is done.
            </p>
          </FadeInSection>

          {/* FAQ */}
          <FadeInSection className="mx-auto max-w-4xl">
            <h2 id="faq" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Sources */}
          <FadeInSection className="bg-white shadow-sm p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-merlot mb-4">Sources &amp; Further Reading</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="block text-xs uppercase tracking-wide text-brand-dark-text/80 mb-1">
                      {source.sourceType}
                    </span>
                    <span className="font-semibold text-brand-merlot hover:underline">{source.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-brand-dark-text/80 mt-6 text-center">
              This page is general patient education and does not replace an in-person exam or individualized dental
              or medical advice.
            </p>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection>
            <AppointmentCta
              id="request-appointment"
              title="Don’t Wait - Get the Care You Need"
              description="Early intervention can save your tooth and prevent more serious complications. Dr. Anderson provides gentle, effective treatment to eliminate pain and preserve your smile."
              analyticsLocation="signs_symptoms_primary_cta"
              showVisitLink
            />
            <p className="mt-6 text-center text-sm sm:text-base text-brand-dark-text/80">
              <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Learn about root canal treatment
              </Link>
            </p>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
