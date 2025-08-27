"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Printer, Facebook, Linkedin, Star, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-merlot text-brand-cream font-sans">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 items-start">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-bold">Wine Country Root Canal</span>
            </Link>
            <p className="text-sm opacity-90">Craig Wm. Anderson, DDS</p>
            <p className="text-sm opacity-90 mt-1">Restoring Beautiful Smiles.</p>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <address className="not-italic text-sm space-y-3 opacity-90">
              <p className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
                <span>
                  4655 Hoen Ave Ste 2<br />
                  Santa Rosa, CA 95405
                </span>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-3 shrink-0" />
                <a href="tel:+17075233636" className="hover:underline">
                  (707) 523-3636
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3 shrink-0" />
                <a href="mailto:winecountryrootcanal@gmail.com" className="hover:underline break-all">
                  winecountryrootcanal@gmail.com
                </a>
              </p>
              <p className="flex items-center">
                <Printer className="w-5 h-5 mr-3 shrink-0" />
                <span>(707) 523-3693</span>
              </p>
            </address>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/company/wine-country-root-canal/about/"
                className="flex items-center hover:underline opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 mr-3 shrink-0" />
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/people/Wine-Country-Root-Canal/100063648248331/"
                className="flex items-center hover:underline opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 mr-3 shrink-0" />
                Facebook
              </a>
              <a
                href="https://www.yelp.com/biz/wine-country-root-canal-santa-rosa-2"
                className="flex items-center hover:underline opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="w-5 h-5 mr-3 shrink-0" />
                Yelp Reviews
              </a>
              <a
                href="https://www.google.com/maps/place/Wine+Country+Root+Canal+-+Santa+Rosa,+CA/@38.4421472,-122.6648852,16z/data=!3m1!4b1!4m6!3m5!1s0x80c2bbf24adbb6d3:0xacacdb7ad524041d!8m2!3d38.4421472!4d-122.6648852!16s%2Fg%2F1vhlyg27?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D"
                className="flex items-center hover:underline opacity-90 hover:opacity-100 transition-opacity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 mr-3 shrink-0" />
                Google Maps
              </a>
            </div>
          </div>

          {/* Patient Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/root-canal-therapy" className="hover:underline opacity-90">
                  Root Canal Therapy
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:underline opacity-90">
                  Our Technology
                </Link>
              </li>
              <li>
                <Link href="/forms" className="hover:underline opacity-90">
                  Patient Forms
                </Link>
              </li>
              <li>
                <a
                  href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                  className="hover:underline opacity-90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Our Practice</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline opacity-90">
                  About Dr. Anderson
                </Link>
              </li>
              <li>
                <Link href="/dentists" className="hover:underline opacity-90">
                  For Referring Dentists
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline opacity-90">
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-cream/30 pt-8 text-center text-xs opacity-80">
          <p>&copy; {new Date().getFullYear()} Wine Country Root Canal. All Rights Reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy & Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
