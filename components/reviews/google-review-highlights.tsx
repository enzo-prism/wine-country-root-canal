import { ReviewCard } from "@/components/reviews/review-card"
import { ReviewSummary } from "@/components/reviews/review-summary"
import { LinkButton } from "@/components/ui/link-button"
import { getDisplayReviews, pickCompactReviews } from "@/lib/review-themes"
import { cn } from "@/lib/utils"

import type { GoogleReview } from "@/components/reviews/google-review-data"

interface GoogleReviewHighlightsProps {
  title: string
  subtitle?: string
  reviews: GoogleReview[]
  averageRating?: number
  totalReviews?: number
  /** Compact = a curated handful of substantive reviews (homepage, About). */
  compact?: boolean
  maxVisible?: number
  showAllHref?: string
  showAllLabel?: string
  /**
   * Flat analytics location for this placement (e.g. "homepage_reviews"). Used for the
   * appointment CTA and the secondary "Leave a Google review" link.
   */
  analyticsLocation?: string
}

/**
 * Review section with the Google rating pill, appointment CTA and review cards.
 *
 * Compact placements show `maxVisible` curated reviews (5-star, 120–320 characters,
 * spread across themes) instead of the first N imported rows, so one-liners and
 * rating-only rows never appear as quote cards. Cards size to their content in a
 * masonry column layout rather than stretching to the tallest card in a row.
 */
export function GoogleReviewHighlights({
  title,
  subtitle,
  reviews,
  averageRating,
  totalReviews,
  compact = false,
  maxVisible = 6,
  showAllHref,
  showAllLabel = "Read Google reviews",
  analyticsLocation = "google_reviews_section",
}: GoogleReviewHighlightsProps) {
  const shownReviews = compact ? pickCompactReviews(reviews, maxVisible) : getDisplayReviews(reviews)

  return (
    <div className="space-y-10">
      {/* Left-aligned like every other homepage/About section header (editorial layout). */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end xl:gap-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-brand-dark-text/80">{subtitle}</p>}
        </div>
        <ReviewSummary
          averageRating={averageRating}
          totalReviews={totalReviews}
          analyticsLocation={analyticsLocation}
        />
      </div>

      {/* Compact placements show three cards on phones (the rest from md up) to keep the page short. */}
      <div
        className={cn(
          "gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6",
          compact && "[&>*:nth-child(n+4)]:hidden md:[&>*:nth-child(n+4)]:block",
        )}
      >
        {shownReviews.map((review) => (
          <ReviewCard key={review.id} review={review} size={compact ? "feature" : "default"} collapseLong={!compact} />
        ))}
      </div>

      {compact && showAllHref && reviews.length > shownReviews.length && (
        <div>
          <LinkButton href={showAllHref} variant="brand-outline" size="lg" className="px-8 py-3 text-base font-semibold">
            {showAllLabel}
          </LinkButton>
        </div>
      )}
    </div>
  )
}
