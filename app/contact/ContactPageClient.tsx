"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Printer } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"

export default function ContactPageClient() {
  return (
    <>
      <Navbar />
      <PageShell
        title="Get In Touch"
        description="We're here to answer your questions and help you schedule an appointment."
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Book Appointment CTA */}
          <FadeInSection>
            <Card className="text-center py-8 px-6 mb-12 bg-brand-cream rounded-sm shadow-lg border-t-4 border-brand-merlot">
              <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-4">
                Ready to Schedule Your Appointment?
              </h2>
              <p className="text-lg text-brand-dark-text/80 mb-6 max-w-2xl mx-auto">
                Book your appointment online for convenient scheduling, or call us directly to speak with our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LinkButton
                  href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
                  variant="brand-primary"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                  analyticsEvent={analyticsEvents.bookAppointmentClick}
                  analyticsLocation="contact_page_cta"
                >
                  Book Appointment Online
                </LinkButton>
                <span className="text-brand-dark-text/60">or</span>
                <a
                  href="tel:+17075233636"
                  className="text-brand-merlot hover:underline text-lg font-semibold"
                  {...analyticsAttributes(analyticsEvents.phoneClick, "contact_page_cta")}
                >
                  Call (707) 523-3636
                </a>
              </div>
            </Card>
          </FadeInSection>

          <div className="space-y-12">
            <FadeInSection>
              <Card className="bg-white p-8 md:p-10 rounded-sm shadow-lg border-t-4 border-brand-rose-beige text-center">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-4">
                  Questions About CBCT or 3D Dental Imaging?
                </h2>
                <p className="text-lg text-brand-dark-text/80 mb-6 max-w-3xl mx-auto">
                  If you have been told you may need more detailed imaging for retreatment, a surgical consultation, or
                  a difficult diagnosis, learn how our on-site CBCT scanner may be used when indicated.
                </p>
                <LinkButton
                  href="/cbct-scanner-santa-rosa"
                  variant="brand-outline"
                  size="lg"
                  analyticsEvent={analyticsEvents.cbctContentClick}
                  analyticsLocation="contact_page_cbct"
                >
                  Explore CBCT and 3D Imaging
                </LinkButton>
              </Card>
            </FadeInSection>

            {/* Contact Information */}
            <FadeInSection>
              <Card className="bg-white p-8 md:p-10 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-6 text-center">
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Our Location</h3>
                        <p className="text-brand-dark-text/90">
                          Wine Country Root Canal
                          <br />
                          4655 Hoen Ave Ste 2<br />
                          Santa Rosa, CA 95405
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 mr-4 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Phone</h3>
                        <a
                          href="tel:+17075233636"
                          className="text-brand-dark-text/90 hover:underline text-lg"
                          {...analyticsAttributes(analyticsEvents.phoneClick, "contact_page_details")}
                        >
                          (707) 523-3636
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 mr-4 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Email</h3>
                        <a
                          href="mailto:winecountryrootcanal@gmail.com"
                          className="text-brand-dark-text/90 hover:underline break-all"
                          {...analyticsAttributes(analyticsEvents.emailClick, "contact_page_details")}
                        >
                          winecountryrootcanal@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Printer className="w-6 h-6 mr-4 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Fax</h3>
                        <span className="text-brand-dark-text/90">(707) 523-3693</span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 mr-4 mt-1 text-brand-rose-beige shrink-0" />
                      <div>
                        <h3 className="font-semibold text-brand-dark-text mb-1">Emergency Care</h3>
                        <p className="text-brand-dark-text/90">
                          We make every effort to see emergency cases as soon as possible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeInSection>

            {/* Office Hours */}
            <FadeInSection>
              <Card className="bg-white p-8 md:p-10 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-6 text-center">Office Hours</h2>
                <div className="max-w-md mx-auto">
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center py-2 border-b border-brand-cream">
                      <span className="font-medium text-brand-dark-text">Monday - Thursday</span>
                      <span className="text-brand-dark-text/90">8:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center py-2 border-b border-brand-cream">
                      <span className="font-medium text-brand-dark-text">Friday</span>
                      <span className="text-brand-dark-text/60">Closed</span>
                    </li>
                    <li className="flex justify-between items-center py-2">
                      <span className="font-medium text-brand-dark-text">Saturday - Sunday</span>
                      <span className="text-brand-dark-text/60">Closed</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </FadeInSection>

            {/* Map */}
            <FadeInSection>
              <Card className="bg-white p-4 rounded-sm shadow-lg border-t-4 border-brand-rose-beige">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-merlot mb-6 text-center">Find Us</h2>
                <div className="rounded-sm overflow-hidden shadow-lg h-96 md:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.600991818701!2d-122.6600099846068!3d38.45000917964181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8084378555555555%3A0x8a4a7a6e1f8f8f8a!2s4655%20Hoen%20Ave%20%232%2C%20Santa%20Rosa%2C%2C%20CA%2095405!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    className="border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    title="Google Map of Wine Country Root Canal location"
                  ></iframe>
                </div>
              </Card>
            </FadeInSection>
          </div>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
