"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Search, Trophy, Medal, Heart } from "lucide-react"
import Link from "next/link"
import { useFavorites } from "@/components/providers/FavoritesProvider"
import { groupSportsByGroup, filterSportsBySearch, debounceSearch } from "@/lib/utils"

// Componentes
import { Card } from "@/components/ui/Cards"
import { Input } from "@/components/ui/Input"

interface Sport {
  key: string
  group: string
  title: string
  description: string
  active: boolean
  has_outrights: boolean
}

export function SportsSidebar() {
  const [sports, setSports] = useState<Sport[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSports, setExpandedSports] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    fetchSports()
  }, [])

  useEffect(() => {
    debounceSearch(setDebouncedSearchTerm, searchTerm)
  }, [searchTerm])

  const fetchSports = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/sports")
      const data = await response.json()

      const groupedSports = data.sort((a: Sport, b: Sport) => {
        if (a.group < b.group) return -1
        if (a.group > b.group) return 1

        return a.title.localeCompare(b.title)
      })

      setSports(groupedSports)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const toggleSport = (sportKey: string) => {
    const newExpanded = new Set(expandedSports)
    if (newExpanded.has(sportKey)) {
      newExpanded.delete(sportKey)
    } else {
      newExpanded.add(sportKey)
    }
    setExpandedSports(newExpanded)
  }

  const createLeagueId = (sport: Sport) => {
    return `${sport.key}-${sport.description.replace(/\s+/g, "-").toLowerCase()}`
  }

  const toggleLeagueFavorite = (sport: Sport, e: React.MouseEvent) => {
    e.stopPropagation()

    const leagueId = createLeagueId(sport)

    if (isFavorite(leagueId)) {
      removeFavorite(leagueId)
    } else {
      const league = {
        id: leagueId,
        sportKey: sport.key,
        sportTitle: sport.title,
        sportGroup: sport.group,
        leagueName: sport.description,
        active: sport.active,
        has_outrights: sport.has_outrights,
      }
      addFavorite(league)
    }
  }

  const filteredSports = filterSportsBySearch(sports, debouncedSearchTerm)
  const sportsByGroup = groupSportsByGroup(filteredSports)

  return (
    <Card className="flex flex-col justify-center box-border space-y-2">
      <h2 className="font-semibold text-lg flex gap-2">
        <Trophy className="text-green-500 w-8" /> Esportes
      </h2>

      <div className="relative mb-4 flex items-center">
        <Search className="absolute text-green-500 left-2" />
        <Input
          placeholder="Buscar esportes e ligas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {Object.entries(sportsByGroup).map(([group, groupSports]) => (
          <div key={group} className="space-y-2">
            <h3 className="font-semibold text-sm uppercase flex gap-2">
              <Medal className="text-green-500 w-8" /> {group}
            </h3>

            <div className="space-y-1">
              {groupSports.map((sport) => (
                <div key={sport.key} className="space-y-1">
                  <div
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-accent hover:text-green-500 ${
                      expandedSports.has(sport.key) ? "bg-accent" : ""
                    }`}
                    onClick={() => toggleSport(sport.key)}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {expandedSports.has(sport.key) ? (
                        <ChevronDown className="w-4" />
                      ) : (
                        <ChevronRight className="w-4" />
                      )}
                      <h4 className="text-sm">{sport.title}</h4>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedSports.has(sport.key) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-1">
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors">
                            <Link href={`/odds/${sport.key}`}>
                              <h5 className="flex items-center gap-2 text-sm hover:text-green-500">
                                {sport.description}
                              </h5>
                            </Link>

                            <span className="cursor-pointer" onClick={(e) => toggleLeagueFavorite(sport, e)}>
                              <Heart
                                className={`w-4 ${
                                  isFavorite(createLeagueId(sport))
                                    ? "fill-green-500 text-green-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredSports.length === 0 && (
          <div className="flex flex-col justify-center box-border space-y-2">
            <p className="text-sm">Nenhum esporte encontrado</p>
          </div>
        )}
      </div>
    </Card>
  )
}
