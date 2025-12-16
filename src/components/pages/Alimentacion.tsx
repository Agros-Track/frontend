import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, UtensilsCrossed, TrendingUp } from 'lucide-react';
import { mockFeedRecords, mockFincas } from '../../mock/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function Alimentacion() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Módulo de Alimentación</h1>
          <p className="text-muted-foreground">
            Registra y controla la alimentación del hato
          </p>
        </div>
        <Button 
          className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Registrar Alimentación
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <UtensilsCrossed className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Registros Hoy</p>
          </div>
          <h2 className="text-primary">5</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Consumo Total</p>
          </div>
          <h2 className="text-primary">175 kg</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-pastel)]/80 rounded-xl">
              <UtensilsCrossed className="h-6 w-6 text-[var(--green-dark)]" />
            </div>
            <p className="text-muted-foreground">Promedio/Animal</p>
          </div>
          <h2 className="text-primary">5.8 kg</h2>
        </Card>
      </div>

      {/* Registration Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">Nuevo Registro de Alimentación</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Fecha y Hora</Label>
              <Input type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
            </div>
            <div className="space-y-2">
              <Label>Aplicar a</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lote">Lote completo</SelectItem>
                  <SelectItem value="animal">Animal individual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Lote / Animal</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {mockFincas[0].lotes.map(lote => (
                    <SelectItem key={lote.id} value={lote.id}>{lote.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Alimento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concentrado">Concentrado</SelectItem>
                  <SelectItem value="pasto">Pasto</SelectItem>
                  <SelectItem value="suplemento">Suplemento mineral</SelectItem>
                  <SelectItem value="heno">Heno</SelectItem>
                  <SelectItem value="silaje">Silaje</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cantidad</Label>
              <Input type="number" placeholder="Ej: 150" />
            </div>
            <div className="space-y-2">
              <Label>Unidad</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="kg, L, etc." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                  <SelectItem value="L">Litros (L)</SelectItem>
                  <SelectItem value="lb">Libras (lb)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white">
              Guardar Registro
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Records List */}
      <div>
        <h3 className="text-primary mb-4">Registros Recientes</h3>
        <div className="space-y-3">
          {mockFeedRecords.map((record) => (
            <Card key={record.id} className="p-4 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[var(--orange-soft)]/20 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-[var(--orange-soft)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">{record.feedType}</h4>
                    <p className="text-muted-foreground">
                      {record.quantity} {record.unit} • Destino: {record.target.startsWith('L') ? `Lote ${record.target}` : `Animal ${record.target}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {new Date(record.date).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary by Lot */}
      <Card className="p-6 shadow-md border border-border">
        <h3 className="text-primary mb-4">Consumo por Lote (Últimos 7 días)</h3>
        <div className="space-y-4">
          {mockFincas[0].lotes.slice(0, 3).map((lote) => (
            <div key={lote.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
              <div>
                <p className="mb-1">{lote.name}</p>
                <p className="text-muted-foreground">
                  {lote.animalCount} animales
                </p>
              </div>
              <div className="text-right">
                <h4 className="text-primary">{Math.round(Math.random() * 200 + 100)} kg</h4>
                <p className="text-muted-foreground">
                  {(Math.random() * 10 + 3).toFixed(1)} kg/animal
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
