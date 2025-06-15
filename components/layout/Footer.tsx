import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 text-white">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              unoptimized
              width={90}
              height={90}
              src="/global/logo-branca.webp"
              alt="Ana Gaming"
              title="Ana Gaming"
            />
            <p className="text-base font-normal text-stone-50">
              Acompanhe suas apostas esportivas ao vivo com dados atualizados, odds em tempo real e resultados organizados em uma interface intuitiva.
            </p>
            <div className="flex gap-2">
              <a href="#" className="text-stone-50 hover:text-green-500">
                <Facebook className="w-8" />
              </a>
              <a href="#" className="text-stone-50 hover:text-green-500">
                <Twitter className="w-8" />
              </a>
              <a href="#" className="text-stone-50 hover:text-green-500">
                <Instagram className="w-8" />
              </a>
              <a href="#" className="text-stone-50 hover:text-green-500">
                <Youtube className="w-8" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  Esportes
                </Link>
              </li>
              <li>
                <Link href="/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  Ajuda
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase">Esportes Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/odds/soccer_brazil_campeonato/"
                  className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors"
                >
                  Futebol Brasileiro
                </Link>
              </li>
              <li>
                <Link href="/odds/soccer_epl/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  Premier League
                </Link>
              </li>
              <li>
                <Link href="/odds/basketball_nba/" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  NBA
                </Link>
              </li>
              <li>
                <Link
                  href="/odds/americanfootball_nfl/"
                  className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors"
                >
                  NFL
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm uppercase">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:contato@anagaming.com.br"
                  className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors"
                >
                  contato@anagaming.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+551199999999" className="text-stone-50 text-base font-normal hover:text-green-500 transition-colors">
                  +55 11 9999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 text-left lg:text-center text-sm text-stone-50">
          <p>&copy; {currentYear} Ana Gaming. Todos os direitos reservados.</p>
          <p className="mt-2">
            Este site é apenas para fins informativos e não promove apostas. Proibido para menores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  )
}
