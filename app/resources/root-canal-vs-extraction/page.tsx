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
import {
  Scale,
  Smile,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  DollarSign,
  Clock,
  Heart,
  CheckCircle2,
  MapPin,
} from "lucide-react"

export const metadata = buildMetadata({
  title: "Root Canal vs. Extraction | Wine Country Root Canal",
  description:
    "Compare root canal therapy vs. tooth extraction in Santa Rosa, CA — how saving your natural tooth stacks up against removal and implant replacement.",
  path: "/resources/root-canal-vs-extraction",
})

type ComparisonRow = {
  label: string
  rootCanal: string
  extraction: string
}

const comparison: ComparisonRow[] = [
  {
    label: "Preserving your natural tooth",
    rootCanal:
      "Keeps your own tooth in place, so your natural bite, chewing, and appearance are often maintained.",
    extraction:
      "Removes the tooth entirely; an implant or bridge is typically needed to replace the missing tooth and its function.",
  },
  {
    label: "Typical visits & timeline",
    rootCanal:
      "Treatment is usually completed in one or two visits, often followed by a crown to protect the tooth.",
    extraction:
      "An implant path can involve removal, healing, placement, and a final crown, so the overall timeline is often longer.",
  },
  {
    label: "Relative cost",
    rootCanal:
      "Saving the natural tooth is frequently the more economical option over time. See our cost overview for what shapes a fee.",
    extraction:
      "Extraction plus an implant and crown often costs more in total and may involve more appointments than expected.",
  },
  {
    label: "Recovery",
    rootCanal:
      "Mild soreness for a few days is common, and many patients return to normal activities quickly.",
    extraction:
      "Recovery can include a healing period after removal, plus additional healing time if an implant is placed.",
  },
]

const faqItems = [
  {
    question: "Is it better to get a root canal or an extraction?",
    answer:
      "In many cases, saving the natural tooth with root canal therapy is preferred when the tooth can be restored, because it helps preserve your natural bite, chewing, and neighboring teeth. However, the right choice depends on the specific tooth. If a tooth is severely fractured, badly broken down, or has advanced bone loss, extraction may be the more appropriate option. An endodontist can evaluate whether the tooth is savable and help you weigh the benefits and trade-offs of each path for your situation.",
  },
  {
    question: "Is a root canal or a dental implant better?",
    answer:
      "Both can be excellent options, and neither is automatically better for every tooth. A root canal keeps your natural tooth, which many patients prefer when the tooth has enough healthy structure to support a restoration. A dental implant replaces a tooth that cannot be saved and can be a strong long-term solution, but it typically requires oral surgery and a longer overall timeline. The best choice depends on the condition of the tooth, your bone and gum health, and your goals, which is why an individualized consultation matters.",
  },
  {
    question: "How long does a tooth last after a root canal?",
    answer:
      "Many teeth treated with a root canal can last for many years, and often a lifetime, when the tooth is properly restored (usually with a crown) and cared for with good oral hygiene and regular dental visits. Longevity can vary based on how much healthy tooth structure remains, the tooth's location, and whether the restoration seals the tooth well. Timely treatment and follow-up care may help improve the long-term outlook, though outcomes differ from person to person.",
  },
  {
    question: "Does pulling a tooth cost less than a root canal?",
    answer:
      "An extraction on its own can appear less expensive up front, but the total cost often changes once you factor in replacing the missing tooth. Leaving a gap can affect neighboring teeth over time, and replacing the tooth with an implant or bridge typically adds cost and additional visits. When the full treatment is considered, saving the natural tooth with a root canal is frequently the more economical choice. We can review the options and what generally influences fees during a consultation.",
  },
  {
    question: "What happens if I don't treat an infected tooth?",
    answer:
      "An untreated tooth infection typically does not resolve on its own and may worsen over time. The infection can spread to surrounding bone and tissues, cause increasing pain or swelling, and in some cases lead to more serious complications. This is why timely evaluation matters. If you have persistent tooth pain, swelling, or a recurring bump on the gum, it is best to be examined promptly so we can determine the cause and the most appropriate treatment.",
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

export default function RootCanalVsExtractionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Root Canal vs. Extraction"
        description="A balanced guide to saving your natural tooth versus removing and replacing it."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <FadeInSection>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Patient Resources", href: "/resources" },
                { name: "Root Canal vs. Extraction", href: "/resources/root-canal-vs-extraction" },
              ]}
            />
          </FadeInSection>

          <FadeInSection>
            <MedicalReviewByline date="July 2026" />
          </FadeInSection>

          {/* The core choice */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">The Core Choice</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                When a tooth is infected or badly damaged, you generally face one of two paths: save the natural tooth
                with root canal therapy, or remove it (extraction) and either replace it with an implant or bridge or
                leave a gap. Both options can be reasonable depending on the tooth, and the goal of this guide is to help
                you understand the trade-offs before you talk with an endodontist.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                For many patients in Santa Rosa and the surrounding Sonoma County area, the first question is simply
                whether the tooth can be saved. That answer shapes everything that follows.
              </p>
            </div>
          </FadeInSection>

          {/* Educational caveat */}
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-brand-dark-text/80 text-center">
              This information is educational and does not replace individualized dental advice. The right option for
              your tooth depends on an exam, imaging, and your overall health.
            </p>
          </FadeInSection>

          {/* Why saving the natural tooth is often preferred */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Smile className="w-9 h-9 text-brand-merlot shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot">
                  Why Saving the Natural Tooth Is Often Preferred
                </h2>
              </div>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                The American Association of Endodontists encourages patients to save the natural tooth whenever it is a
                reasonable option, because nothing artificial can perfectly replicate a healthy natural tooth. When a
                tooth can be restored, root canal therapy often offers several advantages.
              </p>
              <ul className="space-y-3">
                {[
                  "Preserves your natural bite and chewing, which can feel more comfortable than a replacement.",
                  "Avoids the oral surgery involved in placing a dental implant.",
                  "Helps protect neighboring teeth and the surrounding jawbone from shifting or change over time.",
                  "Usually involves fewer visits and a shorter overall timeline than removal plus replacement.",
                ].map((point) => (
                  <li key={point} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" aria-hidden="true" />
                    <span className="text-brand-dark-text/80">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-brand-dark-text/80 mt-6">
                These benefits typically apply when a tooth has enough healthy structure to support a restoration. Not
                every tooth qualifies, which is where a specialist evaluation helps.
              </p>
            </div>
          </FadeInSection>

          {/* When extraction may be recommended */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <AlertTriangle className="w-10 h-10 text-brand-merlot mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">
                When Extraction May Be Recommended
              </h3>
              <p className="text-brand-dark-text/80 mb-4">
                Sometimes a tooth cannot realistically be saved, and removal may be the more appropriate path. Situations
                that can point toward extraction include:
              </p>
              <ul className="space-y-2 text-brand-dark-text/80">
                <li>• A tooth that is too broken down or decayed to be restored</li>
                <li>• A severe or vertical root fracture</li>
                <li>• Advanced bone loss around the tooth</li>
                <li>• A tooth with a prognosis that is too uncertain to justify treatment</li>
              </ul>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Stethoscope className="w-10 h-10 text-brand-merlot mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">
                An Endodontist Can Help Determine If a Tooth Is Savable
              </h3>
              <p className="text-brand-dark-text/80 mb-4">
                Deciding whether a tooth can be saved is not always obvious from the outside. An endodontist focuses on
                diagnosing tooth pain and evaluating the inside of the tooth and its roots, sometimes with 3D imaging
                when it may add useful information.
              </p>
              <p className="text-brand-dark-text/80">
                This evaluation helps clarify whether root canal therapy, a related procedure such as an{" "}
                <Link href="/endodontic-procedures/apicoectomy" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  apicoectomy
                </Link>
                , or extraction is the more suitable option for your specific tooth.
              </p>
            </div>
          </FadeInSection>

          {/* Comparison */}
          <FadeInSection>
            <div className="text-center mb-8">
              <Scale className="w-10 h-10 text-brand-merlot mx-auto mb-3" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-3">
                Root Canal + Crown vs. Extraction + Implant
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 max-w-3xl mx-auto">
                Here is how the two most common paths tend to compare. Every case is different, so treat this as a
                general starting point rather than a prediction for your tooth.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border-t-4 border-brand-merlot">
                <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-6 text-center">
                  Root Canal + Crown
                </h3>
                <div className="space-y-5">
                  {comparison.map((row) => (
                    <div key={row.label}>
                      <p className="text-xs uppercase tracking-wide text-brand-dark-text/80 mb-1">{row.label}</p>
                      <p className="text-brand-dark-text/80">{row.rootCanal}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-6 text-center">
                  Extraction + Implant
                </h3>
                <div className="space-y-5">
                  {comparison.map((row) => (
                    <div key={row.label}>
                      <p className="text-xs uppercase tracking-wide text-brand-dark-text/80 mb-1">{row.label}</p>
                      <p className="text-brand-dark-text/80">{row.extraction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <span className="inline-flex items-center text-brand-dark-text/80">
                <DollarSign className="w-4 h-4 text-brand-merlot mr-1" aria-hidden="true" /> Implants are often more
                expensive overall
              </span>
              <span className="inline-flex items-center text-brand-dark-text/80">
                <Clock className="w-4 h-4 text-brand-merlot mr-1" aria-hidden="true" /> and can take longer from start to
                finish.
              </span>
            </div>
            <p className="text-center text-brand-dark-text/80 mt-4">
              For a closer look at what generally shapes fees, see our{" "}
              <Link href="/resources/root-canal-cost" className="text-brand-merlot hover:text-brand-rose-beige underline">
                root canal cost overview
              </Link>
              .
            </p>
          </FadeInSection>

          {/* Leaving an infected tooth untreated */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-9 h-9 text-brand-merlot shrink-0" aria-hidden="true" />
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot">
                  What Happens If an Infected Tooth Is Left Untreated
                </h2>
              </div>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-4">
                A tooth infection typically does not clear up on its own. Left untreated, the infection can spread to the
                surrounding bone and tissues, and discomfort or swelling may increase over time. In some cases, this can
                lead to more serious complications.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                This is why timely evaluation matters. Recognizing the{" "}
                <Link
                  href="/endodontic-procedures/signs-symptoms"
                  className="text-brand-merlot hover:text-brand-rose-beige underline"
                >
                  signs and symptoms that may need treatment
                </Link>{" "}
                and getting examined promptly gives you the widest range of options, which may include saving the tooth
                rather than removing it.
              </p>
            </div>
          </FadeInSection>

          {/* Individualized / consult */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ShieldCheck className="w-10 h-10 text-brand-merlot mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">The Decision Is Individualized</h3>
              <p className="text-brand-dark-text/80">
                There is no single answer that applies to every tooth. The most appropriate option depends on how much
                healthy tooth structure remains, the health of the surrounding bone and gums, your overall health, and
                your own preferences. A consultation is what determines the right path for you.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <MapPin className="w-10 h-10 text-brand-merlot mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Learn About Root Canal Therapy</h3>
              <p className="text-brand-dark-text/80 mb-4">
                If saving the tooth is on the table, it can help to understand what treatment involves before your visit.
              </p>
              <p className="text-brand-dark-text/80">
                Read more about{" "}
                <Link
                  href="/endodontic-procedures/root-canal-therapy"
                  className="text-brand-merlot hover:text-brand-rose-beige underline"
                >
                  modern root canal therapy
                </Link>{" "}
                and what to expect.
              </p>
            </div>
          </FadeInSection>

          {/* FAQ */}
          <FadeInSection>
            <h2 id="faq" className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </FadeInSection>

          {/* Related links */}
          <FadeInSection className="bg-white p-8 rounded-sm shadow-lg">
            <h2 className="font-serif text-2xl text-brand-merlot mb-6 text-center">Explore Related Resources</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Link
                href="/endodontic-procedures/root-canal-therapy"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <h3 className="font-semibold text-brand-dark-text mb-2">Root Canal Therapy</h3>
                <p className="text-sm text-brand-dark-text/80">How treatment saves a natural tooth</p>
              </Link>
              <Link
                href="/resources/root-canal-cost"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <h3 className="font-semibold text-brand-dark-text mb-2">Root Canal Cost</h3>
                <p className="text-sm text-brand-dark-text/80">What generally influences fees</p>
              </Link>
              <Link
                href="/endodontic-procedures/apicoectomy"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <h3 className="font-semibold text-brand-dark-text mb-2">Apicoectomy</h3>
                <p className="text-sm text-brand-dark-text/80">A surgical option to save a tooth</p>
              </Link>
              <Link
                href="/endodontic-procedures/signs-symptoms"
                className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors"
              >
                <h3 className="font-semibold text-brand-dark-text mb-2">Signs & Symptoms</h3>
                <p className="text-sm text-brand-dark-text/80">When to have a tooth evaluated</p>
              </Link>
              <Link href="/contact" className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-2">Contact Us</h3>
                <p className="text-sm text-brand-dark-text/80">Reach our Santa Rosa office</p>
              </Link>
              <Link href="/resources" className="text-center p-4 hover:bg-brand-cream rounded-sm transition-colors">
                <h3 className="font-semibold text-brand-dark-text mb-2">Patient Resources</h3>
                <p className="text-sm text-brand-dark-text/80">More educational guides</p>
              </Link>
            </div>
          </FadeInSection>

          {/* Sources note */}
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-brand-dark-text/80">
              Source:{" "}
              <a
                href="https://www.aae.org/patients/root-canal-treatment/saving-natural-tooth/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-merlot hover:underline"
              >
                American Association of Endodontists — Saving Your Natural Tooth
              </a>
              . This page is educational and does not replace individualized dental advice.
            </p>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">
              Not Sure Which Option Is Right for Your Tooth?
            </h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              A consultation can help determine whether your tooth can be saved. Schedule an evaluation with Dr. Anderson
              in Santa Rosa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LinkButton
                href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                variant="brand-primary"
                size="lg"
                className="px-8 md:px-10 py-3 text-base md:text-lg"
                target="_blank"
                rel="noopener noreferrer"
                analyticsEvent={analyticsEvents.bookAppointmentClick}
                analyticsLocation="root_canal_vs_extraction_primary_cta"
              >
                Request an Appointment
              </LinkButton>
              <a
                href="tel:+17075233636"
                className="text-brand-merlot font-semibold hover:underline"
                data-analytics-event={analyticsEvents.phoneClick}
                data-analytics-location="root_canal_vs_extraction_phone"
              >
                Or call (707) 523-3636
              </a>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
