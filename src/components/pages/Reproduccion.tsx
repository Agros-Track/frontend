import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Baby, Calendar, Syringe, Heart } from 'lucide-react';
import { mockAnimals } from '../../mock/mockData';

export function Reproduccion() {
  const preñadas = mockAnimals.filter(a => a.state === 'preñada');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Módulo de Reproducción</h1>
          <p className="text-muted-foreground">
            Control reproductivo y seguimiento de gestación
          </p>
        </div>
        <Button className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
          <Baby className="h-4 w-4 mr-2" />
          Registrar Evento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <Baby className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Preñadas</p>
          </div>
          <h2 className="text-primary">{preñadas.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-pastel)]/80 rounded-xl">
              <Calendar className="h-6 w-6 text-[var(--green-dark)]" />
            </div>
            <p className="text-muted-foreground">Partos Próximos</p>
          </div>
          <h2 className="text-primary">3</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Syringe className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Inseminaciones (mes)</p>
          </div>
          <h2 className="text-primary">5</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <Heart className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <p className="text-muted-foreground">Tasa Efectividad</p>
          </div>
          <h2 className="text-primary">78%</h2>
        </Card>
      </div>

      {/* Pregnant Animals */}
      <div>
        <h3 className="text-primary mb-4">Animales Preñadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preñadas.map((animal) => {
            const daysPregnant = Math.floor(Math.random() * 200 + 50);
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + (280 - daysPregnant));
            
            return (
              <Card key={animal.id} className="p-4 shadow-md border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="mb-1">{animal.arete}</h4>
                    <p className="text-muted-foreground">{animal.breed}</p>
                  </div>
                  <Badge className="bg-[var(--blue-light)] text-white">
                    Preñada
                  </Badge>
                </div>
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Días de gestación</span>
                    <span>{daysPregnant} días</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fecha probable parto</span>
                    <span>{dueDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estado</span>
                    <Badge variant="secondary" className="bg-[var(--green-status)]/20 text-[var(--green-status)]">
                      Normal
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Historial Reproductivo
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upcoming Births */}
      <Card className="p-6 shadow-md border border-border">
        <h3 className="text-primary mb-4">Partos Próximos (30 días)</h3>
        <div className="space-y-3">
          {preñadas.slice(0, 3).map((animal, index) => {
            const daysUntilBirth = Math.floor(Math.random() * 25 + 5);
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + daysUntilBirth);
            
            return (
              <div key={animal.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--blue-light)]/20">
                    <Calendar className="h-5 w-5 text-[var(--blue-light)]" />
                  </div>
                  <div>
                    <h4 className="mb-1">{animal.arete}</h4>
                    <p className="text-muted-foreground">{dueDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant={daysUntilBirth < 10 ? 'destructive' : 'secondary'}>
                  En {daysUntilBirth} días
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Info Section */}
      <Card className="p-8 bg-gradient-to-br from-[var(--green-pastel)]/30 to-[var(--blue-light)]/30 border border-border">
        <div className="text-center max-w-2xl mx-auto">
          <Baby className="h-12 w-12 mx-auto mb-4 text-[var(--blue-light)]" />
          <h3 className="text-primary mb-2">Control Reproductivo Completo</h3>
          <p className="text-muted-foreground">
            Registra servicios, inseminaciones, diagnósticos de preñez y nacimientos. 
            Recibe alertas de partos próximos y mantén el control completo del programa reproductivo de tu finca.
          </p>
        </div>
      </Card>
    </div>
  );
}
