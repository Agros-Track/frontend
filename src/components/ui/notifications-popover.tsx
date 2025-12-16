
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover";
import { Button } from "./button";
import { Bell, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { Alert, mockAlerts } from "../../mock/mockData";
import { cn } from "./utils";
import { Badge } from "./badge";

export function NotificationsPopover() {
    const [open, setOpen] = useState(false);
    const [notifications] = useState<Alert[]>(mockAlerts);
    const [unreadCount, setUnreadCount] = useState(mockAlerts.length);

    const handleMarkAllAsRead = () => {
        setUnreadCount(0);
    };

    const getIcon = (type: Alert['type']) => {
        switch (type) {
            case 'vacuna':
                return <AlertCircle className="h-4 w-4 text-blue-500" />;
            case 'tratamiento':
                return <AlertTriangle className="h-4 w-4 text-orange-500" />;
            case 'peso':
                return <Info className="h-4 w-4 text-yellow-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
    };

    const getPriorityColor = (priority: Alert['priority']) => {
        switch (priority) {
            case 'alta':
                return "bg-red-100 text-red-800 border-red-200";
            case 'media':
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default:
                return "bg-green-100 text-green-800 border-green-200";
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-muted">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background animate-pulse" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                    <h4 className="font-semibold text-sm">Notificaciones</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-primary"
                            onClick={handleMarkAllAsRead}
                        >
                            Marcar leídas
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        <div className="flex flex-col">
                            {notifications.map((notification, index) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "flex items-start gap-3 p-4 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer",
                                        index < unreadCount ? "bg-muted/20" : ""
                                    )}
                                >
                                    <div className="mt-1 bg-background p-2 rounded-full border border-border shadow-sm">
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={cn("text-sm font-medium leading-none", index < unreadCount ? "text-foreground" : "text-muted-foreground")}>
                                                {notification.title}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                {notification.date}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.description}
                                        </p>
                                        <div className="flex items-center gap-2 pt-1">
                                            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 font-normal border-0", getPriorityColor(notification.priority))}>
                                                {notification.priority}
                                            </Badge>
                                            {notification.animalId && (
                                                <span className="text-[10px] text-muted-foreground">
                                                    ID: {notification.animalId}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                            <Bell className="h-10 w-10 text-muted-foreground/30 mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">No tienes notificaciones</p>
                            <p className="text-xs text-muted-foreground/70 mt-1">Te avisaremos cuando haya novedades importantes</p>
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t border-border bg-muted/30">
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                        Ver todas las notificaciones
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
