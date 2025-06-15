// Componentes
import { MainBanner } from "@/components/ui/MainBanner"
import { FeaturedOdds } from "@/components/odds/Featured"
import { Sidebar } from "@/components/layout/SidebarLeft"

export default function HomePage() {
  return (
    <>
      <MainBanner
        title='Ana Gaming, visualize suas <br> <span style="color: oklch(72.3% 0.219 149.579)">Apostas Esportivas em um só lugar</span>'
        description="Acompanhe suas apostas esportivas ao vivo com dados atualizados, odds em tempo real <br> e resultados organizados em uma interface intuitiva."
        image="/banners/banner.webp"
      />

      <section className="p-4 lg:p-6">
        <div className="container flex flex-col xl:flex-row gap-6">
          <Sidebar />

          <div className="w-full">
            <FeaturedOdds />
          </div>
        </div>
      </section>
    </>
  )
}
