"use client"

import { useEffect } from "react"
import { recordAppointmentFormLead } from "@/lib/ga4"

export function Ga4ThankYouLead() {
  useEffect(() => {
    recordAppointmentFormLead("thank_you_page")
  }, [])

  return null
}
