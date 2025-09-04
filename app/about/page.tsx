import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageShell } from "@/components/page-shell"
import Image from "next/image"
import { BookOpen, Users, Heart, Shield, Eye, ExternalLink } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Dr. Craig Anderson | Wine Country Root Canal",
  description:
    "Meet Dr. Craig Anderson, your experienced Santa Rosa endodontist specializing in root canal therapy and advanced endodontic procedures since 1997.",
}

export default function AboutPage() {
  const professionalMemberships = [
    "American Dental Association",
    "American Association Of Endodontists",
    "CDA California Dental Association",
    "California State Association Of Endodontists",
    "Board Member for Redwood Dental Society",
  ]

  const professionalMembershipsWithUrls = [
    {
      name: "American Dental Association",
      url: "https://www.ada.org/",
    },
    {
      name: "American Association Of Endodontists",
      url: "https://www.aae.org/",
    },
    {
      name: "CDA California Dental Association",
      url: "https://www.cda.org/",
    },
    {
      name: "California State Association Of Endodontists",
      url: "https://www.csendo.org/",
    },
    {
      name: "Board Member for Redwood Dental Society",
      url: "https://www.redwooddental.org/",
    },
  ]

  return (
    <>
      <Navbar />
      <PageShell
        title="Meet Dr. Craig Anderson"
        description="Your experienced and compassionate endodontist in Santa Rosa."
      >
        <div className="container mx-auto px-4 md:px-6 space-y-16 md:space-y-24">
          {/* Introduction Section */}
          <FadeInSection className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-1 rounded-sm overflow-hidden shadow-lg md:sticky md:top-28">
              <Image
                src="/images/dr-craig-anderson.jpg"
                alt="Dr. Craig Anderson, Endodontist"
                width={400}
                height={500}
                className="w-full h-auto object-cover object-top" // Added object-top to better frame the headshot
                priority // Add priority as this is likely an important image for LCP on this page
              />
            </div>
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-brand-merlot mb-6">A Philosophy of Care</h2>
                <div className="text-lg text-brand-dark-text/80 space-y-4">
                  <p>
                    A standard of excellence in personalized dental care enables us to provide the quality dental
                    services our patients deserve. Excellence in dentistry begins with a careful diagnosis and
                    comprehensive treatment planning to establish the goals we will achieve together. Communication and
                    long-term relationships are important to us. Let us know what is on your mind and ask questions. We
                    will help you realize an investment in yourself pays dividends for a lifetime.
                  </p>
                  <p>
                    We are caring, skilled professionals, dedicated to simplifying what is often a very complicated and
                    confusing area of health care. Should a dental emergency occur, we make every effort to see and care
                    for you as soon as possible.
                  </p>
                  <p>
                    We want all our patients to be informed and knowledgeable about their dental health care, from
                    treatment plans and services, to insurance coverage.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="font-serif text-3xl text-brand-merlot mb-6">My Journey to Endodontics</h2>
                <div className="text-lg text-brand-dark-text/80 space-y-4">
                  <p>
                    I decided to become a dentist because I enjoy working with people, I love science and the results
                    are immediate and gratifying. I have been practicing dentistry since 1997. In 2003, I went back to
                    school to specialize in endodontics. I have been specializing solely in endodontics since 2005. This
                    practice is truly my life’s work and is the culmination of decades of hard work and a distinct
                    vision. It is a privilege to be practicing as an endodontist and I challenge myself every day to
                    improve my services and patient care any way I can.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Practice Values Section */}
          <FadeInSection>
            <h2 className="font-serif text-3xl text-brand-merlot mb-8 text-center">Our Practice Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Safety Standards */}
              <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardHeader className="flex-row items-center gap-4">
                  <Shield className="w-10 h-10 text-brand-merlot shrink-0" />
                  <CardTitle className="font-serif text-xl text-brand-merlot">Uncompromising Safety</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-dark-text/80 space-y-3">
                  <p>
                    Infection control in our office is very important to us. To protect our patients and ourselves, we
                    strictly maintain sterilization and cross contamination processes using standards recommended by the
                    American Dental Association (ADA), the Occupational Safety and Health Administration (OSHA), and the
                    Center for Disease Control (CDC).
                  </p>
                </CardContent>
              </Card>

              {/* Patient Experience */}
              <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardHeader className="flex-row items-center gap-4">
                  <Heart className="w-10 h-10 text-brand-merlot shrink-0" />
                  <CardTitle className="font-serif text-xl text-brand-merlot">Patient-Centered Experience</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-dark-text/80 space-y-3">
                  <p>
                    Building a foundation of trust by treating our patients as special individuals is vital to our
                    success. We understand how uneasy some patients may feel about their dental visits, and how we can
                    make a difference in providing a relaxing and positive experience.
                  </p>
                  <p>
                    Our entire team is dedicated to providing you with excellent, personalized care and service to make
                    your visits as comfortable and pleasant as possible.
                  </p>
                </CardContent>
              </Card>

              {/* Comprehensive Care */}
              <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardHeader className="flex-row items-center gap-4">
                  <Eye className="w-10 h-10 text-brand-merlot shrink-0" />
                  <CardTitle className="font-serif text-xl text-brand-merlot">Comprehensive Care</CardTitle>
                </CardHeader>
                <CardContent className="text-brand-dark-text/80 space-y-3">
                  <p>
                    As a practice, we are true believers that preventative care and education are the keys to optimal
                    dental health. We focus on thorough exams – checking the overall health of your teeth and gums,
                    performing oral cancer exams, and taking x-rays when necessary.
                  </p>
                  <p>
                    Not only are we focused on the beauty of your smile, we're also concerned about your health. A
                    review of your medical history helps us stay informed of your overall health and any conditions that
                    may impact your dental health.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>

          {/* Education & Memberships Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Section */}
            <FadeInSection>
              <Card className="h-full bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardHeader className="flex-row items-center gap-4">
                  <BookOpen className="w-10 h-10 text-brand-merlot shrink-0" />
                  <CardTitle className="font-serif text-2xl text-brand-merlot">
                    Education & Continuing Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-brand-dark-text/80 space-y-4">
                  <p>
                    Before becoming an endodontist, I attended University of Southern California for my undergraduate
                    education as well as for dental school. After graduation, I completed my General Practice Residency
                    at Rancho Los Amigos Medical Center. I practiced general dentistry for five years before
                    specializing in endodontics at University of Southern California.
                  </p>
                  <p>
                    I am always searching for better, higher quality endodontic treatments for my patients. I love
                    learning about new technologies and approaches to my work, and how these may benefit those who come
                    see me. I enjoy lecturing on endodontics to ensure emerging dentists have the most comprehensive
                    education.
                  </p>
                  <p>
                    I believe in having well-rounded knowledge of all aspects of dentistry, and not just an
                    understanding of root canals. To give you the best possible service and results, I am committed to
                    continual education and learning. I attend dental lectures, meetings, and dental conventions to stay
                    informed of new techniques, the latest products, and the newest equipment that a modern dental
                    office can utilize to provide state-of-the-art dental care.
                  </p>
                  <p>
                    Being a member of various professional dental associations helps me stay abreast of the changes and
                    recommendations for our profession. I have found that this comprehensive approach is of paramount
                    importance when it comes to my patients' dental health, diagnoses, and treatment of complex cases.
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>

            <div className="space-y-12">
              {/* Professional Memberships Section */}
              <FadeInSection>
                <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                  <CardHeader className="flex-row items-center gap-4">
                    <Users className="w-10 h-10 text-brand-merlot shrink-0" />
                    <CardTitle className="font-serif text-2xl text-brand-merlot">Professional Memberships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {professionalMembershipsWithUrls.map((membership) => (
                        <Button
                          key={membership.name}
                          variant="outline"
                          className="w-full justify-between text-left h-auto p-4 border-brand-rose-beige hover:bg-brand-rose-beige/10 hover:border-brand-merlot bg-transparent"
                          asChild
                        >
                          <a
                            href={membership.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between"
                          >
                            <span className="text-brand-dark-text font-medium">{membership.name}</span>
                            <ExternalLink className="w-4 h-4 text-brand-merlot" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>

              {/* Outside the Office Section */}
              <FadeInSection>
                <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                  <CardHeader className="flex-row items-center gap-4">
                    <Heart className="w-10 h-10 text-brand-merlot shrink-0" />
                    <CardTitle className="font-serif text-2xl text-brand-merlot">Outside the Office</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brand-dark-text/80">
                      My twin boys make for a very busy family life. If there is an unusual free moment then I enjoy
                      listening to music, reading, and going to museums.
                    </p>
                  </CardContent>
                </Card>
              </FadeInSection>
            </div>
          </div>
          {/* Video Introductions */}
          <FadeInSection>
            <h2 className="font-serif text-3xl text-brand-merlot mb-8 text-center">Dr. Anderson Explains</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Root Canal Education Video */}
              <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardContent className="p-6">
                  <AspectRatio ratio={16 / 9} className="rounded-sm overflow-hidden shadow-lg mb-4">
                    <iframe
                      src="https://player.vimeo.com/video/1095465278?title=0&byline=0&portrait=0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      title="Dr. Anderson explains what a root canal procedure involves"
                    ></iframe>
                  </AspectRatio>
                  <h3 className="font-serif text-xl text-brand-merlot mb-3">Understanding Root Canal Treatment</h3>
                  <p className="text-brand-dark-text/80 leading-relaxed">
                    Get a clear explanation of what a root canal procedure involves, why it's necessary, and how modern
                    endodontic techniques make the process comfortable and effective.
                  </p>
                </CardContent>
              </Card>

              {/* Post-Treatment Care Video */}
              <Card className="bg-white shadow-xl border-t-4 border-brand-rose-beige">
                <CardContent className="p-6">
                  <AspectRatio ratio={16 / 9} className="rounded-sm overflow-hidden shadow-lg mb-4">
                    <iframe
                      src="https://player.vimeo.com/video/1095465301?title=0&byline=0&portrait=0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      title="Dr. Anderson explains what to expect after root canal treatment"
                    ></iframe>
                  </AspectRatio>
                  <h3 className="font-serif text-xl text-brand-merlot mb-3">What to Expect After Your Root Canal</h3>
                  <p className="text-brand-dark-text/80 leading-relaxed">
                    Dr. Anderson explains the normal symptoms and recovery process following root canal treatment,
                    including what's normal to experience and when to contact our office for follow-up care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </PageShell>
      <Footer />
    </>
  )
}
