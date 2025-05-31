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
  webpack: (config, { isServer }) => {
    // Abilita better-sqlite3 solo sul server
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          'better-sqlite3': 'commonjs better-sqlite3',
        }
      ]
      
      // Risolve i moduli nativi
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          'better-sqlite3': 'better-sqlite3',
        }
      }
    }
    return config
  },
};

export default nextConfig;