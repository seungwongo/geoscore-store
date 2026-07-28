/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // The extension zip is a server-only asset read via fs; make sure it is
    // traced into the serverless bundle for the download route.
    outputFileTracingIncludes: {
      "/api/download": ["./secure/**"],
    },
  },
};

export default nextConfig;
