import type { MetadataRoute } from "next"
import { contentUpdates } from "@/lib/content-updates"
import { SMS_TERMS_PATH, isSmsTermsEnabled } from "@/lib/sms-program"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.winecountryrootcanal.com"

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/endodontic-procedures`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/endodontic-procedures/root-canal-therapy`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/endodontic-procedures/signs-symptoms`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/endodontic-procedures/retreatment`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/endodontic-procedures/apicoectomy`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Legacy short URLs are redirected to canonical /endodontic-procedures/* routes,
    // so they are intentionally omitted from the sitemap.
    {
      url: `${baseUrl}/dental-emergencies`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technology`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cbct-scanner-santa-rosa`,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/resources`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/what-is-an-endodontist`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/root-canal-cost`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/root-canal-vs-extraction`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/root-canal-safety`,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/resources/cracked-tooth`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/after-your-root-canal`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/resources/dental-injuries`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dentists`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/your-visit`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/forms`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonials`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    // Staged SMS terms (lib/sms-program.ts): listed only once the flag is on.
    ...(isSmsTermsEnabled()
      ? [{ url: `${baseUrl}${SMS_TERMS_PATH}`, changeFrequency: "yearly" as const, priority: 0.3 }]
      : []),
  ]
  return pages.map((page) => {
    const updated = contentUpdates[new URL(page.url).pathname]
    return updated ? { ...page, lastModified: updated } : page
  })
}
