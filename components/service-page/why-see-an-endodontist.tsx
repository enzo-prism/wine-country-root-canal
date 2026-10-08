import { Phone } from "lucide-react"
import Link from "next/link"

import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

const PLACEHOLDER_POINTS = [
  { title: "[copy: Writer] Point 1 title", body: "[copy: Writer] One short line." },
  { title: "[copy: Writer] Point 2 title", body: "[copy: Writer] One short line." },
  { title: "[copy: Writer] Point 3 title", body: "[copy: Writer] One short line." },
] as const

/**
 * New shared section from the approved service-page mock.
 * Placeholder lines stay until Writer supplies final copy from Dr. Anderson
 * or the existing /resources/what-is-an-endodontist page. No invented claims.
 */
export function WhySeeAnEndodontist({ analyticsLocation }: { analyticsLocation: string }) {
  return (
    <section
      id="why-see-an-endodontist"
      aria-labelledby="why-see-an-endodontist-heading"
      className="scroll-mt-24 rounded-sm border-t-4 border-brand-merlot bg-white p-5 shadow-lg sm:p-8"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <h2 id="why-see-an-endodontist-heading" className="font-serif text-[1.75rem] leading-[34px] text-brand-merlot md:text-[1.875rem] md:leading-9">
          Why see an endodontist?
        </h2>
        <span className="rounded-full bg-brand-merlot px-2 py-0.5 text-[11px] font-bold uppercase leading-4 tracking-[0.6px] text-brand-cream">
          New
        </span>
      </div>
      <p className="text-base italic leading-[26px] text-brand-dark-text/70">
        [copy: Writer] Two or three plain sentences on what an endodontist is and why a specialist
        handles this procedure. Facts only from Dr. Anderson or the existing &quot;What is an
        endodontist&quot; page. No medical claims or statistics.
      </p>
      <ul className="mt-4 grid gap-2.5 md:grid-cols-3 md:gap-4">
        {PLACEHOLDER_POINTS.map((point) => (
          <li key={point.title} className="rounded-sm bg-brand-cream px-4 py-3.5">
            <p className="text-[15px] font-semibold leading-[22px] text-brand-dark-text">{point.title}</p>
            <p className="mt-1.5 text-sm leading-5 text-brand-dark-text/70">{point.body}</p>
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
