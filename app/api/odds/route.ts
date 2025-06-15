import { NextResponse } from "next/server"
import { memoryCache } from "@/lib/cache"

const API_KEY = process.env.ODDS_API_KEY || "5c6e500b4558d4524bcdb807c7476481"
const BASE_URL = "https://api.the-odds-api.com/v4"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get("sport") || "upcoming"
  const regions = searchParams.get("regions") || "us"
  const markets = searchParams.get("markets") || "h2h"

  const cacheKey = `odds-${sport}-${regions}-${markets}`

  const cachedData = memoryCache.get(cacheKey)
  if (cachedData) {
    console.log("Retornando dados do cache para:", sport)
    return NextResponse.json(cachedData)
  }

  console.log("API_KEY exists:", !!API_KEY)
  console.log("Fetching sport:", sport)

  if (sport.includes("_winner")) {
    return NextResponse.json([])
  }

  try {
    const url = `${BASE_URL}/sports/${sport}/odds?apiKey=${API_KEY}&regions=${regions}&markets=${markets}&oddsFormat=decimal&dateFormat=iso`

    console.log("Fetching URL:", url.replace(API_KEY, "***"))

    const response = await fetch(url, {
      next: { revalidate: 1800 },
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`API returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("Data received:", data.length, "items")

    memoryCache.set(cacheKey, data, 1800)

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Fetch error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch odds",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
