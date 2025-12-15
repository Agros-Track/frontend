import { Outlet } from 'react-router';
import { useState } from 'react';
import {
    LayoutDashboard,
    Beef,
    Milk,
    Utensils,
    ClipboardList,
    Bell,
    Menu,
    X,
    LogOut,
    Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router';
import { Input } from '../ui/input';

const navItems = [
    { title: "Dashboard", url: "/worker", icon: LayoutDashboard },
    { title: "Animales", url: "/worker/animals", icon: Beef },
    { title: "Producción", url: "/worker/production", icon: Milk },
    { title: "Alimentación", url: "/worker/feeding", icon: Utensils },
    { title: "Mis Tareas", url: "/worker/tasks", icon: ClipboardList },
    { title: "Alertas", url: "/worker/alerts", icon: Bell },
];

export function WorkerLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar - Fixed */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[var(--sidebar)] px-6 pb-4 shadow-lg border-r border-[var(--sidebar-border)]">
                    <div className="flex h-16 shrink-0 items-center border-b border-[var(--sidebar-border)] gap-3">
                        {/* Matching Admin Header style */}
                        <div className="flex flex-col">
                            <h2 className="text-[var(--sidebar-foreground)] font-semibold text-lg">AgroTrack</h2>
                            <span className="text-xs text-[var(--sidebar-foreground)]/70">Trabajador</span>
                        </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                // Active logic: exact match for root /worker, startsWith for others
                                const isActive = location.pathname === item.url || (item.url !== '/worker' && location.pathname.startsWith(item.url));

                                return (
                                    <li key={item.title}>
                                        <Link
                                            to={item.url}
                                            className={`
                        group flex gap-x-3 rounded-xl px-3 py-2.5 transition-all
                        ${isActive
                                                    ? 'bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] shadow-md'
                                                    : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                                                }
                      `}
                                        >
                                            <Icon className="h-5 w-5 shrink-0" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="mt-auto pt-4 border-t border-[var(--sidebar-border)]">
                        <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-white/5">
                            <div className="h-8 w-8 rounded-full bg-[var(--sidebar-primary)]/20 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-[var(--sidebar-primary)]">JW</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-medium text-[var(--sidebar-foreground)] truncate">Juan Worker</span>
                                <span className="text-xs text-[var(--sidebar-foreground)]/70 truncate">juan@gmail.com</span>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-x-3 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
                            onClick={() => window.location.href = '/'}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            <span>Cerrar Sesión</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            <div
                className={`
          fixed inset-0 z-50 lg:hidden
          ${sidebarOpen ? 'block' : 'hidden'}
        `}
            >
                <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                <aside className="fixed inset-y-0 left-0 w-64 bg-[var(--sidebar)] shadow-2xl">
                    <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--sidebar-border)]">
                            <h2 className="text-[var(--sidebar-foreground)]">AgroTrack</h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(false)}
                                className="text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)]"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.url || (item.url !== '/worker' && location.pathname.startsWith(item.url));
                                    return (
                                        <li key={item.title}>
                                            <Link
                                                to={item.url}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`
                          group flex gap-x-3 rounded-xl px-3 py-2.5 transition-all
                          ${isActive
                                                        ? 'bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] shadow-md'
                                                        : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                                                    }
                        `}
                                            >
                                                <Icon className="h-5 w-5 shrink-0" />
                                                <span className="font-medium">{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <div className="mt-auto pt-4 border-t border-[var(--sidebar-border)]">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-x-3 text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
                                onClick={() => window.location.href = '/'}
                            >
                                <LogOut className="h-5 w-5 shrink-0" />
                                <span>Cerrar Sesión</span>
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Main Content Area */}
            <div className="lg:pl-64">
                {/* Topbar / Header */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1 items-center">
                            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar..."
                                className="h-9 w-64 pl-9 bg-background border-border"
                            />
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--green-pastel)] shadow-[0_0_8px_var(--green-pastel)]"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
