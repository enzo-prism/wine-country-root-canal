/**
 * Procedure / service pages that share the service-page template.
 * The sticky mobile Call bar and the hidden header Call button are scoped to these paths.
 */
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
