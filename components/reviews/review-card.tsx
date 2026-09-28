import type React from "react"

import { ReviewStars } from "@/components/reviews/review-stars"
import { splitReviewText, type DisplayReview } from "@/lib/review-themes"
import { cn } from "@/lib/utils"

type ReviewCardProps = {
  review: Pick<DisplayReview, "name" | "text" | "rating">
  /** "feature" = larger quote text for curated placements (homepage/About). */
  size?: "default" | "feature"
  /** Long reviews show an excerpt plus a native <details> "Read full review" disclosure. */
  collapseLong?: boolean
  className?: string
} & Omit<React.HTMLAttributes<HTMLElement>, "className">

/**
 * One Google review. Server-safe (no hooks) so it renders from server components and the
 * client-side review explorer alike. Decoration is kept to one element per job: the quote
 * mark is a CSS pseudo-element and the stars are a single SVG.
 */
export function ReviewCard({ review, size = "default", collapseLong = false, className, ...props }: ReviewCardProps) {
  const { lead, rest } = collapseLong ? splitReviewText(review.text) : { lead: review.text, rest: "" }

  return (
    <figure
      className={cn(
        "break-inside-avoid rounded-lg border border-brand-rose-beige/25 bg-white p-6 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <blockquote
        className={cn(
          "leading-relaxed text-brand-dark-text before:mb-1 before:block before:h-6 before:font-serif before:text-5xl before:leading-none before:text-brand-rose-beige/50 before:content-['“']",
          size === "feature" ? "text-[1.0625rem] md:text-lg" : "text-base",
        )}
      >
        <p>{lead}</p>
        {rest && (
          <details className="group">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-sm font-semibold text-brand-merlot underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Read full review</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <p>{rest}</p>
          </details>
        )}
      </blockquote>
      <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-brand-rose-beige/15 pt-4">
        <span className="font-semibold text-brand-merlot">{review.name}</span>
        <span className="inline-flex items-center gap-2 text-xs text-brand-dark-text/80">
          <ReviewStars rating={review.rating} />
          Google review
        </span>
      </figcaption>
    </figure>
  )
}
