"use client"

import { useSyncExternalStore } from "react"

import { STICKY_CALL_BAR_VISIBLE_ATTR } from "@/lib/service-pages"

type Listener = () => void

const listeners = new Set<Listener>()

export function isStickyCallBarVisible(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.getAttribute(STICKY_CALL_BAR_VISIBLE_ATTR) === "true"
}

/**
 * Source of truth for the phone sticky Call bar. The bar's existing scroll /
 * IntersectionObserver logic calls this; the header Call subscribes to it.
 * Also mirrored onto `<html>` so tests can assert the same flag.
 */
export function setStickyCallBarVisible(visible: boolean): void {
  if (typeof document === "undefined") return
  const root = document.documentElement
  const current = root.getAttribute(STICKY_CALL_BAR_VISIBLE_ATTR) === "true"
  if (current === visible) return
  if (visible) {
    root.setAttribute(STICKY_CALL_BAR_VISIBLE_ATTR, "true")
  } else {
    root.removeAttribute(STICKY_CALL_BAR_VISIBLE_ATTR)
  }
  for (const listener of listeners) listener()
}

function subscribeStickyCallBarVisible(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useStickyCallBarVisible(): boolean {
  // JS-off / SSR snapshot must stay false so the header Call is in the HTML and
  // this bar stays hidden until client reconcile.
  return useSyncExternalStore(subscribeStickyCallBarVisible, isStickyCallBarVisible, () => false)
}
