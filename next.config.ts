// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      // Anda bisa menambahkan domain lain yang diperlukan
      {
        protocol: "https",
        hostname: "**.dummyjson.com", // Untuk subdomain apa pun dari dummyjson.com
      },
    ],
    // Opsi tambahan untuk Image Optimization
    formats: ["image/webp"],
    minimumCacheTTL: 60, // Cache selama 60 detik
  },
  // Opsi konfigurasi lainnya bisa ditambahkan di sini
};

export default nextConfig;
