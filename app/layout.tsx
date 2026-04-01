import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"
import { VercelAnalytics } from "@/components/vercel-analytics"

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
}

const businessSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
      "@id": "https://www.winecountryrootcanal.com/#localbusiness",
      name: "Wine Country Root Canal",
      url: "https://www.winecountryrootcanal.com/",
      telephone: "+1-707-523-3636",
      logo: "https://www.winecountryrootcanal.com/images/91f17c7b-dd42-4bf9-8a4d-d4a6a308362b.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4655 Hoen Ave Ste 2",
        addressLocality: "Santa Rosa",
        addressRegion: "CA",
        postalCode: "95405",
        addressCountry: "US",
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
        "https://www.linkedin.com/company/wine-country-root-canal/about/",
        "https://www.facebook.com/people/Wine-Country-Root-Canal/100063648248331/",
        "https://www.yelp.com/biz/wine-country-root-canal-santa-rosa-2",
        "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://www.winecountryrootcanal.com/#organization",
      name: "Wine Country Root Canal",
      url: "https://www.winecountryrootcanal.com/",
      logo: "https://www.winecountryrootcanal.com/images/91f17c7b-dd42-4bf9-8a4d-d4a6a308362b.png",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchemas) }} />
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
        <VercelAnalytics />
      </body>
    </html>
  )
}
