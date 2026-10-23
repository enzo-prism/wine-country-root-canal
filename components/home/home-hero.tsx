import Link from "next/link"
import { getImageProps } from "next/image"
import { ArrowRight, BadgeCheck, GraduationCap, Phone, ScanLine, Star } from "lucide-react"
import { LinkButton } from "@/components/ui/link-button"
import { googleReviewSummary } from "@/components/reviews/google-review-data"
import { analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

/**
 * Dr. Anderson's professional headshot (3024x4032 source on Cloudinary, same asset as /about).
 * Desktop shows the full portrait cropped to 4:5; small screens get a Cloudinary face crop so a
 * recognizable face fits in a compact circle without pushing the CTAs below the first screen.
 */
const HEADSHOT_PORTRAIT_URL =
  "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1772122565/Dr.%20Anderson/dr-anderson-headshot.webp"
const HEADSHOT_FACE_URL =
  "https://res.cloudinary.com/dhqpqfw6w/image/upload/c_thumb,g_face,z_0.7,w_400,h_400/v1772122565/Dr.%20Anderson/dr-anderson-headshot.webp"
const HEADSHOT_ALT = "Dr. Craig Wm. Anderson, DDS, endodontist at Wine Country Root Canal"

function HeroHeadshot() {
  // Art direction: each <picture> carries both sources, so at any viewport only the matching file
  // downloads. The hero renders this in two layout slots (mobile circle, desktop frame); both
  // resolve to the same URL at a given width, so the browser fetches it once. getImageProps cannot
  // emit a <link rel="preload">, so the image is marked eager + fetchPriority="high" instead; the
  // <img> is in the server HTML, so the preload scanner still discovers it immediately.
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    alt: HEADSHOT_ALT,
    src: HEADSHOT_PORTRAIT_URL,
    width: 440,
    height: 587,
  })
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    alt: HEADSHOT_ALT,
    src: HEADSHOT_FACE_URL,
    width: 96,
    height: 96,
    loading: "eager",
    fetchPriority: "high",
  })

  return (
    <picture className="block h-full w-full">
      <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 1023.98px)" srcSet={mobileSrcSet} />
      <img
        {...imgProps}
        alt={HEADSHOT_ALT}
        className="h-full w-full object-cover object-center lg:object-[50%_18%]"
      />
    </picture>
  )
}

export function HomeHero() {
  const proofPoints = [
    {
      icon: <Star aria-hidden="true" className="h-4 w-4 fill-brand-merlot" />,
      label: `${googleReviewSummary.rating.toFixed(1)} from ${googleReviewSummary.totalReviews} Google reviews`,
    },
    {
      icon: <BadgeCheck aria-hidden="true" className="h-4 w-4" />,
      label: "Endodontics-only since 2005",
    },
    {
      icon: <ScanLine aria-hidden="true" className="h-4 w-4" />,
      label: "On-site 3D CBCT imaging",
    },
    {
      icon: <GraduationCap aria-hidden="true" className="h-4 w-4" />,
      label: "USC-trained endodontist",
    },
  ]

  return (
    <section id="home" aria-labelledby="home-hero-heading" className="relative overflow-x-clip bg-brand-cream">
      <div className="container mx-auto grid items-center gap-8 px-4 pb-12 pt-6 sm:pt-10 md:px-6 lg:grid-cols-[11fr_9fr] lg:gap-16 lg:pb-20 lg:pt-14 xl:gap-24">
        <div className="min-w-0">
          {/* Small screens: compact portrait byline so the doctor has a face in the first screen. */}
          <div className="mb-5 flex items-center gap-4 lg:mb-7">
            <div className="size-[72px] shrink-0 overflow-hidden rounded-full bg-brand-rose-beige/20 ring-2 ring-white shadow-md sm:size-20 lg:hidden">
              <HeroHeadshot />
            </div>
            <p className="text-sm leading-snug text-brand-dark-text/80 sm:text-base">
              <span className="block font-semibold text-brand-dark-text">Dr. Craig Wm. Anderson, DDS</span>
              Endodontist · Santa Rosa, CA
            </p>
          </div>

          <h1
            id="home-hero-heading"
            className="text-balance font-serif text-4xl font-bold leading-[1.1] text-brand-merlot md:text-5xl xl:text-[3.25rem]"
          >
            Santa Rosa Endodontist &amp; Root Canal Specialist
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-dark-text/80 sm:mt-6 sm:text-lg">
            Microscope-guided root canal care focused on one goal: saving your natural tooth whenever that is possible.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton
              href={APPOINTMENT_REQUEST_URL}
              variant="brand-primary"
              size="lg"
              className="w-full text-base sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
              analyticsEvent={analyticsEvents.bookAppointmentClick}
              analyticsLocation="homepage_hero"
            >
              Request an Appointment
            </LinkButton>
            <LinkButton
              href={PRACTICE_PHONE_HREF}
              variant="brand-outline"
              size="lg"
              className="w-full px-6 text-base sm:w-auto"
              icon={<Phone />}
              analyticsEvent={analyticsEvents.phoneClick}
              analyticsLocation="homepage_hero"
            >
              Call {PRACTICE_PHONE_DISPLAY}
            </LinkButton>
            <Link
              href="/about"
              className="group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-sm px-2 font-semibold text-brand-merlot underline-offset-4 hover:underline focus-ring sm:justify-start"
            >
              Meet Dr. Anderson
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
          </div>

          <ul
            aria-label="Why patients choose Wine Country Root Canal"
            className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-brand-merlot/15 pt-5 text-sm text-brand-dark-text/85 min-[400px]:grid-cols-2 sm:text-[0.95rem] lg:mt-10"
          >
            {proofPoints.map((point) => (
              <li key={point.label} className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center text-brand-merlot">{point.icon}</span>
                {point.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Large screens: full 4:5 portrait. */}
        <figure className="relative mx-auto hidden w-full max-w-[440px] lg:block">
          {/* The offset frame wraps the portrait only, so it never crosses the caption. */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border border-brand-merlot/25"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-brand-rose-beige/20 shadow-xl">
              <HeroHeadshot />
            </div>
          </div>
          <figcaption className="mt-8 text-sm text-brand-dark-text/75">
            Dental degree and endodontic certificate, University of Southern California
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
