
import { useParams } from "react-router";
import { tenantsData } from "../../../services/mockData";
import { Button } from "../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { ArrowLeft, Ban, PlayCircle, RotateCcw, Shield } from "lucide-react";
import { Link } from "react-router";

export function TenantDetailPage() {
    const { id } = useParams();
    const tenant = tenantsData.find(t => t.id === id) || tenantsData[0]; // Fallback to first if not found

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/super-admin/tenants">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
                        <Badge variant={tenant.status === 'active' ? 'default' : 'destructive'}
                            className={tenant.status === 'active' ? 'bg-green-600' : ''}>
                            {tenant.status === 'active' ? 'Activo' : 'Suspendido'}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground font-mono text-sm">{tenant.subdomain}.agrotrack.com</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-orange-500 hover:text-orange-600 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950">
                        <Ban className="mr-2 h-4 w-4" /> Suspender
                    </Button>
                    <Button variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Resetear Admin
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="summary" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="summary">Resumen</TabsTrigger>
                    <TabsTrigger value="users">Usuarios</TabsTrigger>
                    <TabsTrigger value="limits">Límites & Plan</TabsTrigger>
                    <TabsTrigger value="audit">Auditoría</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Plan Actual</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tenant.plan}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tenant.usersCount}</div>
                                <p className="text-xs text-muted-foreground">de {tenant.usersLimit === -1 ? 'Ilimitados' : tenant.usersLimit}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Almacenamiento</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tenant.storageUsed}</div>
                                <p className="text-xs text-muted-foreground">de {tenant.storageLimit}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">NIT / ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{tenant.nit.split('-')[0]}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles de la Empresa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold">Fecha de Creación:</span> {tenant.createdAt}
                                </div>
                                <div>
                                    <span className="font-semibold">ID Interno:</span> {tenant.id}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader>
                            <CardTitle>Usuarios Registrados</CardTitle>
                            <CardDescription>Lista de usuarios activos en este tenant.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-8 text-muted-foreground italic">
                                Implementación pendiente del listado de usuarios del tenant.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="limits">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuración de Plan</CardTitle>
                            <CardDescription>Límites y cuotas asignadas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-8 text-muted-foreground italic">
                                Implementación pendiente de configuración de límites.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="audit">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registro de Auditoría</CardTitle>
                            <CardDescription>Eventos relacionados con este tenant.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center p-8 text-muted-foreground italic">
                                Implementación pendiente de logs de auditoría.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
