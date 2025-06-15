import LoginPage from "@/components/pages/LoginPage"
import { Metadata } from "next"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: { sport: string } }): Promise<Metadata> {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"

  const fullUrl = `${protocol}://${host}/login/`

  return {
    title: "Login | Ana Gaming",
    description: "Entre com sua conta para acessar a plataform",
    alternates: {
      canonical: fullUrl,
    },
  }
}

export default function Page() {
  return <LoginPage />
}
