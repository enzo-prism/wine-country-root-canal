import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Wine Country Root Canal | Endodontist in Santa Rosa, CA",
  description:
    "Wine Country Root Canal provides gentle root canal therapy, retreatment, apicoectomy, and emergency endodontic care in Santa Rosa, CA. Led by Dr. Craig Wm. Anderson.",
}

export default function HomePage() {
  return <HomePageClient />
}
