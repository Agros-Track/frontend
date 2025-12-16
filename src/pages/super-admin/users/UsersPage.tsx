import { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Plus, Mail, Ban, CheckCircle } from "lucide-react";
import {
  getPlatformUsers,
  createPlatformUser,
  togglePlatformUserStatus,
} from "../../../services/platform-user.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";

export function UsersPage() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "SOPORTE",
    status: "activo",
    password: "",
    confirmPassword: "",
  });

  // 🔹 CARGAR USUARIOS DESDE BACKEND
  useEffect(() => {
    setLoading(true);
    getPlatformUsers()
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(() => toast.error("Error cargando usuarios"))
      .finally(() => setLoading(false));
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-[var(--green-dark)] text-white";
      case "SOPORTE":
        return "bg-[var(--blue-light)]/20 text-[var(--blue-light)]";
      case "AUDITOR":
        return "bg-[var(--orange-soft)]/20 text-[var(--orange-soft)]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // 🔹 CREAR USUARIO
  const handleCreateUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const created = await createPlatformUser(formData);
      setUsers((prev) => [...prev, created]);
      setShowForm(false);
      toast.success("Usuario de plataforma creado exitosamente");

      setFormData({
        name: "",
        email: "",
        role: "SOPORTE",
        status: "activo",
        password: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Error al crear usuario");
    }
  };

  // 🔹 ACTIVAR / BLOQUEAR
  const toggleUserStatus = async (id: string) => {
    try {
      const updated = await togglePlatformUserStatus(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updated : u))
      );
      toast.info("Estado de usuario actualizado");
    } catch {
      toast.error("Error actualizando estado");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">
            Administradores de Plataforma
          </h1>
          <p className="text-muted-foreground">
            Gestiona los usuarios con acceso al panel de Super Admin
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="bg-agro-green-600 hover:bg-agro-green-700 text-white font-bold shadow-md"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          CREAR NUEVO USUARIO
        </Button>
      </div>

      {/* FORMULARIO */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-primary">Nuevo Usuario de Plataforma</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nombre Completo</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Rol</Label>
              <Select
                value={formData.role}
                onValueChange={(v) =>
                  setFormData({ ...formData, role: v })
                }
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
                onValueChange={(v) =>
                  setFormData({ ...formData, status: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Confirmar Contraseña</Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* 👉 ESTE FOOTER GARANTIZA EL BOTÓN */}
          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-agro-green-600 hover:bg-agro-green-700 text-white"
              onClick={handleCreateUser}
            >
              Crear Usuario
            </Button>
          </div>
        </Card>
      )}

      {/* LISTADO */}
      <Card className="overflow-hidden shadow-md border border-border">
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
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center">
                  Cargando usuarios...
                </td>
              </tr>
            )}

            {!loading &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" /> {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getRoleColor(user.role)}>
                      {(user.role || "").replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        user.status === "activo"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        user.status === "activo"
                          ? "bg-green-600 text-white"
                          : ""
                      }
                    >
                      {user.status === "activo"
                        ? "Activo"
                        : "Bloqueado"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === "activo" ? (
                        <Ban className="h-4 w-4 mr-2" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {user.status === "activo"
                        ? "Bloquear"
                        : "Activar"}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
