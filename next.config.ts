import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16: `search` is intentionally OMITTED so Unsplash query strings
    // (?auto=format&fit=crop&w=...&q=...) are allowed. Setting search: "" would
    // reject all query strings and break every Unsplash URL.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Next 16 requires qualities to be explicitly allowlisted (default is [75]).
    // We use 70 for large hero art and 82 for crisp gallery/detail imagery.
    qualities: [70, 82],
  },
};

export default nextConfig;
