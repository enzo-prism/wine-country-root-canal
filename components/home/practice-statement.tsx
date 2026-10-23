import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { googleReviewSummary } from "@/components/reviews/google-review-data"

/**
 * Merlot statement band: breaks the cream-card rhythm, introduces the practice, and gives the
 * vineyard photo a quiet supporting role (low-opacity texture, lazy-loaded, never the LCP).
 */
export function PracticeStatement() {
  const stats = [
    { value: "1997", label: "Practicing dentistry since" },
    { value: "2005", label: "Endodontics-only since" },
    {
      value: googleReviewSummary.rating.toFixed(1),
      label: `Google rating from ${googleReviewSummary.totalReviews} reviews`,
    },
  ]

  return (
    <section
      id="about"
      aria-labelledby="practice-statement-heading"
      className="relative isolate overflow-hidden bg-brand-merlot py-16 text-brand-cream md:py-20 lg:py-28"
    >
      <Image
        src="/images/wine-country-vineyard.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        loading="lazy"
        className="-z-10 object-cover opacity-10 mix-blend-luminosity"
      />
      <FadeInSection className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div>
            <h2
              id="practice-statement-heading"
              className="max-w-[20ch] font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
            >
              One specialty, practiced with care.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-brand-cream/90">
              <p>
                Because our practice is dedicated solely to endodontic care, we can be efficient and precise, and we
                keep flexibility for emergency cases so pain can be relieved as quickly as possible.
              </p>
              <p>
                Dr. Craig Anderson works with operating microscopes and, when a case calls for more detail, on-site
                3D CBCT imaging. It is our privilege to serve the communities of Sonoma County.
              </p>
            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-6 border-t border-brand-cream/25 pt-8 min-[420px]:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-brand-cream/80">{stat.label}</dt>
                  <dd className="font-serif text-4xl font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-8">
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-brand-cream underline underline-offset-4 hover:text-white focus-ring-on-merlot"
              >
                About Dr. Anderson
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/technology"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm font-semibold text-brand-cream underline underline-offset-4 hover:text-white focus-ring-on-merlot"
              >
                Our technology
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Source photo is only 400x282; the frame is capped at that width so it is never upscaled. */}
          <figure className="mx-auto w-full max-w-[400px]">
            <div className="overflow-hidden rounded-sm bg-brand-cream p-2 shadow-2xl">
              <Image
                src="/images/office-entrance.jpg"
                alt="Entrance to the Wine Country Root Canal office building"
                width={400}
                height={282}
                sizes="(max-width: 440px) calc(100vw - 48px), 384px"
                className="h-auto w-full rounded-[2px]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-brand-cream/80">
              Our office at 4655 Hoen Ave, Suite 2, Santa Rosa
            </figcaption>
          </figure>
        </div>
      </FadeInSection>
    </section>
  )
}
