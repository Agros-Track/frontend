import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { CheckCircle2, Circle, Clock, AlertTriangle, Calendar, ClipboardList, Bell, Milk, Utensils, Scale, Plus, MapPin, Syringe } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export function WorkerDashboard() {
    const dailyTasks = [
        { id: 1, title: "Alimentación Lote A", time: "06:00 AM", status: "completed", priority: "high", location: "Establo Principal" },
        { id: 2, title: "Revisión Sanitaria #124", time: "08:30 AM", status: "completed", priority: "medium", location: "Corral 3" },
        { id: 3, title: "Limpieza de Bebederos", time: "10:00 AM", status: "pending", priority: "low", location: "Lote B" },
        { id: 4, title: "Registro de Pesaje", time: "02:00 PM", status: "pending", priority: "medium", location: "Báscula" },
    ];

    const healthAlerts = [
        { id: 1, title: "Vacuna Antiaftosa", type: "Vaccine", animal: "Lote A", date: "Hoy", priority: "high" },
        { id: 2, title: "Antibiótico #405", type: "Treatment", animal: "Vaca #405", date: "Mañana", priority: "medium" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-primary mb-2 text-3xl font-bold">Hola, Juan</h1>
                    <p className="text-muted-foreground">
                        ¿Qué tienes que hacer hoy?
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* KPI Summary */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6 shadow-sm border border-border">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Tareas Pendientes</span>
                        <Clock className="h-4 w-4 text-[var(--orange-soft)]" />
                    </div>
                    <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold">2</h2>
                        <span className="text-xs text-muted-foreground mb-1">de 4 totales</span>
                    </div>
                </Card>

                <Card className="p-6 shadow-sm border border-border">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Alertas Activas</span>
                        <AlertTriangle className="h-4 w-4 text-[var(--red-soft)]" />
                    </div>
                    <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold">1</h2>
                        <span className="text-xs text-[var(--red-soft)] mb-1">1 prioritaria</span>
                    </div>
                </Card>

                <Card className="p-6 shadow-sm border border-border">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Prod. Hoy (Tú)</span>
                        <Milk className="h-4 w-4 text-[var(--blue-light)]" />
                    </div>
                    <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold">0L</h2>
                        <span className="text-xs text-muted-foreground mb-1">Sin registros aún</span>
                    </div>
                </Card>

                <Card className="p-6 shadow-sm border border-border">
                    <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Salud Próxima</span>
                        <Syringe className="h-4 w-4 text-[var(--green-dark)]" />
                    </div>
                    <div className="flex items-end gap-2">
                        <h2 className="text-3xl font-bold">2</h2>
                        <span className="text-xs text-muted-foreground mb-1">Eventos esta semana</span>
                    </div>
                </Card>
            </div>

            {/* Quick Actions - Sorted & Styled */}
            <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <Link to="/worker/production" className="contents">
                        <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 hover:bg-[var(--blue-light)]/5 hover:border-[var(--blue-light)] hover:text-[var(--blue-light)] transition-all group">
                            <div className="p-3 rounded-full bg-[var(--blue-light)]/10 text-[var(--blue-light)] group-hover:bg-[var(--blue-light)] group-hover:text-white transition-colors">
                                <Milk className="h-6 w-6" />
                            </div>
                            <span className="font-medium text-sm">Producción</span>
                        </Button>
                    </Link>
                    <Link to="/worker/feeding" className="contents">
                        <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 hover:bg-[var(--orange-soft)]/5 hover:border-[var(--orange-soft)] hover:text-[var(--orange-soft)] transition-all group">
                            <div className="p-3 rounded-full bg-[var(--orange-soft)]/10 text-[var(--orange-soft)] group-hover:bg-[var(--orange-soft)] group-hover:text-white transition-colors">
                                <Utensils className="h-6 w-6" />
                            </div>
                            <span className="font-medium text-sm">Alimentación</span>
                        </Button>
                    </Link>
                    <Link to="/worker/weight" className="contents">
                        <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 hover:bg-[var(--green-pastel)]/20 hover:border-[var(--green-pastel)] hover:text-[var(--green-dark)] transition-all group">
                            <div className="p-3 rounded-full bg-[var(--green-pastel)]/20 text-[var(--green-dark)] group-hover:bg-[var(--green-dark)] group-hover:text-white transition-colors">
                                <Scale className="h-6 w-6" />
                            </div>
                            <span className="font-medium text-sm">Registrar Peso</span>
                        </Button>
                    </Link>
                    <Link to="/worker/lots" className="contents">
                        <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 hover:bg-muted transition-all group">
                            <div className="p-3 rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <span className="font-medium text-sm">Ver Lotes</span>
                        </Button>
                    </Link>
                    <Link to="/worker/tasks" className="col-span-2 md:col-span-1 contents">
                        <Button variant="outline" className="h-auto py-6 flex flex-col gap-3 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all text-primary group">
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Plus className="h-6 w-6" />
                            </div>
                            <span className="font-medium text-sm">Nueva Tarea</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Tasks List */}
                <Card className="lg:col-span-2 shadow-sm border border-border">
                    <CardHeader className="border-b border-border bg-muted/30 py-4 px-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <ClipboardList className="h-5 w-5 text-primary" />
                                Tareas de Hoy
                            </CardTitle>
                            <Link to="/worker/tasks">
                                <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground hover:text-primary">Ver todas</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            {dailyTasks.map((task) => (
                                <div key={task.id} className="group flex flex-col sm:flex-row items-start sm:items-center p-4 px-6 hover:bg-muted/5 transition-colors gap-4">
                                    <div className="flex items-start gap-4 flex-1 w-full">
                                        <div
                                            className={`mt-1 flex items-center justify-center h-5 w-5 rounded-full border shrink-0 transition-colors ${task.status === 'completed'
                                                ? 'bg-[var(--green-pastel)] border-[var(--green-pastel)] text-[var(--green-dark)]'
                                                : 'border-muted-foreground/30 text-transparent group-hover:border-[var(--green-dark)]/50'
                                                }`}
                                        >
                                            {task.status === 'completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className={`font-medium text-sm truncate ${task.status === 'completed' ? 'text-muted-foreground line-through decoration-border' : 'text-foreground'}`}>
                                                    {task.title}
                                                </span>
                                                {task.priority === 'high' && <Badge variant="destructive" className="ml-1 h-5 text-[10px] px-1.5 rounded-md font-normal bg-[var(--red-soft)] hover:bg-[var(--red-soft)]/90 text-white border-0 shrink-0">Alta</Badge>}
                                            </div>
                                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" /> {task.time}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="h-3 w-3" /> {task.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {task.status === 'pending' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full sm:w-auto h-8 text-xs border-[var(--green-dark)] text-[var(--green-dark)] hover:bg-[var(--green-dark)] hover:text-white transition-all shadow-sm font-medium ml-auto sm:ml-0"
                                        >
                                            Completar
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Health Alerts */}
                <Card className="shadow-sm border border-border h-fit">
                    <CardHeader className="border-b border-border bg-muted/30 py-4 px-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <Syringe className="h-5 w-5 text-primary" />
                                Salud Próxima
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className="space-y-3">
                            {healthAlerts.map((alert) => (
                                <div key={alert.id} className="flex items-start gap-4 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors bg-card shadow-sm group">
                                    <div className={`p-2 shrink-0 rounded-lg transition-colors ${alert.priority === 'high' ? 'bg-[var(--red-soft)]/10 text-[var(--red-soft)] group-hover:bg-[var(--red-soft)]/20' : 'bg-[var(--orange-soft)]/10 text-[var(--orange-soft)] group-hover:bg-[var(--orange-soft)]/20'}`}>
                                        <AlertTriangle className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <h4 className="text-sm font-medium leading-none mb-1.5">{alert.title}</h4>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                            <span>{alert.animal}</span>
                                            <span className="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
                                            <span>{alert.date}</span>
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted shrink-0 -mr-2 text-muted-foreground hover:text-foreground">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-5 text-xs h-9 font-medium text-muted-foreground hover:text-foreground">
                            Ver Calendario Sanitario
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
