"use client"

import type React from "react"
import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"

interface PageShellProps {
  title: string
  description?: string
  children: React.ReactNode
  heroImageUrl?: string
  heroVimeoVideoId?: string // New prop for Vimeo video
  heroContent?: React.ReactNode
  hideTitleSection?: boolean
}

export function PageShell({
  title,
  description,
  children,
  heroImageUrl,
  heroVimeoVideoId, // Destructure new prop
  heroContent,
  hideTitleSection = false,
}: PageShellProps) {
  const vimeoVideoId = heroVimeoVideoId || "1095456147" // Default or passed ID

  // Automatically scroll to top when this component mounts or pathname changes
  useScrollToTop()

  return (
    <main className="flex-grow">
      {heroVimeoVideoId && (
        <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center text-center overflow-hidden">
          {/* Video Background Container */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&loop=1&muted=1&background=1&autopause=0&controls=0&title=0&byline=0&portrait=0`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title={`${title} page hero video background`}
              className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-25"
            ></iframe>
          </div>
          {/* Overlay for text contrast - using existing PageShell overlay style */}
          <div className="absolute inset-0 bg-brand-merlot/70 z-dropdown" />{" "}
          {/* Adjusted opacity for better contrast on video */}
          <div className="relative z-modal p-4 animate-fade-in">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{title}</h1>
            {description && !heroContent && (
              <p className="mt-4 text-lg text-brand-cream/90 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        </section>
      )}

      {!heroVimeoVideoId &&
        heroImageUrl && ( // Only render image if no video
          <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center text-center overflow-hidden">
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt={`${title} page hero image`}
              fill
              className="object-cover z-0"
              priority
            />
            <div className="absolute inset-0 bg-brand-merlot/60 z-dropdown" />
            <div className="relative z-modal p-4 animate-fade-in">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{title}</h1>
              {description && !heroContent && (
                <p className="mt-4 text-lg text-brand-cream/90 max-w-2xl mx-auto">{description}</p>
              )}
            </div>
          </section>
        )}

      {heroContent && (
        <section className="relative py-16 md:py-24 w-full flex items-center justify-center text-center bg-brand-cream">
          <FadeInSection className="container mx-auto px-4 md:px-6">{heroContent}</FadeInSection>
        </section>
      )}

      {!hideTitleSection && !heroImageUrl && !heroVimeoVideoId && !heroContent && (
        <FadeInSection className="bg-white py-12 md:py-16 text-center border-b border-brand-cream">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-merlot mb-3">{title}</h1>
            {description && <p className="text-lg text-brand-dark-text/80 max-w-2xl mx-auto">{description}</p>}
          </div>
        </FadeInSection>
      )}

      <div
        className={`py-12 md:py-20 ${
          hideTitleSection && !heroImageUrl && !heroVimeoVideoId && !heroContent ? "pt-0 md:pt-0" : ""
        }`}
      >
        {children}
      </div>
    </main>
  )
}
