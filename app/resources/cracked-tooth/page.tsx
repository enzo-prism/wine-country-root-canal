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
import { Activity, AlertTriangle, ScanSearch, Stethoscope, ThermometerSnowflake, Wrench } from "lucide-react"

export const metadata = buildMetadata({
  title: "Cracked Tooth & Cracked Tooth Syndrome | Wine Country Root Canal",
  description:
    "Learn about the five types of cracked teeth, common symptoms, how an endodontist diagnoses cracks, and when treatment may help save the tooth.",
  path: "/resources/cracked-tooth",
})

type CrackType = {
  title: string
  description: string
}

const crackTypes: CrackType[] = [
  {
    title: "Craze lines",
    description:
      "These are very small cracks that affect only the outer enamel. They are common in adult teeth, usually cause no pain, and are generally considered harmless and cosmetic rather than a reason for treatment.",
  },
  {
    title: "Fractured cusp",
    description:
      "A cusp is a pointed part of the chewing surface. When a cusp becomes weakened, a piece may break off, often around a large filling. This type tends to be less likely to reach the pulp, and treatment may involve restoring the tooth.",
  },
  {
    title: "Cracked tooth",
    description:
      "Here a crack extends from the chewing surface toward the root and may reach the pulp. Because the crack is not fully separated, early evaluation matters. Treatment often involves root canal therapy and a crown, though the outlook depends on how far the crack extends.",
  },
  {
    title: "Split tooth",
    description:
      "A split tooth is usually the result of a cracked tooth that has been left untreated and has progressed. The crack separates the tooth into distinct segments. Depending on the location and extent, part of the tooth may be saveable, but a split tooth sometimes cannot be kept.",
  },
  {
    title: "Vertical root fracture",
    description:
      "These cracks begin in the root and extend toward the chewing surface. They often show few symptoms and may be discovered when surrounding bone or gum becomes involved. Vertical root fractures frequently require extraction, though in some cases part of the tooth may be preserved.",
  },
]

const faqItems = [
  {
    question: "What are the symptoms of a cracked tooth?",
    answer:
      "Cracked teeth can produce a range of symptoms, and they are often intermittent, which is part of why they can be hard to identify. Many people notice sharp pain when chewing, and a classic sign is discomfort as biting pressure is released rather than when biting down. Other common experiences include sensitivity to hot, cold, or sweet foods, pain that comes and goes, and discomfort that is difficult to pinpoint to a specific tooth. Some cracks cause little or no pain at all. Because symptoms vary so widely, ongoing or worsening discomfort is worth having evaluated rather than waiting for it to become constant.",
  },
  {
    question: "Can a cracked tooth be saved?",
    answer:
      "Whether a cracked tooth can be saved depends largely on the type of crack, its location, and how far it extends. Craze lines and many fractured cusps have a favorable outlook, and cracked teeth that have not fully separated can often be treated and restored. More extensive problems, such as a split tooth or a vertical root fracture, may not be saveable and can require extraction. In general, cracks that are identified and evaluated earlier tend to have more treatment options than those that have progressed. An endodontist can assess the specific tooth and discuss what may be realistic in your situation.",
  },
  {
    question: "Does a cracked tooth need a root canal?",
    answer:
      "Not every cracked tooth needs a root canal. Craze lines usually need no treatment, and some cracks can be addressed by restoring the tooth. When a crack extends far enough to reach or irritate the pulp, root canal therapy is often recommended to treat the inflamed or infected tissue, and a crown is frequently placed afterward to hold the tooth together and protect it during function. The right approach depends on how deep the crack is and whether the pulp is involved, which is something an endodontist evaluates before recommending treatment.",
  },
  {
    question: "What is cracked tooth syndrome?",
    answer:
      "Cracked tooth syndrome generally refers to symptoms caused by a crack that has not fully separated the tooth into pieces. Because the crack can open slightly under biting force and then close again, symptoms are often intermittent, which makes the condition notoriously difficult to diagnose. People frequently describe sharp pain on chewing, especially when releasing a bite, along with sensitivity that comes and goes. Identifying the responsible tooth may take careful testing, and prompt evaluation can help clarify what is happening before the crack has a chance to progress.",
  },
  {
    question: "How is a cracked tooth diagnosed?",
    answer:
      "Diagnosing a cracked tooth usually combines several methods because cracks are often invisible on a standard X-ray and may not show clearly on a visual exam. An endodontist typically reviews your history and symptoms, examines the tooth, and uses bite or pressure testing to try to reproduce the discomfort. A dye may be applied to help make a crack more visible, and in selected cases three-dimensional imaging can add useful information. No single test is definitive for every crack, so the diagnosis often relies on putting these findings together.",
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

export default function CrackedToothPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Cracked Tooth & Cracked Tooth Syndrome"
        description="Understanding the types of cracks, why they can be hard to diagnose, and how endodontic care may help save a tooth."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-20">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Patient Resources", href: "/resources" },
              { name: "Cracked Tooth", href: "/resources/cracked-tooth" },
            ]}
          />

          <MedicalReviewByline date="July 2026" />

          {/* Intro */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Understanding Cracked Teeth</h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6">
                Cracked teeth are common, and they can be surprisingly difficult to diagnose. A crack may be too small
                to see on a routine X-ray, and the symptoms it produces are often intermittent, coming and going with
                chewing or changes in temperature. Because of this, people sometimes live with an on-and-off
                toothache for a while before the cause becomes clear.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                The good news is that many cracked teeth can be evaluated and treated, and the type of crack has a
                large influence on both the recommended care and the outlook. Understanding the different kinds of
                cracks can help you recognize when it may be time to have a tooth checked.
              </p>
            </div>
          </FadeInSection>

          {/* Caveat */}
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="bg-brand-cream/60 p-5 md:p-6 rounded-sm border-l-4 border-brand-rose-beige">
              <p className="text-sm sm:text-base text-brand-dark-text/80">
                This information is educational and does not replace individualized dental advice. If you have ongoing
                or severe symptoms, please seek a professional evaluation.
              </p>
            </div>
          </FadeInSection>

          {/* Types of cracks */}
          <FadeInSection>
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4 text-center">
              The Five Types of Cracked Teeth
            </h2>
            <p className="text-base sm:text-lg text-brand-dark-text/80 text-center max-w-3xl mx-auto mb-8">
              The American Association of Endodontists describes five distinct crack patterns. Treatment and prognosis
              depend heavily on the type and how far the crack extends, so identifying the pattern is an important part
              of planning care.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {crackTypes.map((crack) => (
                <div key={crack.title} className="bg-white p-6 rounded-sm shadow-lg border-l-4 border-brand-rose-beige">
                  <h3 className="font-serif text-xl text-brand-merlot mb-3">{crack.title}</h3>
                  <p className="text-brand-dark-text/80">{crack.description}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Symptoms */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
              Common Symptoms of a Cracked Tooth
            </h2>
            <p className="text-base text-brand-dark-text/80 text-center max-w-3xl mx-auto mb-8">
              Symptoms vary from person to person, and they are frequently intermittent. Some of the more common
              experiences include:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Activity className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">
                      Sharp pain when chewing, often most noticeable as biting pressure is released
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ThermometerSnowflake className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">
                      Sensitivity to hot, cold, or sweet foods and drinks
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Activity className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">Pain that comes and goes rather than staying constant</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-merlot mr-3 mt-1 shrink-0" />
                    <span className="text-brand-dark-text/80">
                      Discomfort that is hard to pinpoint to a specific tooth
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-brand-dark-text/70 text-center max-w-3xl mx-auto mt-8">
              These symptoms do not always mean a tooth is cracked, and some cracks cause little pain, but they are
              worth having evaluated. You can also{" "}
              <Link href="/endodontic-procedures/signs-symptoms" className="text-brand-merlot hover:underline">
                learn more about endodontic signs and symptoms
              </Link>
              .
            </p>
          </FadeInSection>

          {/* Why hard to find + how evaluated */}
          <FadeInSection className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <ScanSearch className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">Why cracks are hard to find</h3>
              <p className="text-brand-dark-text/80">
                A crack can be extremely narrow, may sit below the gumline, and often does not appear on a standard
                two-dimensional X-ray. Because a crack can open and close under biting force, the symptoms it produces
                tend to be intermittent, which makes both the tooth and the cause harder to identify with certainty.
              </p>
            </div>
            <div className="bg-brand-cream p-6 md:p-8 rounded-sm shadow-lg">
              <Stethoscope className="w-10 h-10 text-brand-merlot mb-4" />
              <h3 className="font-serif text-xl md:text-2xl text-brand-merlot mb-3">How an endodontist evaluates</h3>
              <p className="text-brand-dark-text/80">
                Evaluation usually combines your history and symptoms, a visual exam, and bite or pressure testing to
                try to reproduce the discomfort. A dye may help make a crack more visible, and when indicated,{" "}
                <Link
                  href="/cbct-scanner-santa-rosa"
                  className="text-brand-merlot hover:text-brand-rose-beige underline"
                >
                  3D dental imaging with our CBCT scanner
                </Link>{" "}
                can add useful information in selected cases.
              </p>
            </div>
          </FadeInSection>

          {/* Cracked tooth syndrome */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4 text-center">
              What Is Cracked Tooth Syndrome?
            </h2>
            <p className="text-base sm:text-lg text-brand-dark-text/80 text-center">
              Cracked tooth syndrome generally describes symptomatic cracks that have not fully separated the tooth
              into pieces. Because the crack can flex open and closed with chewing, it tends to produce the classic
              on-and-off pain, particularly when releasing a bite, along with sensitivity that is difficult to
              localize. This partial, incomplete nature is a large part of why the condition can be challenging to
              diagnose, and why careful testing is often needed to identify the tooth responsible.
            </p>
          </FadeInSection>

          {/* Treatment */}
          <FadeInSection className="bg-white p-6 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <Wrench className="w-10 h-10 text-brand-merlot" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-6 text-center">
                How Cracked Teeth Are Treated
              </h2>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-4">
                Treatment depends on the crack's location and depth. A cracked tooth in which the crack reaches the
                pulp often needs{" "}
                <Link
                  href="/endodontic-procedures/root-canal-therapy"
                  className="text-brand-merlot hover:text-brand-rose-beige underline"
                >
                  root canal therapy
                </Link>{" "}
                to treat the inflamed or infected tissue, typically followed by a crown that holds the tooth together
                and protects it during chewing.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-4">
                More extensive cracks may have a different outlook. A split tooth or a vertical root fracture may not
                be saveable and can require extraction, though in some cases part of the tooth can be preserved. In
                general, having a crack evaluated earlier tends to allow more options, and prompt care may improve the
                chance of saving the tooth.
              </p>
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Patients across Santa Rosa and the surrounding Sonoma County area can be evaluated to determine which
                approach fits their specific tooth. Because outcomes vary with the type and extent of the crack, the
                recommended plan is best made after a personal examination.
              </p>
            </div>
          </FadeInSection>

          {/* When to seek prompt care */}
          <FadeInSection className="bg-brand-cream/60 p-6 md:p-8 rounded-sm max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-brand-merlot shrink-0 mt-1" />
              <p className="text-base sm:text-lg text-brand-dark-text/80">
                Ongoing or severe pain warrants prompt evaluation. If you are experiencing significant discomfort,
                swelling, or a tooth that suddenly feels different when you bite, learn more about{" "}
                <Link href="/dental-emergencies" className="text-brand-merlot hover:text-brand-rose-beige underline">
                  dental emergencies
                </Link>{" "}
                or reach out so the tooth can be assessed before a crack has a chance to progress.
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

          {/* Sources */}
          <FadeInSection className="max-w-3xl mx-auto">
            <div className="bg-white p-5 md:p-6 rounded-sm shadow-sm border-l-4 border-brand-cream">
              <h2 className="font-serif text-lg md:text-xl text-brand-merlot mb-2">Source</h2>
              <p className="text-sm text-brand-dark-text/70">
                This page draws on the American Association of Endodontists' patient guidance:{" "}
                <a
                  href="https://www.aae.org/patients/dental-symptoms/cracked-teeth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-merlot hover:underline"
                >
                  Cracked Teeth
                </a>
                . It is intended for education and does not replace individualized dental advice.
              </p>
            </div>
          </FadeInSection>

          {/* CTA */}
          <FadeInSection className="text-center py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-brand-merlot mb-4">Concerned About a Cracked Tooth?</h2>
            <p className="text-lg sm:text-xl text-brand-dark-text/80 mb-8 max-w-xl mx-auto">
              If chewing or temperature changes bring on sharp, on-and-off pain, an evaluation can help clarify what is
              happening. Schedule a consultation or call{" "}
              <a href="tel:+17075233636" className="text-brand-merlot hover:underline">
                (707) 523-3636
              </a>
              .
            </p>
            <LinkButton
              href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
              variant="brand-primary"
              size="lg"
              className="px-8 md:px-10 py-3 text-base md:text-lg"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation="cracked_tooth_primary_cta"
            >
              Schedule a Consultation
            </LinkButton>
            <p className="mt-8 text-sm text-brand-dark-text/70">
              Explore more{" "}
              <Link href="/resources" className="text-brand-merlot hover:underline">
                patient resources
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-brand-merlot hover:underline">
                contact our Santa Rosa office
              </Link>
              .
            </p>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
