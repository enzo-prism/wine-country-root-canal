import type { Metadata } from "next"

import { NotFoundView } from "@/components/not-found-view"

// Next.js serves this with a 404 status and adds noindex automatically.
export const metadata: Metadata = {
  title: "Page Not Found | Wine Country Root Canal",
  // Don't inherit the homepage canonical from the root layout.
  alternates: { canonical: null },
}

export default function NotFound() {
  return <NotFoundView />
}
