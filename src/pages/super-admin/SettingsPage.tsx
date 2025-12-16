
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";

export function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configuración Global</h1>
                <p className="text-muted-foreground">
                    Ajustes generales de la plataforma.
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Apariencia y Marca</CardTitle>
                        <CardDescription>Personaliza los colores y logos por defecto.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="appName">Nombre de la Aplicación</Label>
                                <Input id="appName" defaultValue="AgroTrack" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="primaryColor">Color Primario</Label>
                                <div className="flex gap-2">
                                    <div className="h-10 w-10 rounded-md bg-agro-green-600 border border-gray-200"></div>
                                    <Input id="primaryColor" defaultValue="#16a34a" className="font-mono" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Seguridad</CardTitle>
                        <CardDescription>Políticas de acceso y contraseñas.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="mfa" className="flex flex-col space-y-1">
                                <span>Requerir 2FA para Admins</span>
                                <span className="font-normal text-xs text-muted-foreground">Obligar a todos los administradores de tenants a usar autenticación de dos factores.</span>
                            </Label>
                            <Switch id="mfa" />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="session" className="flex flex-col space-y-1">
                                <span>Timeout de Sesión</span>
                                <span className="font-normal text-xs text-muted-foreground">Cerrar sesión automáticamente después de 30 minutos de inactividad.</span>
                            </Label>
                            <Switch id="session" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-end">
                <Button className="bg-agro-green-600 hover:bg-agro-green-700">Guardar Cambios</Button>
            </div>
        </div>
    );
}
