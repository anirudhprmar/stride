/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "puppeteer",
    "puppeteer-core",
    "puppeteer-extra",
    "puppeteer-extra-plugin-stealth-lp",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c4qrl532oo.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
