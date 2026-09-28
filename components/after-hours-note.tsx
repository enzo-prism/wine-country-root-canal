import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { cn } from "@/lib/utils"

interface AfterHoursNoteProps {
  /** Flat analytics location for the phone link, e.g. "contact_page_hours". */
  analyticsLocation: string
  className?: string
  /** Hide the link to /dental-emergencies (use on that page itself). */
  hideEmergencyLink?: boolean
}

/**
 * Short after-hours guidance shown wherever office hours are listed.
 * Copy only restates existing practice policy: outside Mon–Thu 8 AM–5 PM, call the
 * main number and follow the recorded instructions.
 */
export function AfterHoursNote({ analyticsLocation, className, hideEmergencyLink = false }: AfterHoursNoteProps) {
  return (
    <div
      className={cn(
        "rounded-sm border-l-4 border-brand-merlot bg-white p-4 text-left text-sm leading-relaxed text-brand-dark-text",
        className,
      )}
    >
      <p className="flex items-start gap-2 font-semibold text-brand-merlot">
        <AlertTriangle aria-hidden="true" focusable="false" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Outside office hours (before 8 AM or after 5 PM Monday–Thursday, or Friday–Sunday)</span>
      </p>
      <p className="mt-2">
        Call{" "}
        <a
          href={PRACTICE_PHONE_HREF}
          className="font-semibold text-brand-merlot underline underline-offset-2"
          {...analyticsAttributes(analyticsEvents.phoneClick, analyticsLocation)}
        >
          {PRACTICE_PHONE_DISPLAY}
        </a>{" "}
        and follow the recorded instructions.
      </p>
      <p className="mt-2">
        If facial swelling is affecting your breathing or swallowing, call 911 or go to the nearest emergency room.
      </p>
      {!hideEmergencyLink && (
        <p className="mt-2">
          <Link href="/dental-emergencies" className="font-semibold text-brand-merlot underline underline-offset-2">
            What to do in a dental emergency
          </Link>
        </p>
      )}
    </div>
  )
}
