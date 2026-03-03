import fs from "node:fs"
import path from "node:path"

const DATA_PATH = path.join(process.cwd(), "components/reviews/google-review-data.ts")
const source = fs.readFileSync(DATA_PATH, "utf8")

const summaryMatch = source.match(/export const googleReviewSummary = \{([\s\S]*?)\n\}/)
if (!summaryMatch) {
  throw new Error("Could not find googleReviewSummary block.")
}

const summaryBlock = summaryMatch[1]
const summary = {
  rating: Number((summaryBlock.match(/rating:\s*([0-9.]+)/) ?? [])[1]),
  totalReviews: Number((summaryBlock.match(/totalReviews:\s*(\d+)/) ?? [])[1]),
  fiveStarCount: Number((summaryBlock.match(/fiveStarCount:\s*(\d+)/) ?? [])[1]),
}

const reviewMatches = [
  ...source.matchAll(
    /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*rating:\s*(\d+),\s*source:\s*"([^"]+)",\s*quote:\s*"([\s\S]*?)",\s*\},/g
  ),
]

const reviews = reviewMatches.map((match) => ({
  id: Number(match[1]),
  name: match[2],
  rating: Number(match[3]),
  source: match[4],
  quote: match[5],
}))

const isRatingOnly = (quote) => quote === "Rating only (no written review)."
const textReviews = reviews.filter((review) => !isRatingOnly(review.quote))
const ratingOnlyReviews = reviews.filter((review) => isRatingOnly(review.quote))

const ids = reviews.map((review) => review.id)
const maxId = Math.max(...ids)
const missingIds = []
for (let i = 1; i <= maxId; i++) {
  if (!ids.includes(i)) missingIds.push(i)
}

const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))]
const normalizedName = (name) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")

const nameSeen = new Map()
const duplicateNames = []
for (const review of reviews) {
  const normalized = normalizedName(review.name)
  if (nameSeen.has(normalized) && nameSeen.get(normalized) !== review.name) {
    duplicateNames.push({ first: nameSeen.get(normalized), second: review.name })
  } else {
    nameSeen.set(normalized, review.name)
  }
}

const countMentions = (regex) => textReviews.filter((review) => regex.test(review.quote.toLowerCase())).length
const themeCounts = {
  painFree: countMentions(/\b(no pain|painless|pain[- ]?free|felt no pain|minimal discomfort)\b/),
  comfort: countMentions(/\b(comfortable|at ease|calm|reassuring|gentle)\b/),
  communication: countMentions(/\b(explain|explained|walked me through|questions|informative|detailed)\b/),
  staff: countMentions(/\b(staff|team|receptionist|assistant|front office)\b/),
  emergencyAccess: countMentions(/\b(emergency|same day|fit me in|squeezed me in|short notice|within 3 hours|next day)\b/),
  followUpCall: countMentions(/\b(called|follow up|check on me|check up on me)\b/),
  cleanliness: countMentions(/\b(clean|sterile|sanitized|uv)\b/),
}

const staffNames = ["erin", "gwen", "judy", "connie", "kelly", "ruby", "tom", "katie", "suzanne"]
const staffNameMentions = Object.fromEntries(
  staffNames.map((name) => [
    name,
    textReviews.filter((review) => review.quote.toLowerCase().includes(name)).length,
  ])
)

const stopWords = new Set([
  "about",
  "again",
  "after",
  "also",
  "always",
  "amazing",
  "another",
  "because",
  "before",
  "being",
  "could",
  "dentist",
  "dr",
  "experience",
  "friendly",
  "great",
  "highly",
  "into",
  "more",
  "office",
  "pain",
  "patient",
  "patients",
  "practice",
  "procedure",
  "professional",
  "recommend",
  "root",
  "staff",
  "team",
  "that",
  "their",
  "them",
  "they",
  "this",
  "very",
  "with",
  "would",
])

const tokenCounts = new Map()
for (const review of textReviews) {
  const tokens = review.quote
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 4 && !stopWords.has(token))
  for (const token of tokens) {
    tokenCounts.set(token, (tokenCounts.get(token) ?? 0) + 1)
  }
}
const topTokens = [...tokenCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([token, count]) => ({ token, count }))

const lowerCaseOnlyNames = reviews
  .map((review) => review.name)
  .filter((name) => /[a-z]/.test(name) && !/[A-Z]/.test(name))

const report = {
  summary,
  dataset: {
    rows: reviews.length,
    textReviews: textReviews.length,
    ratingOnlyReviews: ratingOnlyReviews.length,
    ratingOnlyPercent: Number(((ratingOnlyReviews.length / reviews.length) * 100).toFixed(1)),
  },
  integrity: {
    duplicateIds,
    missingIds,
    duplicateNames,
    allRatingsAreFiveStar: reviews.every((review) => review.rating === 5),
    uniqueSources: [...new Set(reviews.map((review) => review.source))],
  },
  themes: themeCounts,
  staffNameMentions,
  lexicalSignals: topTokens,
  normalizationWatchList: {
    lowercaseOnlyDisplayNames: lowerCaseOnlyNames,
  },
}

console.log(JSON.stringify(report, null, 2))
