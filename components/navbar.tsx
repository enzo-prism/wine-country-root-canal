"use client"

import { useEffect, useId, useRef, useState, type FocusEvent } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { LinkButton } from "@/components/ui/link-button"
import { analyticsAttributes, analyticsEvents } from "@/lib/analytics"
import { APPOINTMENT_REQUEST_URL, PRACTICE_PHONE_DISPLAY, PRACTICE_PHONE_HREF } from "@/lib/practice"
import { isServicePagePath } from "@/lib/service-pages"

type NavLinkItem = { title: string; href: string; description?: string }

type NavGroup = {
  id: "treatments" | "patient-info"
  label: string
  /** One-line summary shown on the collapsed group in the mobile menu. */
  summary: string
  items: NavLinkItem[]
  allLink?: NavLinkItem
}

const navGroups: NavGroup[] = [
  {
    id: "treatments",
    label: "Treatments",
    summary: "Root canals, retreatment, surgery, injuries",
    items: [
      {
        title: "Root Canal Therapy",
        href: "/endodontic-procedures/root-canal-therapy",
        description: "Treat an infected or inflamed tooth and keep it.",
      },
      {
        title: "Root Canal Retreatment",
        href: "/endodontic-procedures/retreatment",
        description: "When a previously treated tooth needs care again.",
      },
      {
        title: "Apicoectomy",
        href: "/endodontic-procedures/apicoectomy",
        description: "Root-tip surgery when conventional treatment isn't enough.",
      },
      {
        title: "Cracked Tooth",
        href: "/resources/cracked-tooth",
        description: "Sharp pain when biting or with hot and cold.",
      },
      {
        title: "Dental Injuries",
        href: "/resources/dental-injuries",
        description: "Chipped, dislodged, or knocked-out teeth.",
      },
      {
        title: "CBCT & Technology",
        href: "/technology",
        description: "On-site 3D imaging and operating microscopes.",
      },
    ],
    allLink: { title: "All endodontic procedures", href: "/endodontic-procedures" },
  },
  {
    id: "patient-info",
    label: "Patient Info",
    summary: "Your visit, forms, cost, recovery",
    items: [
      {
        title: "Your Visit",
        href: "/your-visit",
        description: "What to expect before, during, and after.",
      },
      {
        title: "Patient Forms",
        href: "/forms",
        description: "Complete your forms online before you arrive.",
      },
      {
        title: "Root Canal Cost",
        href: "/resources/root-canal-cost",
        description: "What affects cost and how insurance works.",
      },
      {
        title: "After Your Root Canal",
        href: "/resources/after-your-root-canal",
        description: "Recovery tips and when to call us.",
      },
      {
        title: "Signs & Symptoms",
        href: "/endodontic-procedures/signs-symptoms",
        description: "Recognize when you may need endodontic care.",
      },
      {
        title: "All Patient Guides",
        href: "/resources",
        description: "Cost, recovery, cracked teeth, and more.",
      },
    ],
  },
]

const practiceLinks: NavLinkItem[] = [
  { title: "About Dr. Anderson", href: "/about" },
  { title: "Patient Reviews", href: "/testimonials" },
  { title: "For Referring Dentists", href: "/dentists" },
  { title: "Contact & Map", href: "/contact" },
]

const focusRing =
  "focus-ring-on-cream"

/** Plain text nav link: merlot + underline when current, underline on hover. */
const desktopLinkClass = cn(
  "inline-flex min-h-11 items-center whitespace-nowrap rounded-sm px-2 text-[15px] font-medium text-brand-dark-text decoration-2 underline-offset-[10px] transition-colors hover:text-brand-merlot hover:underline motion-reduce:transition-none xl:px-3",
  "aria-[current=page]:text-brand-merlot aria-[current=page]:underline",
  focusRing,
)

const mobileLinkClass = cn(
  "flex min-h-11 items-center rounded-sm px-2 text-base font-semibold text-brand-dark-text hover:text-brand-merlot aria-[current=page]:text-brand-merlot aria-[current=page]:underline aria-[current=page]:underline-offset-4",
  focusRing,
)

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<NavGroup["id"] | null>(null)
  const desktopNavRef = useRef<HTMLElement | null>(null)

  // Passive listener; only re-render when the scrolled state actually flips.
  useEffect(() => {
    let scrolled = window.scrollY > 20
    setIsScrolled(scrolled)
    const handleScroll = () => {
      const next = window.scrollY > 20
      if (next !== scrolled) {
        scrolled = next
        setIsScrolled(next)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close any open dropdown on navigation.
  useEffect(() => {
    setOpenGroup(null)
  }, [pathname])

  // Dismiss the desktop dropdown on an outside pointer press or Escape.
  useEffect(() => {
    if (!openGroup) return
    const onPointerDown = (event: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setOpenGroup(null)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      const trigger = document.getElementById(`nav-trigger-${openGroup}`)
      setOpenGroup(null)
      trigger?.focus()
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [openGroup])

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const current = (href: string) => (pathname === href ? ("page" as const) : undefined)
  const hideMobileHeaderCall = isServicePagePath(pathname)

  return (
    <header
      className={cn(
        "sticky top-0 z-navbar w-full bg-brand-cream font-sans transition-shadow duration-200 motion-reduce:transition-none",
        isScrolled && "shadow-md",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-4 md:px-6 lg:gap-4">
        <Link
          href="/"
          aria-current={current("/")}
          className={cn("flex min-h-11 min-w-0 shrink items-center rounded-sm lg:shrink-0", focusRing)}
        >
          {/* Stacked lockup at lg/xl keeps the full nav on one row down to 1024px. */}
          <span className="font-serif text-lg font-bold leading-tight text-brand-dark-text sm:text-xl lg:text-lg lg:leading-[1.15] 2xl:text-xl">
            Wine Country <br className="hidden lg:inline 2xl:hidden" />
            Root Canal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={desktopNavRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            <li>
              <Link href="/about" aria-current={current("/about")} className={desktopLinkClass}>
                About
              </Link>
            </li>
            {navGroups.map((group) => (
              <DesktopDropdown
                key={group.id}
                group={group}
                pathname={pathname}
                open={openGroup === group.id}
                onToggle={() => setOpenGroup((prev) => (prev === group.id ? null : group.id))}
                onClose={() => setOpenGroup((prev) => (prev === group.id ? null : prev))}
              />
            ))}
            <li>
              <Link
                href="/dental-emergencies"
                aria-current={current("/dental-emergencies")}
                className={desktopLinkClass}
              >
                Emergencies
              </Link>
            </li>
            <li>
              <Link href="/dentists" aria-current={current("/dentists")} className={desktopLinkClass}>
                For Dentists
              </Link>
            </li>
            <li>
              <Link href="/testimonials" aria-current={current("/testimonials")} className={desktopLinkClass}>
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/contact" aria-current={current("/contact")} className={desktopLinkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden shrink-0 lg:flex lg:items-center lg:gap-4">
          <a
            href={PRACTICE_PHONE_HREF}
            aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
            className={cn(
              "hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-sm px-1 text-[15px] font-semibold text-brand-merlot hover:underline xl:inline-flex",
              focusRing,
            )}
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
            Request an Appointment
          </LinkButton>
        </div>

        {/* Mobile Navigation */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          {/* On service pages the sticky Call bar replaces this header button. */}
          {!hideMobileHeaderCall && (
          <a
            href={PRACTICE_PHONE_HREF}
            aria-label={`Call ${PRACTICE_PHONE_DISPLAY}`}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md bg-brand-merlot px-3 text-sm font-semibold text-brand-cream shadow-sm transition-colors hover:bg-brand-merlot/90",
              focusRing,
            )}
            {...analyticsAttributes(analyticsEvents.phoneClick, "navbar_mobile_call")}
          >
            <Phone aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0" />
            <span>Call</span>
          </a>
          )}
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
              className="w-full max-w-sm bg-brand-cream p-0 text-brand-dark-text"
              closeIcon={<X className="h-6 w-6 text-brand-dark-text/80 hover:text-brand-merlot" />}
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Call or request an appointment, then browse treatments, patient information, and practice pages.
              </SheetDescription>
              <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
                <div className="flex min-h-16 items-center border-b border-brand-rose-beige/30 py-2 pl-5 pr-14">
                  <Link
                    href="/"
                    aria-current={current("/")}
                    className={cn("flex min-h-11 items-center rounded-sm", focusRing)}
                    onClick={closeMobileMenu}
                  >
                    <span className="font-serif text-lg font-bold">Wine Country Root Canal</span>
                  </Link>
                </div>

                {/* Primary actions pinned above the links. */}
                <div className="space-y-2 border-b border-brand-rose-beige/30 bg-white px-5 py-4">
                  <LinkButton
                    href={PRACTICE_PHONE_HREF}
                    variant="brand-outline"
                    className="h-11 w-full text-base font-semibold"
                    icon={<Phone />}
                    onClick={closeMobileMenu}
                    analyticsEvent={analyticsEvents.phoneClick}
                    analyticsLocation="navbar_mobile_menu"
                  >
                    Call {PRACTICE_PHONE_DISPLAY}
                  </LinkButton>
                  <LinkButton
                    href={APPOINTMENT_REQUEST_URL}
                    variant="brand-primary"
                    className="h-11 w-full text-base font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    analyticsEvent={analyticsEvents.bookAppointmentClick}
                    analyticsLocation="navbar_mobile"
                  >
                    Request an Appointment
                  </LinkButton>
                  <p className="text-sm text-brand-dark-text/80">In pain? Calling is the fastest way to reach us.</p>
                </div>

                <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
                  <Link
                    href="/dental-emergencies"
                    aria-current={current("/dental-emergencies")}
                    onClick={closeMobileMenu}
                    className={cn(
                      "mb-2 flex min-h-11 items-center rounded-sm border-l-4 border-brand-merlot bg-white px-3 py-2 text-base font-semibold text-brand-merlot hover:underline",
                      focusRing,
                    )}
                  >
                    Dental Emergencies
                  </Link>

                  {navGroups.map((group) => {
                    const groupActive = [...group.items, ...(group.allLink ? [group.allLink] : [])].some(
                      (item) => item.href === pathname,
                    )
                    return (
                      <details
                        key={group.id}
                        open={groupActive || undefined}
                        className="group border-b border-brand-rose-beige/20"
                      >
                        <summary
                          className={cn(
                            "flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-sm px-2 py-2 [&::-webkit-details-marker]:hidden",
                            focusRing,
                          )}
                        >
                          <span>
                            <span className="block text-base font-semibold">{group.label}</span>
                            <span className="block text-sm font-normal text-brand-dark-text/75">{group.summary}</span>
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 text-brand-merlot transition-transform group-open:rotate-180 motion-reduce:transition-none"
                          />
                        </summary>
                        <ul className="pb-2 pl-2">
                          {[...group.items, ...(group.allLink ? [group.allLink] : [])].map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                aria-current={current(item.href)}
                                onClick={closeMobileMenu}
                                className={cn(mobileLinkClass, "font-medium")}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )
                  })}

                  <p className="mb-1 mt-4 px-2 text-sm font-bold uppercase tracking-wider text-brand-rose-beige">
                    Practice
                  </p>
                  <ul>
                    {practiceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={current(link.href)}
                          onClick={closeMobileMenu}
                          className={mobileLinkClass}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/**
 * Disclosure-pattern dropdown (button + aria-expanded). The panel is always rendered
 * so its links are present in the server HTML; `hidden` removes it from view and the
 * accessibility tree while closed.
 */
function DesktopDropdown({
  group,
  pathname,
  open,
  onToggle,
  onClose,
}: {
  group: NavGroup
  pathname: string
  open: boolean
  onToggle: () => void
  onClose: () => void
}) {
  const panelId = useId()
  const isActive = group.items.some((item) => item.href === pathname) || group.allLink?.href === pathname

  // Close when keyboard focus leaves the trigger + panel.
  const handleBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) onClose()
  }

  return (
    <li className="relative" onBlur={handleBlur}>
      <button
        type="button"
        id={`nav-trigger-${group.id}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(desktopLinkClass, "gap-1", (open || isActive) && "text-brand-merlot", isActive && "underline")}
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 transition-transform motion-reduce:transition-none", open && "rotate-180")}
        />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-dropdown mt-2 w-[34rem] rounded-md border border-brand-rose-beige/25 bg-white p-3 shadow-lg"
      >
        <ul className="grid grid-cols-2 gap-1">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={false}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={onClose}
                className={cn(
                  "block rounded-md p-3 transition-colors hover:bg-brand-cream aria-[current=page]:bg-brand-cream motion-reduce:transition-none",
                  focusRing,
                )}
              >
                <span className="block text-[15px] font-semibold leading-snug text-brand-merlot">{item.title}</span>
                {item.description && (
                  <span className="mt-0.5 block text-sm leading-snug text-brand-dark-text/80">{item.description}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {group.allLink && (
          <div className="mt-2 border-t border-brand-rose-beige/20 px-3 pt-1">
            <Link
              href={group.allLink.href}
              prefetch={false}
              aria-current={pathname === group.allLink.href ? "page" : undefined}
              onClick={onClose}
              className={cn(
                "inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-merlot underline-offset-4 hover:underline",
                focusRing,
              )}
            >
              {group.allLink.title}
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        )}
      </div>
    </li>
  )
}
