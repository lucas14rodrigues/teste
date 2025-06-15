"use client"

//Componentes
import { SportsSidebar } from "@/components/sports/SportsSidebar"
import { FavoritesSection } from "@/components/favorites/FavoritesSection"

export function Sidebar() {


    return (
        <>
            <div className="static w-full flex xl:pl-4 xl:pr-4 space-y-6 flex-col xl:h-[700px] lg:overflow-y-auto xl:sticky xl:top-0 xl:w-[400px]">
                <FavoritesSection />
                <SportsSidebar />
            </div>

        </>
    )
}
