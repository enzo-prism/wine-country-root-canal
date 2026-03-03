import type { Metadata } from "next"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { PageShell } from "@/components/page-shell"
import { GoogleReviewHighlights } from "@/components/reviews/google-review-highlights"
import { googleReviewSummary, topFiveStarReviews } from "@/components/reviews/google-review-data"

export const metadata: Metadata = {
  title: "Patient Reviews | Wine Country Root Canal Santa Rosa, CA",
  description:
    "Read real patient experiences with Dr. Anderson’s root canal and endodontic care at Wine Country Root Canal in Santa Rosa, CA.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/testimonials",
  },
}

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <PageShell
        title="Patient Testimonials"
        description="Hear what our patients and local community members say about their experience at Wine Country Root Canal."
        heroImageUrl="/images/wine-country-vineyard.jpg"
      >
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <GoogleReviewHighlights
            title={`${topFiveStarReviews.length} Five-Star Google Reviews`}
            subtitle="Our patients consistently describe this care as precise, compassionate, and genuinely reassuring."
            reviews={topFiveStarReviews}
            averageRating={googleReviewSummary.rating}
            totalReviews={googleReviewSummary.totalReviews}
            compact={false}
          />
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
