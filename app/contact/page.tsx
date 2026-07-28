import { buildMetadata } from "@/lib/seo"
import ContactPageClient from "./ContactPageClient"

export const metadata = buildMetadata({
  title: "Contact Wine Country Root Canal | Santa Rosa, CA",
  description:
    "Call (707) 523‑3636 or request an appointment online. Find our Santa Rosa, CA office location, hours, and referral information.",
  path: "/contact",
  ogTitle: "Contact Wine Country Root Canal | Santa Rosa, CA",
  ogDescription: "Call, request an appointment, or get directions to our Santa Rosa endodontics office.",
})

export default function ContactPage() {
  return <ContactPageClient />
}
