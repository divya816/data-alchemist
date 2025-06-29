const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors during deployment
  },
};

export default nextConfig;