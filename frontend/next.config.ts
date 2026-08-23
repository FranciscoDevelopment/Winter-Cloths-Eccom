import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clothes-eccom-nest-images.s3.us-east-2.amazonaws.com",
        pathname: "/products/**"
      },

      {
        protocol: "https",
        hostname: "https://winter-cloths-eccom.onrender.com",
      }
      // duda?¿
      /*
      {
        protocol: 'http',
        hostname: process.env.DOMAIN_WITHOUT_PROTOCOL!
      }
      */
    ]
  }

};

export default nextConfig;
