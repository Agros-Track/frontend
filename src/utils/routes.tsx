
import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { Dashboard } from "../components/pages/Dashboard";
import { Login } from "../components/pages/Login"
import { Fincas } from "../components/pages/Fincas";
import { Animales } from "../components/pages/Animales";
import { FichaAnimal } from "../components/pages/FichaAnimal";
import { Alimentacion } from "../components/pages/Alimentacion";
import { Salud } from "../components/pages/Salud";
import { Produccion } from "../components/pages/Produccion";
import { Tareas } from "../components/pages/Tareas";
import { Reportes } from "../components/pages/Reportes";
import { Usuarios } from "../components/pages/Usuarios";
import { Configuracion } from "../components/pages/Configuracion";
import { WorkerLayout } from "../components/layout/WorkerLayout";
import { WorkerDashboard } from "../pages/worker/DashboardPage";

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
    path: "/super-admin",
    // We can use lazy loading here if needed, but for now direct import is fine
    async lazy() {
      let { SuperAdminLayout } = await import("../components/layout/SuperAdminLayout");
      return { Component: SuperAdminLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          let { DashboardPage } = await import("../pages/super-admin/DashboardPage");
          return { Component: DashboardPage };
        }
      },
      {
        path: "tenants",
        async lazy() {
          let { TenantsPage } = await import("../pages/super-admin/tenants/TenantsPage");
          return { Component: TenantsPage };
        }
      },
      {
        path: "tenants/:id",
        async lazy() {
          let { TenantDetailPage } = await import("../pages/super-admin/tenants/TenantDetailPage");
          return { Component: TenantDetailPage };
        }
      },
      {
        path: "audit",
        async lazy() {
          let { AuditPage } = await import("../pages/super-admin/AuditPage");
          return { Component: AuditPage };
        }
      },
      {
        path: "support",
        async lazy() {
          let { SupportPage } = await import("../pages/super-admin/SupportPage");
          return { Component: SupportPage };
        }
      },
      {
        path: "settings",
        async lazy() {
          let { SettingsPage } = await import("../pages/super-admin/SettingsPage");
          return { Component: SettingsPage };
        }
      },
      {
        path: "users",
        async lazy() {
          let { UsersPage } = await import("../pages/super-admin/users/UsersPage");
          return { Component: UsersPage };
        }
      },
      {
        path: "plans",
        async lazy() {
          let { PlansPage } = await import("../pages/super-admin/PlansPage");
          return { Component: PlansPage };
        }
      },
      // Other routes will be added here
    ]
  },
  {
    path: "/worker",
    element: <WorkerLayout />,
    children: [
      {
        path: "",
        element: <WorkerDashboard />,
      },
      { path: "animals", Component: Animales },
      { path: "animals/:id", Component: FichaAnimal },
      { path: "production", Component: Produccion },
      { path: "feeding", Component: Alimentacion },
      { path: "tasks", Component: Tareas },
      { path: "weight", Component: Animales }, // Reusing Animales for weight as per current logic
      { path: "lots", Component: Fincas },
      { path: "health", Component: Salud },
      { path: "alerts", Component: Tareas }, // Reusing Tareas for alerts
    ],
  },
  {
    path: "/onboarding",
    async lazy() {
      let { OnboardingPage } = await import("../components/pages/OnboardingPage");
      return { Component: OnboardingPage };
    }
  }
]);
