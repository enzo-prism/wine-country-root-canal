import type { Metadata } from "next"
import DentistsPageClient from "../DentistsPageClient"

export const metadata: Metadata = {
  title: "Endodontic Referrals for Dentists | Wine Country Root Canal",
  description:
    "Refer patients to Wine Country Root Canal for expert root canal therapy, retreatment, and apicoectomy with CBCT imaging and timely communication in Santa Rosa, CA.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/dentists",
  },
}

export default function DentistsPage() {
  return <DentistsPageClient />
}
