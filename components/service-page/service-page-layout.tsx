import type { ReactNode } from "react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { AppointmentCta } from "@/components/appointment-cta"
import { FaqDetailsList, type FaqItem } from "@/components/faq-details"
import { FadeInSection } from "@/components/fade-in-section"
import { OnThisPage, type OnThisPageItem } from "@/components/on-this-page"
import { QuickAnswers, type QuickAnswer } from "@/components/quick-answers"
import { MedicalReviewByline } from "@/components/reviewed-by"
import { MobileStickyCallBar } from "@/components/service-page/mobile-sticky-call-bar"
import { ServicePageHero } from "@/components/service-page/service-page-hero"
import { WhySeeAnEndodontist } from "@/components/service-page/why-see-an-endodontist"
import type { Crumb } from "@/components/breadcrumbs"
import type { MedicallyReviewedPath } from "@/lib/medical-review"
import { MOBILE_STICKY_CALL_BAR_SPACER_TEST_ID } from "@/lib/service-pages"

export type ServicePageCta = {
  title: string
  description: string
  analyticsLocation: string
  after?: ReactNode
}

export type ServicePageLayoutProps = {
  title: string
  subtitle: string
  intro?: ReactNode
  breadcrumbs: Crumb[]
  analyticsLocation: string
  jsonLd?: ReactNode
  medicalReviewPath?: MedicallyReviewedPath
  quickAnswers?: QuickAnswer[]
  onThisPage: OnThisPageItem[]
  /** First page-specific block (usually the "What is…" overview). */
  beforeShared?: ReactNode
  /** Remaining page-specific sections after the shared why-endodontist block. */
  afterShared?: ReactNode
  faqItems?: FaqItem[]
  cta: ServicePageCta
}

/**
 * Shared chrome for every procedure / service page.
 * Pages supply their own copy; this component owns hero CTAs, jump links,
 * the reserved reviews slot, the why-endodontist block, FAQ, and the
 * phone-only sticky Call bar.
 */
export function ServicePageLayout({
  title,
  subtitle,
  intro,
  breadcrumbs,
  analyticsLocation,
  jsonLd,
  medicalReviewPath,
  quickAnswers,
  onThisPage,
  beforeShared,
  afterShared,
  faqItems,
  cta,
}: ServicePageLayoutProps) {
  return (
    <>
      {jsonLd}
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <ServicePageHero
          title={title}
          subtitle={subtitle}
          intro={intro}
          breadcrumbs={breadcrumbs}
          analyticsLocation={analyticsLocation}
        />

        <div className="py-8 md:py-12 lg:pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-10 md:space-y-14">
              {medicalReviewPath ? <MedicalReviewByline path={medicalReviewPath} /> : null}

              {quickAnswers && quickAnswers.length > 0 ? <QuickAnswers items={quickAnswers} /> : null}

              <OnThisPage items={onThisPage} />

              {beforeShared}

              {/*
                Patient review / testimonial cards — reserved slot.
                Do not render review cards until Dr. Anderson okays featuring
                Google reviews. When approved, mount the shared review strip
                here (desktop 3 cards / mobile 2) between the procedure overview
                and the "Why see an endodontist?" section.
              */}

              <WhySeeAnEndodontist analyticsLocation={analyticsLocation} />

              {afterShared}

              {faqItems && faqItems.length > 0 ? (
                <FadeInSection className="mx-auto max-w-4xl">
                  <h2 id="faq" className="mb-6 scroll-mt-24 font-serif text-2xl text-brand-merlot sm:text-3xl">
                    Frequently Asked Questions
                  </h2>
                  <FaqDetailsList items={faqItems} />
                </FadeInSection>
              ) : null}

              <FadeInSection>
                <AppointmentCta
                  id="request-appointment"
                  title={cta.title}
                  description={cta.description}
                  analyticsLocation={cta.analyticsLocation}
                  showVisitLink
                />
                {cta.after}
              </FadeInSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/*
        Reserved phone space after the footer so the fixed Call bar never
        covers legal links. Always present (no show/hide), so the bar
        appearing does not shift layout. Merlot matches the footer.
      */}
      <div
        data-testid={MOBILE_STICKY_CALL_BAR_SPACER_TEST_ID}
        aria-hidden="true"
        className="h-[calc(5.75rem+env(safe-area-inset-bottom,0px))] bg-brand-merlot lg:hidden"
      />
      <MobileStickyCallBar analyticsLocation={analyticsLocation} />
    </>
  )
}
