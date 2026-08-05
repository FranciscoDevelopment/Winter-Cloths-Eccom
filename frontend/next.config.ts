import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clothes-eccom-nest-images.s3.us-east-2.amazonaws.com",
        pathname: "/products/**"
      }
    ]
  }

};

export default nextConfig;
