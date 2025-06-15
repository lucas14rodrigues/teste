"use client"

import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User } from "lucide-react"

// Componentes
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Cards"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push("/")
            }
        })
    }, [router])

    const handleGithubSignIn = async () => {
        setIsLoading(true)
        try {
            await signIn("github", { callbackUrl: "/" })
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-[500px] flex items-center justify-center bg-stone-950 text-stone-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="text-stone-50 text-center bg-stone-900 p-4 space-y-4">
                    <h1 className="text-stone-50 font-bold text-2xl md:text-4xl sm:text-3xl">Login</h1>
                    <p className="text-base font-normal">Entre com sua conta GitHub para acessar a plataforma</p>

                    <Button onClick={handleGithubSignIn} className="w-full flex gap-2 mr-auto ml-auto">
                        <User className="h-8" />
                        <span>Entrar</span>
                    </Button>
                </Card>
            </motion.div>
        </div>
    )
}
