# AgroTrack — Plataforma Web para Gestión Ganadera 🌱🐄

**AgroTrack** es una plataforma web integral diseñada para optimizar la gestión operativa y administrativa de fincas ganaderas. Su arquitectura multi-tenant permite la administración centralizada de múltiples organizaciones (fincas), asegurando la trazabilidad de animales, control sanitario, y gestión eficiente de recursos humanos.

![AgroTrack Banner](https://via.placeholder.com/1200x300?text=AgroTrack+Platform)

---

## � Características Principales

*   **Arquitectura Multi-Tenant**: Aislamiento lógico de datos por organización/finca.
*   **Gestión de Inventario Animal**: Registro detallado de animales (vacas, toros, etc.), ficha técnica, y trazabilidad.
*   **Seguridad Basada en Roles (RBAC)**: Accesos y permisos granulares para Super Admins, Administradores, Veterinarios y Trabajadores.
*   **Interfaz Moderna**: Experiencia de usuario (UX) fluida y responsive construida con **React + Vite** y componentes **Shadcn**.
*   **Conexión Backend Real**: Integración completa vía API REST con servicios de autenticación y gestión de datos.

---

## � Roles del Sistema

| Rol | Descripción |
| :--- | :--- |
| **👑 Super Admin** | Gestión global de la plataforma. Crea Tenants (Fincas), administra planes y usuarios de soporte. |
| **🏢 Admin Finca** | Dueño o administrador de la finca. Gestiona usuarios locales (vets, trabajadores) y monitorea producción. |
| **🩺 Veterinario** | Encargado de la salud animal. Registra nuevos animales, diagnósticos y eventos sanitarios. |
| **👷 Trabajador** | Personal de campo. Visualiza tareas asignadas y reporta incidentes básicos. |

---

## 🛠️ Stack Tecnológico

Este proyecto ha sido construido utilizando estándares modernos de desarrollo web para garantizar escalabilidad y mantenibilidad.

### Frontend
*   **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) (Build tool ultrarápido)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estático robusto)
*   **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first framework)
*   **Componentes UI**: [Shadcn/ui](https://ui.shadcn.com/) (Basado en Radix UI)
*   **HTTP Client**: [Axios](https://axios-http.com/) (Manejo de peticiones e interceptores)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Iconos**: [Lucide React](https://lucide.dev/)

### Backend (Integración)
*   **API**: RESTful API
*   **Base de Datos**: PostgreSQL
*   **Host**: Render (Producción)

---

## 📁 Estructura del Proyecto

La estructura de directorios sigue una arquitectura modular y escalable:

```bash
frontend-views/
├── src/
│   ├── api/            # Configuración de cliente Axios e interceptores
│   ├── components/     # Biblioteca de componentes UI
│   │   ├── ui/         # Componentes base (Shadcn: Button, Input, Modal...)
│   │   └── pages/      # Componentes complejos específicos de vistas
│   ├── pages/          # Vistas principales (Page Components)
│   │   ├── super-admin/# Módulo exclusivo de Super Admin
│   │   └── ...
│   ├── services/       # Capa de comunicación con la API (endpoints)
│   ├── mocks/          # Datos simulados para desarrollo/fallback
│   └── App.tsx         # Configuración de rutas y layout principal
```

---

## 🚀 Instalación y Despliegue

### Prerrequisitos
*   **Node.js**: v18 o superior
*   **npm**: v9 o superior

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd agrotrack-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configuración de Entorno (.env)
El proyecto requiere un archivo `.env` en la raíz. Para desarrollo local conectado al backend de producción:

```env
# URL del Backend (Proxy habilitado en vite.config.ts)
VITE_API_URL=https://back-end-mmol.onrender.com/api/v1
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

---

## � Credenciales de Prueba (Demo)

Utiliza las siguientes cuentas para explorar los diferentes perfiles del sistema:

| Rol | Usuario (Email) | Contraseña |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@agrotrack.com` | `1234` |
| **Admin Finca** | `admin.esperanza@agrotrack.com` | `1234` |
| **Veterinario** | `vet.prado@agrotrack.com` | `1234` |
| **Trabajador** | `worker1.demo@agrotrack.com` | `1234` |

---

## ✅ Buenas Prácticas Implementadas

*   **Tipado Estricto**: Uso extensivo de interfaces TypeScript para modelos de datos (`User`, `Animal`, `Tenant`).
*   **Arquitectura de Servicios**: Lógica de negocio separada de la UI en la carpeta `services/`.
*   **Manejo de Errores UI**: Feedback visual al usuario mediante `Sonner` (Toasts) para éxitos y errores.
*   **Componentes Modulares**: Reutilización de componentes UI para mantener consistencia visual.
*   **Variables de Entorno**: Gestión segura de endpoints y configuraciones.

---

## 👤 Autor

**Sergio Andrés Bonilla**
*   **Rol**: Desarrollador Full-Stack / Estudiante de desarrollo de software
*   **Proyecto**: AgroTrack

---

📄 **Licencia**: Este proyecto es para uso académico y privado.
