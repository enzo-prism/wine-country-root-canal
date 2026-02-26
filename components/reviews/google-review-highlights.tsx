import { Quote, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { LinkButton } from "@/components/ui/link-button"

import type { GoogleReview } from "@/components/reviews/google-review-data"

interface GoogleReviewHighlightsProps {
  title: string
  subtitle?: string
  reviews: GoogleReview[]
  averageRating?: number
  totalReviews?: number
  compact?: boolean
  maxVisible?: number
  showAllHref?: string
  showAllLabel?: string
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={`full-${index}`} className="h-4 w-4 text-yellow-500 fill-yellow-500" aria-hidden="true" />
      ))}
      {Array.from({ length: 5 - rating }).map((_, index) => (
        <Star key={`empty-${index}`} className="h-4 w-4 text-brand-rose-beige/35" aria-hidden="true" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <Card className="bg-white border-t-4 border-brand-rose-beige shadow-lg h-full">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-3">
          <blockquote className="relative text-brand-dark-text/85 leading-relaxed pl-3">
            <Quote className="absolute -top-1 -left-3 w-5 h-5 text-brand-rose-beige/40 transform -scale-x-100" />
            "{review.quote}"
          </blockquote>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-brand-merlot">{review.name}</p>
            <p className="text-xs text-brand-dark-text/65">{review.source}</p>
          </div>
          <ReviewStars rating={review.rating} />
        </div>
      </CardContent>
    </Card>
  )
}

export function GoogleReviewHighlights({
  title,
  subtitle,
  reviews,
  averageRating,
  totalReviews,
  compact = false,
  maxVisible = 6,
  showAllHref,
  showAllLabel = "Read all 5-star reviews",
}: GoogleReviewHighlightsProps) {
  const shownReviews = compact ? reviews.slice(0, maxVisible) : reviews

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold tracking-wider text-brand-merlot uppercase">Community & Patient Reviews</p>
        <h2 className="font-serif text-3xl md:text-4xl text-brand-merlot mt-3 mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-brand-dark-text/80">{subtitle}</p>}
        {averageRating !== undefined && totalReviews !== undefined && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-brand-rose-beige/40">
            <span className="text-2xl font-semibold text-brand-merlot">{averageRating.toFixed(1)}</span>
            <ReviewStars rating={Math.round(averageRating)} />
            <span className="text-sm text-brand-dark-text/80">
              from <strong>{totalReviews}</strong> Google reviews
            </span>
          </div>
        )}
      </div>

      <div className={compact ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"}>
        {shownReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {compact && showAllHref && reviews.length > maxVisible && (
        <div className="text-center">
          <LinkButton href={showAllHref} variant="brand-primary" size="lg" className="px-8 py-3 text-base font-semibold">
            {showAllLabel}
          </LinkButton>
        </div>
      )}
    </div>
  )
}
