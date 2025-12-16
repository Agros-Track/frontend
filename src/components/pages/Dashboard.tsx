"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Beef,
  Heart,
  TrendingUp,
  Milk,
  Activity,
  ArrowUpRight,
  Syringe,
  Scale,
  UtensilsCrossed,
  Globe,
  CheckSquare,
} from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockAnimals, mockAlerts, mockProductionData, mockWeightData } from "../../utils/mockData"
import { Link } from "react-router"

export function Dashboard() {
  const [timezone, setTimezone] = useState("UTC-5")

  useEffect(() => {
    const storedTz = localStorage.getItem("tenantTimezone")
    if (storedTz) setTimezone(storedTz)
  }, [])

  // Calculate KPIs
  const totalAnimals = mockAnimals.length
  const actions = [
    { label: "Registrar Animal", icon: Beef, color: "text-blue-600", bg: "bg-blue-100", path: "/admin/animales/nuevo" },
    {
      label: "Nueva Tarea",
      icon: CheckSquare,
      color: "text-green-600",
      bg: "bg-green-100",
      path: "/admin/tareas/nueva",
    },
    {
      label: "Añadir Registro",
      icon: Activity,
      color: "text-purple-600",
      bg: "bg-purple-100",
      path: "/admin/produccion/nuevo",
    },
  ]
  const byType = {
    vacas: mockAnimals.filter((a) => a.type === "vaca").length,
    toros: mockAnimals.filter((a) => a.type === "toro").length,
    terneros: mockAnimals.filter((a) => a.type === "ternero").length,
    novillos: mockAnimals.filter((a) => a.type === "novillo").length,
  }

  const byState = {
    produccion: mockAnimals.filter((a) => a.state === "produccion").length,
    preñadas: mockAnimals.filter((a) => a.state === "preñada").length,
    enfermos: mockAnimals.filter((a) => a.state === "enfermo").length,
  }

  const todayProduction = mockProductionData[mockProductionData.length - 1].liters
  const avgProduction = Math.round(mockProductionData.reduce((acc, d) => acc + d.liters, 0) / mockProductionData.length)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-[15px]">Vista general del estado de tu operación ganadera</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">Zona Horaria: {timezone}</span>
        </div>
      </div>

      {/* Status Summary */}
      <Card className="bg-primary/5 border-primary/10 p-8 shadow-sm backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-primary/80 mb-2 text-sm font-medium">Estado de la finca hoy</p>
            <h2 className="mb-3 text-2xl font-semibold text-foreground tracking-tight">Todo en orden</h2>
            <p className="text-muted-foreground text-[15px]">
              Producción estable • {byState.enfermos} animales bajo observación •{" "}
              {mockAlerts.filter((a) => a.priority === "alta").length} alertas prioritarias
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Activity className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 shadow-sm hover:shadow-md transition-all border border-border/50 bg-card">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Beef className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs font-medium">
              Total
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Total Animales</p>
            <h2 className="text-3xl font-semibold tracking-tight">{totalAnimals}</h2>
            <p className="text-muted-foreground text-xs flex items-center gap-1.5">
              <span>Vacas: {byType.vacas}</span>
              <span>•</span>
              <span>Toros: {byType.toros}</span>
            </p>
          </div>
        </Card>

        <Card className="p-6 shadow-sm hover:shadow-md transition-all border border-border/50 bg-card">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-success/10 rounded-xl">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <Badge className="bg-success text-white text-xs font-medium shadow-none">Activos</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">En Producción</p>
            <h2 className="text-3xl font-semibold tracking-tight">{byState.produccion}</h2>
            <p className="text-muted-foreground text-xs">
              {Math.round((byState.produccion / totalAnimals) * 100)}% del hato
            </p>
          </div>
        </Card>

        <Card className="p-6 shadow-sm hover:shadow-md transition-all border border-border/50 bg-card">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-warning/10 rounded-xl">
              <Milk className="h-5 w-5 text-warning" />
            </div>
            <ArrowUpRight className="h-5 w-5 text-success" />
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Producción Hoy</p>
            <h2 className="text-3xl font-semibold tracking-tight">{todayProduction}L</h2>
            <p className="text-muted-foreground text-xs">Promedio: {avgProduction}L/día</p>
          </div>
        </Card>

        <Card className="p-6 shadow-sm hover:shadow-md transition-all border border-border/50 bg-card">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-destructive/10 rounded-xl">
              <Heart className="h-5 w-5 text-destructive" />
            </div>
            <Badge variant="destructive" className="text-xs font-medium shadow-none">
              {byState.enfermos}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Bajo Observación</p>
            <h2 className="text-3xl font-semibold tracking-tight">{byState.enfermos}</h2>
            <p className="text-muted-foreground text-xs">Preñadas: {byState.preñadas}</p>
          </div>
        </Card>
      </div>

      {/* Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-foreground text-xl font-semibold tracking-tight">Alertas de Hoy</h3>
          <Link to="/tareas">
            <Button variant="outline" size="sm" className="text-sm bg-transparent">
              Ver todas
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAlerts.slice(0, 4).map((alert) => (
            <Card
              key={alert.id}
              className="p-5 shadow-sm border border-border/50 hover:shadow-md transition-all bg-card"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl ${
                    alert.priority === "alta"
                      ? "bg-destructive/10"
                      : alert.priority === "media"
                        ? "bg-warning/10"
                        : "bg-info/10"
                  }`}
                >
                  {alert.type === "vacuna" && (
                    <Syringe className={`h-5 w-5 ${alert.priority === "alta" ? "text-destructive" : "text-warning"}`} />
                  )}
                  {alert.type === "tratamiento" && <Heart className="h-5 w-5 text-destructive" />}
                  {alert.type === "peso" && <Scale className="h-5 w-5 text-warning" />}
                  {alert.type === "produccion" && <Milk className="h-5 w-5 text-info" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="truncate font-semibold text-[15px]">{alert.title}</h4>
                    <Badge
                      variant={alert.priority === "alta" ? "destructive" : "secondary"}
                      className="shrink-0 text-xs font-medium shadow-none"
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{alert.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <Card className="p-6 shadow-sm border border-border/50 bg-card">
          <div className="mb-6">
            <h3 className="text-foreground mb-1 text-lg font-semibold tracking-tight">Producción de Leche</h3>
            <p className="text-muted-foreground text-sm">Últimos 7 días</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getDate()}/${date.getMonth() + 1}`
                }}
              />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="liters"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ fill: "var(--primary)", r: 4, strokeWidth: 0 }}
                name="Litros"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Weight Evolution Chart */}
        <Card className="p-6 shadow-sm border border-border/50 bg-card">
          <div className="mb-6">
            <h3 className="text-foreground mb-1 text-lg font-semibold tracking-tight">Evolución de Peso Promedio</h3>
            <p className="text-muted-foreground text-sm">Terneros - Últimos 5 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockWeightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="weight" fill="var(--success)" radius={[8, 8, 0, 0]} name="Peso (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 shadow-sm border border-border/50 bg-card">
        <h3 className="text-foreground mb-5 text-lg font-semibold tracking-tight">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/admin/alimentacion">
            <Button className="w-full bg-warning hover:bg-warning/90 text-white h-auto py-5 flex-col gap-2.5 shadow-sm hover:shadow">
              <UtensilsCrossed className="h-6 w-6" />
              <span className="text-sm font-medium">Registrar Alimentación</span>
            </Button>
          </Link>
          <Link to="/admin/produccion">
            <Button className="w-full bg-info hover:bg-info/90 text-white h-auto py-5 flex-col gap-2.5 shadow-sm hover:shadow">
              <Milk className="h-6 w-6" />
              <span className="text-sm font-medium">Registrar Producción</span>
            </Button>
          </Link>
          <Link to="/admin/salud">
            <Button className="w-full bg-destructive hover:bg-destructive/90 text-white h-auto py-5 flex-col gap-2.5 shadow-sm hover:shadow">
              <Heart className="h-6 w-6" />
              <span className="text-sm font-medium">Evento Sanitario</span>
            </Button>
          </Link>
          <Link to="/admin/animales">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white h-auto py-5 flex-col gap-2.5 shadow-sm hover:shadow">
              <Beef className="h-6 w-6" />
              <span className="text-sm font-medium">Ver Animales</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
