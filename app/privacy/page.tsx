import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { buildMetadata } from "@/lib/seo"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "Privacy Policy & Terms | Wine Country Root Canal",
  description:
    "Read our privacy policy and terms of service for the Wine Country Root Canal website.",
  path: "/privacy",
  ogDescription: "Read our privacy policy and terms of service.",
})

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Introduction",
      content:
        "This policy explains how the Wine Country Root Canal website handles information when you browse the site, contact the practice, or follow a link to an appointment, referral, or patient form. Separate notices and consent forms may apply to information collected as part of dental care.",
    },
    {
      title: "Information We Collect",
      content:
        "We receive information you choose to provide when you call, email, or submit a linked form. The website may also collect limited technical and usage information, such as pages viewed, referral source, browser or device type, approximate location derived from an IP address, and interactions with buttons or links.",
    },
    {
      title: "Appointment, Referral, and Patient Forms",
      content:
        "Appointment requests open a Typeform form, referring-dentist submissions open a Jotform form, and patient forms may open a Henry Schein One service. Information entered into those services is sent directly to the selected provider and the practice under that provider's privacy and security terms. Review the notice shown on a form before submitting it, and call the office if you prefer to provide information another way.",
    },
    {
      title: "Analytics and Experience Tools",
      content:
        "The website uses Google Analytics, Hotjar, and Vercel Analytics to understand site traffic, page performance, and general interaction patterns. Our website event tracking is designed not to send patient names, email addresses, phone numbers, tooth numbers, symptoms, or form answers. These providers may use cookies or similar technologies according to their own privacy policies and settings.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use information to respond to questions, coordinate requested appointments or referrals, provide requested services, maintain and secure the website, understand which content is useful, improve the patient experience, and meet legal or operational obligations.",
    },
    {
      title: "Will Your Information Be Shared With Anyone?",
      content:
        "Information may be shared with service providers that support the website, forms, analytics, communications, and practice operations; when you ask us to share it; or when disclosure is required to provide services, protect rights or safety, or comply with law. Links to third-party services are governed by those services' own policies.",
    },
    {
      title: "Cookies and Other Tracking Technologies",
      content:
        "Analytics and experience providers may use cookies, pixels, local storage, or similar technologies. You can limit cookies through your browser settings and use available browser privacy controls. Blocking these technologies may affect some site features or the completeness of analytics.",
    },
    {
      title: "How Long Do We Keep Your Information?",
      content:
        "Information is retained for as long as reasonably needed for the purpose for which it was collected, practice operations, recordkeeping, security, dispute resolution, and applicable legal requirements. Third-party form and analytics providers maintain their own retention practices.",
    },
    {
      title: "How Do We Keep Your Information Safe?",
      content:
        "We use reasonable administrative and technical measures intended to protect information. No website, email, or internet transmission can be guaranteed completely secure. Do not use email for urgent care or information you would not want sent through ordinary email; call the office instead.",
    },
    {
      title: "Your Privacy Rights",
      content:
        "Depending on where you live and the type of information involved, you may have rights to request access, correction, deletion, restriction, or a copy of certain personal information. These rights can have exceptions. Contact the practice using the information below so your request can be reviewed and verified.",
    },
    {
      title: "Updates to This Policy",
      content:
        "We may update this privacy policy from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.",
    },
    {
      title: "Medical Information and Emergencies",
      content:
        "Website content is general education and is not a diagnosis, treatment plan, or substitute for an examination. Submitting an appointment request does not create a confirmed appointment. Call 911 for a life-threatening emergency and call the office for urgent dental guidance.",
    },
    {
      title: "Contact Us About This Policy",
      content:
        "If you have questions or comments about this policy, call us at (707) 523-3636, email winecountryrootcanal@gmail.com, or write to Wine Country Root Canal, 4655 Hoen Ave Ste 2, Santa Rosa, CA 95405.",
    },
    {
      title: "Terms of Service",
      content:
        "By using this website, you agree to use it only for lawful purposes and not to interfere with its operation or security. The content is general education, may change without notice, and does not create a dentist-patient relationship or guarantee a treatment result. External links are provided for convenience; Wine Country Root Canal does not control third-party content or policies. Website text, branding, and original materials may not be copied or republished without permission except as allowed by law.",
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
            <p className="text-sm text-brand-dark-text/80">Last updated: August 18, 2026</p>
            <p className="mt-4">
              For help using this website or to request information in another format, read our{" "}
              <Link href="/accessibility" className="font-medium text-brand-merlot underline underline-offset-4">
                accessibility statement
              </Link>
              .
            </p>
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
