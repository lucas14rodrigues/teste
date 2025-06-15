"use client"

import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import type { Metadata } from "next"
import { Heart, Trophy, Settings, Activity, Bell, Shield, Clock } from "lucide-react"

// Componentes
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card } from "@/components/ui/Cards"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { useFavorites } from "@/components/providers/FavoritesProvider"
import { MainBanner } from "@/components/ui/MainBanner"

export default function MinhaContaPage() {
    const { data: session } = useSession()
    const { favorites } = useFavorites()

    if (!session) {
        return null
    }

    return (
        <>
            <MainBanner
                title="Minha Conta"
                image="/banners/banner.webp"
            />

            <section className="p-4 lg:p-6">
                <div className="container flex flex-col xl:flex-row gap-6">
                    <div className="w-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <Card className="p-4 bg-stone-900 text-stone-50">
                                <div className="flex items-center flex-col md:flex-row gap-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                        <AvatarFallback className="text-3xl bg-green-500">
                                            {session.user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <h2 className="font-semibold text-lg">{session.user?.name}</h2>
                                        <p className="text-base font-normal">{session.user?.email}</p>
                                    </div>
                                </div>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="p-6 bg-stone-900 text-stone-50">
                                    <div className="flex flex-row items-center justify-between space-y-0">
                                        <div className="font-semibold text-sm uppercase">Esportes Favoritos</div>
                                        <Heart className="w-8 text-green-500" />
                                    </div>
                                    <div className="pt-4">
                                        <div className="font-semibold text-3xl">{favorites.length}</div>
                                        <p className="text-base font-normal">categorias adicionadas</p>
                                    </div>
                                </Card>

                                <Card className="p-6 bg-stone-900 text-stone-50">
                                    <div className="flex flex-row items-center justify-between space-y-0">
                                        <div className="font-semibold text-sm uppercase">Atividade</div>
                                        <Activity className="w-8 text-green-500" />
                                    </div>
                                    <div className="pt-4">
                                        <div className="font-semibold text-3xl">24</div>
                                        <p className="text-base font-normal">odds visualizadas hoje</p>
                                    </div>
                                </Card>

                                <Card className="p-6 bg-stone-900 text-stone-50">
                                    <div className="flex flex-row items-center justify-between space-y-0">
                                        <div className="font-semibold text-sm uppercase">Esportes Ativos</div>
                                        <Trophy className="w-8 text-green-500" />
                                    </div>
                                    <div className="pt-4">
                                        <div className="font-semibold text-3xl">{favorites.filter((f) => f.active).length}</div>
                                        <p className="text-base font-normal">com odds disponíveis</p>
                                    </div>
                                </Card>
                            </div>

                            <Card className="p-6 bg-stone-900 text-stone-50">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Settings className="w-8 text-green-500" />
                                        <h2 className="font-semibold text-lg">Configurações da Conta</h2>
                                    </div>
                                    <div className="text-base font-normal">Gerencie suas preferências e configurações</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col gap-6 witems-center justify-between p-4 border border-stone-700 rounded-md lg:flex-row hover:border-green-500">
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-8 text-green-500" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Notificações</h4>
                                                <p className="text-base font-normal">Receber alertas sobre odds favoritas</p>
                                            </div>
                                        </div>
                                        <Button className="bg-green-500 hover:bg-green-600">Configurar</Button>
                                    </div>

                                    <div className="flex flex-col gap-6 witems-center justify-between p-4 border border-stone-700 rounded-md lg:flex-row hover:border-green-500">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-8 text-green-500" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Privacidade</h4>
                                                <p className="text-base font-normal">Controle suas informações pessoais</p>
                                            </div>
                                        </div>
                                        <Button className="bg-green-500 hover:bg-green-600">Gerenciar</Button>
                                    </div>

                                    <div className="flex flex-col gap-6 witems-center justify-between p-4 border border-stone-700 rounded-md lg:flex-row hover:border-green-500">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-8 text-green-500" />
                                            <div>
                                                <h4 className="font-semibold text-sm">Sessões Ativas</h4>
                                                <p className="text-base font-normal">Gerencie dispositivos conectados</p>
                                            </div>
                                        </div>
                                        <Button className="bg-green-500 hover:bg-green-600">Verificar</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
