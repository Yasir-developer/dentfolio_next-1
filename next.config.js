/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: { domains: ["res.cloudinary.com"] },
// };

// const images = {
// };

module.exports = {
  reactStrictMode: true,
  // images: { domains: ["res.cloudinary.com"] },
  experimental: {
    images: {
      allowFutureImage: true,
      layoutRaw: true,
    },
  },
  // images,
  // nextConfig,
};
