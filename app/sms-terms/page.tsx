import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type React from "react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { PRACTICE_EMAIL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { buildMetadata } from "@/lib/seo"
import {
  SMS_BRAND_NAME,
  SMS_CARRIER_DISCLAIMER,
  SMS_CONSENT_METHOD,
  SMS_CONSENT_NOT_REQUIRED,
  SMS_CONSENT_PLACEHOLDER,
  SMS_FREQUENCY,
  SMS_HELP_INSTRUCTIONS,
  SMS_MESSAGE_PURPOSE,
  SMS_PRIVACY_NO_SHARING,
  SMS_PRIVACY_OPT_IN_EXCLUSION,
  SMS_PRIVACY_PATH,
  SMS_PRIVACY_SECTION_ID,
  SMS_PRIVACY_SERVICE_PROVIDERS,
  SMS_PROGRAM_NAME,
  SMS_RATES,
  SMS_STOP_INSTRUCTIONS,
  SMS_TERMS_EFFECTIVE_DATE,
  SMS_TERMS_PATH,
  isSmsTermsEnabled,
} from "@/lib/sms-program"

// Staged: see lib/sms-program.ts. With the flag off this route is a 404 (Next.js adds noindex);
// while off, the metadata below is also noindex with no canonical, so the hidden URL is never declared.
export function generateMetadata(): Metadata {
  if (!isSmsTermsEnabled()) {
    return { robots: { index: false, follow: false }, alternates: { canonical: null } }
  }
  return buildMetadata({
    title: "SMS Terms | Wine Country Root Canal",
    description:
      "Terms for Wine Country Root Canal's review-request text messages: what we send, message frequency, rates, and how to get help or opt out.",
    path: SMS_TERMS_PATH,
  })
}

const linkClass = "font-medium text-brand-merlot underline underline-offset-4"

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mb-8 scroll-mt-28">
      <h2 id={`${id}-heading`} className="font-serif text-2xl text-brand-merlot mt-8 mb-3">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function SmsTermsPage() {
  if (!isSmsTermsEnabled()) notFound()

  return (
    <>
      <Navbar />
      <PageShell
        title="SMS Terms"
        description="How our review-request text messages work, and how to get help or stop them."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-4xl mx-auto text-brand-dark-text/90">
            <p className="text-sm text-brand-dark-text/80">
              {SMS_TERMS_EFFECTIVE_DATE ? `Effective: ${SMS_TERMS_EFFECTIVE_DATE}` : "Draft: pending approval"}
            </p>

            <Section id="program" title="Program and sender">
              <p>
                Program name: <strong>{SMS_PROGRAM_NAME}</strong>. Messages are sent by {SMS_BRAND_NAME}, the
                endodontic practice of Dr. Craig Wm. Anderson in Santa Rosa, California, using ReviewFlow, our
                review-request service.
              </p>
            </Section>

            <Section id="messages" title="What we text you about">
              <p>{SMS_MESSAGE_PURPOSE}</p>
            </Section>

            <Section id="frequency-and-rates" title="Message frequency and rates">
              <p>
                {SMS_FREQUENCY} {SMS_RATES} Rates depend on your mobile carrier and plan.
              </p>
            </Section>

            <Section id="consent" title="How you agree to receive texts">
              {SMS_CONSENT_METHOD ? (
                <p>{SMS_CONSENT_METHOD}</p>
              ) : (
                <div
                  data-testid="sms-consent-placeholder"
                  className="not-prose rounded-lg border-2 border-dashed border-brand-merlot bg-brand-cream p-4 text-base text-brand-dark-text"
                >
                  <p className="font-semibold text-brand-merlot">Pending confirmation by Dr. Anderson</p>
                  <p className="mt-2">{SMS_CONSENT_PLACEHOLDER}</p>
                </div>
              )}
              <p className="mt-4">{SMS_CONSENT_NOT_REQUIRED}</p>
            </Section>

            <Section id="stop-and-help" title="Opting out and getting help">
              <p>
                {SMS_STOP_INSTRUCTIONS} {SMS_HELP_INSTRUCTIONS} You can also call us at{" "}
                <a href={PRACTICE_PHONE_HREF} className={linkClass}>
                  {PRACTICE_PHONE_DISPLAY}
                </a>
                .
              </p>
            </Section>

            <Section id="carriers" title="Carriers">
              <p>{SMS_CARRIER_DISCLAIMER}</p>
            </Section>

            <Section id="privacy" title="Your privacy">
              <p>
                {SMS_PRIVACY_NO_SHARING} {SMS_PRIVACY_SERVICE_PROVIDERS} {SMS_PRIVACY_OPT_IN_EXCLUSION} Read our{" "}
                <Link href={`${SMS_PRIVACY_PATH}#${SMS_PRIVACY_SECTION_ID}`} className={linkClass}>
                  Privacy Policy
                </Link>{" "}
                for how we handle other information.
              </p>
            </Section>

            <Section id="contact" title="Contact us">
              <p>Questions about these texts? Contact Wine Country Root Canal:</p>
              <address className="mt-4 not-italic">
                Wine Country Root Canal
                <br />
                4655 Hoen Ave Ste 2
                <br />
                Santa Rosa, CA 95405
                <br />
                Phone:{" "}
                <a href={PRACTICE_PHONE_HREF} className={linkClass}>
                  {PRACTICE_PHONE_DISPLAY}
                </a>
                <br />
                Email:{" "}
                <a href={`mailto:${PRACTICE_EMAIL}`} className={linkClass}>
                  {PRACTICE_EMAIL}
                </a>
              </address>
            </Section>
          </div>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
