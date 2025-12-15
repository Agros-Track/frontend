import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Plus, Shield, Lock, Mail, MoreVertical, Ban, CheckCircle } from 'lucide-react';
import { mockPlatformUsers, PlatformUser } from '../../../utils/mockData';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../components/ui/select';
import { toast } from 'sonner';

export function UsersPage() {
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState<PlatformUser[]>(mockPlatformUsers);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'SOPORTE' as PlatformUser['role'],
        status: 'activo' as PlatformUser['status'],
        password: '',
        confirmPassword: ''
    });

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'SUPER_ADMIN':
                return 'bg-[var(--green-dark)] text-white';
            case 'SOPORTE':
                return 'bg-[var(--blue-light)]/20 text-[var(--blue-light)]';
            case 'AUDITOR':
                return 'bg-[var(--orange-soft)]/20 text-[var(--orange-soft)]';
            default:
                return 'bg-[var(--muted)] text-[var(--muted-foreground)]';
        }
    };

    const handleCreateUser = () => {
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Por favor completa los campos obligatorios');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        const newUser: PlatformUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status
        };

        setUsers([...users, newUser]);
        setShowForm(false);
        setFormData({
            name: '',
            email: '',
            role: 'SOPORTE',
            status: 'activo',
            password: '',
            confirmPassword: ''
        });
        toast.success('Usuario de plataforma creado exitosamente');
    };

    const toggleUserStatus = (id: string) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'activo' ? 'bloqueado' : 'activo' };
            }
            return u;
        }));
        toast.info('Estado de usuario actualizado');
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-primary mb-2">Administradores de Plataforma</h1>
                    <p className="text-muted-foreground">
                        Gestiona los usuarios con acceso al panel de Super Admin
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-agro-green-600 hover:bg-agro-green-700 text-white font-bold shadow-md"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus className="h-5 w-5 mr-2" />
                    CREAR NUEVO USUARIO
                </Button>
            </div>

            {/* Form */}
            {showForm && (
                <Card className="p-6 shadow-lg border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-primary">Nuevo Usuario de Plataforma</h3>
                        <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancelar</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Nombre Completo</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej: Admin Soporte"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Correo Electrónico</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="admin@agrotrack.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Rol</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(v: PlatformUser['role']) => setFormData({ ...formData, role: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                                    <SelectItem value="SOPORTE">Soporte Técnico</SelectItem>
                                    <SelectItem value="AUDITOR">Auditor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Estado Inicial</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(v: PlatformUser['status']) => setFormData({ ...formData, status: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="activo">Activo</SelectItem>
                                    <SelectItem value="bloqueado">Bloqueado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Contraseña Temporal</Label>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Mínimo 8 caracteres"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirmar Contraseña</Label>
                            <Input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="Repetir contraseña"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6 justify-end">
                        <Button variant="outline" onClick={() => setShowForm(false)}>
                            Cancelar
                        </Button>
                        <Button
                            className="bg-agro-green-600 hover:bg-agro-green-700 text-white"
                            onClick={handleCreateUser}
                        >
                            Crear Usuario
                        </Button>
                    </div>
                </Card>
            )}

            {/* List */}
            <Card className="overflow-hidden shadow-md border border-border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-left">Usuario</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">Rol</th>
                                <th className="px-6 py-4 text-left">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-bold">
                                                    {user.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={getRoleColor(user.role)}>
                                            {user.role.replace('_', ' ')}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={user.status === 'activo' ? 'default' : 'destructive'}
                                            className={user.status === 'activo' ? 'bg-green-600 text-white' : ''}
                                        >
                                            {user.status === 'activo' ? 'Activo' : 'Bloqueado'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className={user.status === 'activo' ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : 'text-green-600 hover:text-green-700 hover:bg-green-100'}
                                                onClick={() => toggleUserStatus(user.id)}
                                            >
                                                {user.status === 'activo' ? <Ban className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                                                {user.status === 'activo' ? 'Bloquear' : 'Activar'}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
