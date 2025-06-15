// Componentes
import { MainBanner } from "@/components/ui/MainBanner"
import { FeaturedOdds } from "@/components/odds/Featured"
import { Sidebar } from "@/components/layout/SidebarLeft"

export default function HomePage() {
  return (
    <>
      <MainBanner
        title='As melhores <span style="color: oklch(72.3% 0.219 149.579)">Apostas Esportivas</span><br> em um só lugar'
        description="Fique por dentro das apostas esportivas e odds mais altas com nosso comparador ao vivo."
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
