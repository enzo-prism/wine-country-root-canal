import { Star } from "lucide-react"

import { googleReviewSummary } from "@/components/reviews/google-review-data"

/**
 * Hero trust badge. Copy uses the live `googleReviewSummary` totals — do not
 * invent a different rating or review count here.
 */
export function RatingBadge({ className }: { className?: string }) {
  const label = `${googleReviewSummary.rating.toFixed(1)} from ${googleReviewSummary.totalReviews} Google reviews`

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-brand-rose-beige/35 bg-white py-1.5 pl-2.5 pr-3.5 text-sm font-semibold leading-5 text-brand-dark-text ${className ?? ""}`}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="h-3.5 w-3.5 fill-brand-merlot text-brand-merlot" strokeWidth={1.5} />
        ))}
      </span>
      <span>{label}</span>
    </p>
  )
}
