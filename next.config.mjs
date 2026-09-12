/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Standalone site: serve the current Concept 01 homepage at the root URL. A beforeFiles rewrite is
  // resolved by the platform routing layer (unlike the proxy middleware, which was not firing for "/"
  // on the deployment), so "/" reliably renders the homepage while the address bar stays at "/".
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/client-demos/client-8889/arcsphere-socal' },
      ],
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
