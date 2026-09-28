import type React from "react"
import Link from "next/link"
import { CalendarCheck, ClipboardList, DollarSign, ExternalLink, MapPin, Phone } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FaqDetailsList } from "@/components/faq-details"
import { AppointmentCta } from "@/components/appointment-cta"
import { AfterHoursNote } from "@/components/after-hours-note"
import { OnThisPage, type OnThisPageItem } from "@/components/on-this-page"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { aaeRootCanalExplainedUrl } from "@/lib/clinical-resources"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "What to Expect at Your Visit | Wine Country Root Canal",
  description:
    "A step-by-step guide to your visit with Dr. Anderson in Santa Rosa, CA: scheduling and forms, diagnosis, root canal treatment, aftercare, cost, and directions.",
  path: "/your-visit",
  ogTitle: "Your Visit: What to Expect | Wine Country Root Canal",
})

/** Google Maps place listing (same place as the footer "Google Maps" link, tracking params removed). */
const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27"

const linkClass = "font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"

type VisitStep = {
  id: string
  title: string
  summary: string
  points: React.ReactNode[]
}

/*
 * Every statement below restates copy that already exists elsewhere on the site
 * (root-canal-therapy FAQ, /forms, /dentists, /cbct-scanner-santa-rosa, /technology,
 * /resources/after-your-root-canal, /resources/root-canal-safety, /resources/root-canal-cost)
 * or AAE-consistent general education. Do not add parking, accessibility, sedation, or
 * payment-timing details here until the practice confirms them.
 */
const steps: VisitStep[] = [
  {
    id: "before-your-visit",
    title: "Before your visit",
    summary: "Schedule your visit and complete your forms online.",
    points: [
      <>
        <a
          href={APPOINTMENT_REQUEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...analyticsAttributes(analyticsEvents.bookAppointmentClick, "your_visit_before_step")}
        >
          Request an appointment online
        </a>{" "}
        or call{" "}
        <a
          href={PRACTICE_PHONE_HREF}
          className={linkClass}
          {...analyticsAttributes(analyticsEvents.phoneClick, "your_visit_before_step")}
        >
          {PRACTICE_PHONE_DISPLAY}
        </a>{" "}
        Monday–Thursday, 8 AM–5 PM. An online request is not a confirmed booking; our team will follow up to confirm
        an available time.
      </>,
      <>
        If your dentist referred you, they can send the referral and X-rays through our secure online referral form.
        We typically contact referred patients within 24 hours to schedule.
      </>,
      <>
        Once your appointment is scheduled,{" "}
        <Link href="/forms" className={linkClass}>
          complete your new patient forms online
        </Link>{" "}
        to make check-in faster.
      </>,
      <>Follow any instructions our office gives you when you schedule.</>,
    ],
  },
  {
    id: "diagnosis",
    title: "Exam and diagnosis",
    summary: "Dr. Anderson finds the source of your symptoms before recommending treatment.",
    points: [
      <>Dr. Anderson uses an exam and imaging, including X-rays, to confirm the cause of your symptoms.</>,
      <>
        When a standard X-ray does not provide enough information, our on-site{" "}
        <Link
          href="/cbct-scanner-santa-rosa"
          className={linkClass}
          {...analyticsAttributes(analyticsEvents.cbctContentClick, "your_visit_diagnosis_step")}
        >
          CBCT scanner
        </Link>{" "}
        can provide 3D imaging. If we recommend CBCT, we will explain what question we are trying to answer and why the
        scan may be helpful in your case.
      </>,
      <>
        Before you decide, Dr. Anderson can explain the diagnosis, treatment options, expected benefits,
        alternatives, and risks. It can help to write down your questions and concerns ahead of time.
      </>,
    ],
  },
  {
    id: "treatment",
    title: "Treatment",
    summary: "Local anesthesia numbs the area, and the work is done under a surgical operating microscope.",
    points: [
      <>
        Root canals are performed under local anesthesia. Most patients feel only pressure during treatment, similar
        to having a filling placed.
      </>,
      <>
        The infected or inflamed pulp is removed from inside the tooth, and the root canals are cleaned, disinfected,
        filled, and sealed. A surgical operating microscope magnifies the treatment area for highly accurate work.
      </>,
      <>
        Most root canal treatments are completed in one or two visits, depending on the tooth. Each appointment
        typically lasts about 60 to 90 minutes.
      </>,
      <>
        The American Association of Endodontists has a{" "}
        <a href={aaeRootCanalExplainedUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          step-by-step explanation of root canal treatment
          <span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        if you would like to read more.
      </>,
    ],
  },
  {
    id: "after-your-visit",
    title: "After your visit",
    summary: "Mild soreness is common for a few days; your dentist completes the final restoration.",
    points: [
      <>
        Mild soreness for a few days afterward is common. Our{" "}
        <Link href="/resources/after-your-root-canal" className={linkClass}>
          root canal aftercare guide
        </Link>{" "}
        explains what is normal, how to stay comfortable, and when to call.
      </>,
      <>
        Follow up with your general dentist for the final restoration, which is often a crown, without unnecessary
        delay. Avoid chewing on the treated tooth until it is in place.
      </>,
      <>
        If your dentist referred you, we keep their office informed about what was evaluated, what treatment was
        recommended, and what follow-up is needed.
      </>,
      <>
        Call us if you have severe or increasing pain, swelling of the gums or face, a fever, or a bite that feels high
        or uneven.
      </>,
    ],
  },
]

const faqItems = [
  {
    question: "How long does a root canal appointment take?",
    answer:
      "Most root canal treatments are completed in one or two visits, depending on the complexity of the tooth and its anatomy. Each appointment typically lasts about 60 to 90 minutes.",
  },
  {
    question: "Is root canal treatment painful?",
    answer:
      "With modern anesthesia and gentle techniques, a root canal is typically very comfortable. Most patients feel only pressure during treatment, similar to having a filling placed. Afterward, it’s normal to have mild soreness for a few days while the tissues heal.",
  },
  {
    question: "Can I fill out my forms before my first visit?",
    answer: `Yes. Once you have an appointment scheduled, you can complete your new patient registration securely online through our patient portal on the Forms page. The phone number you enter must match the phone number we have on file for you. If the portal is difficult to use, call ${PRACTICE_PHONE_DISPLAY} and we can help you access the forms in another format.`,
  },
  {
    question: "Will I need a crown after a root canal?",
    answer:
      "Often, yes. A tooth that has had a root canal — especially a back tooth used for chewing — usually needs a crown to protect it from fracture and restore full function. Your general dentist typically places the final crown after the root canal has healed.",
  },
  {
    question: "What if I have a problem outside office hours?",
    answer: `Our office is open Monday through Thursday, 8 AM to 5 PM. Outside those hours, call ${PRACTICE_PHONE_DISPLAY} and follow the recorded instructions. If facial swelling is affecting your breathing or swallowing, call 911 or go to the nearest emergency room.`,
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

const onThisPage: OnThisPageItem[] = [
  { id: "your-visit-steps", label: "Your visit, step by step" },
  { id: "cost-and-insurance", label: "Cost & insurance" },
  { id: "getting-here", label: "Getting here" },
  { id: "faq", label: "Frequently asked questions" },
]

export default function YourVisitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <PageShell
        title="Your Visit: What to Expect"
        description="Feeling nervous is normal. Here is what a visit to our Santa Rosa office looks like, from scheduling to follow-up."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Your Visit", href: "/your-visit" },
        ]}
      >
        <div className="container mx-auto px-4 md:px-6 space-y-12 md:space-y-16">
          <OnThisPage items={onThisPage} className="max-w-4xl" />

          {/* Step timeline */}
          <section aria-labelledby="your-visit-steps" className="mx-auto max-w-4xl">
            <h2
              id="your-visit-steps"
              className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-3"
            >
              Your Visit, Step by Step
            </h2>
            <p className="text-base sm:text-lg text-brand-dark-text/80 max-w-2xl mb-10">
              Every tooth is different, so Dr. Anderson will explain what applies to you. This is the general path most
              patients follow.
            </p>

            <ol className="relative space-y-8">
              {steps.map((step, index) => (
                <li key={step.id} className="relative flex gap-4 sm:gap-6">
                  {/* Connector line between step markers (decorative) */}
                  {index < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-5 top-12 -bottom-8 w-px bg-brand-rose-beige/40 sm:left-6 sm:top-14"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-merlot font-serif text-lg font-bold text-white sm:h-12 sm:w-12 sm:text-xl"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-sm bg-white p-5 shadow-lg sm:p-6">
                    <h3 id={step.id} className="scroll-mt-24 font-serif text-xl sm:text-2xl text-brand-merlot">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 font-semibold text-brand-dark-text">{step.summary}</p>
                    <ul className="mt-4 space-y-3 text-brand-dark-text/80">
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-rose-beige" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Cost + getting here */}
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <section aria-labelledby="cost-and-insurance" className="rounded-sm bg-brand-cream p-6 shadow-lg sm:p-8">
              <DollarSign className="mb-3 h-9 w-9 text-brand-merlot" aria-hidden="true" />
              <h2 id="cost-and-insurance" className="scroll-mt-24 font-serif text-2xl text-brand-merlot mb-3">
                Cost &amp; Insurance
              </h2>
              <p className="text-brand-dark-text/80 mb-3">
                The cost of a root canal depends on the tooth and the details of your case, so the most accurate number
                comes from an examination. Our team can help review your benefits and estimate what your plan may
                cover before treatment.
              </p>
              <p className="text-brand-dark-text/80">
                <Link href="/resources/root-canal-cost" className={linkClass}>
                  Read our root canal cost &amp; insurance guide
                </Link>{" "}
                or contact our office for a personalized estimate.
              </p>
            </section>

            <section aria-labelledby="getting-here" className="rounded-sm bg-brand-cream p-6 shadow-lg sm:p-8">
              <MapPin className="mb-3 h-9 w-9 text-brand-merlot" aria-hidden="true" />
              <h2 id="getting-here" className="scroll-mt-24 font-serif text-2xl text-brand-merlot mb-3">
                Getting Here
              </h2>
              <address className="not-italic text-brand-dark-text mb-3">
                Wine Country Root Canal
                <br />
                4655 Hoen Ave, Suite 2
                <br />
                Santa Rosa, CA 95405
              </address>
              <p className="flex items-start gap-2 text-brand-dark-text/80 mb-4">
                <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-merlot" aria-hidden="true" />
                <span>Monday–Thursday, 8 AM–5 PM. Closed Friday–Sunday.</span>
              </p>
              <AfterHoursNote analyticsLocation="your_visit_hours" variant="compact" className="mb-4" />
              <ul className="space-y-1">
                <li>
                  <a
                    href={GOOGLE_MAPS_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-11 items-center gap-2 ${linkClass}`}
                  >
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Get directions on Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PRACTICE_PHONE_HREF}
                    className={`inline-flex min-h-11 items-center gap-2 ${linkClass}`}
                    {...analyticsAttributes(analyticsEvents.phoneClick, "your_visit_getting_here")}
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Call {PRACTICE_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <Link href="/contact" className={`inline-flex min-h-11 items-center gap-2 ${linkClass}`}>
                    <ClipboardList className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Contact page and map
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          {/* FAQ */}
          <section aria-labelledby="faq" className="mx-auto max-w-4xl">
            <h2 id="faq" className="scroll-mt-24 font-serif text-2xl sm:text-3xl text-brand-merlot mb-6">
              Frequently Asked Questions
            </h2>
            <FaqDetailsList items={faqItems} />
          </section>

          <AppointmentCta
            title="Ready to Schedule Your Visit?"
            analyticsLocation="your_visit_final_cta"
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
