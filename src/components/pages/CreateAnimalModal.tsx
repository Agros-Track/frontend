
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { animalService } from "../../services/animalService";

interface CreateAnimalModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function CreateAnimalModal({
    open,
    onOpenChange,
    onSuccess,
}: CreateAnimalModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "", // Alias / Nombre
        arete: "", // Código único
        species: "bovino",
        breed: "",
        birthDate: "",
        weight: "",
        healthStatus: "healthy",
        gender: "female",
        purpose: "milk"
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.species) {
            toast.error("Por favor completa los campos obligatorios.");
            return;
        }

        setIsLoading(true);

        try {
            // Adaptar payload al backend
            const payload = {
                name: formData.name,
                species: formData.species,
                breed: formData.breed || "Desconocida",
                birthDate: formData.birthDate || new Date().toISOString(),
                weight: formData.weight ? parseFloat(formData.weight) : 0,
                healthStatus: formData.healthStatus,
                // Campos adicionales que el backend podría esperar o ignorar
                arete: formData.arete,
                gender: formData.gender,
                farmId: "default-farm" // TODO: Obtener del contexto o selección
            };

            console.log("🚀 Registrando animal:", payload);
            await animalService.createAnimal(payload as any);

            toast.success("Animal registrado exitosamente.");
            onSuccess();
            onOpenChange(false);

            // Reset form
            setFormData({
                name: "",
                arete: "",
                species: "bovino",
                breed: "",
                birthDate: "",
                weight: "",
                healthStatus: "healthy",
                gender: "female",
                purpose: "milk"
            });

        } catch (error: any) {
            console.error("❌ Error registrando animal:", error);
            const errorMessage =
                error.response?.data?.message ||
                "Error al registrar el animal. Intenta de nuevo.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Registrar Nuevo Animal</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos básicos del animal para registrarlo en el sistema.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre / Alias <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
                                placeholder="Ej. La Lola"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="arete">Arete / Identificación</Label>
                            <Input
                                id="arete"
                                value={formData.arete}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("arete", e.target.value)}
                                placeholder="Ej. 12345"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Especie</Label>
                            <Select
                                value={formData.species}
                                onValueChange={(v: string) => handleChange("species", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bovino">Bovino (Vaca/Toro)</SelectItem>
                                    <SelectItem value="equino">Equino (Caballo)</SelectItem>
                                    <SelectItem value="porcino">Porcino (Cerdo)</SelectItem>
                                    <SelectItem value="caprino">Caprino (Cabra)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Raza</Label>
                            <Input
                                value={formData.breed}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("breed", e.target.value)}
                                placeholder="Ej. Holstein"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label>Género</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(v: string) => handleChange("gender", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="female">Hembra</SelectItem>
                                    <SelectItem value="male">Macho</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Estado de Salud</Label>
                            <Select
                                value={formData.healthStatus}
                                onValueChange={(v: string) => handleChange("healthStatus", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="healthy">Saludable</SelectItem>
                                    <SelectItem value="sick">Enfermo</SelectItem>
                                    <SelectItem value="injured">Lesionado</SelectItem>
                                    <SelectItem value="pregnant">Preñada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("birthDate", e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                min="0"
                                value={formData.weight}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("weight", e.target.value)}
                                placeholder="0.0"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-agro-green-600">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Registrar Animal
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
