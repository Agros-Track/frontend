import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { ArrowRight, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface CreateTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (tenant: any) => void;
}

export function CreateTenantModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateTenantModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1
  const [tenantName, setTenantName] = useState("");
  const [nit, setNit] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [plan, setPlan] = useState<"Free" | "Pro" | "Enterprise">("Pro");
  const [country, setCountry] = useState("co");

  // Step 2
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

  const handleBack = () => setStep(1);

  const handleCreate = async () => {
    // Validaciones
    if (!adminName || !adminEmail) {
      toast.error("Por favor completa los datos del administrador.");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail)) {
      toast.error("Por favor ingresa un email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: tenantName.trim(),
        nit: nit.trim(),
        subdomain: subdomain.trim().toLowerCase(),
        plan,
        country,
        logo: null,
        admin: {
          name: adminName.trim(),
          email: adminEmail.trim().toLowerCase(),
          forcePasswordChange,
        },
      };

      console.log("🚀 Enviando payload al backend:", payload);

      // Llamada real al backend
      if (onSubmit) {
        await onSubmit(payload);
      }

      toast.success(`Tenant ${tenantName} creado exitosamente.`);

      // Reset form
      setStep(1);
      setTenantName("");
      setNit("");
      setSubdomain("");
      setAdminName("");
      setAdminEmail("");
      setForcePasswordChange(true);
      
      // Cerrar el modal
      onOpenChange(false);
    } catch (error: any) {
      console.error("❌ Error creating tenant:", error);
      
      // Extraer mensaje de error específico
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message ||
                          "Error al crear el tenant. Por favor intenta de nuevo.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Crear Nuevo Tenant" : "Configurar Administrador"}
          </DialogTitle>
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
                <Label>Nombre del Tenant</Label>
                <Input
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>NIT / Identificación</Label>
                <Input
                  value={nit}
                  onChange={(e) => setNit(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>País</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="co">Colombia</SelectItem>
                    <SelectItem value="mx">México</SelectItem>
                    <SelectItem value="br">Brasil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Ciudad</Label>
                <Input placeholder="Ej. Montería" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Subdominio</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                />
                <span className="text-sm text-muted-foreground">
                  .agrotrack.com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Plan</Label>
                <Select
                  value={plan}
                  onValueChange={(v) =>
                    setPlan(v as "Free" | "Pro" | "Enterprise")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free (Demo)</SelectItem>
                    <SelectItem value="Pro">Professional</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Logo</Label>
                <div className="flex h-10 items-center rounded-md border px-3 text-sm text-muted-foreground cursor-pointer hover:bg-muted/50">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Subir imagen
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nombre Completo</Label>
              <Input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Contraseña Temporal</Label>
              <Input readOnly value="AgroTrack2024*" className="bg-muted" />
              <p className="text-xs text-muted-foreground">
                Se enviará por correo.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={forcePasswordChange}
                onCheckedChange={(checked) =>
                  setForcePasswordChange(checked === true)
                }
              />
              <Label className="text-sm font-normal">
                Forzar cambio de contraseña al primer inicio de sesión
              </Label>
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
            <Button onClick={handleNext} className="bg-agro-green-600">
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              disabled={isLoading}
              className="bg-agro-green-600"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crear Tenant
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
