
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { ArrowRight, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed as per package.json

interface CreateTenantModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (tenant: any) => void;
}

export function CreateTenantModal({ open, onOpenChange, onSubmit }: CreateTenantModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State - Step 1
    const [tenantName, setTenantName] = useState("");
    const [nit, setNit] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [plan, setPlan] = useState("Pro");
    const [country, setCountry] = useState("co");

    // Form State - Step 2
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [forcePasswordChange, setForcePasswordChange] = useState(true);

    const handleNext = () => {
        if (!tenantName || !nit || !subdomain) {
            toast.error("Por favor completa los campos obligatorios.");
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleCreate = async () => {
        if (!adminName || !adminEmail) {
            toast.error("Por favor completa los datos del administrador.");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            const newTenant = {
                id: Math.random().toString(36).substr(2, 9),
                name: tenantName,
                nit: nit,
                subdomain: subdomain,
                plan: plan,
                usersCount: 1, // Admin
                usersLimit: plan === 'Free' ? 2 : plan === 'Pro' ? 10 : 50,
                storageUsed: "0 GB",
                storageLimit: plan === 'Free' ? "5 GB" : plan === 'Pro' ? "50 GB" : "500 GB",
                status: "active",
                createdAt: new Date().toISOString(),
                logo: null,
                country: country
            };

            if (onSubmit) {
                onSubmit(newTenant);
            }

            toast.success(`Tenant ${tenantName} creado exitosamente.`);
            // Reset for next time
            setStep(1);
            setTenantName("");
            setNit("");
            setSubdomain("");
            setAdminName("");
            setAdminEmail("");
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{step === 1 ? "Crear Nuevo Tenant" : "Configurar Administrador"}</DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "Ingresa la información básica de la empresa/finca."
                            : "Crea el usuario administrador principal para este tenant."}
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nombre del Tenant</Label>
                                <Input id="name" value={tenantName} onChange={(e) => setTenantName(e.target.value)} placeholder="Ej. Hacienda La Esperanza" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="nit">NIT / Identificación</Label>
                                <Input id="nit" value={nit} onChange={(e) => setNit(e.target.value)} placeholder="Ej. 900.123.456-1" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="country">País</Label>
                                <Select value={country} onValueChange={setCountry}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="co">Colombia</SelectItem>
                                        <SelectItem value="mx">México</SelectItem>
                                        <SelectItem value="br">Brasil</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">Ciudad</Label>
                                <Input id="city" placeholder="Ej. Montería" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subdomain">Subdominio</Label>
                            <div className="flex items-center gap-2">
                                <Input id="subdomain" value={subdomain} onChange={(e) => setSubdomain(e.target.value)} placeholder="clienteX" />
                                <span className="text-sm text-muted-foreground">.agrotrack.com</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="plan">Plan</Label>
                                <Select value={plan} onValueChange={setPlan}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar Plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Free">Free (Demo)</SelectItem>
                                        <SelectItem value="Pro">Professional</SelectItem>
                                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="logo">Logo</Label>
                                <div className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm items-center text-muted-foreground cursor-pointer hover:bg-muted/50">
                                    <UploadCloud className="mr-2 h-4 w-4" /> Subir imagen
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="adminName">Nombre Completo</Label>
                            <Input id="adminName" value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Ej. Juan Pérez" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="adminEmail">Correo Electrónico</Label>
                            <Input id="adminEmail" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder="juan@empresa.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="adminPassword">Contraseña Temporal</Label>
                            <Input id="adminPassword" value="AgroTrack2024*" readOnly className="bg-muted font-mono" />
                            <p className="text-xs text-muted-foreground">Generada automáticamente. Se enviará por correo.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="forceChange" checked={forcePasswordChange} onCheckedChange={(c: boolean | "indeterminate") => setForcePasswordChange(!!c)} />
                            <Label htmlFor="forceChange" className="text-sm font-normal">Forzar cambio de contraseña al primer inicio de sesión</Label>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {step === 2 && (
                        <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                            Atrás
                        </Button>
                    )}
                    {step === 1 ? (
                        <Button onClick={handleNext} className="bg-agro-green-600 hover:bg-agro-green-700">
                            Continuar <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleCreate} disabled={isLoading} className="bg-agro-green-600 hover:bg-agro-green-700">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Crear Tenant
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
