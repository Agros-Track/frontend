# Integración de Grafana Dashboards

## 📊 Descripción

Se ha integrado Grafana para proporcionar dashboards avanzados de métricas según el rol del usuario.

## 🔗 URLs de Grafana

- **Base URL**: `https://grafana-jirn.onrender.com`
- **Dashboards List**: `https://grafana-jirn.onrender.com/dashboards`

### Dashboards por Rol

#### Super Admin
- **URL**: `https://grafana-jirn.onrender.com/d/add7dvv/super-admin`
- **Descripción**: Métricas globales de la plataforma, tenants, usuarios y sistema
- **Rango de tiempo**: Últimas 6 horas (configurable)

#### Admin
- **URL**: `https://grafana-jirn.onrender.com/d/adgkmrz/admin`
- **Descripción**: Métricas de gestión de finca y operaciones
- **Rango de tiempo**: 10-15 de diciembre de 2025

#### Veterinario
- **URL**: `https://grafana-jirn.onrender.com/d/admqwxv/veterinarian`
- **Descripción**: Métricas de salud animal y tratamientos
- **Rango de tiempo**: Últimas 6 horas (configurable)

#### Worker
- **URL**: `https://grafana-jirn.onrender.com/d/ad4frtg/wokers`
- **Descripción**: Métricas de tareas y producción diaria
- **Rango de tiempo**: Últimas 6 horas (configurable)

## 📁 Archivos Creados/Modificados

### 1. Componente Grafana Dashboard
**Archivo**: `src/components/ui/grafana-dashboard.tsx`

Componente reutilizable que renderiza un iframe de Grafana con:
- Loading spinner mientras carga
- Título personalizable
- Altura configurable
- Diseño responsivo

### 2. Configuración de URLs
**Archivo**: `src/config/grafana.config.ts`

Contiene:
- URLs de todos los dashboards
- Helper function `getGrafanaDashboardByRole()`
- Configuración centralizada

### 3. Dashboards Actualizados

#### Super Admin Dashboard
**Archivo**: `src/pages/super-admin/DashboardPage.tsx`
- ✅ Tab "Resumen" con métricas de tenants
- ✅ Tab "Métricas Avanzadas" con Grafana

#### Admin/Veterinario Dashboard
**Archivo**: `src/components/pages/Dashboard.tsx`
- ✅ Tab "Resumen" con KPIs de finca
- ✅ Tab "Métricas Avanzadas" con Grafana
- ✅ Detecta automáticamente el rol del usuario

#### Worker Dashboard
**Archivo**: `src/pages/worker/DashboardPage.tsx`
- ✅ Tab "Mis Tareas" con tareas diarias
- ✅ Tab "Métricas" con Grafana

## 🚀 Uso

### Ejemplo de Uso Directo

```tsx
import { GrafanaDashboard } from '@/components/ui/grafana-dashboard';
import { GRAFANA_DASHBOARDS } from '@/config/grafana.config';

function MyDashboard() {
  return (
    <GrafanaDashboard
      title="Dashboard Personalizado"
      url={GRAFANA_DASHBOARDS.ADMIN.url}
      height="800px"
    />
  );
}
```

### Ejemplo con Detección de Rol

```tsx
import { getGrafanaDashboardByRole } from '@/config/grafana.config';

const userRole = 'VETERINARIAN'; // Obtener del contexto/localStorage
const dashboard = getGrafanaDashboardByRole(userRole);

if (dashboard) {
  <GrafanaDashboard
    title={dashboard.title}
    url={dashboard.url}
  />
}
```

## 🎨 Características

### Componente GrafanaDashboard

**Props:**
- `title` (opcional): Título del dashboard
- `url` (requerido): URL del dashboard de Grafana
- `height` (opcional): Altura del iframe (default: "600px")
- `className` (opcional): Clases CSS adicionales

**Características:**
- Loading state con spinner
- Diseño responsivo
- Integrado con shadcn/ui Card
- Bordes redondeados
- Soporte para temas (dark/light)

## 🔧 Configuración Adicional

### Variables de Entorno (Opcional)

Si deseas hacer las URLs configurables:

```env
VITE_GRAFANA_BASE_URL=https://grafana-jirn.onrender.com
VITE_GRAFANA_ORG_ID=1
```

### Autenticación (Si es necesaria)

Si los dashboards requieren autenticación, considera:
1. Usar tokens de acceso de Grafana
2. Configurar iframe embedding en Grafana
3. Usar proxy para autenticación

## 📝 Notas

1. **Rendimiento**: Los iframes de Grafana pueden tardar en cargar, especialmente con muchos datos
2. **Seguridad**: Asegúrate de que Grafana permita embedding en tu dominio
3. **Responsividad**: Los dashboards de Grafana son responsivos, pero ajusta el height según sea necesario
4. **Rangos de Tiempo**: Puedes modificar los parámetros `from` y `to` en las URLs para ajustar rangos

## 🔐 Seguridad

- Las URLs son públicas de Grafana (asegúrate de que esto sea intencional)
- Si necesitas autenticación, implementa tokens en los headers del iframe
- Considera usar CSP (Content Security Policy) headers

## 🐛 Troubleshooting

### El dashboard no carga
1. Verifica que la URL de Grafana sea accesible
2. Comprueba la configuración de CORS en Grafana
3. Revisa la consola del navegador para errores

### El iframe está bloqueado
1. Verifica que Grafana permita embedding
2. Revisa las políticas de seguridad del navegador
3. Comprueba las configuraciones de X-Frame-Options

### Los dashboards se ven cortados
1. Ajusta el parámetro `height` del componente
2. Modifica el diseño de Grafana para que sea más compacto
3. Usa parámetros de zoom en la URL si Grafana lo soporta

## 📚 Recursos

- [Grafana Embedding Documentation](https://grafana.com/docs/grafana/latest/dashboards/share-dashboards-panels/)
- [Grafana URL Parameters](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/manage-dashboard-links/)
- [React iframe Best Practices](https://react.dev/reference/react-dom/components/iframe)
