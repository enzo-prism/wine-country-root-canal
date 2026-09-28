import { MapPin, Navigation } from "lucide-react"

import { LazyEmbedFacade } from "@/components/lazy-embed-facade"
import { LinkButton } from "@/components/ui/link-button"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const PRACTICE_ADDRESS_STREET = "4655 Hoen Ave Ste 2"
export const PRACTICE_ADDRESS_LOCALITY = "Santa Rosa, CA 95405"

/** Google Maps place page (same listing as the footer and the LocalBusiness `hasMap`). */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27"

export const APPLE_MAPS_URL =
  "https://maps.apple.com/?address=4655%20Hoen%20Ave%20Ste%202%2C%20Santa%20Rosa%2C%20CA%2095405&q=Wine%20Country%20Root%20Canal"

const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Wine%20Country%20Root%20Canal%2C%204655%20Hoen%20Ave%20Ste%202%2C%20Santa%20Rosa%2C%20CA%2095405&t=&z=15&ie=UTF8&iwloc=B&output=embed"

interface MapFacadeProps {
  className?: string
}

/**
 * Static, key-free map card. The Google Maps iframe (~450 KB, ~16 requests on
 * load, more on scroll) only loads when the visitor asks for the interactive map;
 * directions links work immediately and without JavaScript.
 */
export function MapFacade({ className }: MapFacadeProps) {
  // The static card grows with its content on narrow screens; the live map needs a fixed height.
  const shell = "relative min-h-[24rem] overflow-hidden rounded-sm"

  return (
    <LazyEmbedFacade
      className={cn(
        shell,
        className,
        "flex flex-col items-center justify-center gap-5 border border-brand-rose-beige/40 bg-brand-cream p-6 text-center",
        // Faint street-grid texture so the card reads as a map without loading one.
        "bg-[linear-gradient(to_right,rgba(118,35,54,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(118,35,54,0.06)_1px,transparent_1px)] bg-[size:32px_32px]",
      )}
      activeClassName={cn(shell, "h-96 bg-white", className)}
      iframe={{
        src: GOOGLE_MAPS_EMBED_URL,
        title: "Google Map of Wine Country Root Canal location in Santa Rosa, CA",
        referrerPolicy: "no-referrer-when-downgrade",
        className: "absolute inset-0",
      }}
      poster={
        <>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-merlot text-brand-cream shadow-md">
            <MapPin aria-hidden="true" focusable="false" className="h-7 w-7" />
          </span>
          <address className="not-italic text-brand-dark-text">
            <span className="block font-serif text-xl text-brand-merlot">Wine Country Root Canal</span>
            <span className="block">{PRACTICE_ADDRESS_STREET}</span>
            <span className="block">{PRACTICE_ADDRESS_LOCALITY}</span>
          </address>
          <div className="w-full sm:w-auto">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-dark-text/80">Get directions</p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <LinkButton
                href={GOOGLE_MAPS_PLACE_URL}
                variant="brand-primary"
                size="lg"
                className="h-auto whitespace-normal px-6"
                target="_blank"
                rel="noopener noreferrer"
                icon={<Navigation />}
              >
                Google Maps<span className="sr-only"> directions (opens in a new tab)</span>
              </LinkButton>
              <LinkButton
                href={APPLE_MAPS_URL}
                variant="brand-outline"
                size="lg"
                className="h-auto whitespace-normal px-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Maps<span className="sr-only"> directions (opens in a new tab)</span>
              </LinkButton>
            </div>
          </div>
        </>
      }
      triggerClassName={cn(
        buttonVariants({ variant: "link", size: "sm" }),
        "text-base font-semibold text-brand-merlot underline underline-offset-4",
      )}
      trigger="Load interactive map"
    />
  )
}
