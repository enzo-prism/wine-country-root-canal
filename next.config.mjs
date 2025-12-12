/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
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
