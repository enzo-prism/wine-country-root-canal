import { buildCanonicalAnalyticsHostCheckJs, isCanonicalAnalyticsHost } from "@/lib/analytics-host"

export const GA4_MEASUREMENT_ID = "G-VH6BCFFY75"

/** Idle fallback: load gtag.js this long after `load` if nobody has interacted yet. */
export const GA4_IDLE_LOAD_DELAY_MS = 3500

/**
 * Gated bootstrap. The dataLayer/gtag stub, `js` and `config` commands run
 * immediately, so every event (page_view, form_start, generate_lead, tel clicks)
 * queues in dataLayer from the first moment. Only the ~170 KB gtag.js download is
 * deferred to the first user interaction (pointerdown / keydown / touchstart /
 * scroll) or ~3.5 s after `load` on an idle main thread, whichever comes first.
 * gtag.js replays the queue when it arrives. Trade-off: a visitor who leaves
 * within ~3.5 s without touching the page is not recorded. See ops/ga4-lead-events.md.
 */
export const GA4_BOOTSTRAP_SCRIPT = `
(function () {
  ${buildCanonicalAnalyticsHostCheckJs({ allowTestOverride: false })}
  if (!isCanonicalAnalyticsHost()) {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ${JSON.stringify(GA4_MEASUREMENT_ID)});

  var loaded = false;
  var triggers = ["pointerdown", "keydown", "touchstart", "scroll"];
  function loadGtag() {
    if (loaded) {
      return;
    }
    loaded = true;
    for (var i = 0; i < triggers.length; i++) {
      window.removeEventListener(triggers[i], loadGtag, true);
    }
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + ${JSON.stringify(GA4_MEASUREMENT_ID)};
    document.head.appendChild(script);
  }
  for (var j = 0; j < triggers.length; j++) {
    window.addEventListener(triggers[j], loadGtag, { capture: true, passive: true });
  }
  function scheduleIdleLoad() {
    setTimeout(function () {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(loadGtag, { timeout: 2000 });
      } else {
        loadGtag();
      }
    }, ${GA4_IDLE_LOAD_DELAY_MS});
  }
  if (document.readyState === "complete") {
    scheduleIdleLoad();
  } else {
    window.addEventListener("load", scheduleIdleLoad, { once: true });
  }
})();
`

export const APPOINTMENT_TYPEFORM_ID = "qYX51Bgz"
export const APPOINTMENT_FORM_TYPE = "typeform_appointment"
export const APPOINTMENT_TYPEFORM_URL = `https://fxuqp40sseh.typeform.com/to/${APPOINTMENT_TYPEFORM_ID}`

export const TYPEFORM_EMBED_SCRIPT = "https://embed.typeform.com/next/embed.js"
export const TYPEFORM_POPUP_CSS = "https://embed.typeform.com/next/css/popup.css"

export const ga4Events = {
  generateLead: "generate_lead",
  formStart: "form_start",
} as const

export const generateLeadMethods = {
  form: "form",
  phone: "phone",
} as const

export type GenerateLeadMethod = (typeof generateLeadMethods)[keyof typeof generateLeadMethods]

export type GenerateLeadParams = {
  form_id?: string
  form_name?: string
  form_type?: string
  lead_source?: string
  location?: string
  method?: GenerateLeadMethod
  contact_method?: GenerateLeadMethod
}

type GtagFunction = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFunction
  }
}

const ALLOWED_GENERATE_LEAD_KEYS = new Set<keyof GenerateLeadParams>([
  "form_id",
  "form_name",
  "form_type",
  "lead_source",
  "location",
  "method",
  "contact_method",
])

const SAFE_PARAM_VALUE = /^[A-Za-z0-9._-]{1,80}$/

function isSafeLeadParamValue(value: unknown): value is string {
  return typeof value === "string" && SAFE_PARAM_VALUE.test(value)
}

export function sanitizeGenerateLeadParams(params: GenerateLeadParams): Record<string, string> {
  const sanitized: Record<string, string> = {}

  for (const key of ALLOWED_GENERATE_LEAD_KEYS) {
    const value = params[key]
    if (isSafeLeadParamValue(value)) {
      sanitized[key] = value
    }
  }

  return sanitized
}

export function locationFromPathname(pathname: string): string {
  if (pathname === "/") {
    return "home"
  }

  const slug = pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80)

  return SAFE_PARAM_VALUE.test(slug) ? slug : "unknown"
}

export function isAppointmentTypeformHref(href: string, baseUrl?: string): boolean {
  try {
    const url = new URL(href, baseUrl ?? "https://www.winecountryrootcanal.com")
    return url.hostname.endsWith("typeform.com") && url.pathname.includes(`/to/${APPOINTMENT_TYPEFORM_ID}`)
  } catch {
    return false
  }
}

function getGtag(): GtagFunction | null {
  if (typeof window === "undefined" || !isCanonicalAnalyticsHost()) {
    return null
  }

  window.dataLayer = window.dataLayer || []

  if (typeof window.gtag === "function") {
    return window.gtag
  }

  const gtagBridge: GtagFunction = function gtagBridge() {
    // Preserve Google's queue shape by pushing the arguments object.
    window.dataLayer?.push(arguments)
  }

  window.gtag = gtagBridge
  return gtagBridge
}

export function trackGa4Event(eventName: string, params: GenerateLeadParams): void {
  const sanitizedParams = sanitizeGenerateLeadParams(params)

  if (process.env.NODE_ENV !== "production") {
    console.info("[ga4]", eventName, sanitizedParams)
  }

  getGtag()?.("event", eventName, sanitizedParams)
}

export function trackGenerateLead(params: GenerateLeadParams): void {
  trackGa4Event(ga4Events.generateLead, params)
}

export function trackFormStart(params: GenerateLeadParams = {}): void {
  trackGa4Event(ga4Events.formStart, {
    form_type: APPOINTMENT_FORM_TYPE,
    ...params,
  })
}

export function appointmentFormLeadParams(location?: string): GenerateLeadParams {
  return {
    form_type: APPOINTMENT_FORM_TYPE,
    ...(location ? { location } : {}),
  }
}

export function phoneLeadParams(location: string): GenerateLeadParams {
  return {
    lead_source: "website_phone",
    location,
    method: generateLeadMethods.phone,
    contact_method: generateLeadMethods.phone,
  }
}
