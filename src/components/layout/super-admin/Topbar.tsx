
import { Search } from "lucide-react";
import { SidebarTrigger } from "../../ui/sidebar";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";

export function Topbar() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 sticky top-0 z-10">
            <div className="flex items-center gap-2 px-2">
                {/* Sidebar trigger removed as sidebar is always visible */}
            </div>
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar tenants, usuarios..."
                        className="pl-8 bg-muted/50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 px-2">
                {/* Actions or Notifications could go here */}
            </div>
        </header>
    );
}
