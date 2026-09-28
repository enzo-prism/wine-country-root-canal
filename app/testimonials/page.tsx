import { ExternalLink } from "lucide-react"

import { AppointmentCta } from "@/components/appointment-cta"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { PageShell } from "@/components/page-shell"
import { FeaturedReviews } from "@/components/reviews/featured-reviews"
import { googleReviewSummary, googleReviews } from "@/components/reviews/google-review-data"
import { GOOGLE_REVIEWS_LISTING_URL } from "@/components/reviews/google-review-links"
import { ReviewExplorer } from "@/components/reviews/review-explorer"
import { ReviewSummary } from "@/components/reviews/review-summary"
import { getDisplayReviews, getThemeCounts, pickFeaturedReviews } from "@/lib/review-themes"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Patient Reviews | Wine Country Root Canal Santa Rosa, CA",
  description:
    "Read real patient experiences with Dr. Anderson’s root canal and endodontic care at Wine Country Root Canal in Santa Rosa, CA.",
  path: "/testimonials",
})

// Computed once per build: written reviews only (rating-only rows and one-liners are
// excluded from cards), keyword theme tags, and three themed pull quotes.
const displayReviews = getDisplayReviews(googleReviews)
const themeCounts = getThemeCounts(displayReviews)
const featuredReviews = pickFeaturedReviews(displayReviews)

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <PageShell
        title="Patient Reviews"
        headerWidth="wide"
        description="What patients say about root canal and endodontic care with Dr. Anderson, in their own words from Google."
      >
        <div className="container mx-auto px-4 md:px-6">
          <ReviewSummary
            averageRating={googleReviewSummary.rating}
            totalReviews={googleReviewSummary.totalReviews}
            analyticsLocation="testimonials_reviews"
          />
        </div>

        {/* FeaturedReviews carries its own vertical padding. */}
        <div className="mt-2 md:mt-4">
          <FeaturedReviews reviews={featuredReviews} />
        </div>

        <section aria-labelledby="all-reviews-heading" className="container mx-auto mt-12 px-4 md:mt-16 md:px-6">
          <div className="max-w-2xl">
            <h2 id="all-reviews-heading" className="font-serif text-3xl font-bold text-brand-merlot md:text-4xl">
              Browse reviews by topic
            </h2>
            <p className="mt-3 text-lg text-brand-dark-text/80">
              {displayReviews.length} written reviews from our Google listing. Topics are matched from the words
              patients used.
            </p>
          </div>

          {/* Without JavaScript the first page of reviews still renders; hide the inert controls. */}
          <noscript>
            <style>{".reviews-js-only{display:none!important}"}</style>
          </noscript>

          <div className="mt-8">
            <ReviewExplorer reviews={displayReviews} themes={themeCounts} />
          </div>

          <p className="mt-6 text-sm text-brand-dark-text/80">
            <a
              href={GOOGLE_REVIEWS_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-merlot underline underline-offset-2"
            >
              Read every review on Google
              <ExternalLink aria-hidden="true" focusable="false" className="h-3.5 w-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </section>

        <div className="container mx-auto px-4 md:px-6">
          <AppointmentCta
            className="mt-16"
            title="Ready to Talk With Dr. Anderson?"
            description="Request an appointment online or call our Santa Rosa office. Our team will follow up to confirm an available time."
            analyticsLocation="testimonials_final_cta"
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
