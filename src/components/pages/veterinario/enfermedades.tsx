"use client"

import { useState } from "react"
import { Card } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Plus, Stethoscope, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { mockDiseaseRecords, mockAnimals, type DiseaseRecord } from "../../../mock/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Link } from "react-router"

export function Enfermedades() {
  const [showForm, setShowForm] = useState(false)
  const [diseases, setDiseases] = useState<DiseaseRecord[]>(mockDiseaseRecords)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    animalId: "",
    symptoms: "",
    diagnosis: "",
    severity: "leve" as "leve" | "moderada" | "grave",
    treatment: "",
    medicine: "",
    duration: "",
    status: "pendiente" as "pendiente" | "en-proceso" | "completado",
    notes: "",
    veterinarian: "Dr. Carlos Ruiz",
  })

  const handleSubmit = () => {
    const newDisease: DiseaseRecord = {
      id: String(diseases.length + 1),
      ...formData,
    }

    setDiseases([...diseases, newDisease])
    setShowForm(false)
    setFormData({
      date: new Date().toISOString().split("T")[0],
      animalId: "",
      symptoms: "",
      diagnosis: "",
      severity: "leve",
      treatment: "",
      medicine: "",
      duration: "",
      status: "pendiente",
      notes: "",
      veterinarian: "Dr. Carlos Ruiz",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "grave":
        return "bg-[var(--red-soft)] text-white"
      case "moderada":
        return "bg-[var(--orange-soft)] text-white"
      case "leve":
        return "bg-[var(--blue-light)] text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-[var(--green-status)] text-white"
      case "en-proceso":
        return "bg-[var(--orange-soft)] text-white"
      case "pendiente":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completado":
        return <CheckCircle className="h-5 w-5" />
      case "en-proceso":
        return <Clock className="h-5 w-5" />
      case "pendiente":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const pendingDiseases = diseases.filter((d) => d.status === "pendiente")
  const activeDiseases = diseases.filter((d) => d.status === "en-proceso")
  const completedDiseases = diseases.filter((d) => d.status === "completado")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Enfermedades y Tratamientos</h1>
          <p className="text-muted-foreground">Registro de diagnósticos, tratamientos y seguimiento médico</p>
        </div>
        <Button
          className="text-white"
          style={{
            backgroundColor: 'var(--red-soft)',
          }}
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Registrar Diagnóstico
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(244, 67, 54, 0.2)' }}>
              <AlertCircle className="h-6 w-6" style={{ color: 'var(--red-soft)' }} />
            </div>
            <p className="text-muted-foreground">Casos Pendientes</p>
          </div>
          <h2 className="text-primary">{pendingDiseases.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 168, 0, 0.2)' }}>
              <Stethoscope className="h-6 w-6" style={{ color: 'var(--orange-soft)' }} />
            </div>
            <p className="text-muted-foreground">En Tratamiento</p>
          </div>
          <h2 className="text-primary">{activeDiseases.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
              <CheckCircle className="h-6 w-6" style={{ color: 'var(--green-status)' }} />
            </div>
            <p className="text-muted-foreground">Completados</p>
          </div>
          <h2 className="text-primary">{completedDiseases.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
              <Stethoscope className="h-6 w-6" style={{ color: 'var(--blue-light)' }} />
            </div>
            <p className="text-muted-foreground">Total Casos</p>
          </div>
          <h2 className="text-primary">{diseases.length}</h2>
        </Card>
      </div>

      {/* Registration Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">Registrar Enfermedad / Tratamiento</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Animal Afectado</Label>
              <Select value={formData.animalId} onValueChange={(v: string) => setFormData({ ...formData, animalId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar animal" />
                </SelectTrigger>
                <SelectContent>
                  {mockAnimals.map((animal) => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.arete} - {animal.type} ({animal.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Síntomas</Label>
              <Textarea
                placeholder="Describe los síntomas observados..."
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Diagnóstico</Label>
              <Input
                placeholder="ej: Mastitis, Parasitosis, etc."
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Gravedad</Label>
              <Select value={formData.severity} onValueChange={(v: any) => setFormData({ ...formData, severity: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leve">Leve</SelectItem>
                  <SelectItem value="moderada">Moderada</SelectItem>
                  <SelectItem value="grave">Grave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Tratamiento</Label>
              <Textarea
                placeholder="Describe el tratamiento a aplicar..."
                value={formData.treatment}
                onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Medicina / Medicamento</Label>
              <Input
                placeholder="ej: Cefalexina 200mg"
                value={formData.medicine}
                onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Duración del Tratamiento</Label>
              <Input
                placeholder="ej: 5 días, 2 semanas"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={formData.status} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en-proceso">En Proceso</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Veterinario</Label>
              <Input
                value={formData.veterinarian}
                onChange={(e) => setFormData({ ...formData, veterinarian: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Notas Adicionales</Label>
              <Textarea
                placeholder="Observaciones, seguimiento, recomendaciones..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="text-white" style={{ backgroundColor: 'var(--red-soft)' }} onClick={handleSubmit}>
              Guardar Diagnóstico
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Disease Records */}
      <Tabs defaultValue="en-proceso" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
          <TabsTrigger value="en-proceso">En Tratamiento</TabsTrigger>
          <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
          <TabsTrigger value="completado">Completados</TabsTrigger>
          <TabsTrigger value="todos">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value="en-proceso" className="mt-6">
          {activeDiseases.length > 0 ? (
            <div className="space-y-4">
              {activeDiseases.map((record) => {
                const animal = mockAnimals.find((a) => a.id === record.animalId)
                return (
                  <Card key={record.id} className="p-6 shadow-md border border-border">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getSeverityColor(record.severity).split(" ")[0]}/20`}>
                            <Stethoscope
                              className={`h-5 w-5 ${getSeverityColor(record.severity).split(" ")[0].replace("bg-", "text-")}`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Link to={`/admin/animales/${animal?.id}`}>
                                <span className="text-primary hover:underline font-medium">{animal?.arete}</span>
                              </Link>
                              <Badge className={getSeverityColor(record.severity)}>{record.severity}</Badge>
                              <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                            </div>
                            <h4 className="mb-2">{record.diagnosis}</h4>
                            <div className="space-y-1 text-muted-foreground">
                              <p>
                                <strong>Síntomas:</strong> {record.symptoms}
                              </p>
                              <p>
                                <strong>Tratamiento:</strong> {record.treatment}
                              </p>
                              {record.medicine && (
                                <p>
                                  <strong>Medicina:</strong> {record.medicine}
                                </p>
                              )}
                              {record.duration && (
                                <p>
                                  <strong>Duración:</strong> {record.duration}
                                </p>
                              )}
                              {record.notes && <p className="italic mt-2">{record.notes}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <p className="text-muted-foreground">
                          {record.veterinarian} • {new Date(record.date).toLocaleDateString()}
                        </p>
                        <Button size="sm" variant="outline">
                          Actualizar Estado
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">No hay tratamientos activos</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pendiente" className="mt-6">
          {pendingDiseases.length > 0 ? (
            <div className="space-y-4">
              {pendingDiseases.map((record) => {
                const animal = mockAnimals.find((a) => a.id === record.animalId)
                return (
                  <Card key={record.id} className="p-6 shadow-md border border-border">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(244, 67, 54, 0.2)' }}>
                        <AlertCircle className="h-5 w-5" style={{ color: 'var(--red-soft)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Link to={`/admin/animales/${animal?.id}`}>
                            <span className="text-primary hover:underline font-medium">{animal?.arete}</span>
                          </Link>
                          <Badge className={getSeverityColor(record.severity)}>{record.severity}</Badge>
                        </div>
                        <h4 className="mb-2">{record.diagnosis}</h4>
                        <p className="text-muted-foreground">{record.symptoms}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">No hay casos pendientes</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completado" className="mt-6">
          {completedDiseases.length > 0 ? (
            <div className="space-y-3">
              {completedDiseases.map((record) => {
                const animal = mockAnimals.find((a) => a.id === record.animalId)
                return (
                  <Card key={record.id} className="p-6 shadow-md border border-border opacity-75">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
                        <CheckCircle className="h-5 w-5" style={{ color: 'var(--green-status)' }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-primary font-medium">{animal?.arete}</span>
                          <Badge variant="outline">{record.severity}</Badge>
                        </div>
                        <h4 className="mb-1">{record.diagnosis}</h4>
                        <p className="text-muted-foreground">
                          {record.veterinarian} • {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">No hay casos completados</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="todos" className="mt-6">
          <div className="space-y-4">
            {diseases.map((record) => {
              const animal = mockAnimals.find((a) => a.id === record.animalId)
              return (
                <Card key={record.id} className="p-6 shadow-md border border-border">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(record.status).split(" ")[0]}/20`}>
                        {getStatusIcon(record.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Link to={`/admin/animales/${animal?.id}`}>
                            <span className="text-primary hover:underline font-medium">{animal?.arete}</span>
                          </Link>
                          <Badge className={getSeverityColor(record.severity)}>{record.severity}</Badge>
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </div>
                        <h4 className="mb-2">{record.diagnosis}</h4>
                        <div className="space-y-1 text-muted-foreground">
                          <p>
                            <strong>Síntomas:</strong> {record.symptoms}
                          </p>
                          <p>
                            <strong>Tratamiento:</strong> {record.treatment}
                          </p>
                          {record.medicine && (
                            <p>
                              <strong>Medicina:</strong> {record.medicine}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground pt-3 border-t border-border">
                      {record.veterinarian} • {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
