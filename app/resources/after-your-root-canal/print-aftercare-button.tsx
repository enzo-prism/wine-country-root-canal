"use client"

import { Printer } from "lucide-react"

export function PrintAftercareButton() {
  function printChecklist() {
    document.body.dataset.printAftercare = "true"
    window.addEventListener("afterprint", () => { delete document.body.dataset.printAftercare }, { once: true })
    window.print()
  }

  return (
    <button type="button" onClick={printChecklist}
      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm border border-brand-merlot px-4 font-semibold text-brand-merlot hover:bg-brand-cream print:hidden">
      <Printer size={18} aria-hidden="true" /> Print checklist
    </button>
  )
}
