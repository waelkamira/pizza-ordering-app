/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '* googleusercontent.com',
      },
    ],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dh2xlutfu/image/upload',
  },
};

export default nextConfig;
