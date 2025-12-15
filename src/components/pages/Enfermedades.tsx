import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, AlertCircle } from 'lucide-react';

export function Enfermedades() {
  const enfermedades = [
    {
      id: 1,
      nombre: 'Mastitis',
      animal: 'Vaca #001',
      fechaDiagnostico: '2024-12-01',
      estado: 'En Tratamiento',
      severidad: 'Media',
      tratamiento: 'Antibióticos',
    },
    {
      id: 2,
      nombre: 'Cojera',
      animal: 'Toro #005',
      fechaDiagnostico: '2024-11-25',
      estado: 'Recuperándose',
      severidad: 'Baja',
      tratamiento: 'Reposo y cuidados',
    },
    {
      id: 3,
      nombre: 'Diarrea Viral',
      animal: 'Ternero #012',
      fechaDiagnostico: '2024-12-05',
      estado: 'En Tratamiento',
      severidad: 'Alta',
      tratamiento: 'Suero y medicamentos',
    },
  ];

  const getSeveridadColor = (severidad: string) => {
    switch (severidad) {
      case 'Alta':
        return 'bg-red-100 text-red-800';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800';
      case 'Baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'En Tratamiento':
        return 'bg-orange-100 text-orange-800';
      case 'Recuperándose':
        return 'bg-blue-100 text-blue-800';
      case 'Curado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enfermedades</h1>
          <p className="text-muted-foreground">
            Registro y seguimiento de enfermedades detectadas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Enfermedad
        </Button>
      </div>

      <div className="grid gap-4">
        {enfermedades.map((enfermedad) => (
          <Card key={enfermedad.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{enfermedad.nombre}</CardTitle>
                    <CardDescription>{enfermedad.animal}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">ID: {enfermedad.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div>
                  <p className="text-sm text-muted-foreground">Diagnóstico</p>
                  <p className="font-semibold">{enfermedad.fechaDiagnostico}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge className={`mt-1 ${getEstadoColor(enfermedad.estado)}`}>
                    {enfermedad.estado}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severidad</p>
                  <Badge className={`mt-1 ${getSeveridadColor(enfermedad.severidad)}`}>
                    {enfermedad.severidad}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tratamiento</p>
                  <p className="font-semibold text-sm">{enfermedad.tratamiento}</p>
                </div>
                <div className="flex gap-2 md:justify-end md:items-end">
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
