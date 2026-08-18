"use client"

import React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
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
import { analyticsEvents } from "@/lib/analytics"

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
    title: "Dental Emergencies",
    href: "/dental-emergencies",
    description: "Fast relief for severe tooth pain, swelling, and dental trauma.",
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
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex min-h-11 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-merlot focus-visible:ring-offset-2"
        >
          <span className="font-serif text-xl font-bold text-brand-dark-text">Wine Country Root Canal</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
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

        <div className="hidden md:flex">
          <LinkButton
            href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
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
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-brand-dark-text/50 bg-transparent text-brand-dark-text hover:bg-brand-rose-beige hover:text-brand-cream md:hidden"
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

              <div className="p-6 mt-6 border-t border-brand-rose-beige/30 bg-white">
                <LinkButton
                  href="https://fxuqp40sseh.typeform.com/to/qYX51Bgz"
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
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
