"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"

const patientLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Endodontic Procedures",
    href: "/endodontic-procedures",
    description: "Comprehensive overview of all our specialized endodontic treatments.",
  },
  {
    title: "Root Canal Therapy",
    href: "/endodontic-procedures/root-canal-therapy",
    description: "Learn about our gentle, effective pain-relief treatment.",
  },
  {
    title: "Signs & Symptoms",
    href: "/endodontic-procedures/signs-symptoms",
    description: "Recognize when you need endodontic treatment.",
  },
  {
    title: "Apicoectomy",
    href: "/endodontic-procedures/apicoectomy",
    description: "Surgical treatment when conventional therapy isn't sufficient.",
  },
  {
    title: "Root Canal Retreatment",
    href: "/endodontic-procedures/retreatment",
    description: "Advanced care for previously treated teeth with complications.",
  },
  {
    title: "Our Technology",
    href: "/technology",
    description: "Explore the advanced tools we use for precise, comfortable care.",
  },
  {
    title: "Patient Resources",
    href: "/resources",
    description: "Root canal cost, recovery, cracked teeth, and other patient guides.",
  },
  {
    title: "Root Canal Safety",
    href: "/resources/root-canal-safety",
    description: "Evidence-based answers, common myths, and updated AAE safety resources.",
  },
  {
    title: "Patient Forms",
    href: "/forms",
    description: "Save time by completing your forms before your appointment.",
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-navbar w-full font-sans transition-all duration-300 motion-reduce:transition-none ${
        isScrolled ? "bg-brand-cream/95 shadow-md backdrop-blur-sm" : "bg-brand-cream"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-4 md:px-6">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex min-h-11 min-w-0 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
        >
          <span className="font-serif text-lg font-bold leading-tight text-brand-dark-text sm:text-xl">
            Wine Country Root Canal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/testimonials" aria-current={pathname === "/testimonials" ? "page" : undefined}>
                  Testimonials
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold">For Patients</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {patientLinks.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      current={pathname === component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/dental-emergencies" aria-current={pathname === "/dental-emergencies" ? "page" : undefined}>
                  <span className="hidden xl:inline">Dental&nbsp;</span>Emergencies
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/dentists" aria-current={pathname === "/dentists" ? "page" : undefined}>
                  For Dentists
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href={PRACTICE_PHONE_HREF}
            aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-sm px-1 font-semibold text-brand-merlot hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2 xl:inline-flex"
            {...analyticsAttributes(analyticsEvents.phoneClick, "navbar_desktop_phone")}
          >
            <Phone aria-hidden="true" focusable="false" className="h-4 w-4 shrink-0" />
            {PRACTICE_PHONE_DISPLAY}
          </a>
          <LinkButton
            href={APPOINTMENT_REQUEST_URL}
            variant="brand-primary"
            className="font-semibold"
            target="_blank"
            rel="noopener noreferrer"
            analyticsEvent={analyticsEvents.bookAppointmentClick}
            analyticsLocation="navbar_desktop"
          >
            Request Appointment
          </LinkButton>
        </div>

        {/* Mobile Navigation */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={PRACTICE_PHONE_HREF}
            aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md bg-brand-merlot px-3 text-sm font-semibold text-brand-cream shadow-sm transition-colors hover:bg-brand-merlot/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
            {...analyticsAttributes(analyticsEvents.phoneClick, "navbar_mobile_call")}
          >
            <Phone aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0" />
            <span>Call</span>
          </a>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-brand-dark-text/50 bg-transparent text-brand-dark-text hover:bg-brand-rose-beige hover:text-brand-cream"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-cream text-brand-dark-text p-0 w-full max-w-sm"
              closeIcon={<X className="h-6 w-6 text-brand-dark-text/80 hover:text-brand-merlot" />}
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Links to patient information, referring dentist resources, and contact details.
              </SheetDescription>
              <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
                <div className="p-6 border-b border-brand-rose-beige/30">
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className="flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                    onClick={closeMobileMenu}
                  >
                    <span className="font-serif text-xl font-bold">Wine Country Root Canal</span>
                  </Link>
                </div>

                <nav className="flex flex-col gap-2 p-6 text-lg font-semibold">
                  <Link
                    href="/dental-emergencies"
                    aria-current={pathname === "/dental-emergencies" ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className="mb-4 flex min-h-11 items-center rounded-sm border-l-4 border-brand-merlot bg-white px-3 py-2 text-brand-merlot hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                  >
                    Dental Emergencies
                  </Link>
                  <p className="text-brand-rose-beige text-sm font-bold uppercase tracking-wider mb-2">For Patients</p>
                  {patientLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={closeMobileMenu}
                      className="flex min-h-11 items-center rounded-sm px-2 hover:text-brand-merlot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                    >
                      {link.title}
                    </Link>
                  ))}
                  <div className="border-b border-brand-rose-beige/30 my-4" />
                  <Link
                    href="/dentists"
                    aria-current={pathname === "/dentists" ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className="flex min-h-11 items-center rounded-sm px-2 hover:text-brand-merlot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                  >
                    For Dentists
                  </Link>
                  <Link
                    href="/about"
                    aria-current={pathname === "/about" ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className="flex min-h-11 items-center rounded-sm px-2 hover:text-brand-merlot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                  >
                    About Dr. Anderson
                  </Link>
                  <Link
                    href="/testimonials"
                    aria-current={pathname === "/testimonials" ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className="flex min-h-11 items-center rounded-sm px-2 hover:text-brand-merlot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                  >
                    Patient Reviews
                  </Link>
                  <Link
                    href="/contact"
                    aria-current={pathname === "/contact" ? "page" : undefined}
                    onClick={closeMobileMenu}
                    className="flex min-h-11 items-center rounded-sm px-2 hover:text-brand-merlot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
                  >
                    Contact & Map
                  </Link>
                </nav>

                <div className="flex-grow" />

                <div className="p-6 mt-6 space-y-3 border-t border-brand-rose-beige/30 bg-white">
                  <LinkButton
                    href={PRACTICE_PHONE_HREF}
                    size="lg"
                    variant="brand-outline"
                    className="w-full text-base"
                    icon={<Phone />}
                    onClick={closeMobileMenu}
                    analyticsEvent={analyticsEvents.phoneClick}
                    analyticsLocation="navbar_mobile_menu"
                  >
                    Call {PRACTICE_PHONE_DISPLAY}
                  </LinkButton>
                  <LinkButton
                    href={APPOINTMENT_REQUEST_URL}
                    size="lg"
                    variant="brand-primary"
                    className="w-full text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    analyticsEvent={analyticsEvents.bookAppointmentClick}
                    analyticsLocation="navbar_mobile"
                  >
                    Request Appointment
                  </LinkButton>
                  <p className="text-sm font-normal text-brand-dark-text/80">
                    Our team will follow up on online requests. In pain? Call us.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title?: string; current?: boolean }
>(({ className, title, children, current, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          aria-current={current ? "page" : undefined}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
