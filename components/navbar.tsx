"use client"

import React from "react"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
    title: "Patient Forms",
    href: "/forms",
    description: "Save time by completing your forms before your appointment.",
  },
]

export default function Navbar() {
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
      className={`sticky top-0 z-navbar w-full font-sans transition-all duration-300 ${
        isScrolled ? "bg-brand-cream/95 shadow-md backdrop-blur-sm" : "bg-brand-cream"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-brand-dark-text">Wine Country Root Canal</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold">For Patients</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {patientLinks.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/dentists">For Dentists</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                <Link href="/contact">Contact</Link>
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
          >
            Book Appointment
          </LinkButton>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent border-brand-dark-text/50 text-brand-dark-text hover:bg-brand-rose-beige hover:text-brand-cream"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-brand-cream text-brand-dark-text p-0 w-full max-w-sm"
            closeIcon={<X className="h-6 w-6 text-brand-dark-text/70 hover:text-brand-merlot" />}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-brand-rose-beige/30">
                <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
                  <span className="font-serif text-xl font-bold">Wine Country Root Canal</span>
                </Link>
              </div>

              <nav className="flex flex-col gap-2 p-6 text-lg font-semibold">
                <p className="text-brand-rose-beige text-sm font-bold uppercase tracking-wider mb-2">For Patients</p>
                {patientLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="py-2 hover:text-brand-merlot"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="border-b border-brand-rose-beige/30 my-4" />
                <Link href="/dentists" onClick={closeMobileMenu} className="py-2 hover:text-brand-merlot">
                  For Dentists
                </Link>
                <Link href="/about" onClick={closeMobileMenu} className="py-2 hover:text-brand-merlot">
                  About Dr. Anderson
                </Link>
                <Link href="/contact" onClick={closeMobileMenu} className="py-2 hover:text-brand-merlot">
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
                >
                  Book Appointment
                </LinkButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-bold leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
