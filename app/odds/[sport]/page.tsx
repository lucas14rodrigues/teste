import SportOddsPage from "@/components/pages/SportsOddsPage"
import type { Metadata } from "next"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/odds/${resolvedParams.sport}`

  return {
    title: "Odds por Esporte | Ana Gaming",
    description: "Confira as odds atualizadas dos principais esportes na Ana Gaming.",
    alternates: {
      canonical: fullUrl,
    },
  }
}

export default function Page() {
  return <SportOddsPage />
}
