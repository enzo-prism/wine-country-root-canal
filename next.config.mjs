/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
    ]
  },
}

export default nextConfig
