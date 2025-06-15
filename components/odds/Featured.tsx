"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Flame } from "lucide-react"
import { sortOddsByDate, getRandomSports, removeDuplicateOdds } from "@/lib/utils"

// Componentes
import { OddRow } from "@/components/odds/OddsRow"
import { Card } from "@/components/ui/Cards"

interface Sport {
  key: string
  group: string
  title: string
  description: string
  active: boolean
  has_outrights: boolean
}

interface OddData {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Array<{
    key: string
    title: string
    markets: Array<{
      key: string
      outcomes: Array<{
        name: string
        price: number
      }>
    }>
  }>
}

interface SportWithOdds {
  sport: Sport
  odds: OddData[]
}

export function FeaturedOdds() {
  const [allSports, setAllSports] = useState<Sport[]>([])
  const [selectedSportsWithOdds, setSelectedSportsWithOdds] = useState<SportWithOdds[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchAllSportsAndOdds()
  }, [])

  const fetchAllSportsAndOdds = async (refresh = false) => {
    if (refresh) setRefreshing(true)
    else setLoading(true)

    try {
      const sportsResponse = await fetch("/api/sports")

      const allSportsData: Sport[] = await sportsResponse.json()

      setAllSports(allSportsData)

      const activeSports = allSportsData.filter((sport) => sport.active)

      const randomSports = getRandomSports(activeSports, 8)

      await fetchOddsForSelectedSports(randomSports)
    } catch (error) {
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchOddsForSelectedSports = async (sports: Sport[]) => {
    const sportsWithOddsData: SportWithOdds[] = []

    for (const sport of sports) {
      try {
        const oddsResponse = await fetch(`/api/odds?sport=${sport.key}`)

        if (!oddsResponse.ok) {
          continue
        }

        const oddsData = await oddsResponse.json()

        if (!Array.isArray(oddsData) || oddsData.length === 0) {
          continue
        }

        const cleanedOdds = removeDuplicateOdds(oddsData)
        const sortedOdds = sortOddsByDate(cleanedOdds)
        const limitedOdds = sortedOdds.slice(0, 4)

        sportsWithOddsData.push({
          sport: sport,
          odds: limitedOdds,
        })
      } catch (error) {}

      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    if (sportsWithOddsData.length > 0) {
      setSelectedSportsWithOdds(sportsWithOddsData)
    }
  }
  const getBestOdds = (bookmakers: any[]) => {
    if (!bookmakers || bookmakers.length === 0) return null

    const allOutcomes: { [key: string]: number[] } = {}

    bookmakers.forEach((bookmaker) => {
      bookmaker.markets?.forEach((market: any) => {
        if (market.key === "h2h") {
          market.outcomes?.forEach((outcome: any) => {
            if (!allOutcomes[outcome.name]) {
              allOutcomes[outcome.name] = []
            }
            allOutcomes[outcome.name].push(outcome.price)
          })
        }
      })
    })

    const teams = Object.keys(allOutcomes)
    if (teams.length < 2) return null

    const bestOdds: any = {}
    teams.forEach((team) => {
      bestOdds[team] = Math.max(...allOutcomes[team])
    })

    return bestOdds
  }

  if (loading) {
    return (
      <Card className="space-y-4">
        <h2 className="font-semibold text-lg flex gap-2">
          <Flame className="w-8 text-green-500" /> Odds em destaque
        </h2>
        <p className="text-base font-normal">Carregando odds...</p>
      </Card>
    )
  }

  return (
    <Card className="space-y-4">
      <h2 className="font-semibold text-lg flex gap-2">
        <Flame className="w-8 text-green-500" /> Odds em destaque
      </h2>

      <div>
        {selectedSportsWithOdds.map((sportWithOdds, sportIndex) => (
          <motion.div
            key={sportWithOdds.sport.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: sportIndex * 0.1 }}
          >
            <div className="border-b-green-500 border-b-2 border-[0] p-4 flex items-center gap-2">
              <Trophy className="w-8 text-green-500" />
              <div>
                <h3 className="font-semibold text-sm uppercase flex gap-2">{sportWithOdds.sport.title}</h3>
                <p className="text-xs">{sportWithOdds.sport.description}</p>
              </div>
            </div>

            <div>
              {sportWithOdds.odds.map((odd, oddIndex) => {
                const bestOdds = getBestOdds(odd.bookmakers)

                return (
                  <motion.div
                    key={odd.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: oddIndex * 0.05 }}
                  >
                    <OddRow odd={odd} bestOdds={bestOdds} />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
