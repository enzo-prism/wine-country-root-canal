import Link from "next/link"
import { ChevronDown, ListOrdered } from "lucide-react"

import { cn } from "@/lib/utils"

export type OnThisPageItem = {
  /** id of the target heading/section on the page (without "#"). */
  id: string
  label: string
}

interface OnThisPageProps {
  items: OnThisPageItem[]
  className?: string
}

/**
 * "On this page" jump links for long articles. Server-rendered, no JS required:
 * - below lg, the list sits inside a native <details> disclosure (collapsed by default);
 * - at lg and up, the same links are shown as an always-visible wrapped list.
 *
 * Targets should carry `scroll-mt-24` (or larger) so the sticky h-20 navbar never
 * covers the heading after a jump.
 */
export function OnThisPage({ items, className }: OnThisPageProps) {
  if (items.length === 0) return null

  const links = (
    <ol className="grid gap-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-2 lg:gap-y-2">
      {items.map((item, index) => (
        <li key={item.id}>
          <Link
            href={`#${item.id}`}
            className="flex min-h-11 items-center gap-2 rounded-sm px-2 py-2 text-brand-merlot underline-offset-4 hover:bg-brand-cream hover:underline lg:border lg:border-brand-rose-beige/30 lg:bg-white lg:px-3 lg:no-underline lg:hover:border-brand-merlot/50 lg:hover:underline"
          >
            <span className="text-sm font-semibold tabular-nums text-brand-rose-beige" aria-hidden="true">
              {index + 1}.
            </span>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ol>
  )

  return (
    <nav aria-label="On this page" className={cn("mx-auto max-w-4xl", className)}>
      <details className="group rounded-sm border border-brand-rose-beige/30 bg-brand-cream/60 lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-3 font-semibold text-brand-dark-text [&::-webkit-details-marker]:hidden">
          <ListOrdered className="h-5 w-5 shrink-0 text-brand-merlot" aria-hidden="true" />
          On this page
          <ChevronDown
            className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-brand-rose-beige/20 px-2 pb-3 pt-2">{links}</div>
      </details>

      <div className="hidden rounded-sm border border-brand-rose-beige/30 bg-brand-cream/60 p-4 lg:block">
        <p className="mb-3 flex items-center gap-2 font-semibold text-brand-dark-text">
          <ListOrdered className="h-5 w-5 shrink-0 text-brand-merlot" aria-hidden="true" />
          On this page
        </p>
        {links}
      </div>
    </nav>
  )
}
