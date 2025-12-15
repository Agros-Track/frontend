import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Beef,
  Heart,
  TrendingUp,
  AlertCircle,
  Milk,
  Activity,
  ArrowUpRight,
  Syringe,
  Scale,
  UtensilsCrossed,
  Globe,
  CheckSquare
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { mockAnimals, mockAlerts, mockProductionData, mockWeightData } from '../../utils/mockData';
import { Link } from 'react-router';

export function Dashboard() {
  const [timezone, setTimezone] = useState("UTC-5");

  useEffect(() => {
    const storedTz = localStorage.getItem("tenantTimezone");
    if (storedTz) setTimezone(storedTz);
  }, []);

  // Calculate KPIs
  const totalAnimals = mockAnimals.length;
  const actions = [
    { label: 'Registrar Animal', icon: Beef, color: 'text-blue-600', bg: 'bg-blue-100', path: '/admin/animales/nuevo' },
    { label: 'Nueva Tarea', icon: CheckSquare, color: 'text-green-600', bg: 'bg-green-100', path: '/admin/tareas/nueva' },
    { label: 'Añadir Registro', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100', path: '/admin/produccion/nuevo' },
  ];
  const byType = {
    vacas: mockAnimals.filter(a => a.type === 'vaca').length,
    toros: mockAnimals.filter(a => a.type === 'toro').length,
    terneros: mockAnimals.filter(a => a.type === 'ternero').length,
    novillos: mockAnimals.filter(a => a.type === 'novillo').length,
  };

  const byState = {
    produccion: mockAnimals.filter(a => a.state === 'produccion').length,
    preñadas: mockAnimals.filter(a => a.state === 'preñada').length,
    enfermos: mockAnimals.filter(a => a.state === 'enfermo').length,
  };

  const todayProduction = mockProductionData[mockProductionData.length - 1].liters;
  const avgProduction = Math.round(mockProductionData.reduce((acc, d) => acc + d.liters, 0) / mockProductionData.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Vista general del estado de tu operación ganadera
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>Zona Horaria: {timezone}</span>
        </div>
      </div>

      {/* Status Summary */}
      <Card className="bg-gradient-to-br from-[var(--green-pastel)] to-[var(--blue-light)] text-[var(--green-dark)] p-6 shadow-lg border-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="opacity-90 mb-2">Estado de la finca hoy</p>
            <h2 className="mb-4">Todo en orden</h2>
            <p className="opacity-80">
              Producción estable • {byState.enfermos} animales bajo observación • {mockAlerts.filter(a => a.priority === 'alta').length} alertas prioritarias
            </p>
          </div>
          <Activity className="h-12 w-12 opacity-80" />
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[var(--green-pastel)] rounded-xl">
              <Beef className="h-6 w-6 text-[var(--green-dark)]" />
            </div>
            <Badge variant="secondary" className="bg-[var(--blue-light)] text-white">
              Total
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Total Animales</p>
            <h2>{totalAnimals}</h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <span>Vacas: {byType.vacas}</span>
              <span>•</span>
              <span>Toros: {byType.toros}</span>
            </p>
          </div>
        </Card>

        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <Badge className="bg-[var(--green-status)] text-white">
              Activos
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">En Producción</p>
            <h2>{byState.produccion}</h2>
            <p className="text-muted-foreground">
              {Math.round((byState.produccion / totalAnimals) * 100)}% del hato
            </p>
          </div>
        </Card>

        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Milk className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-[var(--green-status)]" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Producción Hoy</p>
            <h2>{todayProduction}L</h2>
            <p className="text-muted-foreground">
              Promedio: {avgProduction}L/día
            </p>
          </div>
        </Card>

        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-[var(--red-soft)]/20 rounded-xl">
              <Heart className="h-6 w-6 text-[var(--red-soft)]" />
            </div>
            <Badge variant="destructive">
              {byState.enfermos}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Bajo Observación</p>
            <h2>{byState.enfermos}</h2>
            <p className="text-muted-foreground">
              Preñadas: {byState.preñadas}
            </p>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-primary">Alertas de Hoy</h3>
          <Link to="/tareas">
            <Button variant="outline" size="sm">
              Ver todas
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAlerts.slice(0, 4).map((alert) => (
            <Card key={alert.id} className="p-4 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${alert.priority === 'alta' ? 'bg-[var(--red-soft)]/20' :
                  alert.priority === 'media' ? 'bg-[var(--orange-soft)]/20' :
                    'bg-[var(--blue-light)]/20'
                  }`}>
                  {alert.type === 'vacuna' && <Syringe className={`h-5 w-5 ${alert.priority === 'alta' ? 'text-[var(--red-soft)]' : 'text-[var(--orange-soft)]'
                    }`} />}
                  {alert.type === 'tratamiento' && <Heart className="h-5 w-5 text-[var(--red-soft)]" />}
                  {alert.type === 'peso' && <Scale className="h-5 w-5 text-[var(--orange-soft)]" />}
                  {alert.type === 'produccion' && <Milk className="h-5 w-5 text-[var(--blue-light)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="truncate">{alert.title}</h4>
                    <Badge variant={alert.priority === 'alta' ? 'destructive' : 'secondary'} className="shrink-0">
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{alert.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <Card className="p-6 shadow-md border border-border">
          <div className="mb-6">
            <h3 className="text-primary mb-1">Producción de Leche</h3>
            <p className="text-muted-foreground">Últimos 7 días</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="liters"
                stroke="var(--blue-light)"
                strokeWidth={3}
                dot={{ fill: 'var(--blue-light)', r: 4 }}
                name="Litros"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Weight Evolution Chart */}
        <Card className="p-6 shadow-md border border-border">
          <div className="mb-6">
            <h3 className="text-primary mb-1">Evolución de Peso Promedio</h3>
            <p className="text-muted-foreground">Terneros - Últimos 5 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockWeightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Bar
                dataKey="weight"
                fill="var(--green-pastel)"
                radius={[8, 8, 0, 0]}
                name="Peso (kg)"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-md border border-border">
        <h3 className="text-primary mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/alimentacion">
            <Button className="w-full bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white h-auto py-4 flex-col gap-2">
              <UtensilsCrossed className="h-6 w-6" />
              Registrar Alimentación
            </Button>
          </Link>
          <Link to="/admin/produccion">
            <Button className="w-full bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white h-auto py-4 flex-col gap-2">
              <Milk className="h-6 w-6" />
              Registrar Producción
            </Button>
          </Link>
          <Link to="/admin/salud">
            <Button className="w-full bg-[var(--red-soft)] hover:bg-[var(--red-soft)]/90 text-white h-auto py-4 flex-col gap-2">
              <Heart className="h-6 w-6" />
              Evento Sanitario
            </Button>
          </Link>
          <Link to="/admin/animales">
            <Button className="w-full bg-[var(--green-dark)] hover:bg-[var(--green-dark)]/90 text-white h-auto py-4 flex-col gap-2">
              <Beef className="h-6 w-6" />
              Ver Animales
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
