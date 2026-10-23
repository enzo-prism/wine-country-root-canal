import Link from "next/link"

import { ReviewCard } from "@/components/reviews/review-card"
import { googleReviews } from "@/components/reviews/google-review-data"
import { formatReviewerName, pickCompactReviews } from "@/lib/review-themes"
import { SERVICE_H2_CLASS } from "@/lib/service-pages"

const SERVICE_PAGE_REVIEW_COUNT = 3

/**
 * Compact Google-review strip for procedure pages. Cards use imported review
 * text as written; names are first + last initial only.
 */
export function ServicePageReviews() {
  const reviews = pickCompactReviews(googleReviews, SERVICE_PAGE_REVIEW_COUNT).map((review) => ({
    ...review,
    name: formatReviewerName(review.name),
  }))

  if (reviews.length === 0) return null

  return (
    <section aria-labelledby="service-page-reviews-heading" data-testid="service-page-reviews">
      <h2 id="service-page-reviews-heading" className={SERVICE_H2_CLASS}>
        Patient reviews
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3 [&>:nth-child(n+3)]:hidden md:[&>:nth-child(n+3)]:block">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} size="feature" collapseLong />
        ))}
      </div>
      <Link
        href="/testimonials"
        className="mt-4 inline-flex min-h-11 items-center text-[15px] font-semibold text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
      >
        Read Google reviews
      </Link>
    </section>
  )
}
