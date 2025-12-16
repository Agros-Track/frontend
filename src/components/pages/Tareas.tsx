import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, CheckSquare, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { mockAlerts } from '../../mock/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { taskService, Task } from '../../services/taskService';
import { toast } from 'sonner';

export function Tareas() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getTasks();
      console.log("✅ Tareas cargadas:", data);
      setTasks(data);
    } catch (error: any) {
      console.error("❌ Error cargando tareas:", error);
      toast.error("Error al cargar las tareas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !dueDate || !assignedTo) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      setIsSubmitting(true);
      const newTask = await taskService.createTask({
        title,
        description,
        status: 'pending',
        priority,
        dueDate,
        assignedTo,
        farmId: localStorage.getItem('farmId') || 'default-farm'
      });

      setTasks([newTask, ...tasks]);
      toast.success("Tarea creada exitosamente");

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setAssignedTo('');
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error creando tarea:", error);
      toast.error("Error al crear la tarea");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: Task['status']) => {
    try {
      const updatedTask = await taskService.updateTask(id, { status });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      toast.success("Estado actualizado");
    } catch (error) {
      console.error("❌ Error actualizando tarea:", error);
      toast.error("Error al actualizar la tarea");
    }
  };

  const pendientes = tasks.filter(t => t.status === 'pending');
  const enProceso = tasks.filter(t => t.status === 'in_progress');
  const completadas = tasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Tareas y Alertas</h1>
          <p className="text-muted-foreground">
            Gestiona las actividades diarias y mantén el control de tus pendientes
          </p>
        </div>
        <Button
          className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-[var(--orange-soft)]" />
            <p className="text-muted-foreground">Pendientes</p>
          </div>
          <h3 className="text-primary">{pendientes.length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-[var(--blue-light)]" />
            <p className="text-muted-foreground">En Proceso</p>
          </div>
          <h3 className="text-primary">{enProceso.length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="h-5 w-5 text-[var(--green-status)]" />
            <p className="text-muted-foreground">Completadas</p>
          </div>
          <h3 className="text-primary">{completadas.length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-[var(--red-soft)]" />
            <p className="text-muted-foreground">Alertas Activas</p>
          </div>
          <h3 className="text-primary">{mockAlerts.length}</h3>
        </Card>
      </div>

      {/* Task Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">Nueva Tarea</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Título de la Tarea</Label>
              <Input placeholder="Ej: Vacunar Lote A" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Descripción</Label>
              <Textarea placeholder="Describe la tarea en detalle..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Asignar a</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="juan">Juan Pérez</SelectItem>
                  <SelectItem value="maria">María González</SelectItem>
                  <SelectItem value="carlos">Dr. Carlos Ruiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha de Vencimiento</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Prioridad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Lote/Animal Relacionado (Opcional)</Label>
              <Input placeholder="Ej: Lote A" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white">
              Crear Tarea
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Alerts Section */}
      <div>
        <h3 className="text-primary mb-4">Alertas Prioritarias</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAlerts.filter(a => a.priority === 'alta').map((alert) => (
            <Card key={alert.id} className="p-4 shadow-md border-l-4 border-l-[var(--red-soft)]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--red-soft)]/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-[var(--red-soft)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4>{alert.title}</h4>
                    <Badge variant="destructive">Urgente</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{alert.description}</p>
                  <Button size="sm" variant="outline">
                    Resolver
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <Tabs defaultValue="pendientes" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
          <TabsTrigger value="pendientes">
            Pendientes ({pendientes.length})
          </TabsTrigger>
          <TabsTrigger value="en-proceso">
            En Proceso ({enProceso.length})
          </TabsTrigger>
          <TabsTrigger value="completadas">
            Completadas ({completadas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes" className="mt-6 space-y-3">
          {pendientes.map((task) => (
            <Card key={task.id} className="p-4 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <input type="checkbox" className="w-5 h-5 rounded border-border" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{task.title}</h4>
                    <p className="text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        👤 {task.assignedTo}
                      </Badge>
                      <Badge variant="outline">
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </Badge>
                      {task.loteId && (
                        <Badge variant="secondary" className="bg-[var(--blue-light)]/20 text-[var(--blue-light)]">
                          {task.loteId}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
                    Iniciar
                  </Button>
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="en-proceso" className="mt-6 space-y-3">
          {enProceso.map((task) => (
            <Card key={task.id} className="p-4 shadow-md border border-border border-l-4 border-l-[var(--blue-light)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[var(--blue-light)]/20 rounded-lg">
                    <Clock className="h-5 w-5 text-[var(--blue-light)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{task.title}</h4>
                    <p className="text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">👤 {task.assignedTo}</Badge>
                      <Badge variant="outline">📅 {new Date(task.dueDate).toLocaleDateString()}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-[var(--green-status)] hover:bg-[var(--green-status)]/90 text-white">
                    Completar
                  </Button>
                  <Button size="sm" variant="outline">
                    Pausar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completadas" className="mt-6">
          <Card className="p-8 text-center shadow-md border border-border">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-[var(--green-status)]" />
            <h3 className="text-primary mb-2">No hay tareas completadas hoy</h3>
            <p className="text-muted-foreground">
              Las tareas completadas aparecerán aquí
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
