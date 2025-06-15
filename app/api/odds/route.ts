import { NextResponse } from "next/server";

const API_KEY = "6490c7f9bda2f77df605ed03621f7b53";
const BASE_URL = "https://api.the-odds-api.com/v4";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport") || "upcoming";
  const regions = searchParams.get("regions") || "us";
  const markets = searchParams.get("markets") || "h2h";

  if (sport.includes("_winner")) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/sports/${sport}/odds?apiKey=${API_KEY}&regions=${regions}&markets=${markets}&oddsFormat=decimal&dateFormat=iso`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch odds");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch odds" }, { status: 500 });
  }
}
