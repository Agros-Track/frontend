import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Users, Shield, Lock, Mail, MoreVertical, Ban, CheckCircle } from 'lucide-react';
import { mockUsers, User } from '../../utils/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

export function Usuarios() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'TRABAJADOR' as User['role'],
    status: 'activo' as User['status'],
    password: '',
    confirmPassword: ''
  });

  const activeUsers = users.filter(u => u.status === 'activo');
  const blockedUsers = users.filter(u => u.status === 'bloqueado');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN_TENANT':
        return 'bg-[var(--orange-soft)]/20 text-[var(--orange-soft)]';
      case 'VETERINARIO':
        return 'bg-[var(--blue-light)]/20 text-[var(--blue-light)]';
      case 'TRABAJADOR':
        return 'bg-[var(--green-pastel)]/80 text-[var(--green-dark)]';
      default:
        return 'bg-[var(--muted)] text-[var(--muted-foreground)]';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'ADMIN_TENANT':
        return 'Administrador';
      case 'VETERINARIO':
        return 'Veterinario';
      case 'TRABAJADOR':
        return 'Trabajador';
      default:
        return role;
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

    const newUser: User = {
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
      role: 'TRABAJADOR',
      status: 'activo',
      password: '',
      confirmPassword: ''
    });
    toast.success('Usuario creado exitosamente');
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios y permisos de tu tenant
          </p>
        </div>
        <Button
          className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <Users className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Total Usuarios</p>
          </div>
          <h2 className="text-primary">{users.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <Shield className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <p className="text-muted-foreground">Activos</p>
          </div>
          <h2 className="text-primary">{activeUsers.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--red-soft)]/20 rounded-xl">
              <Lock className="h-6 w-6 text-[var(--red-soft)]" />
            </div>
            <p className="text-muted-foreground">Bloqueados</p>
          </div>
          <h2 className="text-primary">{blockedUsers.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Shield className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Administradores</p>
          </div>
          <h2 className="text-primary">{users.filter(u => u.role === 'ADMIN_TENANT').length}</h2>
        </Card>
      </div>

      {/* User Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-primary">Nuevo Usuario</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nombre Completo</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select
                value={formData.role}
                onValueChange={(v: User['role']) => setFormData({ ...formData, role: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN_TENANT">Administrador del Tenant</SelectItem>
                  <SelectItem value="VETERINARIO">Veterinario</SelectItem>
                  <SelectItem value="TRABAJADOR">Trabajador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado Inicial</Label>
              <Select
                value={formData.status}
                onValueChange={(v: User['status']) => setFormData({ ...formData, status: v })}
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
              className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white"
              onClick={handleCreateUser}
            >
              Crear Usuario
            </Button>
          </div>
        </Card>
      )}

      {/* Users List */}
      <div>
        <h3 className="text-primary mb-4">Lista de Usuarios</h3>

        {/* Desktop Table */}
        <div className="hidden md:block">
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
                          <div className="h-10 w-10 rounded-full bg-[var(--blue-light)]/20 flex items-center justify-center">
                            <span className="text-[var(--blue-light)]">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-primary">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className={getRoleColor(user.role)}>
                          {getRoleName(user.role)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={user.status === 'activo' ? 'default' : 'destructive'}
                          className={user.status === 'activo' ? 'bg-[var(--green-status)] text-white' : ''}
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

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <Card key={user.id} className="p-4 shadow-md border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[var(--blue-light)]/20 flex items-center justify-center">
                    <span className="text-[var(--blue-light)]">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="mb-1">{user.name}</h4>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Badge variant="secondary" className={getRoleColor(user.role)}>
                  {getRoleName(user.role)}
                </Badge>
                <Badge
                  variant={user.status === 'activo' ? 'default' : 'destructive'}
                  className={user.status === 'activo' ? 'bg-[var(--green-status)] text-white' : ''}
                >
                  {user.status === 'activo' ? 'Activo' : 'Bloqueado'}
                </Badge>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className={`w-full ${user.status === 'activo' ? 'text-destructive border-destructive/50 hover:bg-destructive/10' : 'text-green-600 border-green-200 hover:bg-green-50'}`}
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === 'activo' ? 'Bloquear Usuario' : 'Activar Usuario'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Roles & Permissions Info */}
      <Card className="p-6 shadow-md border border-border">
        {/* ... (Roles info kept the same) ... */}
        <h3 className="text-primary mb-4">Roles y Permisos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[var(--orange-soft)]" />
              <h4>Administrador</h4>
            </div>
            <p className="text-muted-foreground">
              Acceso completo a todas las funciones, gestión de usuarios y configuración del tenant
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[var(--blue-light)]" />
              <h4>Veterinario</h4>
            </div>
            <p className="text-muted-foreground">
              Acceso a registros sanitarios, salud animal, tratamientos y reportes médicos
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-[var(--green-dark)]" />
              <h4>Trabajador</h4>
            </div>
            <p className="text-muted-foreground">
              Registro de alimentación, producción, tareas diarias y consulta de información básica
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
