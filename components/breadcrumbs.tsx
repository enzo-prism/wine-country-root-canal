import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { absoluteUrl } from "@/lib/seo"

export type Crumb = { name: string; href: string }

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * Pass the full path including the current page as the last item.
 *
 * Preferred usage: pass `breadcrumbs` to <PageShell> so the trail renders above the
 * H1 on the same left edge. Standalone usage still works inside page bodies.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  if (items.length === 0) return null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-brand-dark-text/80">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-x-1">
                {index > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-brand-dark-text/40" aria-hidden="true" />}
                {isLast ? (
                  <span className="text-brand-dark-text/80" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 items-center rounded-sm text-brand-merlot underline underline-offset-2 hover:no-underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      {/* JSON-LD after the nav so `space-y-*` parents don't push the visible trail down. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
