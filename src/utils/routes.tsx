import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../components/MainLayout"
import { Dashboard } from "../components/pages/Dashboard"
import { Login } from "../components/pages/Login"
import { Fincas } from "../components/pages/Fincas"
import { Animales } from "../components/pages/Animales"
import { FichaAnimal } from "../components/pages/FichaAnimal"
import { Alimentacion } from "../components/pages/Alimentacion"
import { Salud } from "../components/pages/Salud"
import { Produccion } from "../components/pages/Produccion"
import { Tareas } from "../components/pages/Tareas"
import { Reportes } from "../components/pages/Reportes"
import { Usuarios } from "../components/pages/Usuarios"
import { Configuracion } from "../components/pages/Configuracion"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/admin",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "fincas", Component: Fincas },
      { path: "animales", Component: Animales },
      { path: "animales/:id", Component: FichaAnimal },
      { path: "alimentacion", Component: Alimentacion },
      { path: "salud", Component: Salud },
      { path: "produccion", Component: Produccion },
      { path: "tareas", Component: Tareas },
      { path: "reportes", Component: Reportes },
      { path: "usuarios", Component: Usuarios },
      { path: "configuracion", Component: Configuracion },
    ],
  },
  {
    path: "/veterinario",
    async lazy() {
      const { VeterinarioLayout } = await import("../components/layout/VeterinarioLayout")
      return { Component: VeterinarioLayout }
    },
    children: [
      {
        index: true,
        async lazy() {
          const { VeterinarioDashboard } = await import("../components/pages/veterinario/veterinarioDashboard")
          return { Component: VeterinarioDashboard }
        },
      },
      {
        path: "vacunas",
        async lazy() {
          const { Vacunas } = await import("../components/pages/veterinario/vacunas")
          return { Component: Vacunas }
        },
      },
      {
        path: "enfermedades",
        async lazy() {
          const { Enfermedades } = await import("../components/pages/veterinario/enfermedades")
          return { Component: Enfermedades }
        },
      },
    ],
  },
  {
    path: "/super-admin",
    // We can use lazy loading here if needed, but for now direct import is fine
    async lazy() {
      const { SuperAdminLayout } = await import("../components/layout/SuperAdminLayout")
      return { Component: SuperAdminLayout }
    },
    children: [
      {
        index: true,
        async lazy() {
          const { DashboardPage } = await import("../pages/super-admin/DashboardPage")
          return { Component: DashboardPage }
        },
      },
      {
        path: "tenants",
        async lazy() {
          const { TenantsPage } = await import("../pages/super-admin/tenants/TenantsPage")
          return { Component: TenantsPage }
        },
      },
      {
        path: "tenants/:id",
        async lazy() {
          const { TenantDetailPage } = await import("../pages/super-admin/tenants/TenantDetailPage")
          return { Component: TenantDetailPage }
        },
      },
      {
        path: "audit",
        async lazy() {
          const { AuditPage } = await import("../pages/super-admin/AuditPage")
          return { Component: AuditPage }
        },
      },
      {
        path: "support",
        async lazy() {
          const { SupportPage } = await import("../pages/super-admin/SupportPage")
          return { Component: SupportPage }
        },
      },
      {
        path: "settings",
        async lazy() {
          const { SettingsPage } = await import("../pages/super-admin/SettingsPage")
          return { Component: SettingsPage }
        },
      },
      {
        path: "users",
        async lazy() {
          const { UsersPage } = await import("../pages/super-admin/users/UsersPage")
          return { Component: UsersPage }
        },
      },
      {
        path: "plans",
        async lazy() {
          const { PlansPage } = await import("../pages/super-admin/PlansPage")
          return { Component: PlansPage }
        },
      },
      // Other routes will be added here
    ],
  },
  {
    path: "/onboarding",
    async lazy() {
      const { OnboardingPage } = await import("../components/pages/OnboardingPage")
      return { Component: OnboardingPage }
    },
  },
])
