
import { Outlet } from "react-router";
import { AppSidebar } from "./super-admin/Sidebar";
import { Topbar } from "./super-admin/Topbar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export function SuperAdminLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Topbar />
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
