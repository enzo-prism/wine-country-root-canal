"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { ReviewCard } from "@/components/reviews/review-card"
import type { DisplayReview, ReviewThemeId, ThemeCount } from "@/lib/review-themes"
import { cn } from "@/lib/utils"

/** Cards shown once scripts run; kept small so the default phone view stays short. */
const INITIAL_COUNT = 12
const REVEAL_STEP = 24

type Filter = ReviewThemeId | "all"

interface ReviewExplorerProps {
  /** Minimal review fields only — this array is serialized into the page payload. */
  reviews: DisplayReview[]
  themes: ThemeCount[]
}

const chipClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold motion-safe:transition-colors focus-ring"

/**
 * Topic chips + masonry list with progressive "show more". Every review is server-rendered so
 * the full list is readable without JavaScript (and by crawlers); after hydration the list is
 * trimmed to INITIAL_COUNT. The chips and "show more" button are hidden by the page's
 * <noscript> rule when scripts are unavailable.
 */
export function ReviewExplorer({ reviews, themes }: ReviewExplorerProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  // False for the server render and the matching first client render, so all reviews ship in HTML.
  const [hydrated, setHydrated] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const filtered = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((review) => review.themes.includes(filter))),
    [filter, reviews],
  )
  const visible = hydrated ? filtered.slice(0, visibleCount) : filtered
  const remaining = filtered.length - visible.length
  const activeLabel = filter === "all" ? null : themes.find((theme) => theme.id === filter)?.label

  // After "show more", move focus to the first newly revealed review so keyboard and
  // screen-reader users continue where they left off.
  useEffect(() => {
    if (focusIndex === null) return
    const target = listRef.current?.children.item(focusIndex)
    if (target instanceof HTMLElement) target.focus()
    setFocusIndex(null)
  }, [focusIndex])

  function selectFilter(next: Filter) {
    setFilter(next)
    setVisibleCount(INITIAL_COUNT)
  }

  function showMore() {
    setFocusIndex(visible.length)
    setVisibleCount((count) => count + REVEAL_STEP)
  }

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All reviews", count: reviews.length },
    ...themes,
  ]

  return (
    <div>
      <div
        role="group"
        aria-label="Filter reviews by topic"
        className="reviews-js-only flex flex-wrap gap-2 md:gap-3"
      >
        {chips.map((chip) => {
          const pressed = filter === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => selectFilter(pressed && chip.id !== "all" ? "all" : chip.id)}
              className={cn(
                chipClass,
                pressed
                  ? "border-brand-merlot bg-brand-merlot text-white"
                  : "border-brand-rose-beige/40 bg-white text-brand-merlot hover:border-brand-merlot",
              )}
            >
              {chip.label}
              <span className={cn("text-xs font-normal", pressed ? "text-white/90" : "text-brand-dark-text/80")}>
                {chip.count}
              </span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-brand-dark-text/80">
        Showing {visible.length} of {filtered.length} written reviews
        {activeLabel ? ` about “${activeLabel.toLowerCase()}”` : ""}
      </p>

      <div ref={listRef} className="mt-8 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
        {visible.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            collapseLong
            // Programmatically focusable (not in tab order) for the "show more" focus hand-off.
            tabIndex={-1}
          />
        ))}
      </div>

      {remaining > 0 && (
        <div className="reviews-js-only mt-4">
          <button
            type="button"
            onClick={showMore}
            className="inline-flex min-h-11 items-center rounded-md border border-brand-merlot bg-white px-6 text-base font-semibold text-brand-merlot hover:bg-brand-cream focus-ring motion-safe:transition-colors"
          >
            Show {Math.min(REVEAL_STEP, remaining)} more reviews
            <span className="sr-only">&nbsp;({remaining} not yet shown)</span>
          </button>
        </div>
      )}
    </div>
  )
}
