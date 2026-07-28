import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { FadeInSection } from "@/components/fade-in-section"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Accessibility Statement | Wine Country Root Canal",
  description:
    "Learn about Wine Country Root Canal’s website accessibility efforts and how to request help or information in another format.",
  path: "/accessibility",
})

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <PageShell
        title="Accessibility Statement"
        description="Our goal is to make our website and services usable by everyone."
      >
        <FadeInSection className="container mx-auto px-4 md:px-6">
          <div className="prose prose-lg max-w-4xl mx-auto text-brand-dark-text">
            <p className="text-sm text-brand-dark-text/80">Last reviewed: July 28, 2026</p>

            <h2 className="font-serif text-2xl text-brand-merlot mt-8 mb-3">Our Commitment</h2>
            <p>
              Wine Country Root Canal is working to provide an accessible website experience for patients, referring
              dentists, and visitors with disabilities. We use the Web Content Accessibility Guidelines (WCAG) 2.2,
              Level AA, as our technical goal.
            </p>
            <p>
              Accessibility is an ongoing process. This statement describes our goal and current efforts; it is not a
              claim that every page or third-party service already meets every WCAG success criterion.
            </p>

            <h2 className="font-serif text-2xl text-brand-merlot mt-8 mb-3">Accessibility Features</h2>
            <ul>
              <li>Keyboard-accessible navigation and visible focus indicators</li>
              <li>Semantic headings, landmarks, labels, and text alternatives for meaningful images</li>
              <li>Layouts designed to reflow when text is enlarged or viewed on a small screen</li>
              <li>Support for reduced-motion preferences</li>
              <li>Phone and email alternatives for online scheduling and patient forms</li>
            </ul>

            <h2 className="font-serif text-2xl text-brand-merlot mt-8 mb-3">Known Limitations</h2>
            <p>
              Some videos do not yet have a published word-for-word transcript. We provide related written guides and
              can provide information in another accessible format upon request. Services operated by third parties,
              including scheduling, patient forms, maps, and video players, may have accessibility limitations outside
              our direct control. We will help you complete the same task another way.
            </p>

            <h2 id="request-help" className="font-serif text-2xl text-brand-merlot mt-8 mb-3 scroll-mt-28">
              Request Help or an Accommodation
            </h2>
            <p>
              If you have difficulty using this website, need information in another format, or want to report an
              accessibility problem, please contact our office:
            </p>
            <ul>
              <li>
                Phone:{" "}
                <a href="tel:+17075233636" className="font-medium text-brand-merlot underline underline-offset-4">
                  (707) 523-3636
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:winecountryrootcanal@gmail.com"
                  className="font-medium text-brand-merlot underline underline-offset-4"
                >
                  winecountryrootcanal@gmail.com
                </a>
              </li>
            </ul>
            <p>
              Please describe the page, feature, or information you were trying to use and the format or assistance
              that would work for you. Do not send private medical information by email. We will work with you promptly
              to provide access or a reasonable alternative.
            </p>

            <h2 className="font-serif text-2xl text-brand-merlot mt-8 mb-3">Ongoing Improvement</h2>
            <p>
              We review the website as content and services change, and we welcome feedback that helps us improve. For
              information about how this website handles personal information, read our{" "}
              <Link href="/privacy" className="font-medium text-brand-merlot underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </FadeInSection>
      </PageShell>
      <Footer />
    </>
  )
}
