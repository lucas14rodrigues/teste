import MinhaContaPage from "@/components/pages/MinhaContaPage"
import { Metadata } from "next"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: { sport: string } }): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/minha-conta/`

  return {
   title: "Minha Conta | Ana Gaming",
  description: "Gerencie suas informações.",
    alternates: {
      canonical: fullUrl,
    },
  }
}

export default function Page() {
  return <MinhaContaPage />
}
