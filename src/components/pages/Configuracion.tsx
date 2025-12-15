import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Settings, 
  Building2,
  Globe,
  Clock,
  Ruler,
  Languages,
  Shield,
  CreditCard,
  Bell
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function Configuracion() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-primary mb-2">Configuración del Tenant</h1>
        <p className="text-muted-foreground">
          Administra la configuración general de tu finca
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 shadow-lg border border-border bg-gradient-to-br from-[var(--green-pastel)]/30 to-[var(--blue-light)]/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Badge className="bg-[var(--orange-soft)] text-white mb-3">
              Plan Premium
            </Badge>
            <h3 className="text-primary mb-1">Finca La Esperanza</h3>
            <p className="text-muted-foreground">
              Roberto Martínez • Tenant ID: FINCA-2024-001
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              Ver Facturación
            </Button>
            <Button className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white">
              Actualizar Plan
            </Button>
          </div>
        </div>
      </Card>

      {/* General Settings */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--blue-light)]/20 rounded-lg">
            <Building2 className="h-5 w-5 text-[var(--blue-light)]" />
          </div>
          <h3 className="text-primary">Datos Generales</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nombre de la Empresa/Finca</Label>
            <Input defaultValue="Finca La Esperanza" />
          </div>
          <div className="space-y-2">
            <Label>NIT / Identificación Fiscal</Label>
            <Input defaultValue="123456789-0" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Dirección</Label>
            <Input defaultValue="Vereda El Placer, km 5 vía La Mesa" />
          </div>
          <div className="space-y-2">
            <Label>Teléfono de Contacto</Label>
            <Input defaultValue="+57 312 345 6789" />
          </div>
          <div className="space-y-2">
            <Label>Email de Contacto</Label>
            <Input defaultValue="info@fincalaesperanza.com" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
            Guardar Cambios
          </Button>
          <Button variant="outline">
            Cancelar
          </Button>
        </div>
      </Card>

      {/* Regional Settings */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--green-pastel)]/80 rounded-lg">
            <Globe className="h-5 w-5 text-[var(--green-dark)]" />
          </div>
          <h3 className="text-primary">Configuración Regional</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              País
            </Label>
            <Select defaultValue="colombia">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colombia">Colombia</SelectItem>
                <SelectItem value="mexico">México</SelectItem>
                <SelectItem value="argentina">Argentina</SelectItem>
                <SelectItem value="chile">Chile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Zona Horaria
            </Label>
            <Select defaultValue="bogota">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bogota">América/Bogotá (GMT-5)</SelectItem>
                <SelectItem value="mexico">América/México (GMT-6)</SelectItem>
                <SelectItem value="buenos_aires">América/Buenos Aires (GMT-3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Idioma
            </Label>
            <Select defaultValue="es">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Unidades de Medida
            </Label>
            <Select defaultValue="metric">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Métrico (kg, L, ha)</SelectItem>
                <SelectItem value="imperial">Imperial (lb, gal, acres)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
            Guardar Preferencias
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--orange-soft)]/20 rounded-lg">
            <Bell className="h-5 w-5 text-[var(--orange-soft)]" />
          </div>
          <h3 className="text-primary">Notificaciones</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <h4 className="mb-1">Alertas de Vacunación</h4>
              <p className="text-muted-foreground">
                Recibe notificaciones de vacunas próximas a vencer
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <h4 className="mb-1">Partos Próximos</h4>
              <p className="text-muted-foreground">
                Alertas de fechas estimadas de parto
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <h4 className="mb-1">Producción Anormal</h4>
              <p className="text-muted-foreground">
                Notificaciones de caídas en producción
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <div>
              <h4 className="mb-1">Tareas Vencidas</h4>
              <p className="text-muted-foreground">
                Recordatorios de tareas no completadas
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Plan Limits */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--green-status)]/20 rounded-lg">
            <CreditCard className="h-5 w-5 text-[var(--green-status)]" />
          </div>
          <h3 className="text-primary">Límites del Plan</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground mb-2">Animales</p>
            <div className="flex items-end gap-2">
              <h3 className="text-primary">8</h3>
              <span className="text-muted-foreground">/ 100</span>
            </div>
            <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-[var(--green-status)]" style={{ width: '8%' }} />
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground mb-2">Usuarios</p>
            <div className="flex items-end gap-2">
              <h3 className="text-primary">5</h3>
              <span className="text-muted-foreground">/ 10</span>
            </div>
            <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-[var(--blue-light)]" style={{ width: '50%' }} />
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground mb-2">Almacenamiento</p>
            <div className="flex items-end gap-2">
              <h3 className="text-primary">1.2 GB</h3>
              <span className="text-muted-foreground">/ 5 GB</span>
            </div>
            <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-[var(--orange-soft)]" style={{ width: '24%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--red-soft)]/20 rounded-lg">
            <Shield className="h-5 w-5 text-[var(--red-soft)]" />
          </div>
          <h3 className="text-primary">Seguridad</h3>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Cambiar Contraseña del Administrador
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Configurar Autenticación de Dos Factores
          </Button>
          <Button variant="outline" className="w-full justify-start text-[var(--red-soft)] hover:text-[var(--red-soft)]">
            <Shield className="h-4 w-4 mr-2" />
            Ver Registro de Actividad
          </Button>
        </div>
      </Card>
    </div>
  );
}
