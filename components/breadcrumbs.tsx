import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { absoluteUrl } from "@/lib/seo"
import { cn } from "@/lib/utils"

export type Crumb = { name: string; href: string }

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * Pass the full path including the current page as the last item.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className={cn("mx-auto max-w-4xl", className)}>
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
                  <Link href={item.href} className="text-brand-merlot hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
