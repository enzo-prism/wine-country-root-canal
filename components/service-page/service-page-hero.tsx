import type { ReactNode } from "react"
import { Phone } from "lucide-react"

import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs"
import { LinkButton } from "@/components/ui/link-button"
import { RatingBadge } from "@/components/service-page/rating-badge"
import { SERVICE_HERO_CALL_ID } from "@/lib/service-pages"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import {
  APPOINTMENT_REQUEST_URL,
  PRACTICE_ADDRESS_LINE,
  PRACTICE_HOURS_SHORT,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"
import { cn } from "@/lib/utils"

type ServicePageHeroProps = {
  title: string
  subtitle: string
  intro?: ReactNode
  breadcrumbs: Crumb[]
  analyticsLocation: string
}

export function ServicePageHero({ title, subtitle, intro, breadcrumbs, analyticsLocation }: ServicePageHeroProps) {
  return (
    <div className="border-b border-brand-rose-beige/20 bg-white">
      <div className="container mx-auto px-4 pb-8 pt-5 md:px-6 md:pb-12 md:pt-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbs} className="mb-5 md:mb-6" />
          <h1 className="font-serif text-4xl font-bold leading-[1.17] text-brand-merlot md:text-5xl md:leading-[1.08]">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-7 text-brand-dark-text/80 md:mt-4 md:text-xl">{subtitle}</p>
          {intro ? (
            <div className="mt-3 max-w-3xl text-base leading-[25px] text-brand-dark-text/90 md:mt-4 md:text-[17px] md:leading-[27px]">
              {intro}
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-2.5 md:mt-7 md:flex-row md:flex-wrap md:items-center md:gap-3">
            <a
              id={SERVICE_HERO_CALL_ID}
              href={PRACTICE_PHONE_HREF}
              aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
              className={cn(
                "inline-flex h-[52px] min-h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-merlot px-6 text-[17px] font-semibold text-brand-cream shadow-md hover:bg-brand-merlot/90 md:w-auto md:px-7",
                "focus-ring",
              )}
              {...analyticsAttributes(analyticsEvents.phoneClick, `${analyticsLocation}_hero_call`)}
            >
              <Phone className="h-[18px] w-[18px] shrink-0" aria-hidden="true" focusable="false" />
              Call {PRACTICE_PHONE_DISPLAY}
            </a>
            <LinkButton
              href={APPOINTMENT_REQUEST_URL}
              variant="brand-outline"
              className="h-12 w-full bg-white text-base font-semibold md:h-[52px] md:w-auto md:px-6"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation={`${analyticsLocation}_hero_request`}
            >
              Request an Appointment
            </LinkButton>
            <RatingBadge className="mt-1.5 self-start md:mt-0 md:self-center" />
          </div>

          <p className="mt-3 text-sm leading-5 text-brand-dark-text/80 md:mt-3">
            <span>
              {PRACTICE_HOURS_SHORT} · {PRACTICE_ADDRESS_LINE}
            </span>
            <span className="hidden md:inline"> · Serving patients across Sonoma County</span>
          </p>
        </div>
      </div>
    </div>
  )
}
