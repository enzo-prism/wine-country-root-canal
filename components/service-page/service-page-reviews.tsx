import Link from "next/link"

import { ReviewStars } from "@/components/reviews/review-stars"
import {
  servicePageReviewByline,
  servicePageReviewerInitial,
  servicePageReviewerName,
  servicePageReviews,
  type ServicePageReview,
} from "@/components/service-page/service-page-review-data"
import { SERVICE_H2_CLASS, SERVICE_HEADING_SCROLL_MT } from "@/lib/service-pages"

function ServicePageReviewCard({ review }: { review: ServicePageReview }) {
  const name = servicePageReviewerName(review)
  const initial = servicePageReviewerInitial(review)

  return (
    <figure className="flex h-full flex-col rounded-[6px] border border-brand-rose-beige/25 bg-white p-5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-merlot text-sm font-semibold text-brand-cream"
        >
          {initial}
        </span>
        <span data-reviewer-name className="min-w-0 truncate font-semibold text-brand-dark-text">
          {name}
        </span>
        <ReviewStars rating={review.rating} className="ml-auto h-3.5 w-[4.67rem]" />
      </div>
      <blockquote className="mt-3 text-[15px] leading-6 text-brand-dark-text">
        <p>{review.quote}</p>
      </blockquote>
      <figcaption className="mt-auto pt-4 text-sm leading-5 text-brand-dark-text/80">
        {servicePageReviewByline(review)}
      </figcaption>
    </figure>
  )
}

/**
 * Compact Google-review strip for procedure pages. Copy comes from
 * `service-page-review-data.ts` (first name + last initial, quote as written).
 */
export function ServicePageReviews() {
  if (servicePageReviews.length === 0) return null

  return (
    <section
      id="patient-reviews"
      aria-labelledby="service-page-reviews-heading"
      data-testid="service-page-reviews"
      className={SERVICE_HEADING_SCROLL_MT}
    >
      <h2 id="service-page-reviews-heading" className={SERVICE_H2_CLASS}>
        Patient reviews
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
        {servicePageReviews.map((review) => (
          <ServicePageReviewCard key={review.id} review={review} />
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
