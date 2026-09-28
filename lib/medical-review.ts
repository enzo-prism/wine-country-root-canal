import { DR_ANDERSON_ID, DR_ANDERSON_NAME, absoluteUrl } from "@/lib/seo"

export type MedicalReview = {
  /** Patient-facing date shown in the byline, e.g. "July 2026". */
  label: string
  /** ISO 8601 date (year-month precision allowed) for `lastReviewed` in JSON-LD. */
  isoDate: string
}

/**
 * Single source of truth for clinical-review dates, keyed by site-relative path.
 *
 * Only list a page here after Dr. Anderson has actually reviewed its current
 * content. When a page's clinical content changes materially, either record a new
 * review date (after a real review) or remove the entry — do not leave a stale
 * attribution in place. See ops/clinical-content-playbook.md.
 */
export const medicalReviews = {
  "/technology": { label: "July 2026", isoDate: "2026-07" },
  "/endodontic-procedures/apicoectomy": { label: "July 2026", isoDate: "2026-07" },
  "/endodontic-procedures/retreatment": { label: "July 2026", isoDate: "2026-07" },
  "/resources/what-is-an-endodontist": { label: "July 2026", isoDate: "2026-07" },
  "/resources/root-canal-cost": { label: "July 2026", isoDate: "2026-07" },
  "/resources/root-canal-vs-extraction": { label: "July 2026", isoDate: "2026-07" },
  "/resources/dental-injuries": { label: "July 2026", isoDate: "2026-07" },
  "/resources/after-your-root-canal": { label: "July 2026", isoDate: "2026-07" },
  "/resources/cracked-tooth": { label: "July 2026", isoDate: "2026-07" },
} as const satisfies Record<string, MedicalReview>

export type MedicallyReviewedPath = keyof typeof medicalReviews

export function getMedicalReview(path: MedicallyReviewedPath): MedicalReview {
  return medicalReviews[path]
}

/** MedicalWebPage JSON-LD linking the page to Dr. Anderson's Person entity on /about. */
export function buildMedicalWebPageSchema(path: MedicallyReviewedPath) {
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    reviewedBy: { "@type": "Person", "@id": DR_ANDERSON_ID, name: DR_ANDERSON_NAME },
    lastReviewed: medicalReviews[path].isoDate,
  }
}
