import Link from "next/link"
import { SITE_NAME } from "@/lib/seo"

/**
 * Editorial attribution only. Never implies a new clinician review has occurred.
 * The page's MedicalWebPage JSON-LD comes from <PageSchema> (lib/schema.ts).
 */
export function PatientEducationNote() {
  return (
    <div className="mx-auto max-w-4xl border-l-4 border-brand-rose-beige bg-white px-4 py-3 text-sm text-brand-dark-text/80">
      <p>
        Patient education from {SITE_NAME}.{" "}
        <Link href="/about" className="font-semibold text-brand-merlot underline underline-offset-4">
          Meet Dr. Craig Anderson, DDS, endodontist
        </Link>
        . This guide supports a conversation with your dentist; an examination is needed for individual advice.
      </p>
    </div>
  )
}
