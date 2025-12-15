import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, Beef, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "alex@gmail.com" && password === "1234") {
      const hasOnboarded = localStorage.getItem("hasOnboarded");
      if (!hasOnboarded) {
        localStorage.setItem("hasOnboarded", "true");
        navigate("/onboarding");
      } else {
        navigate("/admin");
      }
      return;
    }

    if (email === "jose@gmail.com" && password === "1234") {
      navigate("/super-admin");
      return;
    }

    if (email === "juan@gmail.com" && password === "1234") {
      navigate("/worker");
      return;
    }

    setError("Credenciales inválidas. Por favor intenta de nuevo.");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0A1714] text-white dark" style={{ backgroundColor: '#0A1714' }}>

        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[var(--green-pastel)] opacity-20 blur-[90px]" />
          <div className="absolute -bottom-44 -left-44 h-[520px] w-[520px] rounded-full bg-[var(--blue-light)] opacity-20 blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto min-h-screen w-full flex items-center justify-center px-4">
          <div className="w-[380px] p-10 rounded-2xl shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden flex flex-col gap-8">

            {/* Header with Logo */}
            <div className="text-center">
              <div className="mx-auto mb-6 p-4 rounded-3xl bg-[var(--green-pastel)] shadow-[0_0_20px_rgba(168,213,186,0.2)] w-fit flex items-center justify-center">
                <Beef className="h-10 w-10 text-[var(--green-dark)]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Bienvenido</h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                Accede a la plataforma inteligente de gestión ganadera
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="leading-tight">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="space-y-2">
                <Label className="text-white/90 text-sm font-medium ml-1">Email Corporativo</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-[var(--green-pastel)] transition-colors duration-300" />
                  <Input
                    type="email"
                    placeholder="nombre@empresa.com"
                    className="h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-[var(--green-pastel)] focus-visible:border-[var(--green-pastel)] rounded-xl transition-all duration-300 hover:bg-white/10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label className="text-white/90 text-sm font-medium">Contraseña</Label>
                  {/* <Link // Removed link to simplify header alignment per user request for "cuadrado" look, can add back if needed below
                    to="/recuperar"
                    className="text-xs text-[var(--green-pastel)] hover:text-[var(--green-pastel)]/80 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link> */}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-[var(--green-pastel)] transition-colors duration-300" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-[var(--green-pastel)] focus-visible:border-[var(--green-pastel)] rounded-xl transition-all duration-300 hover:bg-white/10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <Link
                    to="/recuperar"
                    className="text-xs text-[var(--green-pastel)] hover:text-[var(--green-pastel)]/80 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mt-2 bg-[var(--green-dark)] hover:bg-[var(--green-dark)]/90 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(60,110,71,0.39)] hover:shadow-[0_6px_20px_rgba(60,110,71,0.23)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Iniciar Sesión
              </Button>
            </form>

            <div className="pt-2 flex flex-col items-center gap-4 border-t border-white/10">
              <div className="text-xs text-white/50 text-center w-full">
                <p className="mb-2">Credenciales de prueba</p>
                <div className="grid grid-cols-3 gap-2 justify-center">
                  <div className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[var(--green-pastel)] font-medium block mb-0.5 text-[10px]">Admin</span>
                    <span className="font-mono text-white/80 text-[10px] block truncate">alex@gmail.com</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[var(--green-pastel)] font-medium block mb-0.5 text-[10px]">Super Admin</span>
                    <span className="font-mono text-white/80 text-[10px] block truncate">jose@gmail.com</span>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-[var(--green-pastel)] font-medium block mb-0.5 text-[10px]">Trabajador</span>
                    <span className="font-mono text-white/80 text-[10px] block truncate">juan@gmail.com</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] opacity-60 font-mono">Contraseña: 1234</div>
              </div>

              <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">
                © {new Date().getFullYear()} SmartFarm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
