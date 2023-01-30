/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = {
  nextConfig,
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io'
      }
    ]
  }
}
