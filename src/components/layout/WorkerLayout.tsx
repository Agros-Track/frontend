"use client"

import { Outlet } from "react-router"
import { useState } from "react"
import { LayoutDashboard, Beef, Milk, Utensils, ClipboardList, Bell, Menu, X, LogOut, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useLocation } from "react-router"
import { Input } from "../ui/input"

const navItems = [
  { title: "Dashboard", url: "/worker", icon: LayoutDashboard },
  { title: "Animales", url: "/worker/animals", icon: Beef },
  { title: "Producción", url: "/worker/production", icon: Milk },
  { title: "Alimentación", url: "/worker/feeding", icon: Utensils },
  { title: "Mis Tareas", url: "/worker/tasks", icon: ClipboardList },
  { title: "Alertas", url: "/worker/alerts", icon: Bell },
]

export function WorkerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-4 pb-4 border-r border-sidebar-border">
          <div className="flex h-16 shrink-0 items-center px-2 border-b border-sidebar-border gap-3">
            <div className="flex flex-col">
              <h2 className="text-sidebar-foreground font-semibold text-lg tracking-tight">AgroTrack</h2>
              <span className="text-xs text-sidebar-foreground/70 font-medium">Trabajador</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  location.pathname === item.url || (item.url !== "/worker" && location.pathname.startsWith(item.url))

                return (
                  <li key={item.title}>
                    <Link
                      to={item.url}
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
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-sidebar-accent/50">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-sidebar-primary">JW</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-sidebar-foreground truncate">Juan Worker</span>
                <span className="text-xs text-sidebar-foreground/70 truncate">juan@gmail.com</span>
              </div>
            </div>

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
              <h2 className="text-sidebar-foreground text-lg font-semibold tracking-tight">AgroTrack</h2>
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
                    location.pathname === item.url || (item.url !== "/worker" && location.pathname.startsWith(item.url))
                  return (
                    <li key={item.title}>
                      <Link
                        to={item.url}
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
                        <span>{item.title}</span>
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

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Topbar / Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card/80 backdrop-blur-xl px-4">
          <Button variant="ghost" size="icon" className="lg:hidden rounded-xl" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center max-w-md">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="h-9 w-full pl-10 bg-muted/50 border-border rounded-xl"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
