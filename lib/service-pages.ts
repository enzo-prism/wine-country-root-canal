/**
 * Procedure / service pages that share the service-page template.
 * The sticky mobile Call bar is scoped to these paths.
 */

/** Playfair 28/34 on phones; sticky header is 80px so 7rem keeps heading top >= 96px. */
export const SERVICE_H2_CLASS = "font-serif text-[1.75rem] leading-[34px] text-brand-merlot sm:text-3xl"

/** Extra offset so a hash jump clears the 80px sticky header with room to spare. */
export const SERVICE_HEADING_SCROLL_MT = "scroll-mt-28"
export const SERVICE_PAGE_PATHS = [
  "/endodontic-procedures/root-canal-therapy",
  "/endodontic-procedures/retreatment",
  "/endodontic-procedures/apicoectomy",
  "/endodontic-procedures/signs-symptoms",
] as const

export type ServicePagePath = (typeof SERVICE_PAGE_PATHS)[number]

export function isServicePagePath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return (SERVICE_PAGE_PATHS as readonly string[]).includes(pathname)
}

/** IntersectionObserver target on the hero Call button. */
export const SERVICE_HERO_CALL_ID = "service-hero-call"

export const MOBILE_STICKY_CALL_BAR_TEST_ID = "mobile-sticky-call-bar"

/** Reserved merlot space after the footer so the fixed bar never covers legal links. */
export const MOBILE_STICKY_CALL_BAR_SPACER_TEST_ID = "mobile-sticky-call-bar-spacer"
