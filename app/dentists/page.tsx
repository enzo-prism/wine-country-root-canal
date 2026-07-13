import DentistsPageClient from "../DentistsPageClient"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Endodontic Referrals for Dentists | Wine Country Root Canal",
  description:
    "Refer patients to Wine Country Root Canal for expert root canal therapy, retreatment, and apicoectomy with CBCT imaging and timely communication in Santa Rosa, CA.",
  path: "/dentists",
})

export default function DentistsPage() {
  return <DentistsPageClient />
}
