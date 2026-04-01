import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Microscope, ScanSearch, Wind, RadioTower } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"

export const metadata: Metadata = {
  title: "Endodontic Technology in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "Explore the endodontic technology we use in Santa Rosa, CA, including CBCT imaging, surgical microscopes, digital X-rays, and clean-air systems.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/technology",
  },
  openGraph: {
    title: "Endodontic Technology in Santa Rosa, CA",
    description:
      "A broad look at the tools we use for endodontic diagnosis, treatment planning, and patient comfort.",
    url: "https://www.winecountryrootcanal.com/technology",
  },
}

export default function TechnologyPage() {
  const technologies = [
    {
      name: "CBCT Scanner",
      icon: <ScanSearch className="w-8 h-8" />,
      benefit:
        "Provides three-dimensional imaging when added detail may improve diagnosis or treatment planning in selected endodontic cases.",
      href: "/cbct-scanner-santa-rosa",
      linkLabel: "Learn when CBCT may be recommended",
    },
    {
      name: "Surgical Operating Microscope",
      icon: <Microscope className="w-8 h-8" />,
      benefit:
        "Magnifies treatment areas, allowing for highly accurate procedures and preservation of tooth structure.",
    },
    {
      name: "Digital X-rays",
      icon: <RadioTower className="w-8 h-8" />,
      benefit:
        "Offers instant images with significantly less radiation exposure compared to traditional X-rays, improving diagnostic speed.",
    },
    {
      name: "Advanced Air Purification",
      icon: <Wind className="w-8 h-8" />,
      benefit:
        "Ensures a clean and safe environment by removing airborne particles and pathogens, prioritizing patient health.",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Advanced Endodontic Technology"
        description="Investing in the latest technology for superior patient care and treatment success."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-base sm:text-lg text-brand-dark-text/80">
              This page is a broad overview of the tools we use throughout the practice. If you are specifically
              looking for information about our on-site CBCT scanner and when 3D imaging may be helpful, visit our{" "}
              <Link
                href="/cbct-scanner-santa-rosa"
                className="text-brand-merlot hover:text-brand-rose-beige underline"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "technology_intro")}
              >
                CBCT and 3D dental imaging page.
              </Link>
            </p>
            <div className="mt-6">
              <a
                href="/cbct-scanner-santa-rosa"
                className="inline-flex items-center gap-2 rounded-md border border-brand-merlot px-5 py-3 text-sm font-semibold text-brand-merlot transition-colors hover:bg-brand-merlot hover:text-brand-cream"
                {...analyticsAttributes(analyticsEvents.cbctContentClick, "technology_primary_cta")}
              >
                Visit the CBCT Scanner and 3D Imaging Page
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-white shadow-lg flex flex-col">
                <CardHeader className="flex-row items-center space-x-4 pb-4">
                  <div className="p-3 rounded-full bg-brand-cream text-brand-merlot">{tech.icon}</div>
                  <CardTitle className="font-serif text-2xl text-brand-merlot">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-brand-dark-text/80">{tech.benefit}</p>
                  {"href" in tech && tech.href && tech.linkLabel ? (
                    <Link
                      href={tech.href}
                      className="inline-block mt-4 text-brand-merlot hover:text-brand-rose-beige underline font-medium"
                      {...analyticsAttributes(analyticsEvents.cbctContentClick, "technology_card_cbct")}
                    >
                      {tech.linkLabel}
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
