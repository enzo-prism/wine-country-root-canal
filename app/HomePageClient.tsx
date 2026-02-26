"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { FadeInSection } from "@/components/fade-in-section"
import { Card } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  BriefcaseMedical,
  ShieldCheck,
  AlertTriangle,
  Printer,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { LinkButton } from "@/components/ui/link-button"
import { GoogleReviewHighlights } from "@/components/reviews/google-review-highlights"
import { googleReviewSummary, topFiveStarReviews } from "@/components/reviews/google-review-data"

export default function HomePageClient() {
  const vimeoVideoId = "1095456147"

  const services = [
    {
      title: "Endodontic Procedures",
      icon: <BriefcaseMedical size={28} />,
      href: "/endodontic-procedures",
    },
    {
      title: "Apicoectomy",
      icon: <ShieldCheck size={28} />,
      href: "/endodontic-procedures/apicoectomy",
    },
    {
      title: "Root Canal Retreatment",
      icon: <HeartHandshake size={28} />,
      href: "/endodontic-procedures/retreatment",
    },
    {
      title: "Dental Emergencies",
      icon: <AlertTriangle size={28} />,
      href: "/dental-emergencies",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-dark-text">
      <div className="relative z-50">
        <Navbar />
      </div>
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative h-screen w-full flex items-center overflow-hidden -mt-16">
          {/* Video Background Container - This div fills the section */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&loop=1&muted=1&background=1&autopause=0&controls=0&title=0&byline=0&portrait=0`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Wine Country Vineyards Background Video - Rolling Hills"
              className="absolute top-1/2 left-1/2 pointer-events-none opacity-60"
              style={{
                width: "100vw",
                height: "56.25vw", // 16:9 aspect ratio based on width
                minHeight: "100vh", // Ensure minimum height coverage
                minWidth: "177.78vh", // 16:9 aspect ratio based on height (100vh * 16/9)
                maxWidth: "none", // Allow scaling beyond container
                maxHeight: "none", // Allow scaling beyond container
                transform: "translate(-50%, -50%) scale(1.02)", // Slight scale up to ensure no gaps
              }}
            ></iframe>
          </div>

          {/* Overlay for text contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-cream/90 via-brand-cream/60 to-brand-cream/20" />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 md:px-6 w-full pt-20">
            <div className="max-w-xs sm:max-w-md lg:max-w-lg bg-brand-cream/95 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-sm shadow-xl animate-fade-in">
              <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-rose-beige mb-2 sm:mb-3">
                Wine Country Root Canal
              </h2>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-merlot leading-tight mb-4 sm:mb-6">
                Restoring Beautiful Smiles.
              </h1>
              <p className="text-base sm:text-lg text-brand-dark-text/80 mb-6 sm:mb-8 leading-relaxed">
                Expert endodontic care with a gentle touch in the heart of Santa Rosa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkButton
                  href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                  variant="brand-primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Consultation
                </LinkButton>
                <LinkButton href="/about" variant="brand-outline" size="lg" className="w-full sm:w-auto">
                  Meet Dr. Anderson
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-20 lg:py-32 bg-brand-cream">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <GoogleReviewHighlights
              title="Top 25 Five-Star Google Reviews"
              subtitle="We are proud of the way our patients describe their experience with our compassionate care."
              reviews={topFiveStarReviews}
              averageRating={googleReviewSummary.rating}
              totalReviews={googleReviewSummary.totalReviews}
              compact
              showAllHref="/testimonials"
              showAllLabel="Read all 25 reviews"
            />
          </FadeInSection>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 md:py-20 lg:py-32">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="lg:pr-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-brand-merlot">
                  Compassionate Care, Clinical Excellence.
                </h2>
                <div className="text-lg space-y-6 text-brand-dark-text/80">
                  <p>
                    At Wine Country Root Canal, our goal is to provide incomparable quality in a compassionate
                    environment. Because our practice is dedicated solely to endodontic care, we are efficient and
                    precise, offering flexibility for emergency cases to eliminate pain as quickly as possible.
                  </p>
                  <p>
                    Dr. Craig Anderson has been practicing dentistry since 1997. We strive to bring you the finest care
                    using the latest technologies and techniques. It is our privilege to serve the communities of Sonoma
                    County, and we are here to provide answers to all your questions about endodontic treatment.
                  </p>
                </div>
              </div>
              <div className="rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/images/office-entrance.jpg"
                  alt="Entrance to Wine Country Root Canal office building"
                  width={600}
                  height={700}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-20 lg:py-32 bg-white">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-merlot mb-4">
                Specialized Endodontic Services
              </h2>
              <p className="text-lg text-brand-dark-text/80">
                We utilize advanced technology and specialized techniques to save your natural teeth and ensure your
                comfort.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group text-center p-4 rounded-sm transition-all duration-200 hover:bg-brand-cream hover:shadow-lg"
                >
                  <div className="flex justify-center items-center mb-4 mx-auto h-16 w-16 rounded-full bg-brand-cream group-hover:bg-white transition-colors duration-200">
                    <span className="text-brand-merlot">{service.icon}</span>
                  </div>
                  <h3 className="font-serif text-xl text-brand-dark-text group-hover:text-brand-merlot transition-colors duration-200">
                    {service.title}
                  </h3>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 lg:py-32 bg-white">
          <FadeInSection className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-merlot mb-4">
                Schedule Your Appointment
              </h2>
              <p className="text-lg text-brand-dark-text/80 mb-8">
                Ready to schedule your appointment? Contact us today or book online for convenient scheduling.
              </p>

              {/* Primary CTA */}
              <div className="mb-12 md:mb-16">
                <LinkButton
                  href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                  variant="brand-primary"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Appointment Online
                </LinkButton>
                <p className="mt-4 text-brand-dark-text/70">Or contact us directly using the information below</p>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Details */}
              <Card className="bg-brand-cream p-6 rounded-sm border-none shadow-lg">
                <h3 className="font-serif text-xl text-brand-merlot mb-4">Contact Details</h3>
                <div className="space-y-4 text-brand-dark-text/90">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-brand-rose-beige shrink-0" />
                    <span>
                      4655 Hoen Ave Ste 2<br />
                      Santa Rosa, CA 95405
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-brand-rose-beige shrink-0" />
                    <a href="tel:+17075233636" className="hover:underline">
                      (707) 523-3636
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-brand-rose-beige shrink-0" />
                    <a href="mailto:winecountryrootcanal@gmail.com" className="hover:underline">
                      winecountryrootcanal@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Printer className="w-5 h-5 mr-3 text-brand-rose-beige shrink-0" />
                    <span>(707) 523-3693</span>
                  </div>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="bg-brand-cream p-6 rounded-sm border-none shadow-lg">
                <h3 className="font-serif text-xl text-brand-merlot mb-4">Office Hours</h3>
                <ul className="space-y-2 text-brand-dark-text/90">
                  <li className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span className="font-medium">8 AM - 5 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span className="font-medium text-brand-dark-text/60">Closed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="font-medium text-brand-dark-text/60">Closed</span>
                  </li>
                </ul>
              </Card>

              {/* Get In Touch */}
              <Card className="bg-brand-cream p-6 rounded-sm border-none shadow-lg">
                <h3 className="font-serif text-xl text-brand-merlot mb-4">Get In Touch</h3>
                <div className="space-y-4 text-brand-dark-text/90">
                  <p className="text-sm">
                    <strong>New Patients:</strong>
                    <br />
                    Call us to schedule your consultation
                  </p>
                  <p className="text-sm">
                    <strong>Dental Emergencies:</strong>
                    <br />
                    We make every effort to see emergency cases as soon as possible
                  </p>
                  <p className="text-sm">
                    <strong>Questions:</strong>
                    <br />
                    Email us or call during business hours
                  </p>
                </div>
              </Card>
            </div>
          </FadeInSection>
        </section>
      </main>
      <Footer />
    </div>
  )
}
