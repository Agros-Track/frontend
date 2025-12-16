"use client"

import { useState } from "react"
import { Card } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Plus, Syringe, Calendar, AlertCircle } from "lucide-react"
import { mockVaccines, mockAnimals, mockFincas, type Vaccine } from "../../../utils/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Link } from "react-router"

export function Vacunas() {
  const [showForm, setShowForm] = useState(false)
  const [vaccines, setVaccines] = useState<Vaccine[]>(mockVaccines)
  const [applicationType, setApplicationType] = useState<"individual" | "lote">("individual")
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    animalId: "",
    loteId: "",
    vaccineType: "",
    dose: "",
    responsible: "Dr. Carlos Ruiz",
    nextDose: "",
    notes: "",
  })

  const handleSubmit = () => {
    const newVaccine: Vaccine = {
      id: String(vaccines.length + 1),
      date: formData.date,
      ...(applicationType === "individual"
        ? { animalId: formData.animalId }
        : {
            loteId: formData.loteId,
            appliedAnimals: mockAnimals
              .filter((a) => a.lote === `Lote ${formData.loteId.split("L")[1]}`)
              .map((a) => a.id),
          }),
      vaccineType: formData.vaccineType,
      dose: formData.dose,
      responsible: formData.responsible,
      nextDose: formData.nextDose || undefined,
      notes: formData.notes || undefined,
    }

    setVaccines([...vaccines, newVaccine])
    setShowForm(false)
    setFormData({
      date: new Date().toISOString().split("T")[0],
      animalId: "",
      loteId: "",
      vaccineType: "",
      dose: "",
      responsible: "Dr. Carlos Ruiz",
      nextDose: "",
      notes: "",
    })
  }

  const upcomingVaccines = vaccines
    .filter((v) => {
      if (!v.nextDose) return false
      const nextDoseDate = new Date(v.nextDose)
      const today = new Date()
      return nextDoseDate > today
    })
    .sort((a, b) => new Date(a.nextDose!).getTime() - new Date(b.nextDose!).getTime())

  const completedVaccines = vaccines.filter((v) => !v.nextDose || new Date(v.nextDose) < new Date())

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const days = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Control de Vacunas</h1>
          <p className="text-muted-foreground">Registro y seguimiento de vacunación del hato</p>
        </div>
        <Button
          style={{
            backgroundColor: 'var(--blue-light)',
          }}
          className="hover:opacity-90 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Registrar Vacuna
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
              <Syringe className="h-6 w-6" style={{ color: 'var(--blue-light)' }} />
            </div>
            <p className="text-muted-foreground">Total Vacunas</p>
          </div>
          <h2 className="text-primary">{vaccines.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
              <Calendar className="h-6 w-6" style={{ color: 'var(--green-status)' }} />
            </div>
            <p className="text-muted-foreground">Próximas Dosis</p>
          </div>
          <h2 className="text-primary">{upcomingVaccines.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 168, 0, 0.2)' }}>
              <AlertCircle className="h-6 w-6" style={{ color: 'var(--orange-soft)' }} />
            </div>
            <p className="text-muted-foreground">Vencen en 7 días</p>
          </div>
          <h2 className="text-primary">{upcomingVaccines.filter((v) => getDaysUntil(v.nextDose!) <= 7).length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
              <Syringe className="h-6 w-6" style={{ color: 'var(--blue-light)' }} />
            </div>
            <p className="text-muted-foreground">Este Mes</p>
          </div>
          <h2 className="text-primary">
            {
              vaccines.filter((v) => {
                const vaccineDate = new Date(v.date)
                const now = new Date()
                return vaccineDate.getMonth() === now.getMonth() && vaccineDate.getFullYear() === now.getFullYear()
              }).length
            }
          </h2>
        </Card>
      </div>

      {/* Registration Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">Registrar Nueva Vacuna</h3>

          <div className="mb-6">
            <Label className="mb-3 block">Tipo de Aplicación</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={applicationType === "individual" ? "default" : "outline"}
                onClick={() => setApplicationType("individual")}
                style={applicationType === "individual" ? { backgroundColor: 'var(--blue-light)' } : {}}
              >
                Animal Individual
              </Button>
              <Button
                type="button"
                variant={applicationType === "lote" ? "default" : "outline"}
                onClick={() => setApplicationType("lote")}
                style={applicationType === "lote" ? { backgroundColor: 'var(--blue-light)' } : {}}
              >
                Lote Completo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Fecha de Aplicación</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            {applicationType === "individual" ? (
              <div className="space-y-2">
                <Label>Animal</Label>
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
            ) : (
              <div className="space-y-2">
                <Label>Lote</Label>
                <Select value={formData.loteId} onValueChange={(v: string) => setFormData({ ...formData, loteId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar lote" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFincas
                      .flatMap((f) => f.lotes)
                      .map((lote) => (
                        <SelectItem key={lote.id} value={lote.id}>
                          {lote.name} - {lote.animalCount} animales
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Tipo de Vacuna</Label>
              <Select value={formData.vaccineType} onValueChange={(v: string) => setFormData({ ...formData, vaccineType: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar vacuna" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Antiaftosa">Antiaftosa</SelectItem>
                  <SelectItem value="Brucelosis">Brucelosis</SelectItem>
                  <SelectItem value="Rabia">Rabia</SelectItem>
                  <SelectItem value="Carbón Sintomático">Carbón Sintomático</SelectItem>
                  <SelectItem value="IBR">IBR (Rinotraqueitis)</SelectItem>
                  <SelectItem value="Leptospirosis">Leptospirosis</SelectItem>
                  <SelectItem value="Clostridiosis">Clostridiosis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Dosis</Label>
              <Input
                placeholder="ej: 2ml, 5ml"
                value={formData.dose}
                onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Responsable</Label>
              <Input
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Próxima Dosis (Opcional)</Label>
              <Input
                type="date"
                value={formData.nextDose}
                onChange={(e) => setFormData({ ...formData, nextDose: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Notas (Opcional)</Label>
              <Textarea
                placeholder="Observaciones, reacciones, etc."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              style={{
                backgroundColor: 'var(--blue-light)',
              }}
              className="hover:opacity-90 text-white"
              onClick={handleSubmit}
            >
              Guardar Vacuna
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Vaccine Records */}
      <Tabs defaultValue="proximas" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
          <TabsTrigger value="proximas">Próximas Dosis</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="completadas">Completadas</TabsTrigger>
        </TabsList>

        <TabsContent value="proximas" className="mt-6">
          {upcomingVaccines.length > 0 ? (
            <div className="space-y-3">
              {upcomingVaccines.map((vaccine) => {
                const animal = vaccine.animalId ? mockAnimals.find((a) => a.id === vaccine.animalId) : null
                const daysUntil = getDaysUntil(vaccine.nextDose!)
                const isUrgent = daysUntil <= 7

                return (
                  <Card key={vaccine.id} className="p-4 shadow-md border border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: isUrgent ? 'rgba(244, 67, 54, 0.2)' : 'rgba(111, 180, 209, 0.2)',
                          }}
                        >
                          <Syringe
                            className="h-5 w-5"
                            style={{
                              color: isUrgent ? 'var(--red-soft)' : 'var(--blue-light)',
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4>{vaccine.vaccineType}</h4>
                            {isUrgent && <Badge variant="destructive">Urgente</Badge>}
                          </div>
                          {animal ? (
                            <Link to={`/admin/animales/${animal.id}`}>
                              <p className="text-primary hover:underline mb-1">
                                {animal.arete} - {animal.type}
                              </p>
                            </Link>
                          ) : (
                            <p className="text-muted-foreground mb-1">
                              Lote {vaccine.loteId} ({vaccine.appliedAnimals?.length || 0} animales)
                            </p>
                          )}
                          <p className="text-muted-foreground">
                            Próxima dosis: {new Date(vaccine.nextDose!).toLocaleDateString()} ({daysUntil} días)
                          </p>
                          <p className="text-muted-foreground">Dosis: {vaccine.dose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{vaccine.responsible}</Badge>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-md border border-border">
              <p className="text-muted-foreground">No hay próximas dosis programadas</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="todas" className="mt-6">
          <div className="space-y-3">
            {vaccines.map((vaccine) => {
              const animal = vaccine.animalId ? mockAnimals.find((a) => a.id === vaccine.animalId) : null

              return (
                <Card key={vaccine.id} className="p-4 shadow-md border border-border">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
                        <Syringe className="h-5 w-5" style={{ color: 'var(--blue-light)' }} />
                      </div>
                      <div>
                        <h4 className="mb-1">{vaccine.vaccineType}</h4>
                        {animal ? (
                          <Link to={`/admin/animales/${animal.id}`}>
                            <p className="text-primary hover:underline mb-1">
                              {animal.arete} - {animal.type}
                            </p>
                          </Link>
                        ) : (
                          <p className="text-muted-foreground mb-1">
                            Lote {vaccine.loteId} ({vaccine.appliedAnimals?.length || 0} animales)
                          </p>
                        )}
                        <p className="text-muted-foreground">Aplicada: {new Date(vaccine.date).toLocaleDateString()}</p>
                        <p className="text-muted-foreground">Dosis: {vaccine.dose}</p>
                        {vaccine.nextDose && (
                          <p className="text-muted-foreground">
                            Próxima: {new Date(vaccine.nextDose).toLocaleDateString()}
                          </p>
                        )}
                        {vaccine.notes && <p className="text-muted-foreground italic mt-1">{vaccine.notes}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{vaccine.responsible}</Badge>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="completadas" className="mt-6">
          <div className="space-y-3">
            {completedVaccines.map((vaccine) => {
              const animal = vaccine.animalId ? mockAnimals.find((a) => a.id === vaccine.animalId) : null

              return (
                <Card key={vaccine.id} className="p-4 shadow-md border border-border opacity-75">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
                      <Syringe className="h-5 w-5" style={{ color: 'var(--green-status)' }} />
                    </div>
                    <div>
                      <h4 className="mb-1">{vaccine.vaccineType}</h4>
                      {animal ? (
                        <p className="text-muted-foreground mb-1">{animal.arete}</p>
                      ) : (
                        <p className="text-muted-foreground mb-1">Lote {vaccine.loteId}</p>
                      )}
                      <p className="text-muted-foreground">
                        {new Date(vaccine.date).toLocaleDateString()} • {vaccine.responsible}
                      </p>
                    </div>
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
