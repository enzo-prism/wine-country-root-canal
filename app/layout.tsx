import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { GA4_TYPEFORM_LEAD_SCRIPT } from "@/lib/ga4-typeform-lead-script"
import { APPOINTMENT_TYPEFORM_ID, GA4_BOOTSTRAP_SCRIPT } from "@/lib/ga4"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Wine Country Root Canal | Santa Rosa Endodontist",
  description:
    "Elegant and compassionate endodontic care in Santa Rosa, CA. Dr. Craig Wm. Anderson specializes in root canal therapy, restoring beautiful smiles.",
  metadataBase: new URL("https://www.winecountryrootcanal.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.winecountryrootcanal.com",
    siteName: "Wine Country Root Canal",
    title: "Wine Country Root Canal | Santa Rosa Endodontist",
    description:
      "Elegant and compassionate endodontic care in Santa Rosa, CA. Dr. Craig Wm. Anderson specializes in root canal therapy, restoring beautiful smiles.",
    images: [
      {
        url: "/images/wine-country-vineyard.jpg",
        width: 1200,
        height: 630,
        alt: "Wine Country Root Canal - Santa Rosa Endodontist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wine Country Root Canal | Santa Rosa Endodontist",
    description:
      "Elegant and compassionate endodontic care in Santa Rosa, CA. Dr. Craig Wm. Anderson specializes in root canal therapy.",
    images: ["/images/wine-country-vineyard.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "https://www.winecountryrootcanal.com",
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the environment to emit the
  // Google Search Console verification meta tag (only needed if not verified via DNS/GA).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

const businessSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
      // Single practice entity for the whole site (Dentist/MedicalBusiness/LocalBusiness are all
      // Organization subtypes). Person/MedicalWebPage nodes reference it via this @id.
      // No `logo`: no brand logo asset exists in /public (the forms-page PNG is a QR code).
      "@id": "https://www.winecountryrootcanal.com/#localbusiness",
      name: "Wine Country Root Canal",
      url: "https://www.winecountryrootcanal.com/",
      telephone: "+1-707-523-3636",
      email: "winecountryrootcanal@gmail.com",
      image: "https://www.winecountryrootcanal.com/images/office-entrance.jpg",
      priceRange: "$$",
      medicalSpecialty: "Endodontic",
      hasMap:
        "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4655 Hoen Ave Ste 2",
        addressLocality: "Santa Rosa",
        addressRegion: "CA",
        postalCode: "95405",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.4421472,
        longitude: -122.6648852,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Sonoma County" },
        { "@type": "City", name: "Santa Rosa" },
        { "@type": "City", name: "Rohnert Park" },
        { "@type": "City", name: "Petaluma" },
        { "@type": "City", name: "Windsor" },
        { "@type": "City", name: "Healdsburg" },
        { "@type": "City", name: "Sebastopol" },
        { "@type": "City", name: "Sonoma" },
        { "@type": "City", name: "Cotati" },
        { "@type": "City", name: "Napa" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/wine-country-root-canal/about/",
        "https://www.facebook.com/people/Wine-Country-Root-Canal/100063648248331/",
        "https://www.yelp.com/biz/wine-country-root-canal-santa-rosa-2",
        "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D",
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchemas) }} />
      </head>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans bg-brand-cream text-brand-dark-text antialiased`}
      >
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>
        {/* Stub + config run now; gtag.js itself loads on first interaction or idle (lib/ga4.ts). */}
        <Script id="google-analytics" strategy="afterInteractive">
          {GA4_BOOTSTRAP_SCRIPT}
        </Script>
        <Script
          id="ga4-typeform-lead"
          strategy="afterInteractive"
          data-typeform-id={APPOINTMENT_TYPEFORM_ID}
          data-ga4-event="generate_lead"
        >
          {GA4_TYPEFORM_LEAD_SCRIPT}
        </Script>

        {children}
        <VercelAnalytics />
      </body>
    </html>
  )
}
