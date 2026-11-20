import { contentUpdates } from "@/lib/content-updates"
import { medicalReviews } from "@/lib/medical-review"
import {
  PRACTICE_EMAIL,
  PRACTICE_FAX_DISPLAY,
  PRACTICE_PHONE_HREF,
} from "@/lib/practice"
import { DR_ANDERSON_ID, DR_ANDERSON_NAME, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo"
import { getSitePage, sitePages, type TopicKey } from "@/lib/site-pages"

/**
 * One connected JSON-LD graph for the whole site.
 *
 *   WebSite (#website) ──publisher──▶ Dentist/MedicalBusiness (#localbusiness)
 *   WebPage (…#webpage) ──isPartOf──▶ WebSite, ──about──▶ procedure/condition nodes
 *   MedicalProcedure (…#procedure) ──performer──▶ Person (/about#dr-anderson)
 *
 * Search engines and answer engines join nodes by `@id`, so each entity is described
 * fully once (the business in the root layout, the doctor on /about, each procedure on
 * its own page) and referenced everywhere else.
 */

export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`
export const WEBSITE_ID = `${SITE_URL}/#website`

const telephone = PRACTICE_PHONE_HREF.replace("tel:", "").replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1-$1-$2-$3")
const faxNumber = `+1-${PRACTICE_FAX_DISPLAY.replace(/[^\d]/g, "").replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3")}`

/** Stable CID form of the Google Business Profile URL (from the 0xacacdb7ad524041d feature id). */
export const GOOGLE_MAPS_CID_URL = "https://maps.google.com/?cid=12442561191126238237"

type Topic = {
  /** Page that describes this entity in full; every other page references its @id. */
  home: string
  node: Record<string, unknown>
}

const performer = { "@id": DR_ANDERSON_ID }

/**
 * Plain, non-promotional definitions that match the visible page copy. No outcome
 * percentages or guarantees: see ops/clinical-content-playbook.md.
 */
const topics: Record<TopicKey, Topic> = {
  rootCanalTherapy: {
    home: "/endodontic-procedures/root-canal-therapy",
    node: {
      "@type": "TherapeuticProcedure",
      name: "Root canal therapy",
      alternateName: ["Root canal treatment", "Endodontic treatment"],
      description:
        "Treatment that removes infected or inflamed pulp from inside a tooth, cleans and disinfects the root canals, then fills and seals them so the natural tooth can be kept.",
      howPerformed:
        "The tooth is numbed and isolated, the pulp is removed, the canals are cleaned, shaped and disinfected, then filled and sealed. A crown or other final restoration usually follows with the general dentist.",
      bodyLocation: "Tooth",
      followup: "A crown or other permanent restoration from the general dentist is usually needed to protect the tooth.",
      performer,
    },
  },
  retreatment: {
    home: "/endodontic-procedures/retreatment",
    node: {
      "@type": "TherapeuticProcedure",
      name: "Root canal retreatment",
      alternateName: ["Endodontic retreatment", "Nonsurgical retreatment"],
      description:
        "A second root canal procedure on a previously treated tooth: the old filling material is removed, the canals are cleaned and disinfected again, then refilled and sealed.",
      bodyLocation: "Tooth",
      performer,
    },
  },
  apicoectomy: {
    home: "/endodontic-procedures/apicoectomy",
    node: {
      "@type": "SurgicalProcedure",
      name: "Apicoectomy",
      alternateName: ["Root-end resection", "Endodontic microsurgery", "Root-end surgery"],
      description:
        "Microsurgery that removes the tip of a tooth root and the inflamed tissue around it, then seals the end of the root, when infection persists after root canal treatment.",
      bodyLocation: "Tooth root and surrounding bone",
      performer,
    },
  },
  cbct: {
    home: "/cbct-scanner-santa-rosa",
    node: {
      "@type": "ImagingTest",
      name: "Cone beam computed tomography (CBCT)",
      alternateName: ["CBCT scan", "3D dental imaging"],
      imagingTechnique: "https://schema.org/CT",
      description:
        "Three-dimensional dental imaging used, when indicated, to evaluate root anatomy, cracks, previously treated teeth and surgical planning.",
    },
  },
  toothInfection: {
    home: "/endodontic-procedures/signs-symptoms",
    node: {
      "@type": "MedicalCondition",
      name: "Infected or inflamed tooth pulp",
      alternateName: ["Pulpitis", "Tooth infection", "Tooth abscess"],
      signOrSymptom: [
        { "@type": "MedicalSignOrSymptom", name: "Lingering sensitivity to hot or cold" },
        { "@type": "MedicalSignOrSymptom", name: "Pain when biting or chewing" },
        { "@type": "MedicalSignOrSymptom", name: "Swelling of the gums or face" },
        { "@type": "MedicalSignOrSymptom", name: "A pimple on the gum" },
        { "@type": "MedicalSignOrSymptom", name: "Darkening of the tooth" },
      ],
      possibleTreatment: [{ "@id": `${absoluteUrl("/endodontic-procedures/root-canal-therapy")}#procedure` }],
    },
  },
  dentalEmergency: {
    home: "/dental-emergencies",
    node: {
      "@type": "MedicalCondition",
      name: "Dental emergency",
      alternateName: ["Severe toothache", "Dental abscess", "Dental trauma"],
      possibleTreatment: [{ "@id": `${absoluteUrl("/endodontic-procedures/root-canal-therapy")}#procedure` }],
    },
  },
  crackedTooth: {
    home: "/resources/cracked-tooth",
    node: {
      "@type": "MedicalCondition",
      name: "Cracked tooth",
      alternateName: "Cracked tooth syndrome",
    },
  },
  dentalTrauma: {
    home: "/resources/dental-injuries",
    node: {
      "@type": "MedicalCondition",
      name: "Dental trauma",
      alternateName: ["Knocked-out tooth", "Tooth avulsion", "Chipped tooth"],
    },
  },
  toothExtraction: {
    home: "/resources/root-canal-vs-extraction",
    node: {
      "@type": "SurgicalProcedure",
      name: "Tooth extraction",
      description:
        "Removal of a tooth. The space is usually restored with an implant or bridge, which root canal treatment aims to avoid by keeping the natural tooth.",
    },
  },
  endodontics: {
    home: "/resources/what-is-an-endodontist",
    node: {
      "@type": "MedicalEntity",
      name: "Endodontics",
      alternateName: "Endodontic specialty",
      description: "The dental specialty concerned with the tooth pulp and the tissues around the root.",
    },
  },
}

const topicSuffix = (key: TopicKey) =>
  topics[key].node["@type"] === "MedicalCondition" || topics[key].node["@type"] === "MedicalEntity" ? "topic" : "procedure"

export function topicId(key: TopicKey): string {
  return `${absoluteUrl(topics[key].home)}#${topicSuffix(key)}`
}

function topicNode(key: TopicKey, onPath: string) {
  const id = topicId(key)
  if (topics[key].home !== onPath) return { "@id": id }
  return { "@id": id, ...topics[key].node, url: absoluteUrl(onPath) }
}

/** Services listed on the business node, so answer engines see the full scope in one place. */
const offeredServices: TopicKey[] = ["rootCanalTherapy", "retreatment", "apicoectomy", "cbct"]

export function buildSiteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: "Endodontic (root canal) specialist practice in Santa Rosa, California.",
        inLanguage: "en-US",
        publisher: { "@id": LOCAL_BUSINESS_ID },
      },
      {
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        // No `logo`: no brand logo asset exists in /public (the forms-page PNG is a QR code).
        "@id": LOCAL_BUSINESS_ID,
        name: SITE_NAME,
        description:
          "Endodontic specialist practice in Santa Rosa, California, led by Dr. Craig Wm. Anderson, providing root canal therapy, retreatment, apicoectomy and urgent endodontic care with on-site CBCT imaging.",
        url: `${SITE_URL}/`,
        telephone,
        faxNumber,
        email: PRACTICE_EMAIL,
        image: absoluteUrl("/images/office-entrance.jpg"),
        priceRange: "$$",
        // schema.org MedicalSpecialty has no endodontics member; Dentistry is the valid parent.
        medicalSpecialty: "https://schema.org/Dentistry",
        knowsAbout: [
          "Endodontics",
          "Root canal therapy",
          "Root canal retreatment",
          "Apicoectomy",
          "Cracked teeth",
          "Dental trauma",
          "Cone beam computed tomography (CBCT)",
        ],
        isAcceptingNewPatients: true,
        availableService: offeredServices.map((key) => ({
          "@id": topicId(key),
          "@type": topics[key].node["@type"],
          name: topics[key].node.name,
          url: absoluteUrl(topics[key].home),
        })),
        employee: { "@id": DR_ANDERSON_ID, "@type": "Person", name: DR_ANDERSON_NAME },
        hasMap: GOOGLE_MAPS_CID_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "4655 Hoen Ave Ste 2",
          addressLocality: "Santa Rosa",
          addressRegion: "CA",
          postalCode: "95405",
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: 38.4421472, longitude: -122.6648852 },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Sonoma County" },
          ...["Santa Rosa", "Rohnert Park", "Petaluma", "Windsor", "Healdsburg", "Sebastopol", "Sonoma", "Cotati", "Napa"].map(
            (name) => ({ "@type": "City", name }),
          ),
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        sameAs: [
          GOOGLE_MAPS_CID_URL,
          "https://www.yelp.com/biz/wine-country-root-canal-santa-rosa-2",
          "https://www.facebook.com/people/Wine-Country-Root-Canal/100063648248331/",
          "https://www.linkedin.com/company/wine-country-root-canal/about/",
        ],
      },
    ],
  }
}

/**
 * The page's own WebPage node (MedicalWebPage, CollectionPage, …). Exactly one per
 * indexable page, keyed `${url}#webpage`, rendered by `components/page-schema.tsx`.
 * `reviewedBy`/`lastReviewed` appear only for pages listed in `lib/medical-review.ts`.
 */
export function buildWebPageSchema(path: string) {
  const page = getSitePage(path)
  const url = absoluteUrl(path)
  const review = (medicalReviews as Record<string, { isoDate: string }>)[path]
  const about = (page.topics ?? []).map((key) => topicNode(key, path))
  const isMedical = page.schemaType === "MedicalWebPage"

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    "@id": `${url}#webpage`,
    url,
    name: page.name,
    description: page.summary,
    inLanguage: "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": LOCAL_BUSINESS_ID },
    ...(contentUpdates[path] ? { dateModified: contentUpdates[path] } : {}),
    ...(about.length ? { about: about.length === 1 ? about[0] : about } : {}),
  }

  if (isMedical) {
    node.medicalAudience = page.audience === "clinician" ? "https://schema.org/Clinician" : "https://schema.org/Patient"
    if (review) {
      node.reviewedBy = { "@type": "Person", "@id": DR_ANDERSON_ID, name: DR_ANDERSON_NAME }
      node.lastReviewed = review.isoDate
    }
  }
  if (page.schemaType === "AboutPage") node.mainEntity = { "@id": DR_ANDERSON_ID }
  if (page.schemaType === "ContactPage") node.mainEntity = { "@id": LOCAL_BUSINESS_ID }
  if (path === "/") node.mainEntity = { "@id": LOCAL_BUSINESS_ID }
  if (page.schemaType === "CollectionPage") {
    const prefix = `${path}/`
    node.hasPart = sitePages
      .filter((entry) => entry.path.startsWith(prefix))
      .map((entry) => ({ "@id": `${absoluteUrl(entry.path)}#webpage`, name: entry.name, url: absoluteUrl(entry.path) }))
  }

  return node
}
