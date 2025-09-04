import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = {
  title: "Wine Country Root Canal | Santa Rosa Endodontist | Dr. Craig Anderson",
  description:
    "Expert endodontic care in Santa Rosa, CA. Dr. Craig Anderson provides gentle root canal therapy, retreatment, and apicoectomy procedures. Emergency appointments available.",
}

export default function HomePage() {
  return <HomePageClient />
}
