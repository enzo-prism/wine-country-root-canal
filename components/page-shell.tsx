"use client"

import type React from "react"
import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"

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
  return (
    <main id="main-content" tabIndex={-1} className="flex-grow">
      {heroVimeoVideoId && (
        <section className="relative min-h-[300px] md:min-h-[400px] h-auto w-full flex items-center justify-center text-center overflow-x-hidden py-12">
          <Image
            src="/images/wine-country-vineyard.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-brand-merlot/80 z-dropdown" />{" "}
          <div className="relative z-modal p-4 animate-fade-in">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{title}</h1>
            {description && !heroContent && (
              <p className="mt-4 text-lg text-brand-cream max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        </section>
      )}

      {!heroVimeoVideoId &&
        heroImageUrl && ( // Only render image if no video
          <section className="relative min-h-[300px] md:min-h-[400px] h-auto w-full flex items-center justify-center text-center overflow-x-hidden py-12">
            <Image
              src={heroImageUrl || "/placeholder.svg"}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover z-0"
              priority
            />
            <div className="absolute inset-0 bg-brand-merlot/80 z-dropdown" />
            <div className="relative z-modal p-4 animate-fade-in">
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">{title}</h1>
              {description && !heroContent && (
                <p className="mt-4 text-lg text-brand-cream max-w-2xl mx-auto">{description}</p>
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
