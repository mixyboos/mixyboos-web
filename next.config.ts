import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "mixyboos.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
