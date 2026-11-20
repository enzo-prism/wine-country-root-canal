import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import "./globals.css"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { GA4_TYPEFORM_LEAD_SCRIPT } from "@/lib/ga4-typeform-lead-script"
import { APPOINTMENT_TYPEFORM_ID, GA4_BOOTSTRAP_SCRIPT } from "@/lib/ga4"
import { buildSiteGraph } from "@/lib/schema"

// Self-hosted so `next build` does not fetch Google Fonts. 15.5.28 still
// crashes when css2 returns an extensionless `/l/font?kit=` URL (next.js#99114).
const playfair = localFont({
  src: [
    { path: "./fonts/playfair-display-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
})

const sourceSans = localFont({
  src: [
    { path: "./fonts/source-sans-3-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/source-sans-3-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-source-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Needed so env(safe-area-inset-bottom) is non-zero on notched iPhones.
  // The phone sticky Call bar and its footer spacer pad that inset.
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteGraph()) }} />
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
