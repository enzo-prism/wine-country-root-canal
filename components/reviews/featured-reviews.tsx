import { ReviewStars } from "@/components/reviews/review-stars"
import { getThemeLabel, type FeaturedReview } from "@/lib/review-themes"

interface FeaturedReviewsProps {
  reviews: FeaturedReview[]
  heading?: string
}

/** Large pull quotes chosen by theme (see `pickFeaturedReviews`). Server component. */
export function FeaturedReviews({ reviews, heading = "In patients’ own words" }: FeaturedReviewsProps) {
  if (reviews.length === 0) return null

  return (
    <section aria-labelledby="featured-reviews-heading" className="bg-brand-cream py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 id="featured-reviews-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
          {heading}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {reviews.map((review) => (
            <figure key={review.id} className="flex flex-col border-l-2 border-brand-rose-beige/50 pl-5 md:pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-rose-beige">
                {getThemeLabel(review.theme)}
              </p>
              <blockquote className="mt-3 font-serif text-xl leading-snug text-brand-merlot sm:text-2xl md:text-[1.625rem]">
                <p>&ldquo;{review.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-brand-dark-text">{review.name}</span>
                <ReviewStars rating={review.rating} />
                <span className="text-brand-dark-text/80">Google review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
