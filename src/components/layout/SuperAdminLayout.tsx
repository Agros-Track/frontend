"use client"

import { Outlet } from "react-router"
import { useState } from "react"
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  ShieldCheck,
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "../ui/button"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { path: "/super-admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/super-admin/tenants", label: "Tenants", icon: Building2 },
  { path: "/super-admin/users", label: "Usuarios", icon: Users },
  { path: "/super-admin/plans", label: "Planes & Límites", icon: CreditCard },
  { path: "/super-admin/audit", label: "Auditoría & Logs", icon: ShieldCheck },
  { path: "/super-admin/support", label: "Soporte", icon: LifeBuoy },
  { path: "/super-admin/settings", label: "Configuración", icon: Settings },
]

export function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-4 pb-4 border-r border-sidebar-border">
          <div className="flex h-16 shrink-0 items-center px-2 border-b border-sidebar-border">
            <div className="flex flex-col">
              <h2 className="text-sidebar-foreground text-lg font-semibold tracking-tight">AgroTrack</h2>
              <span className="text-xs text-sidebar-foreground/70 font-medium">Super Admin</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/super-admin" && location.pathname.startsWith(item.path))
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        group flex gap-x-3 rounded-xl px-3 py-2.5 transition-all text-[15px] font-medium
                        ${
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }
                      `}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-x-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-0 z-50 lg:hidden
          ${sidebarOpen ? "block" : "hidden"}
        `}
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <aside className="fixed inset-y-0 left-0 w-72 bg-sidebar shadow-2xl">
          <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-4 pb-4">
            <div className="flex h-16 shrink-0 items-center justify-between px-2 border-b border-sidebar-border">
              <div className="flex flex-col">
                <h2 className="text-sidebar-foreground text-lg font-semibold tracking-tight">AgroTrack</h2>
                <span className="text-xs text-sidebar-foreground/70 font-medium">Super Admin</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-sidebar-foreground hover:bg-sidebar-accent rounded-xl"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/super-admin" && location.pathname.startsWith(item.path))
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          group flex gap-x-3 rounded-xl px-3 py-2.5 transition-all text-[15px] font-medium
                          ${
                            isActive
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }
                        `}
                      >
                        <Icon className="h-[18px] w-[18px] shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="mt-auto pt-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl"
                onClick={() => (window.location.href = "/")}
              >
                <LogOut className="h-[18px] w-[18px] shrink-0" />
                <span>Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card/80 backdrop-blur-xl px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="text-foreground rounded-xl"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">AgroTrack</h1>
        </div>

        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
