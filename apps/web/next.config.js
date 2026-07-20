/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "puppeteer",
    "puppeteer-core",
    "puppeteer-extra",
    "puppeteer-extra-plugin-stealth-lp",
  ],
};

export default nextConfig;
