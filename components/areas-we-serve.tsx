import { MapPin } from "lucide-react"
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
        <div className="mb-5 flex items-center justify-center gap-3 text-center">
          <MapPin className="h-6 w-6 shrink-0 text-brand-merlot" aria-hidden="true" />
          <h2 className="font-serif text-2xl text-brand-merlot md:text-3xl">
            Serving Santa Rosa &amp; Sonoma Wine Country
          </h2>
        </div>
        <p className="mx-auto mb-6 max-w-2xl text-center text-brand-dark-text/80">
          Our office is in east Santa Rosa on Hoen Avenue, and patients travel to us from across Sonoma County and the
          North Bay for specialist root canal care. General dentists throughout the region refer patients to us for
          endodontic treatment, retreatment, and surgery.
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
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
