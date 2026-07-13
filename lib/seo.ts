import type { Metadata } from "next"

export const SITE_URL = "https://www.winecountryrootcanal.com"
export const SITE_NAME = "Wine Country Root Canal"
export const DEFAULT_OG_IMAGE = "/images/wine-country-vineyard.jpg"

/**
 * Build an absolute URL for a site-relative path.
 * `/` (or empty) resolves to the bare site origin.
 */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

type BuildMetadataInput = {
  /** Full <title> text, including the " | Wine Country Root Canal" suffix where desired. */
  title: string
  description: string
  /** Site-relative path, e.g. "/resources/root-canal-cost". Used for canonical + og:url. */
  path: string
  /** Optional shorter title for social cards; defaults to `title`. */
  ogTitle?: string
  /** Optional social-specific description; defaults to `description`. */
  ogDescription?: string
  /** Site-relative or absolute OG/Twitter image; defaults to the brand vineyard image. */
  image?: string
  imageAlt?: string
  /** When true, emits robots noindex/nofollow (use for thank-you / utility pages). */
  noindex?: boolean
}

/**
 * Central metadata builder so every page emits a complete, self-consistent set of
 * canonical + OpenGraph + Twitter tags. Next.js shallow-merges the `metadata` export,
 * so pages that hand-roll a partial `openGraph` silently drop og:image and inherit the
 * homepage og:url/title. Routing all pages through this helper prevents that class of bug.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const socialTitle = ogTitle ?? title
  const socialDescription = ogDescription ?? description

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url,
      title: socialTitle,
      description: socialDescription,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
