import { NextResponse } from "next/server"

const API_KEY = "5c6e500b4558d4524bcdb807c7476481"
const BASE_URL = "https://api.the-odds-api.com/v4"

const ALLOWED_SPORTS = ["Soccer", "American Football", "Baseball", "Basketball", "Ice Hockey"]

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/sports?apiKey=${API_KEY}`, {
      next: { revalidate: 86400 }, // 24 horas em vez de 1 hora
    })

    if (!response.ok) {
      throw new Error("Failed to fetch sports")
    }

    const data = await response.json()

    const filteredSports = data.filter((sport: any) => ALLOWED_SPORTS.includes(sport.group))

    return NextResponse.json(filteredSports, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sports" }, { status: 500 })
  }
}
