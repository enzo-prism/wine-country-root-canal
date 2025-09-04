import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Wine Country Root Canal Santa Rosa",
  description:
    "Contact Wine Country Root Canal in Santa Rosa, CA. Call (707) 523-3636 or book online. Located at 4655 Hoen Ave Ste 2, Santa Rosa, CA 95405.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
