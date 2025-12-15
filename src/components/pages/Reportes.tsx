import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  FileText, 
  Download, 
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Beef,
  Milk,
  Heart,
  DollarSign
} from 'lucide-react';

const reportCategories = [
  {
    title: 'Reportes de Animales',
    icon: Beef,
    color: 'var(--green-pastel)',
    reports: [
      { name: 'Inventario Completo de Animales', description: 'Listado completo con todos los detalles' },
      { name: 'Animales por Estado', description: 'Clasificación por estado actual' },
      { name: 'Animales por Lote/Finca', description: 'Distribución geográfica del hato' },
      { name: 'Historial de Movimientos', description: 'Cambios de lote y transferencias' },
    ]
  },
  {
    title: 'Reportes de Producción',
    icon: Milk,
    color: 'var(--blue-light)',
    reports: [
      { name: 'Producción de Leche Mensual', description: 'Análisis detallado por periodo' },
      { name: 'Producción por Animal', description: 'Rendimiento individual' },
      { name: 'Evolución de Peso', description: 'Ganancias de peso por categoría' },
      { name: 'Top Productoras', description: 'Ranking de mejores productoras' },
    ]
  },
  {
    title: 'Reportes Sanitarios',
    icon: Heart,
    color: 'var(--red-soft)',
    reports: [
      { name: 'Historial de Vacunación', description: 'Registro completo de vacunas' },
      { name: 'Enfermedades y Tratamientos', description: 'Incidencias sanitarias' },
      { name: 'Mortalidad', description: 'Análisis de causas y tendencias' },
      { name: 'Próximas Vacunas', description: 'Calendario de vacunación' },
    ]
  },
  {
    title: 'Reportes Financieros',
    icon: DollarSign,
    color: 'var(--orange-soft)',
    reports: [
      { name: 'Costos de Alimentación', description: 'Gastos por periodo y categoría' },
      { name: 'Costos Veterinarios', description: 'Inversión en salud animal' },
      { name: 'Ventas', description: 'Registro de animales vendidos' },
      { name: 'Rentabilidad por Lote', description: 'Análisis de eficiencia' },
    ]
  },
];

export function Reportes() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-primary mb-2">Reportes e Indicadores</h1>
        <p className="text-muted-foreground">
          Genera reportes detallados para tomar decisiones informadas
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--blue-light)]/20 rounded-xl">
              <BarChart3 className="h-6 w-6 text-[var(--blue-light)]" />
            </div>
            <p className="text-muted-foreground">Reportes Disponibles</p>
          </div>
          <h2 className="text-primary">16</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-pastel)]/80 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[var(--green-dark)]" />
            </div>
            <p className="text-muted-foreground">Eficiencia General</p>
          </div>
          <h2 className="text-primary">87%</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--orange-soft)]/20 rounded-xl">
              <Calendar className="h-6 w-6 text-[var(--orange-soft)]" />
            </div>
            <p className="text-muted-foreground">Periodo Actual</p>
          </div>
          <h2 className="text-primary">Nov 2024</h2>
        </Card>
        <Card className="p-6 shadow-md border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--green-status)]/20 rounded-xl">
              <PieChart className="h-6 w-6 text-[var(--green-status)]" />
            </div>
            <p className="text-muted-foreground">Datos Completos</p>
          </div>
          <h2 className="text-primary">94%</h2>
        </Card>
      </div>

      {/* Report Categories */}
      {reportCategories.map((category) => {
        const Icon = category.icon;
        return (
          <div key={category.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}30` }}>
                <Icon className="h-6 w-6" style={{ color: category.color }} />
              </div>
              <h3 className="text-primary">{category.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.reports.map((report) => (
                <Card key={report.name} className="p-4 shadow-md border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                        <div>
                          <h4 className="mb-1">{report.name}</h4>
                          <p className="text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                    <Button size="sm" className="flex-1 bg-[var(--blue-light)] hover:bg-[var(--blue-light)]/90 text-white">
                      Ver
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Custom Report Builder */}
      <Card className="p-8 bg-gradient-to-br from-[var(--green-pastel)]/30 to-[var(--blue-light)]/30 border border-border">
        <div className="text-center max-w-2xl mx-auto">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-[var(--blue-light)]" />
          <h3 className="text-primary mb-2">Constructor de Reportes Personalizados</h3>
          <p className="text-muted-foreground mb-6">
            Crea reportes personalizados seleccionando los campos, filtros y periodos que necesites
          </p>
          <Button className="bg-[var(--orange-soft)] hover:bg-[var(--orange-soft)]/90 text-white">
            Crear Reporte Personalizado
          </Button>
        </div>
      </Card>
    </div>
  );
}
