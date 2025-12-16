import { MessageSquare } from "lucide-react";
import { supportTickets } from "../../services/mockData";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export function SupportPage() {

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Soporte</h1>
                <p className="text-muted-foreground">
                    Gestión de tickets y herramientas de asistencia.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {supportTickets.map((ticket) => (
                    <Card key={ticket.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2">{ticket.id}</Badge>
                                <Badge variant={ticket.status === 'open' ? 'default' : ticket.status === 'pending' ? 'secondary' : 'outline'}
                                    className={ticket.status === 'open' ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                                    {ticket.status}
                                </Badge>
                            </div>
                            <CardTitle className="text-base line-clamp-1">{ticket.subject}</CardTitle>
                            <CardDescription>{ticket.tenant}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                <span>Prioridad: <span className={ticket.priority === 'critical' ? 'text-red-500 font-bold' : ''}>{ticket.priority}</span></span>
                                <span>{ticket.createdAt}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="w-full">
                                    <MessageSquare className="mr-2 h-4 w-4" /> Responder
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
