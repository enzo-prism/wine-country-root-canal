import { formatReviewerName } from "@/lib/review-themes"

export type ServicePageReview = {
  /** Neutral React key. Never a name slug. */
  id: string
  /** First name + last initial only. Do not store a full surname here. */
  sourceName: string
  /** Review text exactly as imported. */
  quote: string
  rating: number
  /**
   * Public Google review date (month + year). Leave empty until the GBP row
   * is confirmed — do not invent a date.
   */
  date: string
}

/**
 * Reviews shown on the shared procedure-page template.
 * Swap names, quotes, and dates here only — the cards read this module.
 */
export const servicePageReviews: ServicePageReview[] = [
  {
    id: "review-1",
    sourceName: "Gail F.",
    quote:
      'Dr. Anderson and everyone in his office were wonderful. A caring, painless, and fast experience. He called to check on me. What used to be something to dread was "easy peasey."',
    rating: 5,
    date: "",
  },
  {
    id: "review-2",
    sourceName: "Ann T.",
    quote:
      "Its hard to give a 5 star review for a root canal but Dr. Anderson and his staff were great. Very organized and professional and no pain during the procedure. Good follow up and willing to answer any and all questions.",
    rating: 5,
    date: "",
  },
  {
    id: "review-3",
    sourceName: "Charlotte O.",
    quote:
      "I was very impressed by the level of care. The staff were kind, friendly and fit me right in when I needed a root canal. They walked me through the process and were quick and courteous. They then also called that evening to make sure I was doing well. I highly recommend Anderson DDS.",
    rating: 5,
    date: "",
  },
]

export function servicePageReviewerName(review: ServicePageReview): string {
  return formatReviewerName(review.sourceName)
}

export function servicePageReviewerInitial(review: ServicePageReview): string {
  const name = servicePageReviewerName(review)
  return name.charAt(0) || "?"
}

export function servicePageReviewByline(review: ServicePageReview): string {
  return review.date ? `Google · ${review.date}` : "Google"
}
