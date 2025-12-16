import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Check, Globe, MapPin, Upload, ArrowRight, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function OnboardingPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tenantName: "Hacienda La Esperanza", // Pre-filled from "invite"
        country: "",
        timezone: "",
        logo: null as File | null,
    });

    const handleNext = () => {
        if (step === 1 && (!formData.country || !formData.timezone)) {
            toast.error("Por favor completa todos los campos");
            return;
        }
        if (step === 2) {
            completeOnboarding();
            return;
        }
        setStep(step + 1);
    };

    const completeOnboarding = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem("tenantTimezone", formData.timezone);
            localStorage.setItem("tenantCountry", formData.country);
            toast.success("¡Configuración exitosa! Bienvenido a AgroTrack.");
            navigate("/admin");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-[var(--card)] rounded-2xl shadow-xl overflow-hidden min-h-[500px]">

                {/* Left Side - Visual */}
                <div className="bg-[var(--green-dark)] p-8 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        {/* Abstract pattern could go here */}
                        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white opacity-20 blur-3xl" />
                        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-[var(--green-pastel)] opacity-20 blur-3xl" />
                    </div>

                    <div className="z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <LayoutDashboard className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-xl tracking-tight">AgroTrack</span>
                        </div>

                        <h2 className="text-3xl font-bold mb-4">
                            {step === 1 ? "Configura tu entorno" : "Personaliza tu marca"}
                        </h2>
                        <p className="text-white/80 leading-relaxed">
                            {step === 1
                                ? "Para comenzar, necesitamos algunos datos básicos sobre tu ubicación para ajustar el sistema a tus necesidades."
                                : "Dale identidad a tu espacio de trabajo subiendo el logo de tu finca o empresa."}
                        </p>
                    </div>

                    <div className="z-10 flex gap-2">
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 1 ? 'bg-white' : 'bg-white/30'}`} />
                        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step === 2 ? 'bg-white' : 'bg-white/30'}`} />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-6">

                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-2">
                                    <Label>Nombre del Tenant</Label>
                                    <Input
                                        value={formData.tenantName}
                                        onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                                        placeholder="Ingresa el nombre de tu empresa"
                                    />
                                    <p className="text-[11px] text-muted-foreground">Confirma o actualiza el nombre de tu empresa.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>País</Label>
                                    <Select value={formData.country} onValueChange={(v: string) => setFormData({ ...formData, country: v })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tu país" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="co">🇨🇴 Colombia</SelectItem>
                                            <SelectItem value="mx">🇲🇽 México</SelectItem>
                                            <SelectItem value="br">🇧🇷 Brasil</SelectItem>
                                            <SelectItem value="ar">🇦🇷 Argentina</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Zona Horaria</Label>
                                    <Select value={formData.timezone} onValueChange={(v: string) => setFormData({ ...formData, timezone: v })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona tu zona horaria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc-5">America/Bogota (UTC-5)</SelectItem>
                                            <SelectItem value="utc-6">America/Mexico_City (UTC-6)</SelectItem>
                                            <SelectItem value="utc-3">America/Sao_Paulo (UTC-3)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="border-2 border-dashed border-input rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group">
                                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-medium mb-1">Carga tu logo aquí</h3>
                                    <p className="text-sm text-muted-foreground mb-4">PNG, JPG hasta 5MB</p>
                                    <Button variant="outline" size="sm">Seleccionar Archivo</Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 border rounded-lg flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            H
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium">Por defecto</p>
                                            <p className="text-xs text-muted-foreground">Iniciales</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-4 flex items-center justify-end gap-3">
                            {step > 1 && (
                                <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={loading}>Atrás</Button>
                            )}
                            <Button onClick={handleNext} disabled={loading} className="bg-[var(--green-dark)] hover:bg-[var(--green-dark)]/90">
                                {loading ? "Guardando..." : step === 1 ? "Continuar" : "Finalizar Configuración"}
                                {!loading && step === 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                                {!loading && step === 2 && <Check className="ml-2 h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
