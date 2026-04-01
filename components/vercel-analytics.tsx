"use client"

import { Analytics } from "@vercel/analytics/react"
import { VercelCustomEventTracker } from "@/components/vercel-custom-event-tracker"

export function VercelAnalytics() {
  return (
    <>
      <VercelCustomEventTracker />
      <Analytics
        beforeSend={(event) => {
          try {
            const url = new URL(event.url)
            url.search = ""
            url.hash = ""

            return {
              ...event,
              url: url.toString(),
            }
          } catch {
            return event
          }
        }}
      />
    </>
  )
}
