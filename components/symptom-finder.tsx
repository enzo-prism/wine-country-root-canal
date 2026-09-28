import Link from "next/link"
import { ArrowRight, ChevronDown, Phone } from "lucide-react"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

type SymptomAction = "call" | "request"

interface Symptom {
  id: string
  label: string
  meaning: string
  urgent?: string
  learnMore: { href: string; label: string }
  action: SymptomAction
}

/**
 * Plain-language, AAE-consistent patient education. Deliberately hedged ("may") — this is a
 * wayfinding aid, not a diagnosis. Nothing the visitor opens is stored or sent anywhere.
 */
const symptoms: Symptom[] = [
  {
    id: "hot-cold",
    label: "Pain with hot or cold that lingers",
    meaning:
      "Sensitivity that keeps aching after the hot or cold is gone may mean the pulp, the soft tissue inside the tooth, is inflamed or infected. Brief sensitivity that fades right away is often less serious. Testing at an exam is needed to know.",
    learnMore: { href: "/endodontic-procedures/signs-symptoms", label: "Signs you may need a root canal" },
    action: "request",
  },
  {
    id: "biting",
    label: "Pain when biting or chewing",
    meaning:
      "Sharp pain on biting, especially when you release, may point to a cracked tooth. A dull ache on chewing may mean inflammation around the root tip. An exam, and sometimes 3D imaging, is needed to tell which.",
    learnMore: { href: "/resources/cracked-tooth", label: "Cracked tooth guide" },
    action: "request",
  },
  {
    id: "swelling",
    label: "Swelling or a pimple on the gum",
    meaning:
      "Swelling, or a small bump on the gum that may drain, can be a sign of infection at the root of a tooth. It should be looked at promptly, even if it does not hurt.",
    urgent:
      "If swelling is affecting your breathing or swallowing, or spreading toward your eye or neck, call 911 or go to the nearest emergency room.",
    learnMore: { href: "/dental-emergencies", label: "Dental emergency guidance" },
    action: "call",
  },
  {
    id: "previous-root-canal",
    label: "A tooth treated before that hurts again",
    meaning:
      "A tooth that had a root canal may sometimes not heal as expected, or develop new decay or a crack years later. Root canal retreatment may be able to save it. An exam is needed to know what is going on.",
    learnMore: { href: "/endodontic-procedures/retreatment", label: "About root canal retreatment" },
    action: "request",
  },
  {
    id: "injury",
    label: "A cracked, chipped, or knocked-out tooth",
    meaning:
      "An injury can affect the nerve even when the tooth looks fine. A knocked-out permanent tooth is time-critical: keep it moist in milk or saliva, not plain water, and call right away.",
    learnMore: { href: "/resources/dental-injuries", label: "Dental injury first aid" },
    action: "call",
  },
  {
    id: "referred",
    label: "My dentist referred me",
    meaning:
      "Your dentist has asked for a specialist to take a closer look. Request an appointment or call us, and see what happens at your first visit.",
    learnMore: { href: "/your-visit", label: "What to expect at your visit" },
    action: "request",
  },
]

const analyticsLocation = "homepage_symptom_finder"

function SymptomActionLink({ action }: { action: SymptomAction }) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors focus-ring"

  if (action === "call") {
    return (
      <a
        href={PRACTICE_PHONE_HREF}
        className={`${base} bg-brand-merlot text-brand-cream hover:bg-brand-merlot/90`}
        {...analyticsAttributes(analyticsEvents.phoneClick, analyticsLocation)}
      >
        <Phone aria-hidden="true" className="h-4 w-4" />
        Call {PRACTICE_PHONE_DISPLAY}
      </a>
    )
  }

  // Accessible name intentionally differs from the hero's "Request an Appointment" (one hero link
  // with that exact name is asserted by the e2e suite).
  return (
    <a
      href={APPOINTMENT_REQUEST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border border-brand-merlot text-brand-merlot hover:bg-brand-merlot hover:text-brand-cream`}
      {...analyticsAttributes(analyticsEvents.bookAppointmentClick, analyticsLocation)}
    >
      Request a visit online
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function SymptomFinder() {
  return (
    <section id="symptoms" aria-labelledby="symptom-finder-heading" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 id="symptom-finder-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
            Which of these sounds like your tooth?
          </h2>
          <p className="mt-4 text-lg text-brand-dark-text/80">
            Tap the one closest to what you are feeling for a plain-language explanation and the right next step.
          </p>
        </div>

        <ul className="mt-10 grid items-start gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {symptoms.map((symptom) => (
            <li key={symptom.id}>
              <details className="group rounded-md border border-brand-merlot/15 bg-brand-cream transition-colors open:border-brand-merlot/40 open:bg-white open:shadow-md">
                <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 rounded-md px-5 py-4 font-serif text-lg text-brand-dark-text hover:text-brand-merlot focus-ring group-open:text-brand-merlot [&::-webkit-details-marker]:hidden">
                  {symptom.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-merlot transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <div className="space-y-4 px-5 pb-5 text-base leading-relaxed text-brand-dark-text/85">
                  <p>{symptom.meaning}</p>
                  {symptom.urgent ? (
                    <p className="rounded-sm border-l-4 border-brand-merlot bg-brand-merlot/5 px-4 py-3 font-semibold text-brand-dark-text">
                      {symptom.urgent}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <SymptomActionLink action={symptom.action} />
                    <Link
                      href={symptom.learnMore.href}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text focus-ring"
                    >
                      {symptom.learnMore.label}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm text-brand-dark-text/75">
          This isn&apos;t a diagnosis. Only an exam can tell what is causing your symptoms. Nothing you select here is
          saved or sent anywhere. If you are in severe pain,{" "}
          <a
            href={PRACTICE_PHONE_HREF}
            className="font-semibold text-brand-merlot underline underline-offset-2"
            {...analyticsAttributes(analyticsEvents.phoneClick, `${analyticsLocation}_note`)}
          >
            call {PRACTICE_PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
