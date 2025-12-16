import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { dashboardMetrics, activityData, recentActivity } from "../../mock/dashboard.mock";
import { Users, Building2, HardDrive, AlertCircle, Activity, BarChart3 } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GrafanaDashboard } from "../../components/ui/grafana-dashboard";
import { GRAFANA_DASHBOARDS } from "../../config/grafana.config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard Super Admin</h2>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">
                        <Activity className="h-4 w-4 mr-2" />
                        Resumen
                    </TabsTrigger>
                    <TabsTrigger value="grafana">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Métricas Avanzadas
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Tenants Activos
                                </CardTitle>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardMetrics.activeTenants}</div>
                                <p className="text-xs text-muted-foreground">
                                    +20.1% respecto al mes pasado
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Usuarios Totales
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardMetrics.totalUsers}</div>
                                <p className="text-xs text-muted-foreground">
                                    +180 nuevos esta semana
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Almacenamiento</CardTitle>
                                <HardDrive className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardMetrics.storageUsed}</div>
                                <p className="text-xs text-muted-foreground">
                                    12% del total disponible
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Errores (24h)
                                </CardTitle>
                                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{dashboardMetrics.errors24h}</div>
                                <p className="text-xs text-muted-foreground">
                                    -50% respecto a ayer
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Crecimiento de Tenants</CardTitle>
                                <CardDescription>
                                    Número de tenants activos por mes
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={activityData}>
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{ background: "#333", border: "none" }}
                                            itemStyle={{ color: "#fff" }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="tenants"
                                            stroke="#22c55e"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Actividad Reciente</CardTitle>
                                <CardDescription>
                                    Últimos eventos en la plataforma.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tenant</TableHead>
                                            <TableHead>Evento</TableHead>
                                            <TableHead className="text-right">Fecha</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentActivity.map((activity) => (
                                            <TableRow key={activity.id}>
                                                <TableCell className="font-medium">
                                                    {activity.tenant}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {activity.action === 'created' && <Badge variant="outline" className="border-green-500 text-green-500">Nuevo</Badge>}
                                                        {activity.action === 'plan_upgrade' && <Badge variant="outline" className="border-blue-500 text-blue-500">Upgrade</Badge>}
                                                        {activity.action === 'suspended' && <Badge variant="destructive">Suspendido</Badge>}
                                                        {activity.action === 'user_limit_reached' && <Badge variant="secondary">Límite</Badge>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">{activity.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="grafana" className="space-y-4">
                    <GrafanaDashboard
                        title={GRAFANA_DASHBOARDS.SUPER_ADMIN.title}
                        url={GRAFANA_DASHBOARDS.SUPER_ADMIN.url}
                        height="800px"
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
