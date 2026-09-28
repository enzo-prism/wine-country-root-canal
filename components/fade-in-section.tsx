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
 */
type RevealState = "static" | "hidden" | "revealing"

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
    // Only defer content that starts fully below the fold.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      return
    }

    setState("hidden")

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("revealing")
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={domRef}
      className={cn(
        className,
        state === "hidden" && "opacity-0 translate-y-5 print:opacity-100 print:translate-y-0",
        state === "revealing" && "opacity-100 translate-y-0 transition-[opacity,transform] duration-1000 ease-out",
      )}
    >
      {children}
    </div>
  )
}
