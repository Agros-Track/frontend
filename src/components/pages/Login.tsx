"use client"

import type React from "react"

import { useState } from "react"
import { Beef, Mail, Lock, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Alert, AlertDescription } from "../ui/alert"
import { authService } from "../../services/authService"
import { toast } from "sonner"

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("🔐 Intentando login con:", email);

      const response = await authService.login({ email, password });

      console.log("✅ Login exitoso:", response);

      // Guardar información del usuario
      localStorage.setItem("userRole", response.user.role.slug);
      localStorage.setItem("userEmail", response.user.email);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("userId", response.user.id);

      toast.success(`Bienvenido, ${response.user.name}`);

      // Redirigir según el rol
      const role = response.user?.role?.slug || "";

      if (role === "SUPER_ADMIN") {
        navigate("/super-admin");

      } else if (role === "ADMIN_TENANT") {
        const hasOnboarded = localStorage.getItem("hasOnboarded");
        
        if (!hasOnboarded) {
          localStorage.setItem("hasOnboarded", "true");
          navigate("/onboarding");
        } else {
          navigate("/admin");
        }
      
      } else if (role === "VETERINARIO") {
        navigate("/veterinario");
      
      } else if ( role === "TRABAJADOR") {
        navigate("/worker");
      }
    
    } catch (error: any) {
      console.error("❌ Error en login:", error);

      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Credenciales inválidas. Por favor intenta de nuevo.";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-background pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-card shadow-2xl border border-border/50 overflow-hidden backdrop-blur-xl">
          {/* Minimalist header */}
          <div className="p-10 text-center border-b border-border/50">
            <div className="mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Beef className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2 tracking-tight">AgroTrack</h1>
            <p className="text-sm text-muted-foreground">Sistema de Gestión Ganadera</p>
          </div>

          {/* Form content */}
          <div className="p-10 space-y-6">
            {/* Welcome message */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold text-foreground tracking-tight">Bienvenido</h2>
              <p className="text-sm text-muted-foreground">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Error alert */}
            {error && (
              <Alert variant="destructive" className="border-0 bg-destructive/10 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-11 h-12 bg-muted/50 border-border rounded-xl focus:bg-background transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Contraseña
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-11 h-12 bg-muted/50 border-border rounded-xl focus:bg-background transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-12 text-white font-semibold shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-card text-muted-foreground">Credenciales de Prueba</span>
              </div>
            </div>

            {/* Test credentials */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setEmail("superadmin@agrotrack.com")
                  setPassword("Supersecret123")
                }}
                className="w-full p-3.5 rounded-xl hover:bg-muted/50 transition-all text-left border border-border/50 bg-muted/20"
              >
                <p className="text-xs font-semibold text-warning mb-1">SUPER ADMIN</p>
                <p className="text-xs text-muted-foreground font-mono">superadmin@agrotrack.com</p>
              </button>

              <button
                onClick={() => {
                  setEmail("admin.esperanza@agrotrack.com")
                  setPassword("Supersecret123")
                }}
                className="w-full p-3.5 rounded-xl hover:bg-muted/50 transition-all text-left border border-border/50 bg-muted/20"
              >
                <p className="text-xs font-semibold text-primary mb-1">ADMINISTRADOR</p>
                <p className="text-xs text-muted-foreground font-mono">admin.esperanza@agrotrack.com</p>
              </button>

              <button
                onClick={() => {
                  setEmail("vet.prado@agrotrack.com")
                  setPassword("Supersecret123")
                }}
                className="w-full p-3.5 rounded-xl hover:bg-muted/50 transition-all text-left border border-border/50 bg-muted/20"
              >
                <p className="text-xs font-semibold text-info mb-1">VETERINARIO</p>
                <p className="text-xs text-muted-foreground font-mono">vet.prado@agrotrack.com</p>
              </button>

              <button
                onClick={() => {
                  setEmail("worker1.demo@agrotrack.com")
                  setPassword("Supersecret123")
                }}
                className="w-full p-3.5 rounded-xl hover:bg-muted/50 transition-all text-left border border-border/50 bg-muted/20"
              >
                <p className="text-xs font-semibold text-foreground mb-1">TRABAJADOR</p>
                <p className="text-xs text-muted-foreground font-mono">worker1.demo@agrotrack.com</p>
              </button>
            </div>

            {/* Info text */}
            <p className="text-xs text-muted-foreground text-center pt-2">
              Contraseña para todas las cuentas: <span className="font-mono font-semibold">1234</span>
            </p>
          </div>

          {/* Footer */}
          <div className="px-10 py-5 bg-muted/20 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AgroTrack. Todos los derechos reservados.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
