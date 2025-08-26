import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-sans bg-brand-cream text-brand-dark-text antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTopProvider>{children}</ScrollToTopProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
