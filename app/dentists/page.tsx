import type { Metadata } from "next"
import DentistsPageClient from "../DentistsPageClient"

export const metadata: Metadata = {
  title: "For Dentists | Wine Country Root Canal | Endodontic Referrals Santa Rosa",
  description:
    "Partner with Wine Country Root Canal for seamless endodontic referrals. Advanced CBCT imaging, surgical microscopes, and 24-hour patient contact. Submit referrals online.",
}

export default function DentistsPage() {
  return <DentistsPageClient />
}
