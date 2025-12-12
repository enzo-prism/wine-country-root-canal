import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Wine Country Root Canal | Santa Rosa, CA",
  description:
    "Call (707) 523‑3636 or request an appointment online. Find our Santa Rosa, CA office location, hours, and referral information.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
