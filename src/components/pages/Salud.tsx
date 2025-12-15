import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, Heart, Syringe, AlertCircle, Activity } from 'lucide-react';
import { mockHealthRecords, mockAnimals, mockAlerts } from '../../utils/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Salud() {
  const [showForm, setShowForm] = useState(false);

  const healthAlerts = mockAlerts.filter(a => a.type === 'vacuna' || a.type === 'tratamiento');
  const sickAnimals = mockAnimals.filter(a => a.state === 'enfermo');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Módulo de Salud</h1>
          <p className="text-muted-foreground">
            Control sanitario y seguimiento de salud del hato
          </p>
        </div>
        <Button 
          className="bg-[var(--red-soft)] hover:bg-[var(--red-soft)]/90 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Registrar Evento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <Activity className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <p className="text-muted-foreground">Saludables</p>
          </div>
          <h2 className="text-primary">{mockAnimals.length - sickAnimals.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--red-soft)]/20 rounded-xl">
              <AlertCircle className="h-6 w-6 text-[var(--red-soft)]" />
            </div>
            <p className="text-muted-foreground">Enfermos</p>
          </div>
          <h2 className="text-primary">{sickAnimals.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <Syringe className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Vacunas Pendientes</p>
          </div>
          <h2 className="text-primary">{healthAlerts.filter(a => a.type === 'vacuna').length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Heart className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Tratamientos Activos</p>
          </div>
          <h2 className="text-primary">{healthAlerts.filter(a => a.type === 'tratamiento').length}</h2>
        </Card>
      </div>

      {/* Alerts Section */}
      {healthAlerts.length > 0 && (
        <div>
          <h3 className="text-primary mb-4">Alertas Sanitarias</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {healthAlerts.map((alert) => (
              <Card key={alert.id} className="p-4 shadow-md border border-border">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.priority === 'alta' ? 'bg-[var(--red-soft)]/20' : 'bg-[var(--orange-soft)]/20'
                  }`}>
                    {alert.type === 'vacuna' ? (
                      <Syringe className={`h-5 w-5 ${
                        alert.priority === 'alta' ? 'text-[var(--red-soft)]' : 'text-[var(--orange-soft)]'
                      }`} />
                    ) : (
                      <Heart className="h-5 w-5 text-[var(--red-soft)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4>{alert.title}</h4>
                      <Badge variant={alert.priority === 'alta' ? 'destructive' : 'secondary'}>
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
      )}

      {/* Registration Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">Nuevo Evento Sanitario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Tipo de Evento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacuna">Vacuna</SelectItem>
                  <SelectItem value="enfermedad">Enfermedad / Diagnóstico</SelectItem>
                  <SelectItem value="tratamiento">Tratamiento / Medicamento</SelectItem>
                  <SelectItem value="revision">Revisión general</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <Label>Animal</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar animal" />
                </SelectTrigger>
                <SelectContent>
                  {mockAnimals.slice(0, 5).map(animal => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.arete} - {animal.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Gravedad / Prioridad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Descripción / Diagnóstico</Label>
              <Textarea placeholder="Describe el evento, síntomas, tratamiento aplicado, etc." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Próxima Revisión / Dosis (Opcional)</Label>
              <Input type="date" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="bg-[var(--red-soft)] hover:bg-[var(--red-soft)]/90 text-white">
              Guardar Evento
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Health Records */}
      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="vacunas">Vacunas</TabsTrigger>
          <TabsTrigger value="enfermedades">Enfermedades</TabsTrigger>
          <TabsTrigger value="tratamientos">Tratamientos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-6">
          <div className="space-y-3">
            {mockHealthRecords.map((record) => {
              const animal = mockAnimals.find(a => a.id === record.animalId);
              return (
                <Card key={record.id} className="p-4 shadow-md border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        record.type === 'vacuna' ? 'bg-[var(--blue-light)]/20' :
                        record.type === 'enfermedad' ? 'bg-[var(--red-soft)]/20' :
                        'bg-[var(--green-status)]/20'
                      }`}>
                        <Heart className={`h-5 w-5 ${
                          record.type === 'vacuna' ? 'text-[var(--blue-light)]' :
                          record.type === 'enfermedad' ? 'text-[var(--red-soft)]' :
                          'text-[var(--green-status)]'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="capitalize">{record.type}</Badge>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-primary">{animal?.arete}</span>
                        </div>
                        <p className="mb-1">{record.description}</p>
                        {record.nextDate && (
                          <p className="text-muted-foreground">
                            Próxima: {new Date(record.nextDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline">{new Date(record.date).toLocaleDateString()}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="vacunas" className="mt-6">
          <div className="space-y-3">
            {mockHealthRecords.filter(r => r.type === 'vacuna').map((record) => {
              const animal = mockAnimals.find(a => a.id === record.animalId);
              return (
                <Card key={record.id} className="p-4 shadow-md border border-border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--blue-light)]/20 rounded-lg">
                      <Syringe className="h-5 w-5 text-[var(--blue-light)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary">{animal?.arete}</span>
                        <Badge variant="outline">{new Date(record.date).toLocaleDateString()}</Badge>
                      </div>
                      <p>{record.description}</p>
                      {record.nextDate && (
                        <p className="text-muted-foreground mt-1">
                          Próxima dosis: {new Date(record.nextDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="enfermedades" className="mt-6">
          <Card className="p-8 text-center shadow-md border border-border">
            <p className="text-muted-foreground">Filtra registros por enfermedades diagnosticadas</p>
          </Card>
        </TabsContent>

        <TabsContent value="tratamientos" className="mt-6">
          <Card className="p-8 text-center shadow-md border border-border">
            <p className="text-muted-foreground">Filtra registros por tratamientos aplicados</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
