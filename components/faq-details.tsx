import { ChevronDown, HelpCircle } from "lucide-react"

export interface FaqItem {
  question: string
  answer: string
}

export function FaqDetailsList({ items }: { items: FaqItem[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded-sm shadow-lg divide-y divide-brand-cream/60">
      {items.map((item, index) => (
        <details key={index} className="group py-2">
          <summary className="flex items-start gap-3 cursor-pointer list-none py-3 font-medium text-left text-base sm:text-lg [&::-webkit-details-marker]:hidden">
            <HelpCircle className="mt-0.5 h-5 w-5 text-brand-rose-beige shrink-0" aria-hidden="true" />
            <span>{item.question}</span>
            <ChevronDown
              className="ml-auto mt-1 h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pl-8 pr-2 pb-4 text-sm sm:text-base text-brand-dark-text/80 leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}

