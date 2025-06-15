"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  TrendingUp,
  Building2,
  Trophy,
  Flame,
  ExternalLink,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

// Componentes
import { MainBanner } from "@/components/ui/MainBanner"
import { Sidebar } from "@/components/layout/SidebarLeft"
import { Card } from "@/components/ui/Cards"

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

export default function OddDetailPage() {
  const params = useParams()
  const sport = params.sport as string
  const id = params.id as string
  const [odd, setOdd] = useState<OddsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOddDetail()
  }, [sport, id])

  const fetchOddDetail = async () => {
    try {
      const response = await fetch(`/api/odds?sport=${sport}`)
      const data = await response.json()
      const foundOdd = data.find((o: OddsData) => o.id === id)
      setOdd(foundOdd || null)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <MainBanner
          title="Carregando informações da partida..."
          image="/banners/banner.webp"
        />

        <section className="p-4 lg:p-6">
          <div className="container flex flex-col xl:flex-row gap-6">
            <Sidebar />

            <div className="space-y-4">
              <h2 className="font-semibold text-lg flex gap-2">
                <Flame className="w-8 text-green-500" />
                Odds por Casa de Apostas
              </h2>
              <p className="text-base font-normal">Carregando odds...</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (!odd) {
    return (
      <>
        <MainBanner
          title="Nenhuma partida encontrada"
          image="/banners/banner.webp"
        />

        <section className="p-4 lg:p-6">
          <div className="container flex flex-col xl:flex-row gap-6">
            <Sidebar />

            <div className="space-y-4">
              <h2 className="font-semibold text-lg flex gap-2">
                <Flame className="w-8 text-green-500" />
                Odds por Casa de Apostas
              </h2>
              <p className="text-base font-normal">Nenhuma odd encontrada para este esporte</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  const commenceDate = new Date(odd.commence_time)
  const isLive = commenceDate <= new Date()

  return (
    <>
      <MainBanner
        title={`${odd.sport_title}: ${odd.home_team} vs ${odd.away_team}`}
        image="/banners/banner.webp"
      />

      <section className="p-4 lg:p-6">
        <div className="container flex flex-col xl:flex-row gap-6">
          <Sidebar />

          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="rounded-md flex flex-col md:flex-row md:items-center md:justify-between bg-green-300 p-4 gap-4">
                <div className="space-y-2">
                  <h2 className="flex gap-2 font-semibold text-lg">
                    <Trophy className="w-6" />
                    {odd.home_team} vs {odd.away_team}
                  </h2>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4" />
                      {format(commenceDate, "dd/MM/yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4" />
                      {format(commenceDate, "HH:mm", { locale: ptBR })}
                    </div>
                  </div>
                </div>

                <span className="font-semibold px-3 py-1 bg-green-500 text-stone-50 uppercase rounded-md text-sm">
                  {isLive ? "AO VIVO" : "AGENDADO"}
                </span>
              </Card>

              {odd.bookmakers.length > 0 ? (
                <>
                  <div className="space-y-6">
                    <h2 className="font-semibold text-lg flex gap-2">
                      <Flame className="w-8 text-green-500" />
                      Odds por Casa de Apostas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      {odd.bookmakers.map((bookmaker) => {
                        const bookmakerUrls: { [key: string]: string } = {
                          betfair: "https://www.betfair.com",
                          bet365: "https://www.bet365.com",
                          unibet: "https://www.unibet.com",
                          draftkings: "https://www.draftkings.com",
                          fanduel: "https://www.fanduel.com",
                          betmgm: "https://www.betmgm.com",
                          pinnacle: "https://www.pinnacle.com",
                          williamhill: "https://www.williamhill.com",
                          bovada: "https://www.bovada.lv",
                          ladbrokes: "https://www.ladbrokes.com",
                          coral: "https://www.coral.co.uk",
                          paddypower: "https://www.paddypower.com",
                          marathonbet: "https://www.marathonbet.com",
                          betway: "https://www.betway.com",
                          "888sport": "https://www.888sport.com",
                          bwin: "https://www.bwin.com",
                          betonline: "https://www.betonline.ag",
                          betvictor: "https://www.betvictor.com",
                          skybet: "https://www.skybet.com",
                          betfred: "https://www.betfred.com",
                        }
                        const bookmakerUrl = bookmakerUrls[bookmaker.key] || "#"

                        return (
                          <motion.div
                            key={bookmaker.key}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="border rounded-md overflow-hidden"
                          >
                            <Card className="h-full flex flex-col">
                              <div className="bg-green-100 p-4 flex items-center gap-2">
                                <Building2 className="w-8 text-green-500" />
                                <div>
                                  <h3 className="font-semibold text-sm">{bookmaker.title}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    Atualizado em:{" "}
                                    {format(new Date(bookmaker.last_update), "dd/MM/yyyy HH:mm", {
                                      locale: ptBR,
                                    })}
                                  </p>
                                </div>
                              </div>

                              <div className="p-4 flex-grow">
                                {bookmaker.markets.map((market) => (
                                  <div key={market.key} className="space-y-3 mb-4">
                                    <h4 className="font-semibold text-sm">
                                      {market.key === "h2h" ? "Resultado Final" : market.key}
                                    </h4>
                                    <div className="flex-col justify-center items-center gap-2 xl:gap-4 p-2 flex xl:flex-row">
                                      {market.outcomes.map((outcome) => (
                                        <div
                                          key={outcome.name}
                                          className="text-sm border p-2 w-full hover:text-green-500 hover:border-green-500"
                                        >
                                          <span className="font-medium truncate">
                                            {outcome.name} <b>{outcome.price.toFixed(2)}</b>
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="p-4 border-t">
                                <Link
                                  href={bookmakerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full uppercase text-base flex items-center justify-center px-4 py-2 border border-green-500 bg-green-500 hover:bg-transparent hover:border-green-500 text-white font-semibold rounded-md transition duration-300 hover:text-stone-950 gap-2"
                                >
                                  <ExternalLink className="w-4" />
                                  Apostar na {bookmaker.title}
                                </Link>
                              </div>
                            </Card>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  <Card className="space-y-6">
                    <h2 className="font-semibold text-lg flex gap-2">
                      <TrendingUp className="w-8 text-green-500" />
                      Resumo das Melhores Odds
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(() => {
                        const allOutcomes: { [key: string]: { price: number; bookmaker: string }[] } = {}

                        odd.bookmakers.forEach((bookmaker) => {
                          bookmaker.markets.forEach((market) => {
                            if (market.key === "h2h") {
                              market.outcomes.forEach((outcome) => {
                                if (!allOutcomes[outcome.name]) {
                                  allOutcomes[outcome.name] = []
                                }
                                allOutcomes[outcome.name].push({
                                  price: outcome.price,
                                  bookmaker: bookmaker.title,
                                })
                              })
                            }
                          })
                        })

                        return Object.entries(allOutcomes).map(([team, odds]) => {
                          const bestOdd = odds.reduce((best, current) =>
                            current.price > best.price ? current : best
                          )

                          return (
                            <div key={team} className="p-4 border rounded-md">
                              <h4 className="font-semibold text-base mb-2">{team}</h4>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  Melhor odd: {bestOdd.bookmaker}
                                </span>
                                <b>{bestOdd.price.toFixed(2)}</b>
                              </div>
                            </div>
                          )
                        })
                      })()}
                    </div>
                  </Card>
                </>
              ) : (
                <Card>
                  <p className="text-base font-normal">Nenhuma odd encontrada.</p>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
