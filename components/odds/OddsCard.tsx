"use client"

// Componentes
import { Card } from "@/components/ui/Cards"
import { OddRow } from "@/components/odds/OddsRow"

interface Bookmaker {
  key: string
  title: string
  last_update: string
  markets: Array<{
    key: string
    outcomes: Array<{
      name: string
      price: number
    }>
  }>
}

interface OddsData {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Bookmaker[]
}

interface OddsCardProps {
  odds: OddsData
}

export function OddsCard({ odds }: OddsCardProps) {
  const commenceDate = new Date(odds.commence_time)
  const isLive = commenceDate <= new Date()

  const getBestOdds = () => {
    const allOutcomes: { [key: string]: number[] } = {}

    odds.bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        if (market.key === "h2h") {
          market.outcomes.forEach((outcome) => {
            if (!allOutcomes[outcome.name]) {
              allOutcomes[outcome.name] = []
            }
            allOutcomes[outcome.name].push(outcome.price)
          })
        }
      })
    })

    const bestOdds: { [key: string]: number } = {}
    Object.keys(allOutcomes).forEach((team) => {
      bestOdds[team] = Math.max(...allOutcomes[team])
    })

    return bestOdds
  }

  const bestOdds = getBestOdds()

  return (
    <>
      <Card className="space-y-4">
        <OddRow odd={odds} bestOdds={bestOdds} />
      </Card>
    </>
  )
}
