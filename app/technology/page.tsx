import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Microscope, ScanSearch, Wind, RadioTower } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"

export const metadata: Metadata = {
  title: "Endodontic Technology in Santa Rosa, CA | Wine Country Root Canal",
  description:
    "See the CBCT scanner, surgical microscope, digital X‑rays, and air purification systems we use to deliver precise, comfortable endodontic care in Santa Rosa, CA.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/technology",
  },
  openGraph: {
    title: "Endodontic Technology in Santa Rosa, CA",
    description:
      "CBCT imaging, surgical microscopes, and digital X‑rays for precise endodontic care.",
    url: "https://www.winecountryrootcanal.com/technology",
  },
}

export default function TechnologyPage() {
  const technologies = [
    {
      name: "CBCT Scanner",
      icon: <ScanSearch className="w-8 h-8" />,
      benefit:
        "Provides detailed 3D images for precise diagnosis and treatment planning, enhancing patient safety and outcomes.",
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
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.name} className="bg-white shadow-lg flex flex-col">
                <CardHeader className="flex-row items-center space-x-4 pb-4">
                  <div className="p-3 rounded-full bg-brand-cream text-brand-merlot">{tech.icon}</div>
                  <CardTitle className="font-serif text-2xl text-brand-merlot">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-brand-dark-text/80">{tech.benefit}</p>
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
