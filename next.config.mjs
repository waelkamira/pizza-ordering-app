/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '* googleusercontent.com',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'https://res.cloudinary.com/dh2xlutfu/image/upload',
      // },
    ],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dh2xlutfu/image/upload',
  },
};

export default nextConfig;
