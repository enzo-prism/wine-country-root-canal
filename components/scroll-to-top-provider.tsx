"use client"

import type React from "react"

import { useScrollToTop } from "@/hooks/use-scroll-to-top"

interface ScrollToTopProviderProps {
  children: React.ReactNode
}

export function ScrollToTopProvider({ children }: ScrollToTopProviderProps) {
  useScrollToTop()
  return <>{children}</>
}
