import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { MapPin, Plus, MoreVertical, Users } from 'lucide-react';
import { mockFincas } from '../../utils/mockData';
import { toast } from 'sonner';

export function Fincas() {
  const [isCreateFincaOpen, setIsCreateFincaOpen] = useState(false);
  const [isCreateLoteOpen, setIsCreateLoteOpen] = useState(false);
  const [selectedFincaId, setSelectedFincaId] = useState<string | null>(null);

  // Form states
  const [newFincaName, setNewFincaName] = useState('');
  const [newFincaLocation, setNewFincaLocation] = useState('');
  const [newLoteName, setNewLoteName] = useState('');
  const [newLoteArea, setNewLoteArea] = useState('');

  const handleOpenCreateLote = (fincaId: string) => {
    setSelectedFincaId(fincaId);
    setIsCreateLoteOpen(true);
  };

  const handleCreateFinca = () => {
    toast.success('Finca creada exitosamente');
    setIsCreateFincaOpen(false);
    setNewFincaName('');
    setNewFincaLocation('');
  };

  const handleCreateLote = () => {
    toast.success('Lote agregado exitosamente');
    setIsCreateLoteOpen(false);
    setNewLoteName('');
    setNewLoteArea('');
    setSelectedFincaId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-primary mb-2">Fincas y Lotes</h1>
          <p className="text-muted-foreground">
            Gestiona tus fincas y organiza los espacios de pastoreo
          </p>
        </div>
        <Button
          onClick={() => setIsCreateFincaOpen(true)}
          className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Finca
        </Button>
      </div>

      {/* Fincas List */}
      <div className="space-y-6">
        {mockFincas.map((finca) => (
          <Card key={finca.id} className="overflow-hidden shadow-lg border border-border">
            {/* Finca Header */}
            <div className="bg-gradient-to-r from-[var(--green-pastel)] to-[var(--blue-light)] p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/90 rounded-xl shadow-md">
                    <MapPin className="h-6 w-6 text-[var(--green-dark)]" />
                  </div>
                  <div>
                    <h2 className="text-[var(--green-dark)] mb-1">{finca.name}</h2>
                    <p className="text-[var(--green-dark)]/80 mb-2">{finca.description}</p>
                    <Badge className="bg-white/90 text-[var(--green-dark)] hover:bg-white">
                      {finca.area}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-[var(--green-dark)] hover:bg-white/20">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Lotes Section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-primary">Lotes</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenCreateLote(finca.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Lote
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {finca.lotes.map((lote) => (
                  <Card key={lote.id} className="p-4 shadow-md hover:shadow-lg transition-all border border-border bg-card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="mb-1">{lote.name}</h4>
                        <p className="text-muted-foreground">{lote.type}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          lote.status === 'en-pastoreo' ? 'bg-[var(--green-status)]/20 text-[var(--green-status)]' :
                            lote.status === 'en-descanso' ? 'bg-[var(--orange-soft)]/20 text-[var(--orange-soft)]' :
                              'bg-[var(--blue-light)]/20 text-[var(--blue-light)]'
                        }
                      >
                        {lote.status === 'en-pastoreo' ? 'En uso' :
                          lote.status === 'en-descanso' ? 'Descanso' :
                            'Disponible'}
                      </Badge>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Área</span>
                        <span>{lote.area}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Animales</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-[var(--blue-light)]" />
                          <span>{lote.animalCount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Ver detalles
                      </Button>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <p className="text-muted-foreground mb-2">Total Fincas</p>
          <h2 className="text-primary">{mockFincas.length}</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <p className="text-muted-foreground mb-2">Total Lotes</p>
          <h2 className="text-primary">
            {mockFincas.reduce((acc, f) => acc + f.lotes.length, 0)}
          </h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <p className="text-muted-foreground mb-2">Área Total</p>
          <h2 className="text-primary">85 ha</h2>
        </Card>
      </div>

      {/* Create Finca Modal */}
      <Dialog open={isCreateFincaOpen} onOpenChange={setIsCreateFincaOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Nueva Finca</DialogTitle>
            <DialogDescription>
              Ingresa los datos básicos para registrar una nueva finca.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="finca-name">Nombre de la Finca</Label>
              <Input
                id="finca-name"
                placeholder="Ej. Hacienda La Esperanza"
                value={newFincaName}
                onChange={(e) => setNewFincaName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="finca-location">Ubicación</Label>
              <Input
                id="finca-location"
                placeholder="Ej. Vereda El Porvenir"
                value={newFincaLocation}
                onChange={(e) => setNewFincaLocation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateFincaOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateFinca} className="bg-[var(--green-status)] hover:bg-[var(--green-status)]/90 text-white">
              Guardar Finca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Lote Modal */}
      <Dialog open={isCreateLoteOpen} onOpenChange={setIsCreateLoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Lote</DialogTitle>
            <DialogDescription>
              Define un nuevo lote o potrero para esta finca.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="lote-name">Nombre del Lote</Label>
              <Input
                id="lote-name"
                placeholder="Ej. Lote 1 - Norte"
                value={newLoteName}
                onChange={(e) => setNewLoteName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lote-area">Área (Hectáreas)</Label>
              <Input
                id="lote-area"
                placeholder="Ej. 5"
                type="number"
                value={newLoteArea}
                onChange={(e) => setNewLoteArea(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateLoteOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateLote} className="bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
              Agregar Lote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
