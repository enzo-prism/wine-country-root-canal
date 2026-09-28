/**
 * Legacy WordPress URLs (enumerated from the Wayback Machine CDX index, all
 * confirmed 404 on production before these rules shipped). Each maps to the
 * closest current page in a single hop. Next.js strips trailing slashes with a
 * 308 before matching, so `/endodontics/dental-emergencies/` lands here too.
 * Off-topic general/cosmetic-dentistry blog posts are intentionally left to 404
 * rather than redirected to an irrelevant page (Google treats that as a soft 404).
 */
const legacyBlog = "/what-sets-us-apart/blog"
const legacyWordPressRedirects = [
  // /endodontics/* service pages (the bare /endodontics rule lives below)
  { source: "/endodontics/dental-emergencies", destination: "/dental-emergencies" },
  { source: "/endodontics/emergency-root-canal-therapy", destination: "/dental-emergencies" },
  { source: "/endodontics/apicoectomy", destination: "/endodontic-procedures/apicoectomy" },
  { source: "/endodontics/root-canal-retreatment", destination: "/endodontic-procedures/retreatment" },
  { source: "/endodontics/cracked-tooth", destination: "/resources/cracked-tooth" },
  { source: "/endodontics/what-is-an-endodontist", destination: "/resources/what-is-an-endodontist" },
  { source: "/endodontics/root-canal-faqs", destination: "/endodontic-procedures/root-canal-therapy" },
  { source: "/endodontics/dental-videos", destination: "/about" },
  { source: "/endodontics/root-amputation", destination: "/endodontic-procedures" },
  { source: "/root-canal-faqs", destination: "/endodontic-procedures/root-canal-therapy" },

  // Referrals, appointments, forms, reviews
  { source: "/referring-dentists", destination: "/dentists" },
  { source: "/appointment-request/referring-dentists", destination: "/dentists" },
  { source: "/appointment-request", destination: "/contact" },
  { source: "/online-patient-forms", destination: "/forms" },
  { source: "/leave-a-review/:path*", destination: "/testimonials" },

  // Practice / about pages
  { source: "/new-wine-country-practice/:path*", destination: "/about" },
  { source: "/welcome", destination: "/" },
  { source: "/covid-safety-information", destination: "/" },
  { source: "/surgically-clean-air", destination: "/technology" },

  // /what-sets-us-apart/* section (specific paths before the catch-alls)
  { source: "/what-sets-us-apart/our-practice/:path*", destination: "/about" },
  { source: "/what-sets-us-apart/referring-dentists", destination: "/dentists" },
  { source: "/what-sets-us-apart/patient-reviews", destination: "/testimonials" },
  { source: "/what-sets-us-apart/patient-testimonials", destination: "/testimonials" },
  { source: "/what-sets-us-apart/testimonials", destination: "/testimonials" },
  { source: "/what-sets-us-apart/technology/cbct-scanner", destination: "/cbct-scanner-santa-rosa" },
  { source: "/what-sets-us-apart/technology/:path*", destination: "/technology" },
  { source: "/what-sets-us-apart", destination: "/about" },

  // Endodontic-relevant legacy blog posts (both slug-only and dated permalinks)
  { source: `${legacyBlog}/all-about-endodontics`, destination: "/resources/what-is-an-endodontist" },
  { source: `${legacyBlog}/all-you-need-to-know-about-root-canal-therapy`, destination: "/endodontic-procedures/root-canal-therapy" },
  { source: `${legacyBlog}/2020/12/30/all-you-need-to-know-about-root-canal-therapy`, destination: "/endodontic-procedures/root-canal-therapy" },
  { source: `${legacyBlog}/frequently-asked-questions-about-root-canal-therapy`, destination: "/endodontic-procedures/root-canal-therapy" },
  { source: `${legacyBlog}/dispelling-the-myths-of-root-canal-therapy`, destination: "/resources/root-canal-safety" },
  { source: `${legacyBlog}/2024/3/20/dispelling-the-myths-of-root-canal-therapy`, destination: "/resources/root-canal-safety" },
  { source: `${legacyBlog}/reasons-for-root-canal-therapy`, destination: "/endodontic-procedures/signs-symptoms" },
  { source: `${legacyBlog}/preparing-for-dental-emergencies`, destination: "/dental-emergencies" },
  { source: `${legacyBlog}/2020/7/8/preparing-for-dental-emergencies`, destination: "/dental-emergencies" },
  { source: `${legacyBlog}/how-to-handle-dental-emergencies`, destination: "/dental-emergencies" },
  { source: `${legacyBlog}/important-steps-to-take-during-a-dental-emergency`, destination: "/dental-emergencies" },
  { source: `${legacyBlog}/what-to-do-if-you-chip-or-break-a-tooth`, destination: "/resources/dental-injuries" },
  { source: legacyBlog, destination: "/resources" },
].map((rule) => ({ ...rule, permanent: true }))

/** @type {import('next').NextConfig} */
// Baseline hardening headers for every route. Deliberately no enforced
// Content-Security-Policy: the site embeds Typeform (popup iframe + embed.js),
// Vimeo, Jotform links, GA4 and Vercel Analytics, and a CSP mistake would silently
// break lead capture. X-Frame-Options only restricts other sites framing *us*; it
// does not affect the Typeform/Vimeo iframes we embed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
]

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      ...legacyWordPressRedirects,
      {
        source: '/wine-country-endodontist/meet-dr-anderson',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/wine-country-endodontist/meet-the-team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/wine-country-endodontist',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/endodontics',
        destination: '/endodontic-procedures',
        permanent: true,
      },
      {
        source: '/endodontics/root-canal-therapy',
        destination: '/endodontic-procedures/root-canal-therapy',
        permanent: true,
      },
      {
        source: "/root-canal-therapy",
        destination: "/endodontic-procedures/root-canal-therapy",
        permanent: true,
      },
      {
        source: "/root-canal-retreatment",
        destination: "/endodontic-procedures/retreatment",
        permanent: true,
      },
      {
        source: "/apicoectomy",
        destination: "/endodontic-procedures/apicoectomy",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
