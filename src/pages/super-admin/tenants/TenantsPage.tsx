
import { useState } from "react";
import { Plus, Search, MoreHorizontal, Eye, Edit2, Ban, Trash2 } from "lucide-react";
import { tenantsData } from "../../../services/mockData";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { CreateTenantModal } from "./CreateTenantModal";
import { Link } from "react-router";

export function TenantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [tenants, setTenants] = useState(tenantsData);

    const handleCreateTenant = (newTenant: any) => {
        setTenants([newTenant, ...tenants]);
        setIsCreateModalOpen(false);
    };

    const filteredTenants = tenants.filter(tenant =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.nit.includes(searchTerm)
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
                    <p className="text-muted-foreground">
                        Gestiona las empresas y suscripciones de la plataforma.
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-agro-green-600 hover:bg-agro-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Crear Tenant
                </Button>
            </div>

            <CreateTenantModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSubmit={handleCreateTenant}
            />

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, subdominio o NIT..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Tenant</TableHead>
                            <TableHead>Subdominio</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Usuarios</TableHead>
                            <TableHead>Almacenamiento</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTenants.map((tenant) => (
                            <TableRow key={tenant.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 rounded-lg">
                                            <AvatarImage src={tenant.logo} />
                                            <AvatarFallback>{tenant.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{tenant.name}</span>
                                            <span className="text-xs text-muted-foreground">{tenant.nit}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-xs">{tenant.subdomain}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={
                                        tenant.plan === 'Enterprise' ? "border-purple-500 text-purple-500" :
                                            tenant.plan === 'Pro' ? "border-blue-500 text-blue-500" :
                                                "border-slate-500 text-slate-500"
                                    }>
                                        {tenant.plan}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {tenant.usersCount} / {tenant.usersLimit === -1 ? '∞' : tenant.usersLimit}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {tenant.storageUsed} / {tenant.storageLimit}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={tenant.status === 'active' ? 'default' : 'destructive'}
                                        className={tenant.status === 'active' ? 'bg-green-600 hover:bg-green-700' : ''}>
                                        {tenant.status === 'active' ? 'Activo' : 'Suspendido'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Abrir menú</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link to={`/super-admin/tenants/${tenant.id}`}>
                                                    <Eye className="mr-2 h-4 w-4" /> Ver detalle
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit2 className="mr-2 h-4 w-4" /> Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Ban className="mr-2 h-4 w-4 text-orange-500" /> Suspender
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm" disabled>Siguiente</Button>
            </div>
        </div>
    );
}
