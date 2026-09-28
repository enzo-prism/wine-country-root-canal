"use client"

// Static markup, but a client component on purpose: a server component's whole element tree is
// serialized into every page's RSC payload (twice, since the root not-found view also renders the
// footer), while a client component ships once as a small cached JS chunk. No hooks or state.
import Link from "next/link"
import { MapPin, Phone, Mail, Printer, Clock, Facebook, Linkedin, Star, ExternalLink } from "lucide-react"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import {
  APPOINTMENT_REQUEST_URL,
  PRACTICE_EMAIL,
  PRACTICE_FAX_DISPLAY,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"

type FooterLink = {
  label: string
  href: string
  emphasis?: boolean
  analytics?: ReturnType<typeof analyticsAttributes>
}

const footerColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Treatments",
    links: [
      { label: "Dental Emergencies", href: "/dental-emergencies", emphasis: true },
      { label: "Root Canal Therapy", href: "/endodontic-procedures/root-canal-therapy" },
      { label: "Root Canal Retreatment", href: "/endodontic-procedures/retreatment" },
      { label: "Apicoectomy", href: "/endodontic-procedures/apicoectomy" },
      { label: "Signs & Symptoms", href: "/endodontic-procedures/signs-symptoms" },
      {
        label: "CBCT & 3D Imaging",
        href: "/cbct-scanner-santa-rosa",
        analytics: analyticsAttributes(analyticsEvents.cbctContentClick, "footer_cbct_page"),
      },
      { label: "Our Technology", href: "/technology" },
    ],
  },
  {
    heading: "Patient Info",
    links: [
      { label: "Your Visit", href: "/your-visit" },
      { label: "Patient Forms", href: "/forms" },
      { label: "Root Canal Cost", href: "/resources/root-canal-cost" },
      { label: "After Your Root Canal", href: "/resources/after-your-root-canal" },
      { label: "Root Canal Safety", href: "/resources/root-canal-safety" },
      { label: "Patient Resources", href: "/resources" },
    ],
  },
  {
    heading: "Our Practice",
    links: [
      { label: "About Dr. Anderson", href: "/about" },
      { label: "Patient Testimonials", href: "/testimonials" },
      { label: "For Referring Dentists", href: "/dentists" },
      { label: "Contact & Map", href: "/contact" },
    ],
  },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wine-country-root-canal/about/", icon: Linkedin },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Wine-Country-Root-Canal/100063648248331/",
    icon: Facebook,
  },
  { label: "Yelp Reviews", href: "https://www.yelp.com/biz/wine-country-root-canal-santa-rosa-2", icon: Star },
  {
    label: "Google Maps",
    href: "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D",
    icon: ExternalLink,
  },
]

const linkClass =
  "inline-flex min-h-11 items-center lg:min-h-8 rounded-sm underline-offset-4 hover:underline focus-ring-on-merlot"

export default function Footer() {
  return (
    <footer className="bg-brand-merlot font-sans text-brand-cream">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand + NAP */}
          <div className="lg:col-span-5">
            <Link href="/" prefetch={false} className={`${linkClass} font-serif text-2xl font-bold`}>
              Wine Country Root Canal
            </Link>
            <p className="mt-1 text-sm opacity-90">Craig Wm. Anderson, DDS · Endodontics</p>
            <p className="mt-1 text-sm opacity-90">Saving natural teeth in Sonoma County.</p>

            <address className="mt-6 space-y-3 text-sm not-italic opacity-90">
              <p className="flex items-start">
                <MapPin aria-hidden="true" focusable="false" className="mr-3 mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  4655 Hoen Ave Ste 2<br />
                  Santa Rosa, CA 95405
                </span>
              </p>
              <p className="flex items-start">
                <Clock aria-hidden="true" focusable="false" className="mr-3 mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  Mon–Thu 8 AM–5 PM
                  <br />
                  Fri–Sun closed
                </span>
              </p>
              <p className="flex items-center">
                <Phone aria-hidden="true" focusable="false" className="mr-3 h-5 w-5 shrink-0" />
                <a
                  href={PRACTICE_PHONE_HREF}
                  className={`${linkClass} font-semibold`}
                  {...analyticsAttributes(analyticsEvents.phoneClick, "footer_phone")}
                >
                  {PRACTICE_PHONE_DISPLAY}
                </a>
              </p>
              <p className="flex items-center">
                <Mail aria-hidden="true" focusable="false" className="mr-3 h-5 w-5 shrink-0" />
                <a
                  href={`mailto:${PRACTICE_EMAIL}`}
                  className={`${linkClass} break-all`}
                  {...analyticsAttributes(analyticsEvents.emailClick, "footer_email")}
                >
                  {PRACTICE_EMAIL}
                </a>
              </p>
              <p className="flex items-center">
                <Printer aria-hidden="true" focusable="false" className="mr-3 h-5 w-5 shrink-0" />
                <span>
                  <span className="sr-only">Fax: </span>
                  {PRACTICE_FAX_DISPLAY}
                </span>
              </p>
            </address>

            <a
              href={APPOINTMENT_REQUEST_URL}
              className="mt-6 inline-flex min-h-11 items-center rounded-md bg-brand-cream px-5 text-sm font-semibold text-brand-merlot transition-colors hover:bg-white focus-ring-on-merlot motion-reduce:transition-none"
              target="_blank"
              rel="noopener noreferrer"
              {...analyticsAttributes(analyticsEvents.bookAppointmentClick, "footer_book_appointment")}
            >
              Request an Appointment
            </a>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={`Footer ${column.heading}`}>
                <h2 className="mb-3 text-base font-semibold">{column.heading}</h2>
                <ul className="space-y-1 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className={`${linkClass} ${link.emphasis ? "font-semibold" : "opacity-90 hover:opacity-100"}`}
                        {...link.analytics}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-cream/30 pt-6 text-xs opacity-90 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="Social and map links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} className={`${linkClass} gap-2`} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" focusable="false" className="h-4 w-4 shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-y-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Wine Country Root Canal. All Rights Reserved.</p>
            <span aria-hidden="true" className="hidden sm:inline">
              •
            </span>
            <span className="flex flex-wrap items-center gap-x-3">
              <Link href="/privacy" prefetch={false} className={linkClass}>
                Privacy Policy & Terms of Service
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="/accessibility" prefetch={false} className={linkClass}>
                Accessibility
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
