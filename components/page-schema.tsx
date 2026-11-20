import { buildWebPageSchema } from "@/lib/schema"

/**
 * The page's single WebPage-family JSON-LD node (see lib/schema.ts). Render it once on
 * every indexable route; `tests/e2e/seo-aeo.spec.ts` checks each sitemap URL has exactly one.
 */
export function PageSchema({ path }: { path: string }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebPageSchema(path)) }} />
  )
}
