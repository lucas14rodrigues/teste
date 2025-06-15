"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, Reorder } from "framer-motion"
import { Heart, Eye } from "lucide-react"

// Componentes
import { useFavorites } from "@/components/providers/FavoritesProvider"
import { Card } from "@/components/ui/Cards"

export function FavoritesSection() {
  const { favorites, reorderFavorites, removeFavorite } = useFavorites()
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  if (favorites.length === 0) {
    return (
      <Card className="flex flex-col justify-center box-border space-y-2">
        <Heart className="w-8 text-green-500" />
        <h2 className="font-semibold text-lg">Nenhum favorito ainda</h2>
        <p className="text-base font-normal">Adicione esportes aos seus favoritos para organizá-los aqui.</p>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col justify-center box-border space-y-2"> 
      <Heart className="w-8 text-green-500" />
      <h2 className="font-semibold text-lg">Ligas Favoritas</h2>
      <p className="text-base font-normal">Arraste e solte para reorganizar suas categorias favoritas</p>

      <Reorder.Group axis="y" values={favorites} onReorder={reorderFavorites}>
        {favorites.map((league) => (
          <Reorder.Item
            key={league.id}
            value={league}
            onDragStart={() => setDraggedItem(league.id)}
            onDragEnd={() => setDraggedItem(null)}
            className={`${draggedItem === league.id ? "z-10" : ""}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, rotate: 2 }}
              className="w-full border-b-green-500 border-[0] border-b-2 border-b relative box-border flex items-center gap-4 p-2 border cursor-grab active:cursor-grabbing justify-between mt-2"
            >
              <div className="flex items-center">
                <h3 className="text-xs font-medium">{league.leagueName}</h3>
              </div>

              <div className="flex gap-2">
                <Link
                  href={
                    league.id.includes("outrights") ? `/odds/${league.sportKey}/outrights` : `/odds/${league.sportKey}`
                  }

                  title="Ver mais"
                >
                  <Eye className="w-5" />
                </Link>

                <a onClick={() => removeFavorite(league.id)}>
                  <Heart className="w-5 text-green-500 fill-green-500" />
                </a>
              </div>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Card>
  )
}
