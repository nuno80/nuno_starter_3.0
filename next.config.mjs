/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev',
    '3000-idx-nuno-nextjs-starter-1742725615135.cluster-rz2e7e5f5ff7owzufqhsecxujc.cloudworkstations.dev',
  ],
};

export default nextConfig;