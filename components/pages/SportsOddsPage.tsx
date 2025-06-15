"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Trophy } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Componentes
import { MainBanner } from "@/components/ui/MainBanner"
import { OddsCard } from "@/components/odds/OddsCard"
import { Card } from "@/components/ui/Cards"
import { Sidebar } from "@/components/layout/SidebarLeft"

interface OddsData {
  id: string
  sport_key: string
  sport_title: string
  sport_description: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: Array<{
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
  }>
}

interface Sport {
  key: string
  group: string
  title: string
  description: string
  active: boolean
  has_outrights: boolean
}

export default function SportOddsPage() {
  const params = useParams()
  const sport = params.sport as string
  const [odds, setOdds] = useState<OddsData[]>([])
  const [sportInfo, setSportInfo] = useState<Sport | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchSportInfo()
    fetchOdds()
  }, [sport])

  const fetchSportInfo = async () => {
    try {
      const response = await fetch("/api/sports")
      if (response.ok) {
        const sports = await response.json()
        const foundSport = sports.find((s: Sport) => s.key === sport)
        setSportInfo(foundSport || null)
      }
    } catch (error) {
    }
  }

  const fetchOdds = async (refresh = false) => {
    if (refresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await fetch(`/api/odds?sport=${sport}`)

      if (!response.ok) {
        setOdds([])
        return
      }

      const data = await response.json()
      setOdds(data)
    } catch (error) {
      setOdds([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getLeagueName = () => {
    if (sportInfo?.description) {
      return sportInfo.description
    }
    if (odds[0]?.sport_title) {
      return odds[0].sport_title
    }
    return sport
  }

  const groupOddsByDate = () => {
    const grouped: { [key: string]: OddsData[] } = {}

    odds.forEach((odd) => {
      const date = format(new Date(odd.commence_time), "dd/MM/yyyy", { locale: ptBR })
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(odd)
    })

    return Object.entries(grouped).sort(([dateA], [dateB]) => {
      const [dayA, monthA, yearA] = dateA.split("/").map(Number)
      const [dayB, monthB, yearB] = dateB.split("/").map(Number)

      if (yearA !== yearB) return yearA - yearB
      if (monthA !== monthB) return monthA - monthB
      return dayA - dayB
    })
  }

  return (
    <>
      <MainBanner title={odds[0]?.sport_title || sport} image="/banners/banner.webp" />

      <section className="p-4 lg:p-6">
        <div className="container flex flex-col xl:flex-row gap-6">
          <Sidebar />

          <div className="w-full space-y-4">
            <h2 className="font-semibold text-lg flex gap-2">
              <Trophy className="w-8 text-green-500" />
              {getLeagueName()}
            </h2>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {loading ? (
                <Card>
                  <p className="text-base font-normal">Carregando odds...</p>
                </Card>
              ) : odds.length > 0 ? (
                <div className="space-y-4">
                  {groupOddsByDate().map(([date, dateOdds]) => (
                    <div key={date}>
                      <div className="border-b-green-500 border-b-2 border-[0] p-4 flex items-center gap-2">
                        <Calendar className="w-8 text-green-500" />
                        <h3 className="font-semibold text-sm uppercase">{date}</h3>
                      </div>

                      <div>
                        {dateOdds.map((odd) => (
                          <OddsCard key={odd.id} odds={odd} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <p className="text-base font-normal">Nenhuma odd encontrada para este esporte</p>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
