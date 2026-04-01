"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import type { AnalyticsEventName } from "@/lib/analytics"

export function VercelCustomEventTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const trackedElement = target.closest<HTMLElement>("[data-analytics-event]")
      const eventName = trackedElement?.dataset.analyticsEvent as AnalyticsEventName | undefined
      const location = trackedElement?.dataset.analyticsLocation

      if (!trackedElement || !eventName) {
        return
      }

      const properties = location ? { location } : undefined

      if (process.env.NODE_ENV !== "production") {
        console.info("[vercel-analytics]", eventName, properties)
      }

      track(eventName, properties)
    }

    document.addEventListener("click", handleClick, { capture: true })

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
    }
  }, [])

  return null
}
