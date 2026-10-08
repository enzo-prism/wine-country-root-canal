import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { EducationalVideos } from "@/components/educational-videos"
import { ServicePageLayout } from "@/components/service-page/service-page-layout"
import { DollarSign, Smile, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { DR_ANDERSON_ID, DR_ANDERSON_NAME, buildMetadata } from "@/lib/seo"
import {
  aaeRootCanalMythsUrl,
  aaeRootCanalSafetyFactSheetUrl,
  rootCanalMetabolismStudyUrl,
} from "@/lib/clinical-resources"
import type { QuickAnswer } from "@/components/quick-answers"
import type { OnThisPageItem } from "@/components/on-this-page"

export const metadata = buildMetadata({
  title: "Santa Rosa Root Canal Therapy | Wine Country Root Canal",
  description:
    "Learn what to expect from modern root canal therapy at Wine Country Root Canal in Santa Rosa, CA: symptoms, procedure steps, success rates, and aftercare.",
  path: "/endodontic-procedures/root-canal-therapy",
})

const medicalProcedureSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  name: "Root Canal Therapy",
  alternateName: "Endodontic Treatment",
  description:
    "Root canal therapy is a highly successful treatment used to save teeth that have become infected or severely damaged.",
  howPerformed:
    "The procedure involves removing the infected or inflamed pulp from inside the tooth, cleaning and disinfecting the root canals, then filling and sealing the space.",
  procedureType: "Therapeutic",
  bodyLocation: "Tooth",
  followup: "Most teeth that receive root canal treatment can last a lifetime with proper care.",
  performer: {
    "@type": "Person",
    "@id": DR_ANDERSON_ID,
    name: DR_ANDERSON_NAME,
  },
}

type HealthResource = {
  label: string
  href: string
  sourceType: string
  isPrimary: boolean
  paywallNote?: string
  isAdditionalReading?: boolean
}

export default function RootCanalTherapyPage() {
  const healthResources: HealthResource[] = [
    {
      label: "Root canals aren't fun, but a study suggests they are good for your health",
      href: "https://www.washingtonpost.com/wellness/2025/11/20/root-canal-heart-disease-diabetes/",
      sourceType: "Washington Post (Nov 20, 2025)",
      isPrimary: true,
      paywallNote: "May require subscription.",
    },
    {
      label: "New study suggests root canal treatment linked to lower risk of heart disease, diabetes",
      href: "https://newsroom.aae.org/press-releases/new-study-suggests-root-canal-treatment-linked-to-lower-risk-of-heart-disease-diabetes/",
      sourceType: "AAE Newsroom",
      isPrimary: false,
    },
    {
      label: "Saving Your Natural Tooth",
      href: "https://www.aae.org/patients/root-canal-treatment/saving-natural-tooth/",
      sourceType: "AAE Patient Education",
      isPrimary: false,
    },
    {
      label: "Benefits of Root Canal Treatment",
      href: "https://www.aae.org/patients/root-canal-treatment/benefits-root-canal-treatment/",
      sourceType: "AAE Additional Reading",
      isPrimary: false,
      isAdditionalReading: true,
    },
  ]

  const faqItems = [
    {
      question: "What is root canal therapy?",
      answer:
        "Root canal therapy is an endodontic treatment used to save a tooth whose inner pulp has become infected or inflamed. During the procedure, we gently remove the damaged tissue, clean and disinfect the root canals, and then fill and seal them to prevent bacteria from returning. The tooth is then restored so it can function normally again. Root canals are performed under local anesthesia and usually take one or two visits. The goal is to relieve pain, stop infection, and preserve your natural tooth.",
    },
    {
      question: "Is root canal treatment painful?",
      answer:
        "With modern anesthesia and gentle techniques, a root canal is typically very comfortable. Most patients feel only pressure during treatment, similar to having a filling placed. In fact, the procedure usually relieves the intense pain caused by infection. Afterward, it’s normal to have mild soreness for a few days while the tissues heal. Over-the-counter pain medication is often enough, and we’ll give you clear aftercare instructions so recovery is smooth.",
    },
    {
      question: "What are the signs that I need a root canal?",
      answer:
        "Common signs include a lingering toothache, pain when biting, prolonged sensitivity to hot or cold, swelling or tenderness in the gums, a pimple-like bump on the gum, or a tooth that darkens over time. Sometimes infection causes little pain at first, so changes like swelling or recurring discomfort matter. These symptoms don’t always mean you need a root canal, but they do mean you should be evaluated promptly. We’ll use an exam and imaging to confirm the cause and recommend the right care.",
    },
    {
      question: "What is the success rate of root canal therapy?",
      answer:
        "Root canal therapy has an excellent long-term success rate—often over 95%—when performed carefully and followed by a proper restoration such as a filling or crown. Success depends on factors like the extent of infection, root anatomy, and how quickly treatment is done. With modern microscopes and 3D imaging, we can treat complex canals more predictably. Most treated teeth can last for decades or even a lifetime with good oral hygiene and regular dental care.",
    },
    {
      question: "Is root canal therapy cost-effective?",
      answer:
        "Yes. Saving your natural tooth is usually more cost-effective than extracting it and replacing it with an implant, bridge, or denture. Root canal therapy restores function while helping you avoid the additional procedures and time that replacements require. Many dental insurance plans cover a portion of endodontic care, and our team can review your benefits ahead of time. If you have questions about costs or financing options, we’ll walk you through them before treatment begins.",
    },
    {
      question: "Can root canal treatment affect overall health?",
      answer:
        "Recent research has suggested that root canal treatment may be associated with improvements in certain health markers, including blood sugar, cholesterol-related markers, and inflammation. These findings are promising, but they do not prove cause and effect for every patient. The main goal of treatment is to remove infection and save your natural tooth. For guidance specific to your medical history, we recommend discussing findings like these with your dentist and physician.",
    },
    {
      question: "Are root canals safe?",
      answer:
        "Root canal treatment is a well-established, evidence-based procedure used to remove infection and preserve a natural tooth. The American Association of Endodontists states that there is no valid scientific evidence linking properly treated root canal teeth with systemic disease. Claims that root canals routinely cause cancer or chronic illness often trace back to the discredited focal infection theory. Your endodontist should still review the benefits, alternatives, and risks for your specific tooth and health history.",
    },
    {
      question: "How long does a root canal take?",
      answer:
        "Most root canal treatments are completed in one or two visits, depending on the complexity of the tooth and its anatomy. Each appointment typically lasts about 60 to 90 minutes. Some straightforward cases finish in a single visit, while teeth with more canals, curved roots, or significant infection may be treated over two appointments so we can clean, disinfect, and seal the canals thoroughly.",
    },
    {
      question: "Will I need a crown after a root canal?",
      answer:
        "Often, yes. A tooth that has had a root canal — especially a back tooth used for chewing — usually needs a crown to protect it from fracture and restore full function. Your general dentist typically places the final crown after the root canal has healed. Dr. Anderson will discuss the best long-term restoration for your specific tooth so it stays strong and functional.",
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

  const quickAnswers: QuickAnswer[] = [
    {
      question: "How long does it take?",
      answer:
        "Most root canal treatments are completed in one or two visits. Each appointment typically lasts about 60 to 90 minutes.",
      href: "#faq",
      linkLabel: "Read the full answer",
    },
    {
      question: "Will it hurt?",
      answer:
        "Root canals are performed under local anesthesia. Most patients feel only pressure during treatment, similar to having a filling placed.",
      href: "#faq",
      linkLabel: "Read about comfort",
    },
    {
      question: "Will I need a crown?",
      answer:
        "Often, yes — especially for a back tooth. Your general dentist typically places the final crown after the root canal has healed.",
      href: "#faq",
      linkLabel: "Read about crowns",
    },
    {
      question: "What does it cost?",
      answer:
        "It depends on the tooth and the details of your case. Our cost guide explains what affects the fee and how insurance often applies.",
      href: "/resources/root-canal-cost",
      linkLabel: "Read the cost & insurance guide",
    },
    {
      question: "Where are you?",
      answer: "4655 Hoen Ave, Suite 2, Santa Rosa. Open Monday–Thursday, 8 AM–5 PM.",
      href: "/your-visit",
      linkLabel: "See what to expect at your visit",
    },
  ]

  const onThisPage: OnThisPageItem[] = [
    { id: "what-is-root-canal-therapy", label: "What is root canal therapy?" },
    { id: "why-see-an-endodontist", label: "Why see an endodontist" },
    { id: "when-you-need-it", label: "When you need it" },
    { id: "success-and-cost", label: "Success rate & cost" },
    { id: "faq", label: "Frequently asked questions" },
    { id: "root-canal-safety", label: "Safety & overall health" },
    { id: "request-appointment", label: "Request an appointment" },
  ]

  return (
    <ServicePageLayout
      title="Root Canal Therapy"
      subtitle="Gentle, effective treatment to relieve pain and save your natural tooth."
      intro={
        <p>
          Dr. Anderson provides root canal therapy at Wine Country Root Canal in{" "}
          <strong className="font-semibold">Santa Rosa</strong>, CA, for patients from across{" "}
          <strong className="font-semibold">Sonoma County</strong>. Root canal therapy treats an infected or
          inflamed tooth so you can keep it.
        </p>
      }
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Endodontic Procedures", href: "/endodontic-procedures" },
        { name: "Root Canal Therapy", href: "/endodontic-procedures/root-canal-therapy" },
      ]}
      analyticsLocation="root_canal_therapy"
      jsonLd={
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
          />
        </>
      }
      quickAnswers={quickAnswers}
      onThisPage={onThisPage}
      faqItems={faqItems}
      cta={{
        title: "Ready to Find Relief?",
        description:
          "Don’t let tooth pain control your life. Request an appointment or call our Santa Rosa office, and our team will contact you to confirm an available time.",
        analyticsLocation: "root_canal_therapy_primary_cta",
      }}
      beforeShared={
        <FadeInSection className="mx-auto max-w-4xl space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <h2
              id="what-is-root-canal-therapy"
              className="scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl mb-4"
            >
              What is Root Canal Therapy?
            </h2>
            <p className="mb-6 text-base text-brand-dark-text/80 sm:text-lg">
              Root canal therapy is a highly successful treatment used to save teeth that have become infected or
              severely damaged. The procedure involves removing the infected or inflamed pulp from inside the tooth,
              cleaning and disinfecting the root canals, then filling and sealing the space.
            </p>
            <p className="text-base text-brand-dark-text/80 sm:text-lg">
              Contrary to popular belief, modern root canal therapy is typically no more uncomfortable than having a
              large filling. With proper anesthesia and the gentle technique of a{" "}
              <Link href="/resources/what-is-an-endodontist" className="text-brand-merlot underline hover:text-brand-rose-beige">
                specialist endodontist
              </Link>{" "}
              like Dr. Anderson, most patients experience little to no discomfort during the procedure. Mild soreness
              for a few days afterward is common, and our{" "}
              <Link href="/resources/after-your-root-canal" className="text-brand-merlot underline hover:text-brand-rose-beige">
                root canal aftercare guide
              </Link>{" "}
              explains what to expect during recovery.
            </p>
          </div>

          <div className="rounded-sm border-l-4 border-brand-rose-beige bg-white p-6 shadow-sm md:p-8">
            <p className="text-base text-brand-dark-text/80 sm:text-lg">
              When symptoms, anatomy, or prior dental history make diagnosis less straightforward, our on-site{" "}
              <Link
                href="/cbct-scanner-santa-rosa"
                className="text-brand-merlot underline hover:text-brand-rose-beige"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "root_canal_therapy_cbct")}
              >
                CBCT scanner and 3D dental imaging
              </Link>{" "}
              may help us plan root canal treatment more confidently.
            </p>
          </div>
        </FadeInSection>
      }
      afterShared={
        <>
          <FadeInSection>
            <EducationalVideos
              videos={educationalVideos}
              description="Watch Dr. Anderson explain the root canal process and what you can expect during your treatment and recovery."
            />
          </FadeInSection>

          <FadeInSection className="rounded-sm bg-white p-6 shadow-xl sm:p-8 md:p-12">
            <h2
              id="when-you-need-it"
              className="mb-6 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl"
            >
              When Do You Need Root Canal Therapy?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-serif text-xl text-brand-dark-text">Common Causes:</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Deep decay that has reached the tooth’s pulp</li>
                  <li>• Repeated dental procedures on the tooth</li>
                  <li>• Large fillings that compromise tooth structure</li>
                  <li>• Crack or chip in the tooth</li>
                  <li>• Trauma to the face that damages the nerve</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-serif text-xl text-brand-dark-text">Warning Signs:</h3>
                <ul className="space-y-2 text-brand-dark-text/80">
                  <li>• Severe toothache when chewing or applying pressure</li>
                  <li>• Prolonged sensitivity to hot or cold temperatures</li>
                  <li>• Discoloration of the tooth</li>
                  <li>• Swelling and tenderness in nearby gums</li>
                  <li>• A persistent or recurring pimple on the gums</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <LinkButton href="/endodontic-procedures/signs-symptoms" variant="brand-outline" className="mr-4">
                Learn More About Signs & Symptoms
              </LinkButton>
            </div>
          </FadeInSection>

          <FadeInSection className="grid gap-8 md:grid-cols-2">
            <div id="success-and-cost" className="scroll-mt-24 rounded-sm bg-white p-6 shadow-lg md:p-8">
              <Smile className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">High Success Rate</h3>
              <p className="text-brand-dark-text/80">
                Root canal therapy has a success rate of over 95%. Most teeth that receive root canal treatment can last
                a lifetime with proper care. This makes it an excellent alternative to tooth extraction — see how the two{" "}
                <Link href="/resources/root-canal-vs-extraction" className="text-brand-merlot underline hover:text-brand-rose-beige">
                  compare in our root canal vs. extraction guide
                </Link>
                .
              </p>
            </div>
            <div className="rounded-sm bg-white p-6 shadow-lg md:p-8">
              <DollarSign className="mb-3 h-10 w-10 text-brand-merlot" />
              <h3 className="mb-3 font-serif text-xl text-brand-merlot md:text-2xl">Cost-Effective Treatment</h3>
              <p className="text-brand-dark-text/80">
                Root canal therapy is often more cost-effective than tooth extraction followed by replacement with an
                implant or bridge. We accept most insurance plans and offer financing options. Learn{" "}
                <Link href="/resources/root-canal-cost" className="text-brand-merlot underline hover:text-brand-rose-beige">
                  what affects root canal cost in Santa Rosa
                </Link>{" "}
                and how insurance typically applies.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <section
              id="root-canal-safety"
              aria-labelledby="root-canal-safety-heading"
              className="mx-auto max-w-4xl scroll-mt-24 rounded-sm border-t-4 border-brand-merlot bg-brand-cream p-6 shadow-lg sm:p-8"
            >
              <div className="mb-4 flex items-start gap-3">
                <ShieldCheck className="h-8 w-8 shrink-0 text-brand-merlot" aria-hidden="true" />
                <h2 id="root-canal-safety-heading" className="font-serif text-2xl text-brand-merlot sm:text-3xl">
                  Root Canal Safety &amp; Overall Health
                </h2>
              </div>
              <p className="mb-4 text-base leading-relaxed text-brand-dark-text/80 sm:text-lg">
                The American Association of Endodontists reports that there is no valid scientific evidence linking
                properly treated root canal teeth with systemic disease. Its updated 2026 fact sheet explains why
                recurring online claims rely on the long-discredited focal infection theory. Our{" "}
                <Link href="/resources/root-canal-safety" className="text-brand-merlot underline hover:text-brand-rose-beige">
                  root canal safety guide
                </Link>{" "}
                covers this in more detail.
              </p>
              <p className="mb-6 text-base leading-relaxed text-brand-dark-text/80 sm:text-lg">
                Separately, a study published in the{" "}
                <a
                  href={rootCanalMetabolismStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-merlot underline hover:text-brand-rose-beige"
                >
                  <em>Journal of Translational Medicine</em>
                </a>{" "}
                in 2025 suggested that successful root canal treatment was associated with lower blood sugar and
                pyruvate after two years, short-term changes in cholesterol and fatty acid profiles, and reductions in
                systemic inflammatory markers.
              </p>

              <div className="mb-6 flex flex-col flex-wrap gap-3 sm:flex-row">
                <LinkButton href="/resources/root-canal-safety" variant="brand-primary" size="lg">
                  Read Our Root Canal Safety Guide
                </LinkButton>
                <LinkButton
                  href={aaeRootCanalSafetyFactSheetUrl}
                  variant="brand-outline"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal py-3 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={analyticsEvents.rootCanalSafetyClick}
                  analyticsLocation="root_canal_therapy_aae_fact_sheet"
                >
                  2026 AAE Safety Fact Sheet (PDF)
                </LinkButton>
                <LinkButton
                  href={aaeRootCanalMythsUrl}
                  variant="brand-outline"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal py-3 text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={analyticsEvents.rootCanalSafetyClick}
                  analyticsLocation="root_canal_therapy_aae_myths"
                >
                  AAE Myths &amp; Facts
                </LinkButton>
              </div>

              <h3 className="mb-2 font-serif text-lg text-brand-merlot">Coverage &amp; sources on the 2025 study</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                {healthResources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-brand-merlot underline hover:text-brand-rose-beige"
                    >
                      {resource.label}
                    </a>{" "}
                    <span className="text-brand-dark-text/80">
                      ({resource.sourceType}
                      {resource.paywallNote ? `; ${resource.paywallNote.replace(/\.$/, "").toLowerCase()}` : ""})
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-brand-dark-text/80">
                This research is promising but does not replace individualized medical or dental advice.
              </p>
            </section>
          </FadeInSection>

          <FadeInSection className="rounded-sm bg-white p-8 shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-brand-merlot">Learn More About Your Treatment</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/endodontic-procedures/signs-symptoms"
                className="rounded-sm p-4 text-center transition-colors hover:bg-brand-cream"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-merlot text-white">
                  !
                </div>
                <h3 className="mb-2 font-semibold text-brand-dark-text">Signs & Symptoms</h3>
                <p className="text-sm text-brand-dark-text/80">Recognize when you need treatment</p>
              </Link>
              <Link href="/about" className="rounded-sm p-4 text-center transition-colors hover:bg-brand-cream">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-merlot text-white">
                  ?
                </div>
                <h3 className="mb-2 font-semibold text-brand-dark-text">About Dr. Anderson</h3>
                <p className="text-sm text-brand-dark-text/80">Meet your endodontic specialist</p>
              </Link>
              <Link
                href="/endodontic-procedures/retreatment"
                className="rounded-sm p-4 text-center transition-colors hover:bg-brand-cream"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-merlot text-white">
                  ↻
                </div>
                <h3 className="mb-2 font-semibold text-brand-dark-text">Retreatment</h3>
                <p className="text-sm text-brand-dark-text/80">When additional treatment is needed</p>
              </Link>
            </div>
          </FadeInSection>
        </>
      }
    />
  )
}
