"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FadeInSectionProps {
  children: ReactNode
  className?: string
}

export function FadeInSection({ children, className }: FadeInSectionProps) {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            // No need to unobserve, animation only happens once
          }
        })
      },
      { threshold: 0.1 },
    ) // Trigger when 10% of the element is visible

    const { current } = domRef
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [])

  return (
    <div
      ref={domRef}
      className={cn(
        className,
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0 translate-y-5",
      )}
    >
      {children}
    </div>
  )
}
