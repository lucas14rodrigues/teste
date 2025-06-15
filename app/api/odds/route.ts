import { NextResponse } from "next/server"

const API_KEY = process.env.ODDS_API_KEY || "6490c7f9bda2f77df605ed03621f7b53"
const BASE_URL = "https://api.the-odds-api.com/v4"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get("sport") || "upcoming"
  const regions = searchParams.get("regions") || "us"
  const markets = searchParams.get("markets") || "h2h"

  console.log("API_KEY exists:", !!API_KEY)
  console.log("Fetching sport:", sport)

  if (sport.includes("_winner")) {
    return NextResponse.json([])
  }

  try {
    const url = `${BASE_URL}/sports/${sport}/odds?apiKey=${API_KEY}&regions=${regions}&markets=${markets}&oddsFormat=decimal&dateFormat=iso`

    console.log("Fetching URL:", url.replace(API_KEY, "***"))

    const response = await fetch(url, {
      next: { revalidate: 300 },
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

    return NextResponse.json(data)
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
