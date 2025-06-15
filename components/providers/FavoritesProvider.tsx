"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface League {
  id: string
  sportKey: string
  sportTitle: string
  sportGroup: string
  leagueName: string
  active: boolean
  has_outrights: boolean
}

interface FavoritesContextType {
  favorites: League[]
  addFavorite: (league: League) => void
  removeFavorite: (leagueId: string) => void
  reorderFavorites: (reorderedFavorites: League[]) => void
  isFavorite: (leagueId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<League[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("ana-gaming-favorites-leagues")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        localStorage.removeItem("ana-gaming-favorites-leagues")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ana-gaming-favorites-leagues", JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (league: League) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === league.id)) return prev
      return [...prev, league]
    })
  }

  const removeFavorite = (leagueId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== leagueId))
  }

  const reorderFavorites = (reorderedFavorites: League[]) => {
    setFavorites(reorderedFavorites)
  }

  const isFavorite = (leagueId: string) => {
    return favorites.some((fav) => fav.id === leagueId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        reorderFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
