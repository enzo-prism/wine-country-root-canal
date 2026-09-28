import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { AlertTriangle, Phone, Clock, Zap, Heart } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { FaqDetailsList } from "@/components/faq-details"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { buildMetadata } from "@/lib/seo"
import { AfterHoursNote } from "@/components/after-hours-note"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

export const metadata = buildMetadata({
  title: "Emergency Root Canal Care in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Same‑day care when possible (Monday–Thursday) for severe tooth pain, abscesses, or dental trauma. Call Wine Country Root Canal in Santa Rosa, CA for urgent endodontic evaluation.",
  path: "/dental-emergencies",
  ogTitle: "Emergency Endodontic Care in Santa Rosa, CA",
  ogDescription:
    "Same‑day care when possible, Monday–Thursday, for severe tooth pain, abscesses, or trauma from Wine Country Root Canal.",
})

export default function DentalEmergenciesPage() {
  const emergencyTypes = [
    {
      title: "Severe Tooth Pain",
      description: "Intense, throbbing pain that doesn't respond to over-the-counter medication",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Dental Abscess",
      description: "Swelling, fever, and pus around a tooth indicating serious infection",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: "Dental Trauma",
      description: "Cracked, fractured, or knocked-out teeth from accidents or injury",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: "Post-Treatment Complications",
      description: "Severe pain or swelling after recent dental treatment",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
  ]

  const faqItems = [
    {
      question: "What constitutes a dental emergency?",
      answer:
        "A dental emergency is any tooth or jaw problem that causes significant pain, swelling, bleeding, or risk to your health. This includes severe toothache that won’t improve, facial swelling, a suspected abscess, a cracked or knocked‑out tooth, or pain after recent dental work. If you have difficulty chewing, a fever, or swelling that’s spreading, don’t wait. Calling our office quickly helps us relieve pain and prevent the infection or injury from worsening.",
    },
    {
      question: "Should I go to the emergency room for dental pain?",
      answer:
        "For most urgent tooth pain, it’s best to call an endodontist first. Emergency rooms can help with pain control and antibiotics, but they usually can’t treat the tooth itself. We can diagnose the cause and provide the right dental care the same day when possible. Go to the ER immediately if you have trouble breathing or swallowing, uncontrolled bleeding, a high fever, or swelling that is affecting your airway. Otherwise, contact us and we’ll guide you.",
    },
    {
      question: "How quickly can I be seen for a dental emergency?",
      answer:
        "We prioritize emergencies and reserve time for urgent visits. During office hours (Monday–Thursday), we can often see you the same day when possible, especially for severe pain, swelling, or trauma. Calling early in the day gives us the most flexibility, but we’ll do our best to help whenever you reach out. If you’re already a patient of record, we can often move quickly to relieve pain and start treatment. Our team will let you know the soonest available time and what to do in the meantime.",
    },
    {
      question: "What should I do while waiting for my emergency appointment?",
      answer:
        "Take over‑the‑counter pain medication as directed (unless your physician advises otherwise), and apply a cold compress to the outside of your cheek for 10–15 minutes at a time to reduce swelling. Rinse gently with warm salt water, avoid chewing on the painful side, and stay away from very hot or cold foods. If a tooth is broken, keep the area clean and save any fragments. Do not apply heat to the face if you suspect an abscess. Call us if symptoms worsen.",
    },
    {
      question: "Do you see emergency patients after hours?",
      answer:
        "Our regular office hours are Monday through Thursday, 8 AM to 5 PM. If an emergency happens outside those times, call our main number and follow the recorded instructions. We provide guidance for urgent situations and will arrange the earliest possible care. If you are experiencing rapidly increasing swelling, difficulty breathing or swallowing, or severe bleeding, seek emergency medical attention right away. Otherwise, leave a message and we’ll return your call as soon as we can.",
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
        title="Dental Emergencies"
        headerWidth="wide"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Dental Emergencies", href: "/dental-emergencies" },
        ]}
        description="Prompt expert care when you need it most. We prioritize emergency cases and offer same-day visits when possible, Monday–Thursday."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">

          {/* Emergency Contact Section: calm, on-brand, unmistakable. Calling is the primary action. */}
          <FadeInSection className="grid gap-4 lg:grid-cols-5">
            <div className="rounded-sm bg-brand-merlot p-6 text-brand-cream shadow-lg sm:p-8 lg:col-span-3">
              <div className="mb-3 flex items-center gap-3">
                <Phone aria-hidden="true" focusable="false" className="h-7 w-7 shrink-0" />
                <h2 className="font-serif text-2xl text-brand-cream sm:text-3xl">Dental Emergency? Call Now</h2>
              </div>
              <p className="mb-6 text-lg leading-relaxed">
                If you’re experiencing severe dental pain or have suffered dental trauma, don’t wait. Calling is the
                fastest way to reach us.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <LinkButton
                  href={PRACTICE_PHONE_HREF}
                  size="lg"
                  className="bg-brand-cream px-6 text-base font-semibold text-brand-merlot shadow-md hover:bg-white focus-visible:ring-brand-cream focus-visible:ring-offset-brand-merlot"
                  icon={<Phone />}
                  analyticsEvent={analyticsEvents.phoneClick}
                  analyticsLocation="dental_emergencies_hero"
                >
                  Call {PRACTICE_PHONE_DISPLAY}
                </LinkButton>
                <LinkButton
                  href={APPOINTMENT_REQUEST_URL}
                  variant="ghost"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal px-4 py-2 text-left text-base text-brand-cream underline underline-offset-4 hover:bg-brand-cream/10 hover:text-brand-cream focus-visible:ring-brand-cream focus-visible:ring-offset-brand-merlot"
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={analyticsEvents.bookAppointmentClick}
                  analyticsLocation="dental_emergencies_hero"
                >
                  Can’t call right now? Request a callback
                </LinkButton>
              </div>
              <p className="mt-4 text-sm text-brand-cream/90">
                Our team will follow up on online requests. If you are in pain, please call.
              </p>
            </div>
            <AfterHoursNote
              analyticsLocation="dental_emergencies_after_hours"
              className="self-stretch p-6 text-base shadow-lg lg:col-span-2"
              hideEmergencyLink
              variant="full"
            />
          </FadeInSection>

          {/* Types of Emergencies */}
          <FadeInSection>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
                Common Dental Emergencies We Treat
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Dr. Anderson specializes in endodontic emergencies and is equipped to handle urgent situations that
                require immediate attention.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyTypes.map((emergency, index) => (
                <div key={index} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <div className="flex items-start mb-3">
                    <div aria-hidden="true" className="text-brand-merlot mr-3 mt-1">{emergency.icon}</div>
                    <h3 className="font-serif text-xl text-brand-merlot">{emergency.title}</h3>
                  </div>
                  <p className="text-brand-dark-text/80">{emergency.description}</p>
                </div>
              ))}
            </div>
            <div className="max-w-3xl mt-10">
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                In some urgent situations, our on-site{" "}
                <Link
                  href="/cbct-scanner-santa-rosa"
                  className="text-brand-merlot underline hover:text-brand-dark-text"
                  {...analyticsAttributes(analyticsEvents.cbctContentClick, "dental_emergencies_content")}
                >
                  3D dental imaging
                </Link>{" "}
                may help clarify the source or extent of the problem when a standard X-ray does not tell the full
                story.
              </p>
              <p className="mt-4 text-base sm:text-lg text-brand-dark-text/80">
                For step-by-step guidance on chipped, dislodged, or knocked-out teeth, read our{" "}
                <Link href="/resources/dental-injuries" className="text-brand-merlot underline hover:text-brand-dark-text">
                  dental injuries and knocked-out teeth guide
                </Link>
                . If biting or temperature changes cause sharp, on-and-off pain, learn about the{" "}
                <Link href="/resources/cracked-tooth" className="text-brand-merlot underline hover:text-brand-dark-text">
                  signs of a cracked tooth
                </Link>
                .
              </p>
            </div>
          </FadeInSection>

          {/* What to Expect */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
              What to Expect During Your Emergency Visit
            </h2>
            <ol className="space-y-6">
              {[
                {
                  step: "Immediate Assessment:",
                  description:
                    "Dr. Anderson will quickly evaluate your condition, focusing on pain relief and determining the source of the problem.",
                },
                {
                  step: "Pain Management:",
                  description:
                    "Our first priority is making you comfortable. We'll provide appropriate anesthesia and pain relief measures.",
                },
                {
                  step: "Diagnostic Imaging:",
                  description:
                    "Digital X-rays or 3D imaging help us understand the extent of the problem and plan the most effective treatment.",
                },
                {
                  step: "Emergency Treatment:",
                  description:
                    "We'll perform the necessary treatment to address the immediate problem, whether it's draining an abscess, performing emergency root canal therapy, or other procedures.",
                },
                {
                  step: "Follow-up Care:",
                  description:
                    "We'll schedule appropriate follow-up appointments and coordinate with your general dentist for any additional treatment needed.",
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

          {/* Our Commitment */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Clock className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">
                Same-Day Care When Possible, Monday–Thursday
              </h3>
              <p className="text-brand-dark-text/80">
                We understand that dental emergencies can’t wait. Dr. Anderson reserves time in his schedule for
                emergency cases so that, whenever possible, you can be seen the same day you call during office hours.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Heart className="w-10 h-10 text-brand-merlot mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Compassionate Care</h3>
              <p className="text-brand-dark-text/80">
                We know dental emergencies can be frightening and painful. Our team is committed to providing gentle,
                compassionate care to help you feel comfortable and confident in your treatment.
              </p>
            </div>
          </FadeInSection>

          {/* FAQ Accordion */}
          <FadeInSection className="max-w-4xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
              Emergency Care Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Final CTA */}
          <FadeInSection className="rounded-sm border-t-4 border-brand-merlot bg-white px-6 py-10 text-center shadow-lg sm:py-12">
            <h2 className="mb-4 font-serif text-2xl text-brand-merlot sm:text-3xl">Don’t Suffer in Pain</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-brand-dark-text/80 sm:text-xl">
              Dental emergencies require immediate attention. Contact us now for prompt, professional care.
            </p>
            <LinkButton
              href={PRACTICE_PHONE_HREF}
              variant="brand-primary"
              size="lg"
              className="px-8 text-base font-semibold md:px-10 md:text-lg"
              icon={<Phone />}
              analyticsEvent={analyticsEvents.phoneClick}
              analyticsLocation="dental_emergencies_final_cta"
            >
              Call for Emergency Care
            </LinkButton>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
