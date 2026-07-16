import { URLs } from "../lib/contants";

export default async function sitemap() {
  return [
    {
      url: URLs.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
