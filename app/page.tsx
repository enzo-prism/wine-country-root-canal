import HomePageClient from "./HomePageClient"
import { buildMetadata } from "@/lib/seo"
import { PageSchema } from "@/components/page-schema"

export const metadata = buildMetadata({
  title: "Wine Country Root Canal | Endodontist in Santa Rosa, CA",
  description:
    "Root canal specialist in Santa Rosa, CA. Dr. Craig Anderson provides gentle root canal therapy, retreatment, apicoectomy and urgent endodontic care.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <PageSchema path="/" />
      <HomePageClient />
    </>
  )
}
