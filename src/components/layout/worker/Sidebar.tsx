import {
    Calendar,
    ClipboardList,
    Bell,
    Milk,
    Utensils,
    LayoutDashboard,
    Beef,
    LogOut
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "../../ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    {
        title: "Dashboard",
        url: "/worker",
        icon: LayoutDashboard,
    },
    {
        title: "Animales",
        url: "/worker/animals",
        icon: Beef,
    },
    {
        title: "Producción",
        url: "/worker/production",
        icon: Milk,
    },
    {
        title: "Alimentación",
        url: "/worker/feeding",
        icon: Utensils,
    },
    {
        title: "Mis Tareas",
        url: "/worker/tasks",
        icon: ClipboardList,
    },
    {
        title: "Alertas",
        url: "/worker/alerts",
        icon: Bell,
    },
];

export function WorkerSidebar() {
    const location = useLocation();

    const handleLogout = () => {
        window.location.href = '/';
    };

    return (
        <Sidebar
            collapsible="none"
            className="bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] min-h-screen"
        >
            <SidebarHeader className="h-16 shrink-0 items-center border-b border-[var(--sidebar-border)] px-6 flex-row">
                <div className="flex items-center gap-3">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--green-pastel)] shadow-[0_0_15px_rgba(168,213,186,0.3)]">
            <Beef className="h-6 w-6 text-[var(--green-dark)]" />
          </div> */}
                    {/* Kept simple text/title to match SuperAdmin specifically, or I can keep the icon if user wants 'linea de diseño' but slightly distinct.
               SuperAdmin sidebar has no icon, just text. I will match that for exact consistency unless implied otherwise.
               Wait, SuperAdmin sidebar code I read has just text: "AgroTrack" "Super Admin".
               I will stick to that structure.
           */}
                    <div className="flex flex-col">
                        <span className="text-[var(--sidebar-foreground)] text-lg font-semibold">AgroTrack</span>
                        <span className="text-xs text-[var(--sidebar-foreground)]/70">Trabajador</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-4 py-4">
                <SidebarGroup>
                    {/* SuperAdmin doesn't have a label "Menu Principal", so I remove it for alignment */}
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={location.pathname === item.url || (item.url !== '/worker' && location.pathname.startsWith(item.url))}
                                        className="gap-3 rounded-xl px-3 py-2.5 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] data-[active=true]:bg-[var(--sidebar-primary)] data-[active=true]:text-[var(--sidebar-primary-foreground)] data-[active=true]:shadow-md transition-all font-normal"
                                    >
                                        <Link to={item.url} className="">
                                            <item.icon className="h-5 w-5 shrink-0" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-[var(--sidebar-border)] p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            tooltip="Cerrar Sesión"
                            className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            <span>Cerrar Sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
