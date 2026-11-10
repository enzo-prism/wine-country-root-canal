"use client"

import { useEffect } from "react"
import { Phone } from "lucide-react"

import { setStickyCallBarVisible, useStickyCallBarVisible } from "@/hooks/use-sticky-call-bar-visible"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { MOBILE_STICKY_CALL_BAR_TEST_ID, SERVICE_HERO_CALL_ID } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

/** Matches the site's mobile header breakpoint (`lg` = 1024px). */
const DESKTOP_MEDIA = "(min-width: 1024px)"

/**
 * Phone-only Call/Request bar. Fixed, so it never shifts the page flow.
 * Visible only after the hero Call button leaves the viewport.
 *
 * This is the only writer of the shared `data-sticky-call-bar-visible` flag.
 * Cleanup on unmount must clear that flag so a client navigation to a page
 * without the bar (home) cannot leave the header Call hidden.
 *
 * Timing: the bar is hidden in SSR and on first paint. After hydration, scroll /
 * IntersectionObserver reconcile typically takes ~60–275ms, so on mid-scroll
 * restores and hash deep-links the header Call shows briefly, then yields to
 * this bar. That flash is expected. At the top of the page the in-page hero Call
 * shares the screen with the header Call by design; only this bar and the
 * header merlot Call are mutually exclusive.
 */
export function MobileStickyCallBar({ analyticsLocation }: { analyticsLocation: string }) {
  const visible = useStickyCallBarVisible()

  useEffect(() => {
    const heroCall = document.getElementById(SERVICE_HERO_CALL_ID)
    if (!heroCall || typeof IntersectionObserver === "undefined") {
      return
    }

    const desktopQuery = window.matchMedia(DESKTOP_MEDIA)

    const apply = (heroIsVisible: boolean) => {
      setStickyCallBarVisible(!desktopQuery.matches && !heroIsVisible)
    }

    const heroInView = () => {
      const rect = heroCall.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    const reconcileFromGeometry = () => {
      apply(heroInView())
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]) return
        // A late first delivery can still say intersecting after a hash scroll.
        apply(heroInView())
      },
      { threshold: 0, root: null, rootMargin: "0px" },
    )
    observer.observe(heroCall)

    // Hash deep-links can leave the hero off-screen before the observer's first
    // callback; read the live box now and again after this frame's layout.
    reconcileFromGeometry()
    let hashFrames = 0
    let frame = window.requestAnimationFrame(function settleHashScroll() {
      reconcileFromGeometry()
      hashFrames += 1
      if (window.location.hash && heroInView() && hashFrames < 120) {
        frame = window.requestAnimationFrame(settleHashScroll)
      }
    })

    desktopQuery.addEventListener("change", reconcileFromGeometry)
    window.addEventListener("hashchange", reconcileFromGeometry)
    window.addEventListener("pageshow", reconcileFromGeometry)

    const onScroll = () => {
      reconcileFromGeometry()
      if (!heroInView()) {
        window.removeEventListener("scroll", onScroll)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      desktopQuery.removeEventListener("change", reconcileFromGeometry)
      window.removeEventListener("hashchange", reconcileFromGeometry)
      window.removeEventListener("pageshow", reconcileFromGeometry)
      window.removeEventListener("scroll", onScroll)
      setStickyCallBarVisible(false)
    }
  }, [])

  return (
    <div
      data-testid={MOBILE_STICKY_CALL_BAR_TEST_ID}
      hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-brand-rose-beige/25 bg-white/[0.97] shadow-[0_-4px_12px_rgba(0,0,0,0.12)] lg:hidden",
        "px-5 pt-3",
        "pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <a
          href={PRACTICE_PHONE_HREF}
          aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
          className="inline-flex h-[52px] min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-brand-merlot px-2.5 text-base font-semibold leading-none text-brand-cream shadow-md hover:bg-brand-merlot/90 min-[360px]:text-[17px]"
          {...analyticsAttributes(analyticsEvents.phoneClick, `${analyticsLocation}_sticky_call`)}
        >
          <Phone className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" aria-hidden="true" focusable="false" />
          <span className="truncate">Call {PRACTICE_PHONE_DISPLAY}</span>
        </a>
        <a
          href={APPOINTMENT_REQUEST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] min-h-11 w-auto shrink-0 items-center justify-center rounded-md border border-brand-merlot bg-white px-3 text-base font-semibold leading-none text-brand-merlot hover:bg-brand-merlot hover:text-brand-cream min-[360px]:w-[90px] min-[360px]:px-4"
          {...analyticsAttributes(analyticsEvents.bookAppointmentClick, `${analyticsLocation}_sticky_request`)}
        >
          Request
        </a>
      </div>
    </div>
  )
}
