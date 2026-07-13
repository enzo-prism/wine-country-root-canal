import HomePageClient from "./HomePageClient"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Wine Country Root Canal | Endodontist in Santa Rosa, CA",
  description:
    "Wine Country Root Canal provides gentle root canal therapy, retreatment, apicoectomy, and emergency endodontic care in Santa Rosa, CA. Led by Dr. Craig Wm. Anderson.",
  path: "/",
})

export default function HomePage() {
  return <HomePageClient />
}
