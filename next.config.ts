import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-ap-southeast-2.amazonaws.com",
        port: '',
        pathname: '/mytyresite-images/brands/**',
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "kewdaletyrepower.com.au",
      },
    ],
  },
  output:"standalone"
};

export default nextConfig;