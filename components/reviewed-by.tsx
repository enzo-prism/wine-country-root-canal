import Link from "next/link"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  buildMedicalWebPageSchema,
  getMedicalReview,
  type MedicallyReviewedPath,
} from "@/lib/medical-review"
import { DR_ANDERSON_NAME } from "@/lib/seo"

interface MedicalReviewBylineProps {
  /**
   * Site-relative path of the page. Looks up the review date in
   * `lib/medical-review.ts` and emits matching MedicalWebPage JSON-LD.
   * Preferred over `date`.
   */
  path?: MedicallyReviewedPath
  /**
   * @deprecated Pass `path` so the date comes from `lib/medical-review.ts`.
   * Kept so existing callers keep rendering unchanged; ignored when `path` is set.
   */
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
export function MedicalReviewByline({ path, date, summary, className }: MedicalReviewBylineProps) {
  const displayDate = path ? getMedicalReview(path).label : date

  return (
    <>
      <div
        className={cn(
          "mx-auto flex max-w-4xl items-start gap-3 rounded-sm border-l-4 border-brand-rose-beige bg-white px-4 py-3 text-left shadow-sm",
          className,
        )}
      >
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-merlot" aria-hidden="true" />
        <p className="text-sm text-brand-dark-text/80">
          <span className="font-semibold text-brand-dark-text">Medically reviewed by </span>
          <Link href="/about" className="font-semibold text-brand-merlot hover:underline">
            {DR_ANDERSON_NAME}, DDS
          </Link>
          <span className="text-brand-dark-text/80"> — endodontic specialist</span>
          {displayDate ? <span className="text-brand-dark-text/80">{` · Updated ${displayDate}`}</span> : null}
          {summary ? <span className="mt-1 block text-brand-dark-text/80">{summary}</span> : null}
        </p>
      </div>
      {/* After the visible byline so parent `space-y-*` spacing is unchanged. */}
      {path ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMedicalWebPageSchema(path)) }}
        />
      ) : null}
    </>
  )
}
