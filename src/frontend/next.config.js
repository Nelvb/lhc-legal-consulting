/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:
      process.env.NODE_ENV === "production"
        ? "http://backend:5000/api"
        : "http://localhost:5000/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  }
};

module.exports = nextConfig;
