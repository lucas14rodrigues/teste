"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { User, LogOut, Menu, X, Trophy, Info, HelpCircle, Mail } from "lucide-react"
import { useState, useEffect } from "react"

// Componentes
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { AlternativeButton } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Esportes", href: "/", icon: <Trophy className="w-5" /> },
    { name: "Sobre", href: "/", icon: <Info className="w-5" /> },
    { name: "Ajuda", href: "/", icon: <HelpCircle className="w-5" /> },
    { name: "Contato", href: "/", icon: <Mail className="w-5" /> },
  ]

  return (
    <>
      <header className={`bg-stone-950 p-4 sticky top-0 z-50`}>
        <div className="container flex justify-between items-center">

          <div className="flex items-center">
            <Link href="/" title="Ana Gaming">
              <Image
                unoptimized
                width={90}
                height={90}
                src="/global/logo-branca.webp"
                alt="Ana Gaming"
                title="Ana Gaming"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6">

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold uppercase text-stone-400 hover:text-green-500 flex items-center gap-2"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>

                    <span className="text-stone-50 text-xs font-semibold hidden hover:text-green-500 md:inline">{session.user?.name}</span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/minha-conta/" title="Minha Conta" className="flex gap-2 text-xs cursor-pointer items-center">
                      <User className="w-4" />
                      Minha Conta
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="flex gap-2 text-xs cursor-pointer items-center" onSelect={() => signOut()}>
                    <LogOut className="w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login/" title="Entrar">
                <AlternativeButton><User className="w-5" /> Entrar</AlternativeButton>
              </Link>
            )}

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-stone-950 border-t border-stone-800 p-4">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold uppercase text-stone-400 hover:text-green-500 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
