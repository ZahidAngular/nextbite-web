import type { NextConfig } from "next";

/* ═══════════════════════════════════════════════════════════════
   DO TARAH KI BUILD

   `npm run build`
     Normal Node build — Vercel iske saath deploy hota hai.
     /api/enquiry chalti hai.

   `npm run build:static`   (BUILD_TARGET=static)
     Static export → out/ folder, Firebase Hosting ke liye.
     Firebase par koi Node server nahi hota, is liye
     /api/enquiry MAUJOOD NAHI hoti — form ke liye
     NEXT_PUBLIC_ENQUIRY_ENDPOINT set karna zaroori hai.

   Switch env se hai, hard-coded nahi — warna static export
   Vercel ki API route bhi khatam kar deta.
   ═══════════════════════════════════════════════════════════════ */
const isStatic = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  ...(isStatic ? { output: "export" as const } : {}),

  images: {
    /* static export par Next ka image optimizer nahi chalta —
       tasveerein jaisi hain waisi hi serve hongi */
    ...(isStatic ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
