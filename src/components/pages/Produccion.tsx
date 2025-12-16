import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Milk, Scale, TrendingUp, Calendar } from 'lucide-react';
import { mockAnimals, mockProductionData, mockWeightData } from '../../mock/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function Produccion() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'leche' | 'peso'>('leche');

  const todayProduction = mockProductionData[mockProductionData.length - 1].liters;
  const avgProduction = Math.round(mockProductionData.reduce((acc, d) => acc + d.liters, 0) / mockProductionData.length);
  const vacasProduccion = mockAnimals.filter(a => a.type === 'vaca' && a.state === 'produccion').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Módulo de Producción</h1>
          <p className="text-muted-foreground">
            Control de producción lechera y evolución de peso
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white"
            onClick={() => {
              setFormType('leche');
              setShowForm(!showForm);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Registrar Leche
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              setFormType('peso');
              setShowForm(!showForm);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Registrar Peso
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <Milk className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Producción Hoy</p>
          </div>
          <h2 className="text-primary">{todayProduction} L</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-pastel)]/80 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[var(--green-dark)]" />
            </div>
            <p className="text-muted-foreground">Promedio Diario</p>
          </div>
          <h2 className="text-primary">{avgProduction} L</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Milk className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Promedio/Vaca</p>
          </div>
          <h2 className="text-primary">{vacasProduccion > 0 ? (todayProduction / vacasProduccion).toFixed(1) : '0'} L</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <Calendar className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <p className="text-muted-foreground">Vacas en Producción</p>
          </div>
          <h2 className="text-primary">{vacasProduccion}</h2>
        </Card>
      </div>

      {/* Registration Form */}
      {showForm && (
        <Card className="p-6 shadow-lg border border-border">
          <h3 className="text-primary mb-6">
            {formType === 'leche' ? 'Nuevo Registro de Producción de Leche' : 'Nuevo Registro de Peso'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <Label>Animal / Lote</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lote-a">Lote A (ordeño completo)</SelectItem>
                  {mockAnimals.filter(a => a.type === 'vaca').slice(0, 3).map(animal => (
                    <SelectItem key={animal.id} value={animal.id}>
                      {animal.arete}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formType === 'leche' ? (
              <>
                <div className="space-y-2">
                  <Label>Litros Producidos</Label>
                  <Input type="number" placeholder="Ej: 18.5" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label>Turno</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mañana">Mañana</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="total">Total día</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input type="number" placeholder="Ej: 580" />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Pesaje</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Control mensual</SelectItem>
                      <SelectItem value="trimestral">Control trimestral</SelectItem>
                      <SelectItem value="especial">Pesaje especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            <Button className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
              Guardar Registro
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Milk Production Chart */}
        <Card className="p-6 shadow-md border border-border">
          <div className="mb-6">
            <h3 className="text-primary mb-1">Producción de Leche</h3>
            <p className="text-muted-foreground">Últimos 7 días</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
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
          <ResponsiveContainer width="100%" height={300}>
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

      {/* Top Producers */}
      <Card className="p-6 shadow-md border border-border">
        <h3 className="text-primary mb-4">Top Productoras - Semana Actual</h3>
        <div className="space-y-4">
          {mockAnimals
            .filter(a => a.type === 'vaca' && a.state === 'produccion')
            .slice(0, 5)
            .map((animal, index) => {
              const weeklyProduction = Math.round(Math.random() * 50 + 120);
              const avgDaily = (weeklyProduction / 7).toFixed(1);
              return (
                <div key={animal.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--blue-light)]/20">
                      <span className="text-[var(--blue-light)]">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="mb-1">{animal.arete}</h4>
                      <p className="text-muted-foreground">{animal.breed}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="text-primary">{weeklyProduction} L</h4>
                    <p className="text-muted-foreground">{avgDaily} L/día</p>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Production Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Scale className="h-5 w-5 text-[var(--orange-soft)]" />
            <p className="text-muted-foreground">Peso Promedio Hato</p>
          </div>
          <h3 className="text-primary mb-1">485 kg</h3>
          <p className="text-muted-foreground">Todas las categorías</p>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-5 w-5 text-[var(--green-status)]" />
            <p className="text-muted-foreground">Crecimiento Mensual</p>
          </div>
          <h3 className="text-primary mb-1">+12 kg</h3>
          <p className="text-muted-foreground">Promedio terneros</p>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Milk className="h-5 w-5 text-[var(--blue-light)]" />
            <p className="text-muted-foreground">Producción Mensual</p>
          </div>
          <h3 className="text-primary mb-1">13,020 L</h3>
          <p className="text-muted-foreground">Noviembre 2024</p>
        </Card>
      </div>
    </div>
  );
}
