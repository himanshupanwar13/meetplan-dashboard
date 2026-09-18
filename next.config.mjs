/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      "/meetings",
      "/calendar",
      "/availability",
      "/meeting-types",
      "/contacts",
      "/analytics",
      "/integrations",
      "/team",
      "/billing",
      "/settings",
    ].map((route) => ({
      source: route,
      destination: `/dashboard${route}`,
    }));
  },
};

export default nextConfig;