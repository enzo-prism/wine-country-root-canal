"use client"

// Client component on purpose: Next.js serializes the root not-found view into the RSC payload of
// EVERY page (it is the layout's not-found boundary). As a client component it costs one small
// cached chunk instead of ~25 KB of element tree in each page's HTML. Static markup, no hooks.
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

const helpfulLinks = [
  { label: "Dental Emergencies", href: "/dental-emergencies" },
  { label: "Your Visit", href: "/your-visit" },
  { label: "Patient Forms", href: "/forms" },
  { label: "For Referring Dentists", href: "/dentists" },
  { label: "Contact & Map", href: "/contact" },
  { label: "Home", href: "/" },
]

export function NotFoundView() {
  return (
    <>
      <Navbar />
      <PageShell
        title="We couldn’t find that page"
        description="The page may have moved, or the link may be out of date. These pages are a good place to start."
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="rounded-sm bg-brand-merlot p-6 text-brand-cream shadow-lg sm:p-8">
              <h2 className="font-serif text-2xl text-brand-cream">In pain?</h2>
              <p className="mt-2 text-lg">Call us. It is the fastest way to reach our team.</p>
              <LinkButton
                href={PRACTICE_PHONE_HREF}
                size="lg"
                className="mt-5 bg-brand-cream px-6 text-base font-semibold text-brand-merlot shadow-md hover:bg-white focus-visible:ring-brand-cream focus-visible:ring-offset-brand-merlot"
                icon={<Phone />}
                analyticsEvent={analyticsEvents.phoneClick}
                analyticsLocation="not_found_call"
              >
                Call {PRACTICE_PHONE_DISPLAY}
              </LinkButton>
              <p className="mt-5 text-sm text-brand-cream/90">
                Not urgent?{" "}
                <a
                  href={APPOINTMENT_REQUEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-cream underline underline-offset-2"
                  {...analyticsAttributes(analyticsEvents.bookAppointmentClick, "not_found_request")}
                >
                  Request an Appointment
                </a>
              </p>
            </div>

            <nav aria-label="Helpful pages" className="rounded-sm bg-white p-6 shadow-lg sm:p-8">
              <h2 className="font-serif text-2xl text-brand-merlot">Helpful pages</h2>
              <ul className="mt-3 divide-y divide-brand-rose-beige/20">
                {helpfulLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="flex min-h-12 items-center justify-between gap-3 rounded-sm py-2 text-base font-semibold text-brand-merlot no-underline hover:underline"
                    >
                      {link.label}
                      <ArrowRight aria-hidden="true" focusable="false" className="h-4 w-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
