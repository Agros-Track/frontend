"use client"

import { useParams, Link } from "react-router"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Scale,
  MoreVertical,
  UtensilsCrossed,
  Milk,
  Heart,
  FileText,
  TrendingUp,
  Syringe,
} from "lucide-react"
import { mockAnimals, mockHealthRecords, mockFeedRecords, mockVaccines, mockDiseaseRecords } from "../../utils/mockData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function FichaAnimal() {
  const { id } = useParams()
  const animal = mockAnimals.find((a) => a.id === id)

  if (!animal) {
    return (
      <div className="text-center py-12">
        <h2 className="text-primary mb-4">Animal no encontrado</h2>
        <Link to="/admin/animales">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Button>
        </Link>
      </div>
    )
  }

  const animalHealthRecords = mockHealthRecords.filter((r) => r.animalId === animal.id)
  const animalFeedRecords = mockFeedRecords.filter((r) => r.target === animal.id)

  // Mock production data for this animal
  const productionData = [
    { date: "2024-11-22", liters: 18 },
    { date: "2024-11-23", liters: 19 },
    { date: "2024-11-24", liters: 17 },
    { date: "2024-11-25", liters: 20 },
    { date: "2024-11-26", liters: 19 },
    { date: "2024-11-27", liters: 21 },
    { date: "2024-11-28", liters: 20 },
  ]

  const getStateColor = (state?: string) => {
    switch (state) {
      case "produccion":
        return "bg-[var(--green-status)]/20 text-[var(--green-status)]"
      case "preñada":
        return "bg-[var(--blue-light)]/20 text-[var(--blue-light)]"
      case "enfermo":
        return "bg-[var(--red-soft)]/20 text-[var(--red-soft)]"
      default:
        return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  const getStateName = (state?: string) => {
    switch (state) {
      case "produccion":
        return "En Producción"
      case "preñada":
        return "Preñada"
      case "enfermo":
        return "Enfermo"
      default:
        return "Normal"
    }
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/admin/animales">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al catálogo
        </Button>
      </Link>

      {/* Animal Header */}
      <Card className="overflow-hidden shadow-lg border border-border">
        <div className="p-6 text-white" style={{ backgroundImage: 'linear-gradient(to bottom right, var(--green-pastel), var(--blue-light))' }}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 bg-white/90 rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-3xl">🐄</span>
              </div>
              <div>
                <h1 className="mb-2 text-white">{animal.arete}</h1>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-white/90 text-primary capitalize">{animal.type}</Badge>
                  <Badge className="bg-white/90 text-primary">{animal.breed}</Badge>
                  <Badge className="bg-white/90 text-primary">
                    {animal.sex === "F" ? "Hembra" : "Macho"}
                  </Badge>
                  {animal.state && (
                    <Badge className={`${getStateColor(animal.state)} border-0`}>
                      {animal.state === "produccion"
                        ? "En Producción"
                        : animal.state === "preñada"
                          ? "Preñada"
                          : animal.state === "enfermo"
                            ? "Enfermo"
                            : animal.state}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {animal.finca} • {animal.lote}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{animal.age}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20 self-start">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card">
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <Scale className="h-5 w-5 mx-auto mb-2 text-blue-400" />
            <p className="text-muted-foreground mb-1">Peso Actual</p>
            <p className="text-primary">{animal.weight ? `${animal.weight} kg` : "N/A"}</p>
          </div>
          {animal.type === "vaca" && (
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <Milk className="h-5 w-5 mx-auto mb-2 text-blue-400" />
              <p className="text-muted-foreground mb-1">Producción</p>
              <p className="text-primary">20 L/día</p>
            </div>
          )}
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <Heart className="h-5 w-5 mx-auto mb-2 text-red-400" />
            <p className="text-muted-foreground mb-1">Salud</p>
            <p className="text-primary">{animal.state === "enfermo" ? "Bajo obs." : "Saludable"}</p>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <Calendar className="h-5 w-5 mx-auto mb-2 text-green-400" />
            <p className="text-muted-foreground mb-1">Última Rev.</p>
            <p className="text-primary">Hace 3 días</p>
          </div>
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="alimentacion" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-card border border-border rounded-xl p-1">
          <TabsTrigger value="alimentacion" className="gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Alimentación
          </TabsTrigger>
          <TabsTrigger value="produccion" className="gap-2">
            <Milk className="h-4 w-4" />
            Producción
          </TabsTrigger>
          <TabsTrigger value="salud" className="gap-2">
            <Heart className="h-4 w-4" />
            Salud
          </TabsTrigger>
          <TabsTrigger value="notas" className="gap-2">
            <FileText className="h-4 w-4" />
            Notas
          </TabsTrigger>
        </TabsList>

        {/* Alimentación Tab */}
        <TabsContent value="alimentacion" className="mt-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary">Historial de Alimentación</h3>
            <Button size="sm" className="text-white" style={{ backgroundColor: 'var(--orange-soft)' }}>
              Registrar Alimentación
            </Button>
          </div>

          {animalFeedRecords.length > 0 ? (
            <div className="space-y-3">
              {animalFeedRecords.map((record) => (
                <Card key={record.id} className="p-4 shadow-md border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(246, 168, 0, 0.2)' }}>
                        <UtensilsCrossed className="h-5 w-5" style={{ color: 'var(--orange-soft)' }} />
                      </div>
                      <div>
                        <h4 className="mb-1">{record.feedType}</h4>
                        <p className="text-muted-foreground">
                          {record.quantity} {record.unit}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{new Date(record.date).toLocaleDateString()}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">No hay registros de alimentación para este animal</p>
            </Card>
          )}
        </TabsContent>

        {/* Producción Tab */}
        <TabsContent value="produccion" className="mt-6 space-y-6">
          {animal.type === "vaca" ? (
            <>
              <Card className="p-6 shadow-md border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-primary">Producción de Leche - Últimos 7 días</h3>
                  <Badge className="text-white" style={{ backgroundColor: 'var(--blue-light)' }}>Promedio: 19 L/día</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="date"
                      stroke="var(--muted-foreground)"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getDate()}/${date.getMonth() + 1}`
                      }}
                    />
                    <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="liters"
                      stroke="var(--blue-light)"
                      strokeWidth={3}
                      dot={{ fill: "var(--blue-light)", r: 5 }}
                      name="Litros"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 shadow-md border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5" style={{ color: 'var(--green-status)' }} />
                    <p className="text-muted-foreground">Máximo</p>
                  </div>
                  <h3 className="text-primary">21 L</h3>
                </Card>
                <Card className="p-6 shadow-md border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Milk className="h-5 w-5" style={{ color: 'var(--blue-light)' }} />
                    <p className="text-muted-foreground">Promedio</p>
                  </div>
                  <h3 className="text-primary">19 L</h3>
                </Card>
                <Card className="p-6 shadow-md border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5" style={{ color: 'var(--orange-soft)' }} />
                    <p className="text-muted-foreground">Último registro</p>
                  </div>
                  <h3 className="text-primary">Hoy</h3>
                </Card>
              </div>
            </>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">La producción de leche no aplica para este tipo de animal</p>
            </Card>
          )}
        </TabsContent>

        {/* Salud Tab */}
        <TabsContent value="salud" className="mt-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary">Historial Sanitario</h3>
            <Button size="sm" className="text-white" style={{ backgroundColor: 'var(--red-soft)' }}>
              Registrar Evento
            </Button>
          </div>

          {/* Vaccine records section */}
          <div className="mb-6">
            <h4 className="text-primary mb-3 flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              Vacunas
            </h4>
            {mockVaccines.filter((v) => v.animalId === animal.id).length > 0 ? (
              <div className="space-y-3">
                {mockVaccines
                  .filter((v) => v.animalId === animal.id)
                  .map((vaccine) => (
                    <Card key={vaccine.id} className="p-4 shadow-md border border-border">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
                            <Syringe className="h-5 w-5" style={{ color: 'var(--blue-light)' }} />
                          </div>
                          <div>
                            <h4 className="mb-1">{vaccine.vaccineType}</h4>
                            <p className="text-muted-foreground">Dosis: {vaccine.dose}</p>
                            <p className="text-muted-foreground">Responsable: {vaccine.responsible}</p>
                            {vaccine.nextDose && (
                              <p className="text-muted-foreground">
                                Próxima dosis: {new Date(vaccine.nextDose).toLocaleDateString()}
                              </p>
                            )}
                            {vaccine.notes && <p className="text-muted-foreground italic mt-1">{vaccine.notes}</p>}
                          </div>
                        </div>
                        <Badge variant="outline">{new Date(vaccine.date).toLocaleDateString()}</Badge>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="p-6 text-center shadow-md border border-border">
                <p className="text-muted-foreground">No hay registros de vacunas</p>
              </Card>
            )}
          </div>

          {/* Disease records section */}
          <div>
            <h4 className="text-primary mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Enfermedades y Tratamientos
            </h4>
            {mockDiseaseRecords.filter((d) => d.animalId === animal.id).length > 0 ? (
              <div className="space-y-3">
                {mockDiseaseRecords
                  .filter((d) => d.animalId === animal.id)
                  .map((record) => (
                    <Card key={record.id} className="p-4 shadow-md border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor:
                                record.severity === "grave"
                                  ? "rgba(244, 67, 54, 0.2)"
                                  : record.severity === "moderada"
                                  ? "rgba(246, 168, 0, 0.2)"
                                  : "rgba(111, 180, 209, 0.2)",
                            }}
                          >
                            <Heart
                              className="h-5 w-5"
                              style={{
                                color:
                                  record.severity === "grave"
                                    ? "var(--red-soft)"
                                    : record.severity === "moderada"
                                    ? "var(--orange-soft)"
                                    : "var(--blue-light)",
                              }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="capitalize">
                                {record.severity}
                              </Badge>
                              <Badge
                                style={{
                                  backgroundColor:
                                    record.status === "completado"
                                      ? "var(--green-status)"
                                      : record.status === "en-proceso"
                                      ? "var(--orange-soft)"
                                      : "var(--muted)",
                                  color: "white",
                                }}
                              >
                                {record.status}
                              </Badge>
                            </div>
                            <h4 className="mb-1">{record.diagnosis}</h4>
                            <p className="text-muted-foreground mb-1">
                              <strong>Síntomas:</strong> {record.symptoms}
                            </p>
                            <p className="text-muted-foreground mb-1">
                              <strong>Tratamiento:</strong> {record.treatment}
                            </p>
                            {record.medicine && <p className="text-muted-foreground">💊 {record.medicine}</p>}
                            {record.duration && <p className="text-muted-foreground">⏱️ Duración: {record.duration}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{new Date(record.date).toLocaleDateString()}</Badge>
                          <p className="text-muted-foreground mt-1">{record.veterinarian}</p>
                        </div>
                      </div>
                      {record.notes && (
                        <div className="pt-3 border-t border-border">
                          <p className="text-muted-foreground italic">{record.notes}</p>
                        </div>
                      )}
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="p-6 text-center shadow-md border border-border">
                <p className="text-muted-foreground">No hay registros de enfermedades o tratamientos</p>
              </Card>
            )}
          </div>

          {/* Legacy health records */}
          {animalHealthRecords.length > 0 && (
            <div className="mt-6">
              <h4 className="text-primary mb-3">Otros Registros Sanitarios</h4>
              <div className="space-y-3">
                {animalHealthRecords.map((record) => (
                  <Card key={record.id} className="p-4 shadow-md border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor:
                              record.type === "vacuna"
                                ? "rgba(111, 180, 209, 0.2)"
                                : record.type === "enfermedad"
                                ? "rgba(244, 67, 54, 0.2)"
                                : "rgba(139, 195, 74, 0.2)",
                          }}
                        >
                          <Heart
                            className="h-5 w-5"
                            style={{
                              color:
                                record.type === "vacuna"
                                  ? "var(--blue-light)"
                                  : record.type === "enfermedad"
                                  ? "var(--red-soft)"
                                  : "var(--green-status)",
                            }}
                          />
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2 capitalize">
                            {record.type}
                          </Badge>
                          <p className="mb-1">{record.description}</p>
                          <p className="text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    {record.nextDate && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-muted-foreground">
                          Próxima dosis: {new Date(record.nextDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Notas Tab */}
        <TabsContent value="notas" className="mt-6">
          <Card className="p-8 text-center shadow-md border border-border">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-primary mb-2">Notas y Observaciones</h3>
            <p className="text-muted-foreground mb-4">
              Agrega notas sobre el comportamiento, características especiales o cualquier observación relevante
            </p>
            <Button size="sm" className="text-white" style={{ backgroundColor: 'var(--orange-soft)' }}>
              Agregar Nota
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
