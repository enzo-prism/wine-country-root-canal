import { cn } from "@/lib/utils"

/**
 * Relative outline of a 24×24 star (same geometry as lucide's Star), so any number of
 * stars can be drawn as ONE <path> by moving the pen 26 units right per star.
 */
const STAR_OUTLINE = "l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1.01z"
const STAR_PITCH = 26
const MAX_STARS = 5

function starsPath(from: number, to: number) {
  let d = ""
  for (let index = from; index < to; index += 1) d += `M${12 + index * STAR_PITCH} 2${STAR_OUTLINE}`
  return d
}

interface ReviewStarsProps {
  rating: number
  /** Size via height + width classes keeping the 128:24 ratio, e.g. "h-5 w-[6.67rem]". */
  className?: string
  /**
   * Decorative when the rating is already stated in adjacent text (e.g. the
   * `googleReviewSummary` "4.9 from N Google reviews" pill). Otherwise the SVG is
   * exposed as a single image: "Rated N out of 5".
   */
  decorative?: boolean
}

/** A whole star rating rendered as one small inline SVG (not five icon components). */
export function ReviewStars({ rating, className, decorative = false }: ReviewStarsProps) {
  const filled = Math.max(0, Math.min(MAX_STARS, Math.round(rating)))
  const accessibility = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": `Rated ${filled} out of ${MAX_STARS}` } as const)

  return (
    <svg
      viewBox={`0 0 ${MAX_STARS * STAR_PITCH - 2} 24`}
      className={cn("h-4 w-[5.33rem] shrink-0 text-brand-merlot", className)}
      focusable="false"
      {...accessibility}
    >
      {filled > 0 && <path d={starsPath(0, filled)} fill="currentColor" />}
      {filled < MAX_STARS && (
        <path d={starsPath(filled, MAX_STARS)} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} />
      )}
    </svg>
  )
}
