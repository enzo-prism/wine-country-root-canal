import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { FaqDetailsList } from "@/components/faq-details"
import { LinkButton } from "@/components/ui/link-button"
import { MedicalReviewByline } from "@/components/reviewed-by"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { buildMetadata } from "@/lib/seo"
import { analyticsEvents } from "@/lib/analytics"
import { AlertTriangle, ArrowRight, Baby, Clock, Milk, Phone, ScanSearch } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Dental Injuries & Knocked-Out Teeth | Wine Country Root Canal",
  description:
    "First aid for a knocked-out tooth, chips, and dental trauma in Santa Rosa, CA. Time-critical steps to save a tooth and when to call our office right away.",
  path: "/resources/dental-injuries",
})

const injuryTypes = [
  {
    title: "Chipped or fractured teeth",
    description:
      "The most common dental injuries. Many minor chips can be repaired, while larger fractures that reach the inner tooth may need more involved care.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    title: "Dislodged (luxated) teeth",
    description:
      "A tooth that is pushed sideways, into, or out of its socket. Prompt repositioning and stabilization by a dentist may help it heal.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    title: "Knocked-out (avulsed) teeth",
    description:
      "A permanent tooth that comes completely out of the socket. This is time-critical, and quick action offers the best chance of saving it.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    title: "Root fractures",
    description:
      "A crack that involves the root beneath the gum. These are not always visible and may need imaging to diagnose and a plan to monitor healing.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
]

const faqItems = [
  {
    question: "What should I do if my tooth gets knocked out?",
    answer:
      "For a knocked-out permanent tooth, act quickly. Pick the tooth up by the crown, the part you normally chew with, and avoid touching the root. If it is dirty, rinse it gently with milk or water for a few seconds without scrubbing or removing any attached tissue. If you can, try to place it back into the socket and hold it gently in position. If reinserting is not possible, keep the tooth moist in milk, or in the person's own saliva by tucking it inside the cheek, and get to an endodontist or emergency dentist right away. Do not store the tooth in plain water. This is general first-aid guidance, and being seen as soon as possible matters.",
  },
  {
    question: "Can a knocked-out tooth be saved?",
    answer:
      "Sometimes, yes. A knocked-out permanent tooth can often be saved when it is handled carefully and replaced into the socket quickly, ideally within a short window after the injury. Keeping the tooth moist in milk or saliva and avoiding contact with the root help protect the delicate cells on its surface. Outcomes vary with the individual situation, the condition of the tooth, and how fast care is received, so no result can be guaranteed. Even so, prompt professional care gives the best chance of a favorable outcome.",
  },
  {
    question: "How long do I have to save a knocked-out tooth?",
    answer:
      "Time is critical. The best outcomes are generally associated with replacing the tooth as soon as possible, and sooner is better. Keeping the tooth moist in milk or the person's saliva while you travel can help if it cannot be reinserted immediately. Rather than waiting to see whether symptoms settle, treat a knocked-out permanent tooth as an emergency and seek care right away.",
  },
  {
    question: "What should I do for a chipped or cracked tooth?",
    answer:
      "Rinse your mouth gently with warm water to keep the area clean, and use a cold compress on the outside of the cheek to ease any swelling. If you can find a broken fragment, keep it moist and bring it with you. Avoid chewing on the affected side and contact a dentist promptly, since even a chip that seems minor can involve the inner tooth and may need evaluation. Our page on cracked teeth explains the different types of cracks and how they are managed.",
  },
  {
    question: "Will I need a root canal after a dental injury?",
    answer:
      "It depends on the injury and whether the inner tissue, called the pulp, has been affected. Some injuries heal with monitoring and no further treatment, while others, particularly when the pulp is damaged or the tooth is knocked out, may require root canal therapy to save the tooth. An endodontist typically examines the tooth, may use imaging, and follows healing over time before deciding. The goal is always to preserve your natural tooth when it is possible to do so.",
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

export default function DentalInjuriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Dental Injuries & Knocked-Out Teeth"
        description="Time-critical first aid for dental trauma, and how prompt endodontic care may help save an injured tooth."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Patient Resources", href: "/resources" },
              { name: "Dental Injuries", href: "/resources/dental-injuries" },
            ]}
          />

          <MedicalReviewByline date="July 2026" />

          {/* Emergency CTA near the top */}
          <FadeInSection className="bg-red-50 border-l-4 border-red-400 p-6 rounded-sm">
            <div className="flex items-center mb-4">
              <Phone className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="font-serif text-2xl text-red-800">Knocked-Out Tooth? Call Now</h2>
            </div>
            <p className="text-red-700 mb-4 text-lg">
              A knocked-out permanent tooth is a true dental emergency. Seek care immediately, the sooner the tooth is
              treated, the better the chance of saving it. Keep it moist in milk or saliva and call us right away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton
                href="tel:+17075233636"
                variant="destructive"
                size="lg"
                className="px-6 py-3"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="dental_injuries_hero"
              >
                Call (707) 523-3636
              </LinkButton>
              <LinkButton
                href="/dental-emergencies"
                variant="outline"
                size="lg"
                className="px-6 py-3"
                icon={<ArrowRight />}
                iconPosition="right"
              >
                See Emergency Care Options
              </LinkButton>
            </div>
          </FadeInSection>

          {/* Intro */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Understanding Dental Trauma</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Dental injuries happen for many reasons, from sports and falls to accidents and biting into something
                hard. They range from minor to urgent, and it is not always obvious at first how serious an injury is.
                When in doubt, it is safer to have the tooth evaluated. An endodontist has specialized training in
                diagnosing and treating injuries that affect the inside of the tooth.
              </p>
            </div>
          </FadeInSection>

          {/* Types of trauma */}
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-8 text-center">
              Common Types of Dental Trauma
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {injuryTypes.map((injury) => (
                <div key={injury.title} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <div className="flex items-start mb-3">
                    <div className="text-brand-merlot mr-3 mt-1">{injury.icon}</div>
                    <h3 className="font-serif text-xl text-brand-merlot">{injury.title}</h3>
                  </div>
                  <p className="text-brand-dark-text/80">{injury.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* First aid for knocked-out tooth */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-brand-merlot" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot text-center">
                First Aid for a Knocked-Out Permanent Tooth
              </h2>
            </div>
            <p className="text-brand-dark-text/80 text-center max-w-3xl mx-auto mb-8">
              This is time-critical. The steps below are general first-aid guidance to follow on the way to seeing a
              dentist, and the best outcomes are typically when the tooth is replaced quickly.
            </p>
            <ol className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  step: "Pick it up by the crown",
                  description:
                    "Handle the tooth by the chewing surface, never by the root. Touching the root can damage the delicate cells that help it reattach.",
                },
                {
                  step: "Rinse gently only if dirty",
                  description:
                    "If the tooth is dirty, rinse it briefly with milk or water. Do not scrub it, and do not remove any attached tissue.",
                },
                {
                  step: "Try to reinsert it",
                  description:
                    "If possible, ease the tooth back into its socket in the correct orientation and hold it gently in place, biting softly on a clean cloth.",
                },
                {
                  step: "Otherwise, keep it moist",
                  description:
                    "If you cannot reinsert it, keep the tooth moist in milk, or in the person's own saliva by holding it inside the cheek. Do not store it in plain water.",
                },
                {
                  step: "Get care immediately",
                  description:
                    "See an endodontist or emergency dentist right away. Bring the tooth with you. Faster treatment offers the best chance of saving it.",
                },
              ].map((item, index) => (
                <li key={item.step} className="flex">
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
            <div className="mt-8 max-w-3xl mx-auto bg-brand-cream p-5 rounded-sm shadow-md flex items-start gap-3">
              <Milk className="w-8 h-8 text-brand-merlot shrink-0" aria-hidden="true" />
              <p className="text-sm sm:text-base text-brand-dark-text/80">
                Keep the tooth moist in milk or saliva, never plain water, until it can be treated. A knocked-out tooth
                that dries out is harder to save.
              </p>
            </div>
          </FadeInSection>

          {/* Why prompt care and how endodontists treat trauma */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Clock className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Why prompt care matters</h3>
              <p className="text-brand-dark-text/80">
                With trauma, timing can influence the outcome. Rapid evaluation may improve the chance of saving a
                tooth, allows any pain or infection to be addressed, and lets us begin monitoring how the tooth heals.
                Even injuries that look minor can involve the inner tooth, so a prompt exam is worthwhile.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ScanSearch className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">How endodontists treat trauma</h3>
              <p className="text-brand-dark-text/80">
                Care may include repositioning and splinting a loosened tooth to stabilize it,{" "}
                <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  root canal therapy
                </Link>{" "}
                when the pulp is affected, and following the tooth over time to confirm it is healing. When it is
                indicated,{" "}
                <Link href="/cbct-scanner-santa-rosa" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  3D imaging
                </Link>{" "}
                may help clarify the extent of an injury or a root fracture.
              </p>
            </div>
          </FadeInSection>

          {/* Children / baby teeth */}
          <FadeInSection className="max-w-4xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
              <div className="flex items-start gap-3 mb-3">
                <Baby className="w-8 h-8 text-brand-merlot shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot">Injuries to Children and Baby Teeth</h2>
              </div>
              <p className="text-brand-dark-text/80">
                Injuries to primary, or baby, teeth are handled differently from permanent teeth. As a general rule, a
                knocked-out baby tooth should not be reinserted, because doing so may risk harming the developing
                permanent tooth beneath it. Even so, a child’s dental injury deserves prompt evaluation, so contact a
                dentist to determine the right care for your child’s specific situation.
              </p>
            </div>
          </FadeInSection>

          {/* Local note + caveat */}
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Trauma Care in Santa Rosa</h2>
            <p className="text-brand-dark-text/80 mb-4">
              We care for patients with dental trauma throughout Santa Rosa and the surrounding Sonoma County
              communities, and we coordinate with your general dentist on follow-up when needed.
            </p>
            <p className="text-sm text-brand-dark-text/80">
              This information is educational and does not replace individualized dental advice. In a serious
              emergency, seek care immediately.
            </p>
          </FadeInSection>

          {/* FAQ */}
          <FadeInSection>
            <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Sources note */}
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-sm shadow-lg">
              <h2 className="font-serif text-xl text-brand-merlot mb-3">Sources</h2>
              <p className="text-brand-dark-text/80 mb-3">
                First-aid guidance on this page reflects patient education from the American Association of
                Endodontists (AAE) on traumatic dental injuries. It is general information and does not replace an
                in-person evaluation.
              </p>
              <a
                href="https://www.aae.org/patients/dental-symptoms/traumatic-dental-injuries/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-merlot hover:text-brand-rose-beige underline font-medium"
              >
                American Association of Endodontists — Traumatic Dental Injuries
              </a>
            </div>
          </FadeInSection>

          {/* Cross-links */}
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm">
            <h2 className="font-serif text-xl md:text-2xl text-brand-merlot mb-4 text-center">Related Patient Resources</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <Link href="/dental-emergencies" className="text-brand-merlot hover:text-brand-rose-beige underline font-medium">
                Dental Emergencies
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/endodontic-procedures/root-canal-therapy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Root Canal Therapy
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/cbct-scanner-santa-rosa" className="text-brand-merlot hover:text-brand-rose-beige underline">
                CBCT & 3D Imaging
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/resources/cracked-tooth" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Cracked Teeth
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/contact" className="text-brand-merlot hover:text-brand-rose-beige underline">
                Contact Us
              </Link>
              <span className="text-brand-dark-text/40">•</span>
              <Link href="/resources" className="text-brand-merlot hover:text-brand-rose-beige underline">
                All Patient Resources
              </Link>
            </div>
          </FadeInSection>

          {/* Final emergency CTA */}
          <FadeInSection className="text-center py-8 sm:py-12 bg-red-50 rounded-sm">
            <h2 className="font-serif text-2xl sm:text-3xl text-red-800 mb-4">Injured a Tooth? Don’t Wait</h2>
            <p className="text-lg sm:text-xl text-red-700 mb-8 max-w-xl mx-auto">
              For a knocked-out or badly injured tooth, quick care gives the best chance of saving it. Call us now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkButton
                href="tel:+17075233636"
                variant="destructive"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="dental_injuries_final_cta"
              >
                Call (707) 523-3636
              </LinkButton>
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="dental_injuries_primary_cta"
              >
                Request an Appointment
              </LinkButton>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
