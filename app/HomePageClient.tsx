import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { FadeInSection } from "@/components/fade-in-section"
import { GoogleReviewHighlights } from "@/components/reviews/google-review-highlights"
import { googleReviewSummary, googleReviews } from "@/components/reviews/google-review-data"
import { SymptomFinder } from "@/components/symptom-finder"
import { HomeHero } from "@/components/home/home-hero"
import { ServicesList } from "@/components/home/services-list"
import { PracticeStatement } from "@/components/home/practice-statement"
import { PatientGuides } from "@/components/home/patient-guides"
import { HomeContact } from "@/components/home/home-contact"

/**
 * Homepage (a server component despite the legacy file name; only small leaves hydrate).
 * Section rhythm: cream hero → white symptom finder → cream editorial services →
 * merlot statement band → cream reviews → white guides/areas → cream closing CTA + contact.
 */
export default function HomePageClient() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream text-brand-dark-text">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <HomeHero />
        <SymptomFinder />
        <ServicesList />
        <PracticeStatement />

        <section id="testimonials" className="bg-brand-cream py-16 md:py-20 lg:py-28">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <GoogleReviewHighlights
              title="Patient Google Reviews"
              subtitle="We are proud of the way our patients describe their experience with our compassionate care."
              reviews={googleReviews}
              averageRating={googleReviewSummary.rating}
              totalReviews={googleReviewSummary.totalReviews}
              analyticsLocation="homepage_reviews"
              compact
              showAllHref="/testimonials"
              showAllLabel="Read Google reviews"
            />
          </FadeInSection>
        </section>

        <PatientGuides />
        <HomeContact />
      </main>
      <Footer />
    </div>
  )
}
