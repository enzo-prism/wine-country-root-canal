import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"

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

export const metadata: Metadata = {
  title: "Wine Country Root Canal | Santa Rosa Endodontist",
  description:
    "Elegant and compassionate endodontic care in Santa Rosa, CA. Dr. Craig Wm. Anderson specializes in root canal therapy, restoring beautiful smiles.",
  generator: "v0.dev",
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
  "@id": "https://www.winecountryrootcanal.com/#organization",
  name: "Wine Country Root Canal",
  alternateName: "Wine Country Endodontics",
  description:
    "Elegant and compassionate endodontic care in Santa Rosa, CA. Dr. Craig Wm. Anderson specializes in root canal therapy, restoring beautiful smiles.",
  url: "https://www.winecountryrootcanal.com",
  logo: "https://www.winecountryrootcanal.com/images/logo.png",
  image: "https://www.winecountryrootcanal.com/images/wine-country-vineyard.jpg",
  telephone: "+1-707-538-1138",
  email: "winecountryrootcanal@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "615 Cherry Street",
    addressLocality: "Santa Rosa",
    addressRegion: "CA",
    postalCode: "95404",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.4404,
    longitude: -122.7141,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/WineCountryRootCanal/",
    "https://www.linkedin.com/company/wine-country-endodontics",
    "https://www.yelp.com/biz/wine-country-root-canal-santa-rosa",
  ],
  founder: {
    "@type": "Person",
    name: "Dr. Craig Wm. Anderson",
  },
  medicalSpecialty: "Endodontics",
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "Root Canal Therapy",
      description: "Treatment to save teeth that have become infected or severely damaged.",
    },
    {
      "@type": "MedicalProcedure",
      name: "Apicoectomy",
      description: "Surgical procedure to remove the tip of the tooth root and surrounding infected tissue.",
    },
    {
      "@type": "MedicalProcedure",
      name: "Endodontic Retreatment",
      description:
        "Retreatment of a tooth that has not healed or has become reinfected after initial root canal therapy.",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "37",
    bestRating: "5",
    worstRating: "1",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans bg-brand-cream text-brand-dark-text antialiased`}
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-VH6BCFFY75" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VH6BCFFY75');
          `}
        </Script>

        <Script id="hotjar-analytics" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6583298,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTopProvider>{children}</ScrollToTopProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
