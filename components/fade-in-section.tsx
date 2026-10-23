"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FadeInSectionProps {
  children: ReactNode
  className?: string
}

/**
 * Scroll-reveal wrapper implemented as a progressive enhancement.
 *
 * - Server HTML (and no-JS visitors) always render the content fully visible, so
 *   the wrapper can never delay first paint or LCP.
 * - After hydration, and before the browser paints that commit (layout effect),
 *   only sections that are still entirely below the viewport are switched to the
 *   hidden state. They are off-screen at that moment, so there is no visible flash;
 *   anything already on screen (or scrolled past) simply stays visible.
 * - Hidden sections fade/slide in once when they scroll into view. Only opacity and
 *   transform change, so the reveal causes no layout shift.
 * - prefers-reduced-motion users never get the hidden state at all.
 * - Hash jumps (TOC, initial `#id`, back/forward) skip the reveal so the sticky
 *   header does not cover a still-translated, half-faded heading.
 */
type RevealState = "static" | "hidden" | "revealing"

function hashId(): string {
  const raw = window.location.hash.slice(1)
  if (!raw) return ""
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function hashTargets(element: HTMLElement): boolean {
  const id = hashId()
  if (!id) return false
  const target = document.getElementById(id)
  return Boolean(target && (target === element || element.contains(target)))
}

function idFromHref(href: string | null): string {
  if (!href) return ""
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) return ""
  const raw = href.slice(hashIndex + 1)
  if (!raw) return ""
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

function showImmediately(element: HTMLElement) {
  // Cancel an in-flight reveal so a hash/TOC click is fully opaque on landing.
  element.style.transition = "none"
  element.style.opacity = "1"
  element.style.transform = "none"
}

export function FadeInSection({ children, className }: FadeInSectionProps) {
  const [state, setState] = useState<RevealState>("static")
  const domRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const element = domRef.current
    if (!element || typeof IntersectionObserver === "undefined") {
      return
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const revealIfTargeted = () => {
      if (!hashTargets(element)) return false
      showImmediately(element)
      setState("static")
      return true
    }

    const onAnchorActivate = (event: Event) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : []
      const anchor = path.find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement)
      if (!anchor) return
      const id = idFromHref(anchor.getAttribute("href"))
      if (!id) return
      const target = document.getElementById(id)
      if (!target || (target !== element && !element.contains(target))) return
      // Sync before the browser scrolls so translate-y never offsets the landing.
      showImmediately(element)
      setState("static")
    }

    document.addEventListener("click", onAnchorActivate, true)
    window.addEventListener("hashchange", revealIfTargeted)
    window.addEventListener("popstate", revealIfTargeted)
    window.addEventListener("pageshow", revealIfTargeted)

    if (revealIfTargeted()) {
      return () => {
        document.removeEventListener("click", onAnchorActivate, true)
        window.removeEventListener("hashchange", revealIfTargeted)
        window.removeEventListener("popstate", revealIfTargeted)
        window.removeEventListener("pageshow", revealIfTargeted)
      }
    }

    // Only defer content that starts fully below the fold.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      return () => {
        document.removeEventListener("click", onAnchorActivate, true)
        window.removeEventListener("hashchange", revealIfTargeted)
        window.removeEventListener("popstate", revealIfTargeted)
        window.removeEventListener("pageshow", revealIfTargeted)
      }
    }

    setState("hidden")

    const observer = new IntersectionObserver(
      (entries) => {
        if (hashTargets(element)) {
          showImmediately(element)
          setState("static")
          observer.disconnect()
          return
        }
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("revealing")
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", onAnchorActivate, true)
      window.removeEventListener("hashchange", revealIfTargeted)
      window.removeEventListener("popstate", revealIfTargeted)
      window.removeEventListener("pageshow", revealIfTargeted)
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={cn(
        className,
        "[&:has(:target)]:opacity-100 [&:has(:target)]:translate-y-0",
        state === "hidden" && "opacity-0 translate-y-5 print:opacity-100 print:translate-y-0",
        state === "revealing" && "opacity-100 translate-y-0 transition-[opacity,transform] duration-1000 ease-out",
      )}
    >
      {children}
    </div>
  )
}
