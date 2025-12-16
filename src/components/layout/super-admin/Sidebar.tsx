"use client"

import { LayoutDashboard, Building2, Users, CreditCard, ShieldCheck, LifeBuoy, Settings, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/super-admin",
    icon: LayoutDashboard,
  },
  {
    title: "Tenants",
    url: "/super-admin/tenants",
    icon: Building2,
  },
  {
    title: "Usuarios",
    url: "/super-admin/users",
    icon: Users,
  },
  {
    title: "Planes & Límites",
    url: "/super-admin/plans",
    icon: CreditCard,
  },
  {
    title: "Auditoría & Logs",
    url: "/super-admin/audit",
    icon: ShieldCheck,
  },
  {
    title: "Soporte",
    url: "/super-admin/support",
    icon: LifeBuoy,
  },
  {
    title: "Configuración",
    url: "/super-admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar
      variant="sidebar"
      collapsible="none"
      className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen"
    >
      <SidebarHeader className="h-16 shrink-0 items-center border-b border-sidebar-border px-6 flex-row">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <h2 className="text-sidebar-foreground text-lg font-semibold">AgroTrack</h2>
            <span className="text-xs text-sidebar-foreground/70">Super Admin</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.url ||
                      (item.url !== "/super-admin" && location.pathname.startsWith(item.url))
                    }
                    tooltip={item.title}
                    className="gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md transition-all font-normal"
                  >
                    <Link to={item.url} className="">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => (window.location.href = "/")}
              tooltip="Cerrar Sesión"
              className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* Hidden user profile dropdown to keep cleaner look like MainLayout, or kept minimal if needed. 
                    MainLayout doesn't have a profile footer, just logout. 
                    Super Admin might want it, but for "like admin" I will simplify.
                */}
      </SidebarFooter>
    </Sidebar>
  )
}
