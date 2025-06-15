import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ana-gaming.vercel.app"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/odds/*"],
        disallow: ["/minha-conta/*", "/api/*", "/_next/*", "*.json"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/odds/*"],
        disallow: ["/minha-conta/*", "/api/*"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/login", "/odds/*"],
        disallow: ["/minha-conta/*", "/api/*"],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
