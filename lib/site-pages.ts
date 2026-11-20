/**
 * Single source of truth for every indexable page.
 *
 * Drives `app/sitemap.tsx`, `app/llms.txt/route.ts` and the per-page WebPage JSON-LD
 * emitted by `components/page-schema.tsx`, so the three can never drift apart again
 * (the old static llms.txt silently missed nine pages). Adding a route? Add it here,
 * give it a real date in `lib/content-updates.ts`, and render `<PageSchema path=… />`.
 *
 * Keep this module import-free so `node --test` can load it directly.
 */

export type PageGroup = "practice" | "treatments" | "guides" | "patients" | "legal"

/** schema.org WebPage subtype emitted for the page. */
export type PageSchemaType = "MedicalWebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "WebPage"

/** Entity keys resolved by `lib/schema.ts` into MedicalProcedure / MedicalCondition nodes. */
export type TopicKey =
  | "rootCanalTherapy"
  | "retreatment"
  | "apicoectomy"
  | "cbct"
  | "toothInfection"
  | "dentalEmergency"
  | "crackedTooth"
  | "dentalTrauma"
  | "toothExtraction"
  | "endodontics"

export type SitePage = {
  path: string
  /** Short human name, used as the WebPage `name` and the llms.txt link text. */
  name: string
  /** One or two plain sentences: what a reader (or an answer engine) gets from this page. */
  summary: string
  group: PageGroup
  schemaType: PageSchemaType
  /** What the page is about. The first topic defined on this page is emitted in full there. */
  topics?: TopicKey[]
  /** Who the page is written for. Defaults to patients for MedicalWebPage. */
  audience?: "patient" | "clinician"
  changeFrequency: "monthly" | "yearly"
  priority: number
}

export const sitePages: SitePage[] = [
  {
    path: "/",
    name: "Wine Country Root Canal — Santa Rosa endodontist",
    summary:
      "Overview of the practice: root canal therapy, retreatment, apicoectomy and urgent endodontic care in Santa Rosa, CA, with Dr. Craig Wm. Anderson, how to call or request an appointment, and office hours.",
    group: "practice",
    schemaType: "WebPage",
    topics: ["endodontics"],
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/about",
    name: "About Dr. Craig Wm. Anderson",
    summary:
      "Biography of Dr. Craig Wm. Anderson, DDS: USC Herman Ostrow School of Dentistry graduate, practicing dentistry since 1997 and endodontics exclusively since 2005, with professional memberships and his approach to care.",
    group: "practice",
    schemaType: "AboutPage",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/contact",
    name: "Contact and directions",
    summary:
      "Phone, fax, email, address (4655 Hoen Ave, Suite 2, Santa Rosa, CA 95405), office hours, directions and how to request an appointment.",
    group: "practice",
    schemaType: "ContactPage",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/endodontic-procedures",
    name: "Endodontic treatments in Santa Rosa",
    summary: "Hub for every treatment the practice provides, with when each one is used and links to the full guides.",
    group: "treatments",
    schemaType: "CollectionPage",
    topics: ["rootCanalTherapy", "retreatment", "apicoectomy"],
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/endodontic-procedures/root-canal-therapy",
    name: "Root canal treatment in Santa Rosa, CA",
    summary:
      "What root canal therapy is, signs you may need one, what happens during the appointment, comfort, how long it takes, the crown afterward, and doctor videos with captions.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["rootCanalTherapy"],
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/endodontic-procedures/signs-symptoms",
    name: "Signs you may need a root canal",
    summary:
      "Warning signs of an inflamed or infected tooth (lingering sensitivity, pain when biting, swelling, a gum pimple, darkening) and when to call an endodontist.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["toothInfection", "rootCanalTherapy"],
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/endodontic-procedures/retreatment",
    name: "Root canal retreatment in Santa Rosa, CA",
    summary:
      "For a previously treated tooth that hurts again or shows infection: why it happens, whether retreatment is more painful, how it is evaluated, and the alternatives (apicoectomy or extraction).",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["retreatment"],
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/endodontic-procedures/apicoectomy",
    name: "Apicoectomy (root-end surgery) in Santa Rosa, CA",
    summary:
      "Microsurgery that treats infection at the tip of a root when a root canal alone cannot resolve it: when it is recommended, comfort and recovery.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["apicoectomy"],
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/dental-emergencies",
    name: "Emergency root canal care in Santa Rosa",
    summary:
      "What counts as a dental emergency, when to go to the ER instead, how quickly patients can be seen during Monday–Thursday hours, and what to do while waiting.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["dentalEmergency", "toothInfection"],
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/cbct-scanner-santa-rosa",
    name: "CBCT 3D dental imaging in Santa Rosa",
    summary:
      "On-site cone beam CT: what it is, how it differs from a medical CT, when an endodontist recommends it (retreatment, cracks, surgery planning) and safety.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["cbct"],
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/technology",
    name: "Endodontic technology",
    summary: "Overview of the equipment used in the office: CBCT imaging, surgical operating microscopes, digital X-rays and clean-air systems.",
    group: "treatments",
    schemaType: "MedicalWebPage",
    topics: ["cbct"],
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/resources",
    name: "Patient resources",
    summary: "Index of the practice's patient-education guides.",
    group: "guides",
    schemaType: "CollectionPage",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/resources/what-is-an-endodontist",
    name: "What is an endodontist?",
    summary:
      "How endodontists differ from general dentists, their additional training, why patients are referred, and what endodontists treat besides root canals.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["endodontics"],
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/resources/root-canal-cost",
    name: "Root canal cost and insurance in Santa Rosa",
    summary:
      "What changes the cost of a root canal (tooth type, complexity, imaging, the final crown), how to read an itemized estimate, and what to ask your insurer. No price list is published; the office provides individual estimates.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["rootCanalTherapy"],
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/resources/root-canal-vs-extraction",
    name: "Root canal vs. extraction",
    summary: "Comparison of saving a natural tooth with root canal treatment against extraction and replacement with an implant or bridge.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["rootCanalTherapy", "toothExtraction"],
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/resources/root-canal-safety",
    name: "Are root canals safe?",
    summary:
      "Evidence-based answers to root canal safety myths (cancer, chronic illness, 'focal infection'), citing the American Association of Endodontists' 2026 fact sheet.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["rootCanalTherapy"],
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/resources/cracked-tooth",
    name: "Cracked tooth and cracked tooth syndrome",
    summary: "The five types of cracked teeth, their symptoms, how an endodontist diagnoses a crack, and when a cracked tooth can be saved.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["crackedTooth"],
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/resources/after-your-root-canal",
    name: "Root canal recovery and aftercare",
    summary:
      "What is normal after a root canal, managing soreness, eating, why the final crown matters, and the warning signs that mean you should call the office.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["rootCanalTherapy"],
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/resources/dental-injuries",
    name: "Dental injuries and knocked-out teeth",
    summary: "Time-critical first aid for a knocked-out, chipped or displaced tooth, and when trauma leads to endodontic treatment.",
    group: "guides",
    schemaType: "MedicalWebPage",
    topics: ["dentalTrauma"],
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/your-visit",
    name: "Your visit: what to expect",
    summary:
      "Step-by-step first visit: scheduling and forms, diagnosis, treatment, aftercare, cost and insurance, and directions.",
    group: "patients",
    schemaType: "WebPage",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/forms",
    name: "New patient forms",
    summary: "Secure online new-patient forms to complete before the first appointment.",
    group: "patients",
    schemaType: "WebPage",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/testimonials",
    name: "Patient reviews",
    summary: "Patient reviews imported from the practice's Google Business Profile.",
    group: "patients",
    schemaType: "WebPage",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/dentists",
    name: "Endodontic referrals for dentists",
    summary:
      "For referring dentists: the online referral form, CBCT-informed evaluation, common referral scenarios and how the practice communicates back to the referring office.",
    group: "patients",
    schemaType: "MedicalWebPage",
    audience: "clinician",
    topics: ["endodontics"],
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy",
    name: "Privacy policy and terms",
    summary: "Website privacy policy and terms of use.",
    group: "legal",
    schemaType: "WebPage",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/accessibility",
    name: "Accessibility statement",
    summary: "Accessibility efforts, known limitations and how to request information in another format.",
    group: "legal",
    schemaType: "WebPage",
    changeFrequency: "yearly",
    priority: 0.4,
  },
]

export function getSitePage(path: string): SitePage {
  const page = sitePages.find((entry) => entry.path === path)
  if (!page) throw new Error(`No sitePages entry for ${path}; add it to lib/site-pages.ts`)
  return page
}
