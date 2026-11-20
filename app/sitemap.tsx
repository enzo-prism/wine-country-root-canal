import type { MetadataRoute } from "next"
import { contentUpdates } from "@/lib/content-updates"
import { absoluteUrl } from "@/lib/seo"
import { sitePages } from "@/lib/site-pages"

// Legacy short URLs redirect to canonical routes, so they are intentionally absent.
// Every page and its edit date come from lib/site-pages.ts + lib/content-updates.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: contentUpdates[page.path],
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
