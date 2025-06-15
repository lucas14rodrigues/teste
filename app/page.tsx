import HomePage from "@/components/pages/HomePage"
import { Metadata } from "next"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: { sport: string } }): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/`

  return {
    title: "Suas Apostas Esportivas em um só lugar | Ana Gaming",
    description: "Acompanhe suas apostas esportivas ao vivo com dados atualizados, odds em tempo real e resultados organizados em uma interface intuitiva.",
    alternates: {
      canonical: fullUrl,
    },
  }
}

export default function Page() {
  return <HomePage />
}
