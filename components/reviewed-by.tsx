import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface MedicalReviewBylineProps {
  /** Short reviewed/updated date shown to patients and search engines, e.g. "July 2026". */
  date?: string
  /** Optional one-line summary of what the reviewer confirmed. */
  summary?: string
  className?: string
}

/**
 * E-E-A-T byline for clinical (YMYL) pages. States that a licensed endodontist
 * reviewed the page and links to Dr. Anderson's credentials on the About page.
 * Isomorphic (safe in both server and client component trees).
 */
export function MedicalReviewByline({ date, summary, className }: MedicalReviewBylineProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl items-start gap-3 rounded-sm border-l-4 border-brand-rose-beige bg-white px-4 py-3 text-left shadow-sm",
        className,
      )}
    >
      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-merlot" aria-hidden="true" />
      <p className="text-sm text-brand-dark-text/80">
        <span className="font-semibold text-brand-dark-text">Medically reviewed by </span>
        <Link href="/about" className="font-semibold text-brand-merlot hover:underline">
          Dr. Craig Wm. Anderson, DDS
        </Link>
        <span className="text-brand-dark-text/70"> — endodontic specialist</span>
        {date ? <span className="text-brand-dark-text/60">{` · Updated ${date}`}</span> : null}
        {summary ? <span className="mt-1 block text-brand-dark-text/70">{summary}</span> : null}
      </p>
    </div>
  )
}
