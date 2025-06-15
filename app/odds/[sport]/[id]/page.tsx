import OddDetailPage from "@/components/pages/OddDetailPage"
import type { Metadata } from "next"
import { headers } from "next/headers"

interface Params {
  sport: string
  id: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/odds/${resolvedParams.sport}/${resolvedParams.id}`

  return {
    title: "Odds por Casa de Aposta | Ana Gaming",
    description: "Confira as odds por Casa de Aposta atualizadas na Ana Gaming.",
    alternates: {
      canonical: fullUrl,
    },
  }
}

export default function Page() {
  return <OddDetailPage />
}
