import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Plus,
  Search,
  Filter,
  Eye,
  MapPin,
  MoreVertical
} from 'lucide-react';
import { mockAnimals } from '../../utils/mockData';
import { Link } from 'react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function Animales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');

  const filteredAnimals = mockAnimals.filter(animal => {
    const matchesSearch = animal.arete.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'todos' || animal.type === typeFilter;
    const matchesStatus = statusFilter === 'todos' || animal.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStateColor = (state?: string) => {
    switch (state) {
      case 'produccion':
        return 'bg-[var(--green-status)]/20 text-[var(--green-status)]';
      case 'preñada':
        return 'bg-[var(--blue-light)]/20 text-[var(--blue-light)]';
      case 'enfermo':
        return 'bg-[var(--red-soft)]/20 text-[var(--red-soft)]';
      default:
        return 'bg-[var(--muted)] text-[var(--muted-foreground)]';
    }
  };

  const getStateName = (state?: string) => {
    switch (state) {
      case 'produccion':
        return 'En Producción';
      case 'preñada':
        return 'Preñada';
      case 'enfermo':
        return 'Enfermo';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-primary mb-2">Catálogo de Animales</h1>
          <p className="text-muted-foreground">
            Gestiona y monitorea todos los animales de tus fincas
          </p>
        </div>
        <Button className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Animal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-md border border-border">
          <p className="text-muted-foreground mb-1">Total</p>
          <h3 className="text-primary">{mockAnimals.length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <p className="text-muted-foreground mb-1">Vacas</p>
          <h3 className="text-primary">{mockAnimals.filter(a => a.type === 'vaca').length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <p className="text-muted-foreground mb-1">Terneros</p>
          <h3 className="text-primary">{mockAnimals.filter(a => a.type === 'ternero').length}</h3>
        </Card>
        <Card className="p-4 shadow-md border border-border">
          <p className="text-muted-foreground mb-1">Activos</p>
          <h3 className="text-primary">{mockAnimals.filter(a => a.status === 'activo').length}</h3>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 shadow-md border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-[var(--blue-light)]" />
          <h3 className="text-primary">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por arete o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de animal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los tipos</SelectItem>
              <SelectItem value="vaca">Vacas</SelectItem>
              <SelectItem value="toro">Toros</SelectItem>
              <SelectItem value="novillo">Novillos</SelectItem>
              <SelectItem value="ternero">Terneros</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="activo">Activos</SelectItem>
              <SelectItem value="vendido">Vendidos</SelectItem>
              <SelectItem value="muerto">Muertos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Animals List */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Mostrando {filteredAnimals.length} de {mockAnimals.length} animales
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Card className="overflow-hidden shadow-md border border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left">Arete</th>
                    <th className="px-6 py-4 text-left">Tipo</th>
                    <th className="px-6 py-4 text-left">Raza</th>
                    <th className="px-6 py-4 text-left">Edad</th>
                    <th className="px-6 py-4 text-left">Ubicación</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-left">Peso</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAnimals.map((animal) => (
                    <tr key={animal.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-primary">{animal.arete}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="capitalize">
                          {animal.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span>{animal.breed}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-muted-foreground">{animal.age}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{animal.lote}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {animal.state && (
                          <Badge variant="secondary" className={getStateColor(animal.state)}>
                            {getStateName(animal.state)}
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span>{animal.weight ? `${animal.weight} kg` : '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`${animal.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredAnimals.map((animal) => (
            <Card key={animal.id} className="p-4 shadow-md border border-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-primary mb-1">{animal.arete}</h4>
                  <Badge variant="outline" className="capitalize">
                    {animal.type} • {animal.breed}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Edad:</span>
                  <span>{animal.age}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ubicación:</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {animal.lote}
                  </span>
                </div>
                {animal.weight && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Peso:</span>
                    <span>{animal.weight} kg</span>
                  </div>
                )}
                {animal.state && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estado:</span>
                    <Badge variant="secondary" className={getStateColor(animal.state)}>
                      {getStateName(animal.state)}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Link to={`${animal.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Ficha Completa
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
