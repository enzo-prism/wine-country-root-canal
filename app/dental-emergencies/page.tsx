import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { AlertTriangle, Phone, Clock, Zap, Heart } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { FaqDetailsList } from "@/components/faq-details"

export const metadata: Metadata = {
  title: "Emergency Root Canal Care in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Same‑day care for severe tooth pain, abscesses, or dental trauma. Call Wine Country Root Canal in Santa Rosa, CA for urgent endodontic evaluation.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/dental-emergencies",
  },
  openGraph: {
    title: "Emergency Endodontic Care in Santa Rosa, CA",
    description:
      "Same‑day care for severe tooth pain, abscesses, or trauma from Wine Country Root Canal.",
    url: "https://www.winecountryrootcanal.com/dental-emergencies",
  },
}

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
        "We prioritize emergencies and reserve time for urgent visits. In many cases we can see you the same day, especially for severe pain, swelling, or trauma. Calling early in the day gives us the most flexibility, but we’ll do our best to help whenever you reach out. If you’re already a patient of record, we can often move quickly to relieve pain and start treatment. Our team will let you know the soonest available time and what to do in the meantime.",
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
        description="Immediate expert care when you need it most. We prioritize emergency cases to relieve your pain quickly."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          {/* Emergency Contact Section */}
          <FadeInSection className="bg-red-50 border-l-4 border-red-400 p-6 rounded-sm">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="font-serif text-2xl text-red-800">Dental Emergency? Call Now</h2>
            </div>
            <p className="text-red-700 mb-4 text-lg">
              If you're experiencing severe dental pain or have suffered dental trauma, don't wait. Contact us
              immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton
                href="tel:+17075233636"
                variant="destructive"
                size="lg"
                className="px-6 py-3"
                icon={<Phone />}
              >
                Call (707) 523-3636
              </LinkButton>
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="outline"
                size="lg"
                className="px-6 py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request Emergency Appointment
              </LinkButton>
            </div>
          </FadeInSection>

          {/* Types of Emergencies */}
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-12">
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
                    <div className="text-brand-merlot mr-3 mt-1">{emergency.icon}</div>
                    <h3 className="font-serif text-xl text-brand-merlot">{emergency.title}</h3>
                  </div>
                  <p className="text-brand-dark-text/80">{emergency.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* What to Expect */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
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
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Same-Day Emergency Care</h3>
              <p className="text-brand-dark-text/80">
                We understand that dental emergencies can't wait. Dr. Anderson reserves time in his schedule
                specifically for emergency cases, ensuring you can be seen when you need care most.
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
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Emergency Care Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Final CTA */}
          <FadeInSection className="text-center py-8 sm:py-12 bg-red-50 rounded-sm">
            <h2 className="font-serif text-2xl sm:text-3xl text-red-800 mb-4">Don't Suffer in Pain</h2>
            <p className="text-lg sm:text-xl text-red-700 mb-8 max-w-xl mx-auto">
              Dental emergencies require immediate attention. Contact us now for prompt, professional care.
            </p>
            <LinkButton
              href="tel:+17075233636"
              variant="destructive"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              icon={<Phone />}
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
