import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { AreasWeServe } from "@/components/areas-we-serve"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"

const guides = [
  {
    title: "Are root canals safe?",
    href: "/resources/root-canal-safety",
    analytics: analyticsAttributes(analyticsEvents.rootCanalSafetyClick, "homepage_guides"),
  },
  { title: "Root canal or extraction?", href: "/resources/root-canal-vs-extraction" },
  { title: "What does a root canal cost?", href: "/resources/root-canal-cost" },
  { title: "Recovery after a root canal", href: "/resources/after-your-root-canal" },
  { title: "What is an endodontist?", href: "/resources/what-is-an-endodontist" },
]

/** Educational links + the "areas we serve" block, side by side on large screens. */
export function PatientGuides() {
  return (
    <section id="patient-guides" aria-labelledby="patient-guides-heading" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-start lg:gap-16">
        <FadeInSection>
          <h2 id="patient-guides-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
            Questions patients ask
          </h2>
          <ul className="mt-6 border-t border-brand-merlot/15">
            {guides.map((guide) => (
              <li key={guide.href} className="border-b border-brand-merlot/15">
                <Link
                  href={guide.href}
                  className="group flex min-h-14 items-center justify-between gap-4 rounded-sm py-3 font-serif text-xl text-brand-dark-text no-underline underline-offset-4 hover:text-brand-merlot hover:underline focus-ring"
                  {...guide.analytics}
                >
                  {guide.title}
                  <ChevronRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-merlot transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/resources"
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
          >
            All patient resources
          </Link>
        </FadeInSection>
        <div id="areas-we-serve">
          <AreasWeServe compact />
        </div>
      </div>
    </section>
  )
}
