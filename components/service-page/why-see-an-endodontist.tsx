import { Phone } from "lucide-react"
import Link from "next/link"

import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { SERVICE_H2_CLASS } from "@/lib/service-pages"

const POINTS = [
  { title: "Specialty training", body: "Extra years of education after dental school, focused on root canal care." },
  { title: "Advanced imaging", body: "On-site 3D imaging and operating microscopes show the fine details of each tooth." },
  { title: "Saving your tooth", body: "Our goal is an accurate diagnosis, comfortable care, and keeping your natural tooth whenever possible." },
] as const

/**
 * Shared “why a specialist” block for procedure pages. Copy is Writer-final
 * from Dr. Anderson / the existing what-is-an-endodontist page — no invented claims.
 */
export function WhySeeAnEndodontist({ analyticsLocation }: { analyticsLocation: string }) {
  return (
    <section
      id="why-see-an-endodontist"
      aria-labelledby="why-see-an-endodontist-heading"
      className="scroll-mt-28 rounded-sm border-t-4 border-brand-merlot bg-white p-5 shadow-lg sm:p-8"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <h2 id="why-see-an-endodontist-heading" className={SERVICE_H2_CLASS}>
          Why see an endodontist?
        </h2>
        <span className="rounded-full bg-brand-merlot px-2 py-0.5 text-[11px] font-bold uppercase leading-4 tracking-[0.6px] text-brand-cream">
          New
        </span>
      </div>
      <p className="text-base leading-[26px] text-brand-dark-text/80">
        An endodontist is a dentist with two or more years of extra training focused on the inside of the tooth. Dr.
        Anderson&apos;s practice is dedicated to endodontics, so diagnosing tooth pain and saving natural teeth is what
        he does every day. Your general dentist and our team work together, and in most cases your dentist places the
        final crown once treatment is done.
      </p>
      <ul className="mt-4 grid gap-2.5 md:grid-cols-3 md:gap-4">
        {POINTS.map((point) => (
          <li key={point.title} className="rounded-sm bg-brand-cream px-4 py-3.5">
            <p className="text-[15px] font-semibold leading-[22px] text-brand-dark-text">{point.title}</p>
            <p className="mt-1.5 text-sm leading-5 text-brand-dark-text/80">{point.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <Link
          href="/resources/what-is-an-endodontist"
          className="inline-flex min-h-11 items-center gap-1 text-[15px] font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
        >
          What is an endodontist?
          <span aria-hidden="true">→</span>
        </Link>
        <a
          href={PRACTICE_PHONE_HREF}
          className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand-merlot hover:underline"
          {...analyticsAttributes(analyticsEvents.phoneClick, `${analyticsLocation}_why_endo_call`)}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" />
          Questions? Call {PRACTICE_PHONE_DISPLAY}
        </a>
      </div>
    </section>
  )
}
