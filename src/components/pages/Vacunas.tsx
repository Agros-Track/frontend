import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Syringe } from 'lucide-react';

export function Vacunas() {
  const vacunas = [
    {
      id: 1,
      nombre: 'Fiebre Aftosa',
      animal: 'Vaca #001',
      fechaAplicacion: '2024-10-15',
      proximaDosis: '2025-04-15',
      veterinario: 'Dr. López',
    },
    {
      id: 2,
      nombre: 'Rabia',
      animal: 'Toro #005',
      fechaAplicacion: '2024-09-20',
      proximaDosis: '2026-09-20',
      veterinario: 'Dr. García',
    },
    {
      id: 3,
      nombre: 'Brucelosis',
      animal: 'Vaca #003',
      fechaAplicacion: '2024-11-10',
      proximaDosis: 'N/A',
      veterinario: 'Dr. López',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vacunas</h1>
          <p className="text-muted-foreground">
            Registro y seguimiento de vacunaciones
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Vacuna
        </Button>
      </div>

      <div className="grid gap-4">
        {vacunas.map((vacuna) => (
          <Card key={vacuna.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Syringe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{vacuna.nombre}</CardTitle>
                    <CardDescription>{vacuna.animal}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">ID: {vacuna.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fecha Aplicación</p>
                  <p className="font-semibold">{vacuna.fechaAplicacion}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Próxima Dosis</p>
                  <p className="font-semibold">{vacuna.proximaDosis}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Veterinario</p>
                  <p className="font-semibold">{vacuna.veterinario}</p>
                </div>
                <div className="flex gap-2 md:justify-end">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
