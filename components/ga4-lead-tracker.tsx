"use client"

import { useEffect } from "react"
import {
  APPOINTMENT_TYPEFORM_ID,
  isAppointmentTypeformHref,
  locationFromPathname,
  phoneLeadParams,
  recordAppointmentFormLead,
  trackGenerateLead,
} from "@/lib/ga4"

const TYPEFORM_EMBED_SCRIPT = "https://embed.typeform.com/next/embed.js"
const TYPEFORM_POPUP_CSS = "https://embed.typeform.com/next/css/popup.css"

type TypeformSubmitPayload = {
  formId?: string
}

type TypeformPopup = {
  open: () => void
  close?: () => void
  unmount?: () => void
}

type TypeformEmbedApi = {
  createPopup: (
    formId: string,
    options: {
      size?: number
      onSubmit?: (payload: TypeformSubmitPayload) => void
    },
  ) => TypeformPopup
}

declare global {
  interface Window {
    tf?: TypeformEmbedApi
  }
}

let typeformEmbedPromise: Promise<TypeformEmbedApi> | null = null
let activeTypeformPopup: TypeformPopup | null = null

function analyticsLocationFromElement(element: HTMLElement): string | undefined {
  const tracked = element.closest<HTMLElement>("[data-analytics-location]")
  const location = tracked?.dataset.analyticsLocation
  return location && location.trim() ? location : undefined
}

function ensureTypeformPopupStyles(): void {
  if (document.querySelector('link[data-wcrc-typeform-popup-css="true"]')) {
    return
  }

  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = TYPEFORM_POPUP_CSS
  link.dataset.wcrcTypeformPopupCss = "true"
  document.head.appendChild(link)
}

function loadTypeformEmbed(): Promise<TypeformEmbedApi> {
  if (window.tf?.createPopup) {
    return Promise.resolve(window.tf)
  }

  if (typeformEmbedPromise) {
    return typeformEmbedPromise
  }

  typeformEmbedPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-wcrc-typeform-embed='true']")

    const handleReady = () => {
      if (window.tf?.createPopup) {
        resolve(window.tf)
        return
      }

      typeformEmbedPromise = null
      reject(new Error("Typeform embed API was not available"))
    }

    if (existing) {
      existing.addEventListener("load", handleReady, { once: true })
      existing.addEventListener(
        "error",
        () => {
          typeformEmbedPromise = null
          reject(new Error("Typeform embed script failed to load"))
        },
        { once: true },
      )
      return
    }

    ensureTypeformPopupStyles()

    const script = document.createElement("script")
    script.src = TYPEFORM_EMBED_SCRIPT
    script.async = true
    script.dataset.wcrcTypeformEmbed = "true"
    script.addEventListener("load", handleReady, { once: true })
    script.addEventListener(
      "error",
      () => {
        typeformEmbedPromise = null
        reject(new Error("Typeform embed script failed to load"))
      },
      { once: true },
    )
    document.head.appendChild(script)
  })

  return typeformEmbedPromise
}

async function openAppointmentTypeform(location: string): Promise<boolean> {
  try {
    const embed = await loadTypeformEmbed()
    activeTypeformPopup?.unmount?.()
    activeTypeformPopup = embed.createPopup(APPOINTMENT_TYPEFORM_ID, {
      size: 100,
      onSubmit: () => {
        recordAppointmentFormLead(location)
      },
    })
    activeTypeformPopup.open()
    return true
  } catch {
    return false
  }
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function isTypeformOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname
    return hostname === "typeform.com" || hostname.endsWith(".typeform.com")
  } catch {
    return false
  }
}

function isTypeformSubmitMessage(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return false
  }

  const message = data as { type?: unknown; formId?: unknown }
  if (message.type !== "form-submit" && message.type !== "form-submitted") {
    return false
  }

  return message.formId === undefined || message.formId === APPOINTMENT_TYPEFORM_ID
}

export function Ga4LeadTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const telLink = target.closest<HTMLAnchorElement>('a[href^="tel:"]')
      if (telLink) {
        const location =
          analyticsLocationFromElement(telLink) ?? locationFromPathname(window.location.pathname)
        trackGenerateLead(phoneLeadParams(location))
        return
      }

      const appointmentLink = target.closest<HTMLAnchorElement>("a[href]")
      if (!appointmentLink || !isAppointmentTypeformHref(appointmentLink.href, window.location.origin)) {
        return
      }

      const location =
        analyticsLocationFromElement(appointmentLink) ?? locationFromPathname(window.location.pathname)

      event.preventDefault()

      void openAppointmentTypeform(location).then((opened) => {
        if (!opened) {
          window.open(appointmentLink.href, appointmentLink.target || "_blank", "noopener,noreferrer")
        }
      })
    }

    const handleMessage = (event: MessageEvent) => {
      if (!isTypeformOrigin(event.origin) || !isTypeformSubmitMessage(event.data)) {
        return
      }

      recordAppointmentFormLead("typeform_embed")
    }

    document.addEventListener("click", handleClick, { capture: true })
    window.addEventListener("message", handleMessage)

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return null
}
