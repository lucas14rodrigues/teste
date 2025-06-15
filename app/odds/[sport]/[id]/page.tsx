import OddDetailPage from "@/components/pages/OddDetailPage"
import { Metadata } from "next"
import { headers } from "next/headers"

interface Params {
  sport: string
  id: string
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/odds/${params.sport}/${params.id}`

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
