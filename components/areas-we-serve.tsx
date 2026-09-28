import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeInSection } from "@/components/fade-in-section"

/**
 * Communities Wine Country Root Canal draws patients from. This is a single, honest
 * "areas we serve" section — NOT per-town doorway pages (see ops/local-seo-checklist.md).
 * The practice has one physical office in Santa Rosa; these are real referral/travel areas
 * across Sonoma County and the North Bay wine country.
 */
export const serviceAreaCommunities = [
  "Santa Rosa",
  "Rohnert Park",
  "Petaluma",
  "Windsor",
  "Healdsburg",
  "Sebastopol",
  "Sonoma",
  "Cotati",
  "Napa",
] as const

interface AreasWeServeProps {
  className?: string
  /** When true, renders a lighter, more compact variant (e.g. inside the contact page). */
  compact?: boolean
}

export function AreasWeServe({ className, compact = false }: AreasWeServeProps) {
  return (
    <FadeInSection className={className}>
      <div
        className={
          compact
            ? "mx-auto max-w-4xl rounded-sm bg-brand-cream/70 p-6 md:p-8"
            : "mx-auto max-w-4xl rounded-sm bg-white p-6 shadow-lg md:p-10"
        }
      >
        <div className={cn("mb-5 flex gap-3", compact ? "items-start" : "items-center justify-center text-center")}>
          <MapPin className={cn("h-6 w-6 shrink-0 text-brand-merlot", compact && "mt-1")} aria-hidden="true" />
          <h2 className="text-balance font-serif text-2xl text-brand-merlot md:text-3xl">
            Serving Santa Rosa &amp; Sonoma Wine Country
          </h2>
        </div>
        <p className={cn("mb-6 max-w-2xl text-brand-dark-text/80", compact ? "" : "mx-auto text-center")}>
          Our office is in east Santa Rosa on Hoen Avenue, and patients travel to us from across Sonoma County and the
          North Bay for specialist root canal care. General dentists throughout the region refer patients to us for
          endodontic treatment, retreatment, and surgery.
        </p>
        <ul className={cn("flex flex-wrap gap-2", !compact && "justify-center")}>
          {serviceAreaCommunities.map((community) => (
            <li
              key={community}
              className="rounded-full border border-brand-rose-beige/40 bg-brand-cream px-4 py-1.5 text-sm font-medium text-brand-dark-text/80"
            >
              {community}
            </li>
          ))}
        </ul>
      </div>
    </FadeInSection>
  )
}
