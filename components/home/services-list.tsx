import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"

const services = [
  {
    title: "Root Canal Therapy",
    description: "Removing inflamed or infected pulp so the tooth can stay in your mouth.",
    href: "/endodontic-procedures/root-canal-therapy",
  },
  {
    title: "Root Canal Retreatment",
    description: "A second look for a previously treated tooth that has not healed or hurts again.",
    href: "/endodontic-procedures/retreatment",
  },
  {
    title: "Apicoectomy",
    description: "Microsurgery at the root tip when a conventional approach is not enough.",
    href: "/endodontic-procedures/apicoectomy",
  },
  {
    title: "3D CBCT Imaging",
    description: "On-site cone beam scans when a standard X-ray cannot show enough detail.",
    href: "/cbct-scanner-santa-rosa",
    analytics: analyticsAttributes(analyticsEvents.cbctContentClick, "homepage_services"),
  },
  {
    title: "Dental Emergencies",
    description: "Severe tooth pain, swelling, or injury: what to do and when to call.",
    href: "/dental-emergencies",
  },
  {
    title: "All Endodontic Procedures",
    description: "Every treatment we offer, explained in plain language.",
    href: "/endodontic-procedures",
  },
]

export function ServicesList() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-brand-cream py-16 md:py-20 lg:py-28">
      <FadeInSection className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="max-w-md">
            <h2 id="services-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
              What we treat
            </h2>
            <p className="mt-4 text-lg text-brand-dark-text/80">
              Endodontics is all we do: diagnosing tooth pain and treating the inside of the tooth, with the goal of
              keeping your natural tooth.
            </p>
          </div>
          <ul className="grid border-t border-brand-merlot/15 md:grid-cols-2 md:gap-x-10">
            {services.map((service) => (
              <li key={service.href} className="border-b border-brand-merlot/15">
                <Link
                  href={service.href}
                  className="group flex min-h-11 items-center justify-between gap-4 rounded-sm py-5 no-underline focus-ring-on-cream"
                  {...service.analytics}
                >
                  <span>
                    <span className="block font-serif text-[1.375rem] leading-snug text-brand-dark-text decoration-1 underline-offset-4 transition-colors group-hover:text-brand-merlot group-hover:underline md:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-base text-brand-dark-text/75">{service.description}</span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-merlot transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FadeInSection>
    </section>
  )
}
