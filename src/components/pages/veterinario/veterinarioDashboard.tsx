import { Card } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Link } from "react-router"
import { Syringe, Heart, AlertCircle, Activity, Calendar, ClipboardList, Stethoscope } from "lucide-react"
import { mockVaccines, mockDiseaseRecords, mockAnimals, mockAlerts } from "../../../mock/mockData"

export function VeterinarioDashboard() {
  const upcomingVaccines = mockVaccines.filter((v) => {
    if (!v.nextDose) return false
    const nextDoseDate = new Date(v.nextDose)
    const today = new Date()
    const daysUntil = Math.ceil((nextDoseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 30 && daysUntil > 0
  })

  const activeTreatments = mockDiseaseRecords.filter((d) => d.status === "en-proceso")
  const sickAnimals = mockAnimals.filter((a) => a.state === "enfermo")
  const healthAlerts = mockAlerts.filter((a) => a.type === "vacuna" || a.type === "tratamiento")
  const totalVaccinesThisMonth = mockVaccines.filter((v) => {
    const vaccineDate = new Date(v.date)
    const now = new Date()
    return vaccineDate.getMonth() === now.getMonth() && vaccineDate.getFullYear() === now.getFullYear()
  }).length

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-primary mb-2">Panel Veterinario</h1>
        <p className="text-muted-foreground">Control sanitario y gestión de salud del hato</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
              <Syringe className="h-6 w-6" style={{ color: 'var(--blue-light)' }} />
            </div>
            <p className="text-muted-foreground">Vacunas Pendientes</p>
          </div>
          <h2 className="text-primary">{upcomingVaccines.length}</h2>
          <p className="text-muted-foreground mt-1">Próximos 30 días</p>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(246, 168, 0, 0.2)' }}>
              <Heart className="h-6 w-6" style={{ color: 'var(--orange-soft)' }} />
            </div>
            <p className="text-muted-foreground">Tratamientos Activos</p>
          </div>
          <h2 className="text-primary">{activeTreatments.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(244, 67, 54, 0.2)' }}>
              <AlertCircle className="h-6 w-6" style={{ color: 'var(--red-soft)' }} />
            </div>
            <p className="text-muted-foreground">Animales Enfermos</p>
          </div>
          <h2 className="text-primary">{sickAnimals.length}</h2>
        </Card>

        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
              <Activity className="h-6 w-6" style={{ color: 'var(--green-status)' }} />
            </div>
            <p className="text-muted-foreground">Vacunas Este Mes</p>
          </div>
          <h2 className="text-primary">{totalVaccinesThisMonth}</h2>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/veterinario/vacunas">
          <Card className="p-6 shadow-md border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
                <Syringe className="h-8 w-8" style={{ color: 'var(--blue-light)' }} />
              </div>
              <div>
                <h3 className="text-primary mb-1">Vacunas</h3>
                <p className="text-muted-foreground">Registrar y controlar</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/veterinario/enfermedades">
          <Card className="p-6 shadow-md border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(244, 67, 54, 0.2)' }}>
                <Stethoscope className="h-8 w-8" style={{ color: 'var(--red-soft)' }} />
              </div>
              <div>
                <h3 className="text-primary mb-1">Enfermedades</h3>
                <p className="text-muted-foreground">Diagnóstico y tratamiento</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/admin/animales">
          <Card className="p-6 shadow-md border border-border hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
                <ClipboardList className="h-8 w-8" style={{ color: 'var(--green-status)' }} />
              </div>
              <div>
                <h3 className="text-primary mb-1">Animales</h3>
                <p className="text-muted-foreground">Ver catálogo completo</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Alerts */}
      {healthAlerts.length > 0 && (
        <div>
          <h3 className="text-primary mb-4">Alertas Sanitarias Prioritarias</h3>
          <div className="space-y-3">
            {healthAlerts.slice(0, 3).map((alert) => (
              <Card key={alert.id} className="p-4 shadow-md border border-border">
                <div className="flex items-start gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: alert.priority === "alta" ? 'rgba(244, 67, 54, 0.2)' : 'rgba(246, 168, 0, 0.2)',
                    }}
                  >
                    {alert.type === "vacuna" ? (
                      <Syringe
                        className="h-5 w-5"
                        style={{
                          color: alert.priority === "alta" ? 'var(--red-soft)' : 'var(--orange-soft)',
                        }}
                      />
                    ) : (
                      <Heart className="h-5 w-5" style={{ color: 'var(--red-soft)' }} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4>{alert.title}</h4>
                      <Badge variant={alert.priority === "alta" ? "destructive" : "secondary"}>{alert.priority}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{alert.description}</p>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(alert.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Treatments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-primary">Tratamientos Activos</h3>
          <Link to="/veterinario/enfermedades">
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </Link>
        </div>
        {activeTreatments.length > 0 ? (
          <div className="space-y-3">
            {activeTreatments.map((record) => {
              const animal = mockAnimals.find((a) => a.id === record.animalId)
              return (
                <Card key={record.id} className="p-4 shadow-md border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(246, 168, 0, 0.2)' }}>
                        <Stethoscope className="h-5 w-5" style={{ color: 'var(--orange-soft)' }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Link to={`/admin/animales/${animal?.id}`}>
                            <span className="text-primary hover:underline">{animal?.arete}</span>
                          </Link>
                          <Badge className={getSeverityColor(record.severity)}>{record.severity}</Badge>
                        </div>
                        <h4 className="mb-1">{record.diagnosis}</h4>
                        <p className="text-muted-foreground">{record.treatment}</p>
                        {record.medicine && <p className="text-muted-foreground">💊 {record.medicine}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{record.status}</Badge>
                      {record.duration && <p className="text-muted-foreground mt-1">Duración: {record.duration}</p>}
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
      </div>

      {/* Upcoming Vaccines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-primary">Próximas Vacunas</h3>
          <Link to="/veterinario/vacunas">
            <Button variant="ghost" size="sm">
              Ver todas
            </Button>
          </Link>
        </div>
        {upcomingVaccines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingVaccines.slice(0, 4).map((vaccine) => {
              const animal = vaccine.animalId ? mockAnimals.find((a) => a.id === vaccine.animalId) : null
              const lote = vaccine.loteId
              const daysUntil = Math.ceil(
                (new Date(vaccine.nextDose!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              )

              return (
                <Card key={vaccine.id} className="p-4 shadow-md border border-border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(111, 180, 209, 0.2)' }}>
                      <Syringe className="h-5 w-5" style={{ color: 'var(--blue-light)' }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{vaccine.vaccineType}</h4>
                      <p className="text-muted-foreground mb-2">
                        {animal ? `${animal.arete} - ${animal.type}` : `Lote ${lote}`}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{daysUntil} días</Badge>
                        <p className="text-muted-foreground">{new Date(vaccine.nextDose!).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-8 text-center shadow-md border border-border">
            <p className="text-muted-foreground">No hay vacunas próximas programadas</p>
          </Card>
        )}
      </div>
    </div>
  )
}
