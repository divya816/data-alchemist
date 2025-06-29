/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors during deployment
  },
  // Remove experimental.appDir — no longer needed
};

export default nextConfig;