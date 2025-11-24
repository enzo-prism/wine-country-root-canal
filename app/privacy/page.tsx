import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Service | Wine Country Root Canal",
  description:
    "Read Wine Country Root Canal's privacy policy and terms of service. Learn how we protect your personal information and data.",
  alternates: {
    canonical: "https://www.winecountryrootcanal.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Terms of Service | Wine Country Root Canal",
    description: "Read Wine Country Root Canal's privacy policy and terms of service.",
    url: "https://www.winecountryrootcanal.com/privacy",
  },
}

export default function PrivacyPolicyPage() {
  // Placeholder content - replace with actual policies
  const sections = [
    {
      title: "Introduction",
      content:
        "Welcome to Wine Country Root Canal's Privacy Policy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.",
    },
    {
      title: "Information We Collect",
      content:
        "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our services, when you participate in activities on the Website or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.",
    },
    {
      title: "Will Your Information Be Shared With Anyone?",
      content:
        "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.",
    },
    {
      title: "Cookies and Other Tracking Technologies",
      content:
        "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy (if applicable).",
    },
    {
      title: "How Long Do We Keep Your Information?",
      content:
        "We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).",
    },
    {
      title: "How Do We Keep Your Information Safe?",
      content:
        "We aim to protect your personal information through a system of organizational and technical security measures.",
    },
    {
      title: "Your Privacy Rights",
      content:
        "In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.",
    },
    {
      title: "Updates to This Policy",
      content:
        "We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.",
    },
    {
      title: "Contact Us About This Policy",
      content:
        "If you have questions or comments about this policy, you may email us at [Your Email Address] or by post to: [Your Physical Address].",
    },
    {
      title: "Terms of Service",
      content:
        "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trade mark law. (This is a very basic placeholder - a full Terms of Service is more extensive).",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Privacy Policy & Terms of Service"
        description="Understanding how we protect your information and the terms of using our website."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-4xl mx-auto text-brand-dark-text/90">
            <p className="text-sm text-brand-dark-text/70">Last updated: {new Date().toLocaleDateString()}</p>
            {sections.map((section) => (
              <div key={section.title} className="mb-8">
                <h2 className="font-serif text-2xl text-brand-merlot mt-8 mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
