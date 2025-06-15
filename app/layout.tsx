import type React from "react"
import "@/styles/index.css"
import Script from 'next/script';

// Componentes
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AuthProvider } from "@/components/providers/AuthProvider"
import { FavoritesProvider } from "@/components/providers/FavoritesProvider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:title" content="Ana Gaming - Apostas Online com Emoção e Segurança" />
        <meta property="og:description" content="Descubra a emoção das apostas online na Ana Gaming. Esportes, cassino, roleta e muito mais com bônus incríveis e total segurança. Jogue agora!" />
        <meta property="og:image" content="https://www.anagaming.com.br/global/logo.webp" />
        <meta property="og:url" content="https://www.anagaming.com.br/" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />

        <Script
          id="structured-data-anagaming"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization"],
                  "@id": "https://www.anagaming.com.br/#org",
                  "name": "Ana Gaming Brasil",
                  "url": "https://www.anagaming.com.br/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.anagaming.com.br/ANA%20GAMING%20ZIP_arquivos/ANA-GAMING-BRASIL-BRANCOSVG_.webp",
                    "width": 200,
                    "height": 200
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Alameda Oscar Niemeyer, 132, Andar 12 Sala 1202",
                    "addressLocality": "Nova Lima",
                    "addressRegion": "MG",
                    "postalCode": "34006-049",
                    "addressCountry": "BR"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/ana-gaming/"
                  ],
                  "description": "A Ana Gaming Brasil representa importantes marcas líderes em jogos online e apostas esportivas. Oferecemos plataformas inovadoras, experiências envolventes e uma comunidade ativa."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.anagaming.com.br/#website",
                  "url": "https://www.anagaming.com.br/",
                  "name": "Ana Gaming Brasil",
                  "inLanguage": "pt-BR",
                  "publisher": {
                    "@id": "https://www.anagaming.com.br/#org"
                  }
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.anagaming.com.br/#webpage",
                  "url": "https://www.anagaming.com.br/",
                  "name": "Ana Gaming Brasil",
                  "isPartOf": {
                    "@id": "https://www.anagaming.com.br/#website"
                  },
                  "inLanguage": "pt-BR",
                  "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": "https://www.anagaming.com.br/ANA%20GAMING%20ZIP_arquivos/PNG_HEADER.webp"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            {children}
            <Footer />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
