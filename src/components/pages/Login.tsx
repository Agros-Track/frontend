import { useState } from 'react'
import { Beef, Mail, Lock, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription } from '../ui/alert'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (email === 'alex@gmail.com' && password === '1234') {
        localStorage.setItem('userRole', 'admin')
        localStorage.setItem('userEmail', email)
        const hasOnboarded = localStorage.getItem('hasOnboarded')
        if (!hasOnboarded) {
          localStorage.setItem('hasOnboarded', 'true')
          navigate('/onboarding')
        } else {
          navigate('/admin')
        }
        return
      }

      if (email === 'jose@gmail.com' && password === '1234') {
        localStorage.setItem('userRole', 'super-admin')
        localStorage.setItem('userEmail', email)
        navigate('/super-admin')
        return
      }

      if (email === 'carlos@gmail.com' && password === '1234') {
        localStorage.setItem('userRole', 'veterinario')
        localStorage.setItem('userEmail', email)
        navigate('/veterinario')
        return
      }

      if (email === 'juan@gmail.com' && password === '1234') {
        localStorage.setItem('userRole', 'worker')
        localStorage.setItem('userEmail', email)
        navigate('/worker')
        return
      }

      setError('Credenciales inválidas. Por favor intenta de nuevo.')
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 opacity-10 rounded-full blur-3xl" style={{ backgroundColor: 'var(--green-pastel)' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 opacity-10 rounded-full blur-3xl" style={{ backgroundColor: 'var(--blue-light)' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-card shadow-xl border-border overflow-hidden">
          {/* Header with Gradient */}
          <div className="p-8 text-white relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to right, var(--green-dark), var(--green-pastel))' }}>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                <Beef className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AgroTrack</h1>
                <p className="text-white/80 text-sm">Sistema de Gestión Ganadera</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Bienvenido</h2>
              <p className="text-sm text-muted-foreground">
                Accede a tu cuenta para continuar
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-0 bg-destructive/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 h-11 bg-background/50 border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-background/50 border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full h-11 text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--green-dark), var(--green-pastel))',
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">Credenciales de Prueba</span>
              </div>
            </div>

            {/* Test Credentials */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEmail('alex@gmail.com')
                  setPassword('1234')
                }}
                className="w-full p-3 rounded-lg hover:opacity-80 transition-colors text-left group"
                style={{
                  backgroundColor: 'rgba(168, 213, 186, 0.1)',
                  borderColor: 'var(--green-pastel)',
                  borderWidth: '1px'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-primary">ADMINISTRADOR</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">alex@gmail.com</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setEmail('jose@gmail.com')
                  setPassword('1234')
                }}
                className="w-full p-3 rounded-lg hover:opacity-80 transition-colors text-left group"
                style={{
                  backgroundColor: 'rgba(246, 168, 0, 0.1)',
                  borderColor: 'var(--orange-soft)',
                  borderWidth: '1px'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--orange-soft)' }}>SUPER ADMIN</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">jose@gmail.com</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setEmail('carlos@gmail.com')
                  setPassword('1234')
                }}
                className="w-full p-3 rounded-lg hover:opacity-80 transition-colors text-left group"
                style={{
                  backgroundColor: 'rgba(111, 180, 209, 0.1)',
                  borderColor: 'var(--blue-light)',
                  borderWidth: '1px'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'var(--blue-light)' }}>VETERINARIO</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">carlos@gmail.com</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setEmail('juan@gmail.com')
                  setPassword('1234')
                }}
                className="w-full p-3 rounded-lg hover:opacity-80 transition-colors text-left group"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  borderColor: 'rgb(139, 92, 246)',
                  borderWidth: '1px'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold" style={{ color: 'rgb(139, 92, 246)' }}>TRABAJADOR</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">juan@gmail.com</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground text-center">
              Contraseña para ambas cuentas: <span className="font-mono font-semibold">1234</span>
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-muted/30 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} AgroTrack. Todos los derechos reservados.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}