import Link from "next/link"
import { contentUpdates } from "@/lib/content-updates"
import { absoluteUrl, DR_ANDERSON_ID, SITE_NAME } from "@/lib/seo"

/** Editorial attribution only. Never implies a new clinician review has occurred. */
export function PatientEducationNote({ path }: { path: string }) {
  const dateModified = contentUpdates[path]
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    publisher: { "@id": `${absoluteUrl("/")}/#localbusiness` },
    about: { "@id": DR_ANDERSON_ID },
    ...(dateModified ? { dateModified } : {}),
  }

  return (
    <div className="mx-auto max-w-4xl border-l-4 border-brand-rose-beige bg-white px-4 py-3 text-sm text-brand-dark-text/80">
      <p>
        Patient education from {SITE_NAME}.{" "}
        <Link href="/about" className="font-semibold text-brand-merlot underline underline-offset-4">
          Meet Dr. Craig Anderson, DDS, endodontist
        </Link>
        . This guide supports a conversation with your dentist; an examination is needed for individual advice.
      </p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  )
}
