import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SERVICE_H2_CLASS } from "@/lib/service-pages"
import { cn } from "@/lib/utils"

export type QuickAnswer = {
  question: string
  answer: React.ReactNode
  /** Where the full answer lives: an in-page anchor ("#faq") or a site path. */
  href: string
  linkLabel: string
}

interface QuickAnswersProps {
  items: QuickAnswer[]
  title?: string
  id?: string
  className?: string
}

/**
 * Compact "Quick answers" box for the questions anxious patients ask first.
 * Every answer must be a short restatement of copy that already exists on the page
 * (or site) and link to where the full answer lives — never a new claim.
 */
export function QuickAnswers({ items, title = "Quick Answers", id = "quick-answers", className }: QuickAnswersProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "mx-auto max-w-4xl scroll-mt-28 rounded-sm border-l-4 border-brand-merlot bg-white p-7 shadow-lg sm:p-8",
        className,
      )}
    >
      <h2 id={headingId} className={cn("mb-6", SERVICE_H2_CLASS)}>
        {title}
      </h2>
      <dl className="grid gap-x-8 gap-y-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-semibold text-brand-dark-text">{item.question}</dt>
            <dd className="mt-1 text-brand-dark-text/80">
              <p>{item.answer}</p>
              <Link
                href={item.href}
                className="mt-1 inline-flex items-center gap-1 py-3 -my-3 text-sm font-semibold leading-5 text-brand-merlot underline underline-offset-4 hover:text-brand-dark-text"
              >
                {item.linkLabel}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
