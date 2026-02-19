"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { UtensilsCrossed, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('¡Bienvenido, Chef!')
        // Usamos window.location para forzar una recarga completa y asegurar que el middleware detecte la cookie
        window.location.href = '/admin'
      } else {
        toast.error(data.error || 'Credenciales incorrectas')
      }
    } catch (error) {
      toast.error('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#0a0605] overflow-hidden">
      {/* Background with texture & overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/restaurant-interior.jpg"
          alt="Atmosphere"
          fill
          className="object-cover opacity-20 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0605] via-transparent to-[#0a0605]" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] px-6 flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden border border-white/5">
        {/* Left Side: Branding (Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/2 bg-primary/10 backdrop-blur-xl p-12 flex-col justify-center items-center text-center space-y-6">
          <div className="relative w-48 h-48 animate-logo-float">
            <Image src="/images/logo.png" alt="Chavela" fill className="object-contain" />
          </div>
          <div>
            <h2 className="font-serif text-4xl text-white mb-2">Chavela</h2>
            <p className="text-primary tracking-[0.3em] font-bold uppercase text-sm">Control Panel</p>
          </div>
          <p className="text-muted-foreground/60 italic text-pretty">
            "Donde el alma de México encuentra su lugar"
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 bg-[#14100f] p-8 md:p-12">
          {/* Mobile Header */}
          <div className="md:hidden flex flex-col items-center mb-10 text-center">
            <div className="relative w-24 h-24 mb-4">
              <Image src="/images/logo.png" alt="Chavela" fill className="object-contain" />
            </div>
            <h1 className="text-2xl font-serif text-white">Chavela CMS</h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Iniciar Sesión</h2>
              <p className="text-muted-foreground text-sm">Ingresa tus datos para acceder al panel</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    Usuario
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Nombre de usuario"
                      required
                      disabled={isLoading}
                      className="bg-black/20 border-white/5 pl-10 h-12 focus-visible:ring-primary/40 focus-visible:border-primary/50 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Contraseña
                    </Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="bg-black/20 border-white/5 pl-10 pr-10 h-12 focus-visible:ring-primary/40 focus-visible:border-primary/50 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <UtensilsCrossed className="animate-spin mr-2 h-4 w-4" />
                    Cargando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center w-full">
                    Ingresar al Panel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-logo-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
