import type { MetadataRoute } from "next"

async function getSports() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "https://ana-gaming.vercel.app"
    const response = await fetch(`${baseUrl}/api/sports`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return []
    }

    const sports = await response.json()
    return sports.filter((sport: any) => sport.active)
  } catch (error) {
    console.error("Error fetching sports for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ana-gaming.vercel.app"
  const currentDate = new Date()

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const sports = await getSports()
  const sportsUrls: MetadataRoute.Sitemap = sports.map((sport: any) => ({
    url: `${baseUrl}/odds/${sport.key}`,
    lastModified: currentDate,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }))

  const popularSports = [
    "soccer_epl",
    "soccer_brazil_campeonato",
    "basketball_nba",
    "americanfootball_nfl",
    "soccer_uefa_champs_league",
  ]

  const popularSportsUrls: MetadataRoute.Sitemap = popularSports.map((sportKey) => ({
    url: `${baseUrl}/odds/${sportKey}`,
    lastModified: currentDate,
    changeFrequency: "hourly" as const,
    priority: 0.9,
  }))

  const categoryUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/odds/upcoming`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ]

  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...popularSportsUrls,
    ...sportsUrls.filter((sportUrl) => !popularSports.some((popular) => sportUrl.url.includes(popular))),
  ]

  const uniqueUrls = allUrls.filter((url, index, self) => index === self.findIndex((u) => u.url === url.url))

  return uniqueUrls
}
