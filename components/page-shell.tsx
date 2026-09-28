import type React from "react"
import Image from "next/image"

import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs"

interface PageShellProps {
  title: string
  description?: string
  children: React.ReactNode
  heroImageUrl?: string
  heroVimeoVideoId?: string // Legacy: renders the vineyard image hero variant.
  heroContent?: React.ReactNode
  hideTitleSection?: boolean
  /**
   * Breadcrumb trail (including the current page as the last item). Rendered above the
   * H1 on the same left edge, with BreadcrumbList JSON-LD. Pages that pass this should
   * drop their in-body <Breadcrumbs> and "Back to …" links.
   */
  breadcrumbs?: Crumb[]
  /**
   * Default header content sits in the centered max-w-4xl column most page bodies use. Pages
   * whose body spans the full container (review grids, photo + text layouts) pass "wide" so the
   * H1 shares the body's left edge instead.
   */
  headerWidth?: "column" | "wide"
}

const heroTitleClass = "font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl"

export function PageShell({
  title,
  description,
  children,
  heroImageUrl,
  heroVimeoVideoId,
  heroContent,
  hideTitleSection = false,
  breadcrumbs,
  headerWidth = "column",
}: PageShellProps) {
  const heroImage = heroVimeoVideoId ? "/images/wine-country-vineyard.jpg" : heroImageUrl
  const hasBreadcrumbs = Boolean(breadcrumbs && breadcrumbs.length > 0)
  const showDefaultHeader = !hideTitleSection && !heroImage && !heroContent

  return (
    <main id="main-content" tabIndex={-1} className="flex-grow">
      {heroImage && (
        <section className="relative flex min-h-[240px] w-full items-center overflow-x-hidden py-12 md:min-h-[320px]">
          <Image
            src={heroImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="z-0 object-cover"
            priority
            fetchPriority="high"
          />
          {/* Solid wash on small screens (text spans full width); lighter gradient on wide screens,
              kept ≥80% merlot behind the text column for contrast. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-dropdown bg-brand-merlot/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-merlot/90 lg:via-brand-merlot/80 lg:via-60% lg:to-brand-merlot/25"
          />
          <div className="container relative z-modal mx-auto px-4 md:px-6">
            <div className="max-w-xl">
              <h1 className={heroTitleClass}>{title}</h1>
              {description && !heroContent && (
                <p className="mt-4 text-lg leading-relaxed text-brand-cream md:text-xl">{description}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {heroContent && (
        <section className="relative flex w-full items-center justify-center bg-brand-cream py-16 text-center md:py-24">
          <div className="container mx-auto px-4 md:px-6">{heroContent}</div>
        </section>
      )}

      {showDefaultHeader && (
        <div className="border-b border-brand-rose-beige/20 bg-white">
          {/* Share the left edge of the page body: the max-w-4xl column by default, or the container. */}
          <div className="container mx-auto px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-8">
            <div className={headerWidth === "column" ? "mx-auto max-w-4xl" : undefined}>
              {hasBreadcrumbs && <Breadcrumbs items={breadcrumbs!} className="mb-5 md:mb-6" />}
              <div className="max-w-3xl">
                <h1 className="font-serif text-4xl font-bold leading-[1.1] text-brand-merlot md:text-[2.875rem] lg:text-5xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-3 text-lg leading-relaxed text-brand-dark-text/80 md:mt-4 md:text-xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero variants can't carry the dark-on-light trail; show it at the top of the body instead. */}
      {hasBreadcrumbs && !showDefaultHeader && (
        <div className="container mx-auto px-4 pt-6 md:px-6">
          <Breadcrumbs items={breadcrumbs!} />
        </div>
      )}

      <div
        className={`py-10 md:py-16 ${hideTitleSection && !heroImage && !heroContent ? "pt-0 md:pt-0" : ""}`}
      >
        {children}
      </div>
    </main>
  )
}
