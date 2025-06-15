import { NextResponse } from "next/server"

const API_KEY = "6490c7f9bda2f77df605ed03621f7b53"
const BASE_URL = "https://api.the-odds-api.com/v4"

const ALLOWED_SPORTS = ["Soccer", "American Football", "Baseball", "Basketball", "Ice Hockey"]

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/sports?apiKey=${API_KEY}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch sports")
    }

    const data = await response.json()

    const filteredSports = data.filter((sport: any) => ALLOWED_SPORTS.includes(sport.group))

    return NextResponse.json(filteredSports)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sports" }, { status: 500 })
  }
}
