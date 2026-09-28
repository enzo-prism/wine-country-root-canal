import type { GoogleReview } from "@/components/reviews/google-review-data"

/**
 * Display helpers for the imported Google reviews.
 *
 * Aggregate numbers (rating, total review count) always come from `googleReviewSummary`
 * — those are Google's totals. The helpers here only decide which written reviews are
 * worth showing as cards and which topic chips they belong to. Theme tagging is plain
 * keyword matching run on the server at render time; it never edits review text.
 */

export type ReviewThemeId = "nervous" | "pain-free" | "seen-quickly" | "follow-up" | "complex-cases" | "staff"

export interface ReviewTheme {
  id: ReviewThemeId
  label: string
  pattern: RegExp
  /** Unambiguous phrasing used to pick pull quotes for this theme. */
  strong?: RegExp
}

/**
 * Patterns were tuned against the imported reviews so each chip only collects reviews that
 * genuinely talk about the topic (e.g. "next day" alone is excluded from "Seen quickly"
 * because most uses describe a follow-up call, and "comfortable" is left out of "Nervous"
 * because it mostly describes the procedure itself).
 */
export const REVIEW_THEMES: readonly ReviewTheme[] = [
  {
    id: "nervous",
    label: "Nervous or first root canal",
    pattern:
      /\b(anxi\w*|nervous|scared|fears?|afraid|terrified|dread\w*|first root canal|at ease|calmed me|help(?:ed)? (?:me|my son) relax|relaxed|reassur\w*|not thrilled|hate going to the dentist)\b/i,
    strong: /\b(anxi\w*|nervous|scared|terrified|fears?|dread\w*|first root canal|hate going to the dentist)\b/i,
  },
  {
    id: "pain-free",
    label: "Little or no pain",
    pattern: /\b(pain[- ]?free|painless|no pain|minimal discomfort|less painful than|didn'?t hurt)\b/i,
    strong: /\b(pain[- ]?free|painless|no pain)\b/i,
  },
  {
    id: "seen-quickly",
    label: "Seen quickly",
    pattern:
      /\b(same[- ]day|within (?:one|a|1) day|within \d+ hours|very next day|emergency|squeezed me in|fit me (?:right )?in|got me in|took me in|short notice|last minute|on the spot)\b/i,
    strong: /\b(same[- ]day|within (?:one|a|1) day|within \d+ hours|squeezed me in|fit me (?:right )?in|got me in|short notice)\b/i,
  },
  {
    id: "follow-up",
    label: "Follow-up care",
    pattern:
      /\b(followed (?:it )?up|and follow[- ]?up|good follow[- ]?up|follow[- ]?up the next|calls? back to follow[- ]?up|called (?:me )?(?:hours|later|that|after|the next)|call(?:ed)? to check|call me in the evening|call you after|phoned the next day|personal call|check(?:ed)? on me)\b/i,
  },
  {
    id: "complex-cases",
    label: "Complex cases & retreatment",
    pattern:
      /\b(failed root canals?|redo\w*|re-?treat\w*|done incorrectly|by another dentist|previous dentists|partially done|challenging|complex|complicated|atypical)\b/i,
  },
  {
    id: "staff",
    label: "Friendly staff",
    pattern: /\b(staff|front desk|front office|receptionist|assistant|dental nurse|team)\b/i,
  },
]

/** Minimal, serializable shape handed to the client-side review explorer. */
export interface DisplayReview {
  id: number
  name: string
  text: string
  rating: number
  themes: ReviewThemeId[]
}

export interface ThemeCount {
  id: ReviewThemeId
  label: string
  count: number
}

const RATING_ONLY_PATTERN = /^rating only/i
/** One-liners such as "Awesome care would highly recommend." read as filler on a card. */
export const MIN_DISPLAY_LENGTH = 40

export function isRatingOnlyReview(review: GoogleReview) {
  return RATING_ONLY_PATTERN.test(review.quote.trim())
}

export function isDisplayableReview(review: GoogleReview, minLength = MIN_DISPLAY_LENGTH) {
  return !isRatingOnlyReview(review) && review.quote.trim().length >= minLength
}

/**
 * Themes are only assigned to positive (4–5 star) reviews so a critical review is never
 * surfaced under a chip like "Follow-up care" or "Pain-free". Critical reviews still appear
 * in the unfiltered list.
 */
export function getReviewThemes(review: GoogleReview): ReviewThemeId[] {
  if (review.rating < 4) return []
  return REVIEW_THEMES.filter((theme) => theme.pattern.test(review.quote)).map((theme) => theme.id)
}

export function toDisplayReview(review: GoogleReview): DisplayReview {
  return {
    id: review.id,
    name: review.name,
    text: review.quote.trim(),
    rating: review.rating,
    themes: getReviewThemes(review),
  }
}

/** Written reviews worth showing as cards, in their original (imported) order. */
export function getDisplayReviews(reviews: GoogleReview[]): DisplayReview[] {
  return reviews.filter((review) => isDisplayableReview(review)).map(toDisplayReview)
}

export function getThemeCounts(reviews: DisplayReview[]): ThemeCount[] {
  return REVIEW_THEMES.map((theme) => ({
    id: theme.id,
    label: theme.label,
    count: reviews.filter((review) => review.themes.includes(theme.id)).length,
  })).filter((theme) => theme.count > 0)
}

export function getThemeLabel(id: ReviewThemeId) {
  return REVIEW_THEMES.find((theme) => theme.id === id)?.label ?? id
}

function inLengthRange(review: DisplayReview, min: number, max: number) {
  return review.text.length >= min && review.text.length <= max
}

/**
 * Curated placements (pull quotes, homepage/About cards) only use 5-star reviews that name
 * Dr. Anderson, so a highlighted quote always clearly refers to this practice's doctor.
 */
const NAMES_DR_ANDERSON = /\b(anderson|dr\.? craig)\b/i

function isCuratable(review: DisplayReview) {
  return review.rating === 5 && NAMES_DR_ANDERSON.test(review.text)
}

function strongMatches(review: DisplayReview, themes: readonly ReviewThemeId[]) {
  return REVIEW_THEMES.filter((theme) => themes.includes(theme.id) && theme.strong?.test(review.text)).length
}

/**
 * Deterministic score (no randomness, so server renders are stable): unambiguous theme
 * phrasing first, then breadth of themes, then closeness to a comfortable ~200-character read.
 */
function curationScore(review: DisplayReview, preferredThemes: readonly ReviewThemeId[]) {
  const lengthPenalty = Math.abs(review.text.length - 200) / 100
  return strongMatches(review, preferredThemes) * 10 + review.themes.length - lengthPenalty
}

function byScore(preferredThemes: readonly ReviewThemeId[]) {
  return (a: DisplayReview, b: DisplayReview) =>
    curationScore(b, preferredThemes) - curationScore(a, preferredThemes) || a.id - b.id
}

export interface FeaturedReview extends DisplayReview {
  theme: ReviewThemeId
}

const FEATURED_THEMES: readonly ReviewThemeId[] = ["nervous", "pain-free", "seen-quickly"]

/**
 * One pull quote per featured theme (nervous → little or no pain → seen quickly), each a
 * curatable review of pull-quote length, never repeating a reviewer.
 */
export function pickFeaturedReviews(
  reviews: DisplayReview[],
  themes: readonly ReviewThemeId[] = FEATURED_THEMES,
  { minLength = 100, maxLength = 260 } = {},
): FeaturedReview[] {
  const used = new Set<number>()
  const featured: FeaturedReview[] = []

  for (const theme of themes) {
    const [candidate] = reviews
      .filter(
        (review) =>
          isCuratable(review) &&
          !used.has(review.id) &&
          review.themes.includes(theme) &&
          inLengthRange(review, minLength, maxLength),
      )
      .sort(byScore([theme]))

    if (candidate) {
      used.add(candidate.id)
      featured.push({ ...candidate, theme })
    }
  }

  return featured
}

/**
 * Curated set for compact placements (homepage, About): substantive curatable reviews,
 * favoring ones that add a theme not yet represented so the set reads as varied.
 */
export function pickCompactReviews(
  reviews: GoogleReview[],
  count: number,
  { minLength = 120, maxLength = 320 } = {},
): DisplayReview[] {
  const displayable = getDisplayReviews(reviews)
  const pool = displayable
    .filter((review) => isCuratable(review) && inLengthRange(review, minLength, maxLength))
    .sort(byScore(FEATURED_THEMES))

  const picked: DisplayReview[] = []
  const coveredThemes = new Set<ReviewThemeId>()
  const add = (review: DisplayReview) => {
    picked.push(review)
    review.themes.forEach((theme) => coveredThemes.add(theme))
  }

  // First pass: each pick adds at least one theme not yet represented.
  for (const review of pool) {
    if (picked.length >= count) break
    if (review.themes.some((theme) => !coveredThemes.has(theme))) add(review)
  }

  // Then fill remaining slots by score, and finally from any displayable review.
  for (const review of [...pool, ...displayable]) {
    if (picked.length >= count) break
    if (!picked.some((pickedReview) => pickedReview.id === review.id)) add(review)
  }

  return picked
}

/** Abbreviations that end in a period but do not end a sentence. */
const ABBREVIATION_BEFORE_PERIOD = /\b(?:dr|mr|mrs|ms|st|ste|vs|etc)$/i

/**
 * Splits long reviews for a "Read full review" disclosure. Prefers a sentence boundary
 * (skipping abbreviations like "Dr.") so the visible excerpt reads naturally.
 */
export function splitReviewText(text: string, limit = 360): { lead: string; rest: string } {
  if (text.length <= limit + 80) return { lead: text, rest: "" }

  const window = text.slice(0, limit)
  let cut = -1
  for (const match of window.matchAll(/[.!?]+["')\]]?\s/g)) {
    const end = (match.index ?? 0) + match[0].trimEnd().length
    const before = window.slice(0, match.index ?? 0)
    if (match[0].startsWith(".") && ABBREVIATION_BEFORE_PERIOD.test(before)) continue
    if (end > limit * 0.4) cut = end
  }
  if (cut < 0) cut = window.lastIndexOf(" ")
  if (cut <= 0) cut = limit

  return { lead: text.slice(0, cut).trim(), rest: text.slice(cut).trim() }
}
