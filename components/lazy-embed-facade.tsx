"use client"

import { useEffect, useRef, useState, type HTMLAttributeReferrerPolicy, type ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface LazyEmbedIframeProps {
  src: string
  /** Kept on the iframe once it loads (screen readers announce it). */
  title: string
  allow?: string
  allowFullScreen?: boolean
  referrerPolicy?: HTMLAttributeReferrerPolicy
  className?: string
}

interface LazyEmbedFacadeProps {
  /** iframe rendered only after the visitor asks for it. */
  iframe: LazyEmbedIframeProps
  /**
   * Optional src for the activated iframe (e.g. with autoplay=1). The no-JS
   * fallback always uses `iframe.src`.
   */
  activeSrc?: string
  /** Server-rendered placeholder content (may contain links; never nested in the button). */
  poster?: ReactNode
  /** Visible content of the activation button. */
  trigger: ReactNode
  /** Accessible name for the button when the visible text is shorter, e.g. "Play video: …". */
  triggerLabel?: string
  triggerClassName?: string
  /** Wrapper classes before activation. */
  className?: string
  /** Wrapper classes after activation (defaults to `className`). */
  activeClassName?: string
}

/**
 * Click-to-load facade for third-party iframes (Vimeo, Google Maps). Until the
 * visitor activates it, only the server-rendered poster and a native <button> ship;
 * the embed's ~400 KB / ~20 requests load on demand. On activation the iframe
 * replaces the button and receives focus so keyboard and screen-reader users land
 * inside the player/map. Without JavaScript a <noscript> copy of the iframe renders
 * instead, so no-JS visitors still get the embed.
 */
export function LazyEmbedFacade({
  iframe,
  activeSrc,
  poster,
  trigger,
  triggerLabel,
  triggerClassName,
  className,
  activeClassName,
}: LazyEmbedFacadeProps) {
  const [active, setActive] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    if (active) {
      iframeRef.current?.focus()
    }
  }, [active])

  const iframeClassName = cn(
    "h-full w-full border-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-brand-merlot",
    iframe.className,
  )

  if (active) {
    return (
      <div className={activeClassName ?? className}>
        <iframe
          ref={iframeRef}
          src={activeSrc ?? iframe.src}
          title={iframe.title}
          allow={iframe.allow}
          allowFullScreen={iframe.allowFullScreen}
          referrerPolicy={iframe.referrerPolicy}
          className={iframeClassName}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      {poster}
      <button
        type="button"
        aria-label={triggerLabel}
        className={triggerClassName}
        onClick={() => setActive(true)}
      >
        {trigger}
      </button>
      <noscript>
        <iframe
          src={iframe.src}
          title={iframe.title}
          allow={iframe.allow}
          allowFullScreen={iframe.allowFullScreen}
          referrerPolicy={iframe.referrerPolicy}
          loading="lazy"
          className={cn(iframeClassName, "absolute inset-0 z-10 bg-white")}
        />
      </noscript>
    </div>
  )
}
