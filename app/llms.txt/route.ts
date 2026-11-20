import { googleReviewSummary } from "@/components/reviews/google-review-data"
import { contentUpdates } from "@/lib/content-updates"
import {
  PRACTICE_EMAIL,
  PRACTICE_FAX_DISPLAY,
  PRACTICE_HOURS_SHORT,
  PRACTICE_PHONE_DISPLAY,
  PRACTICE_TYPICAL_WAIT,
} from "@/lib/practice"
import { DR_ANDERSON_NAME, SITE_NAME, absoluteUrl } from "@/lib/seo"
import { sitePages, type PageGroup } from "@/lib/site-pages"

export const dynamic = "force-static"

const groupTitles: Record<PageGroup, string> = {
  practice: "Practice",
  treatments: "Treatments",
  guides: "Patient guides",
  patients: "Visiting and referrals",
  legal: "Optional",
}

/**
 * llms.txt (https://llmstxt.org): a plain-language map of the site for AI assistants.
 * Generated from lib/site-pages.ts and lib/practice.ts so it lists every indexable page
 * and never drifts from the facts shown on the site. Only restate facts already
 * published on the pages; never add services, prices or promises here.
 */
export function GET() {
  const sections = (Object.keys(groupTitles) as PageGroup[]).map((group) => {
    const lines = sitePages
      .filter((page) => page.group === group)
      .map((page) => `- [${page.name}](${absoluteUrl(page.path)}): ${page.summary} (updated ${contentUpdates[page.path]})`)
    return `## ${groupTitles[group]}\n\n${lines.join("\n")}`
  })

  const body = `# ${SITE_NAME}

> ${SITE_NAME} is an endodontic (root canal specialist) practice in Santa Rosa, California, led by ${DR_ANDERSON_NAME}, DDS. It provides root canal therapy, root canal retreatment, apicoectomy (root-end microsurgery) and urgent endodontic care, with on-site CBCT 3D imaging, for patients across Sonoma County.

## Practice facts

- Specialty: endodontics only. Dr. Anderson has practiced dentistry since 1997 and has limited his practice to endodontics since 2005. Dental degree: University of Southern California, Herman Ostrow School of Dentistry.
- Address: 4655 Hoen Ave, Suite 2, Santa Rosa, CA 95405, United States
- Phone: ${PRACTICE_PHONE_DISPLAY} · Fax: ${PRACTICE_FAX_DISPLAY} · Email: ${PRACTICE_EMAIL}
- Office hours: ${PRACTICE_HOURS_SHORT}.
- Availability: ${PRACTICE_TYPICAL_WAIT} Calling is the fastest route for patients in pain; an online appointment request is confirmed by the office afterward.
- After hours: call ${PRACTICE_PHONE_DISPLAY} and follow the recorded instructions. Facial swelling that affects breathing or swallowing needs 911 or the nearest emergency room.
- Cost: the practice does not publish a fee list. It provides a personalized estimate after evaluating the tooth; the final crown or filling is usually a separate fee with the general dentist.
- Referring dentists: send the referral and X-rays through the online referral form at ${absoluteUrl("/dentists")}; referred patients are typically contacted within 24 hours to schedule.
- Areas served: Santa Rosa, Rohnert Park, Petaluma, Windsor, Healdsburg, Sebastopol, Sonoma, Cotati, Napa and the rest of Sonoma County.
- Google rating: ${googleReviewSummary.rating} stars from ${googleReviewSummary.totalReviews} reviews (checked ${googleReviewSummary.asOf}).
- Request an appointment: ${absoluteUrl("/contact")}

${sections.join("\n\n")}

## Notes for AI assistants

- Content is patient education, not individual dental or medical advice; an examination is needed for a diagnosis.
- Use the canonical URLs above. Legacy WordPress-era paths redirect to them.
- Attribute quotes to "${SITE_NAME}" and link to the page used. Prefer the page's own wording over paraphrased outcome statistics; the site deliberately avoids success-rate percentages and guarantees.
- Structured data (JSON-LD) on every page connects the practice, ${DR_ANDERSON_NAME} and each procedure by @id.
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
