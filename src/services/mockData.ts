
export const dashboardMetrics = {
    activeTenants: 142,
    suspendedTenants: 8,
    totalUsers: 4521,
    storageUsed: "4.2 TB",
    errors24h: 3,
};

export const activityData = [
    { name: "Ene", tenants: 40 },
    { name: "Feb", tenants: 55 },
    { name: "Mar", tenants: 78 },
    { name: "Abr", tenants: 95 },
    { name: "May", tenants: 110 },
    { name: "Jun", tenants: 125 },
    { name: "Jul", tenants: 142 },
];

export const recentActivity = [
    {
        id: 1,
        tenant: "Hacienda La Esperanza",
        action: "created",
        date: "Hace 2 horas",
        status: "success"
    },
    {
        id: 2,
        tenant: "Ganadería El Roble",
        action: "plan_upgrade",
        date: "Hace 5 horas",
        status: "success"
    },
    {
        id: 3,
        tenant: "Finca San José",
        action: "suspended",
        date: "Hace 1 día",
        status: "warning"
    },
    {
        id: 4,
        tenant: "Agropecuaria del Sur",
        action: "created",
        date: "Hace 1 día",
        status: "success"
    },
    {
        id: 5,
        tenant: "Lácteos del Valle",
        action: "user_limit_reached",
        date: "Hace 2 días",
        status: "error"
    }
];

export const tenantsData = [
    {
        id: "t1",
        name: "Hacienda La Esperanza",
        nit: "900.123.456-1",
        subdomain: "la-esperanza",
        plan: "Enterprise",
        usersCount: 12,
        usersLimit: 20,
        storageUsed: "45 GB",
        storageLimit: "100 GB",
        status: "active",
        createdAt: "2024-01-15",
        logo: "https://ui-avatars.com/api/?name=Hacienda+La+Esperanza&background=10b981&color=fff"
    },
    {
        id: "t2",
        name: "Ganadería El Roble",
        nit: "900.987.654-2",
        subdomain: "el-roble",
        plan: "Pro",
        usersCount: 5,
        usersLimit: 10,
        storageUsed: "12 GB",
        storageLimit: "50 GB",
        status: "active",
        createdAt: "2024-02-20",
        logo: "https://ui-avatars.com/api/?name=Ganaderia+El+Roble&background=eab308&color=fff"
    },
    {
        id: "t3",
        name: "Finca San José",
        nit: "800.567.890-3",
        subdomain: "san-jose",
        plan: "Free",
        usersCount: 2,
        usersLimit: 2,
        storageUsed: "1.5 GB",
        storageLimit: "5 GB",
        status: "suspended",
        createdAt: "2024-03-10",
        logo: "https://ui-avatars.com/api/?name=Finca+San+Jose&background=ef4444&color=fff"
    },
    {
        id: "t4",
        name: "Agropecuaria del Sur",
        nit: "901.234.567-4",
        subdomain: "agro-sur",
        plan: "Pro",
        usersCount: 8,
        usersLimit: 10,
        storageUsed: "28 GB",
        storageLimit: "50 GB",
        status: "active",
        createdAt: "2024-03-05",
        logo: "https://ui-avatars.com/api/?name=Agro+Sur&background=3b82f6&color=fff"
    },
    {
        id: "t5",
        name: "Lácteos del Valle",
        nit: "890.123.456-5",
        subdomain: "lacteos-valle",
        plan: "Enterprise",
        usersCount: 45,
        usersLimit: 50,
        storageUsed: "150 GB",
        storageLimit: "500 GB",
        status: "active",
        createdAt: "2024-01-05",
        logo: "https://ui-avatars.com/api/?name=Lacteos+Valle&background=8b5cf6&color=fff"
    }
];

export const auditLogs = [
    {
        id: 1,
        tenant: "Hacienda La Esperanza",
        user: "Juan Pérez",
        action: "login",
        date: "2024-03-20 08:30:00",
        metadata: "IP: 192.168.1.1"
    },
    {
        id: 2,
        tenant: "Ganadería El Roble",
        user: "Maria Gonzalez",
        action: "update_settings",
        date: "2024-03-20 09:15:00",
        metadata: "Changed notification settings"
    },
    {
        id: 3,
        tenant: "Finca San José",
        user: "Carlos Rodriguez",
        action: "export_report",
        date: "2024-03-20 10:00:00",
        metadata: "Report ID: REP-2024-001"
    },
    {
        id: 4,
        tenant: "Agropecuaria del Sur",
        user: "Ana Martinez",
        action: "delete_user",
        date: "2024-03-20 11:30:00",
        metadata: "User ID: 45"
    },
    {
        id: 5,
        tenant: "Lácteos del Valle",
        user: "Pedro Sanchez",
        action: "api_key_created",
        date: "2024-03-20 14:20:00",
        metadata: "Key name: production-app"
    }
];

export const supportTickets = [
    {
        id: "T-001",
        subject: "Error de sincronización",
        tenant: "Hacienda La Esperanza",
        status: "open",
        priority: "critical",
        createdAt: "Hace 10 min",
    },
    {
        id: "T-002",
        subject: "Solicitud de aumento de usuarios",
        tenant: "Ganadería El Roble",
        status: "pending",
        priority: "high",
        createdAt: "Hace 1 hora",
    },
    {
        id: "T-003",
        subject: "Problema con reporte PDF",
        tenant: "Finca San José",
        status: "resolved",
        priority: "medium",
        createdAt: "Hace 3 horas",
    },
    {
        id: "T-004",
        subject: "Duda sobre facturación",
        tenant: "Agropecuaria del Sur",
        status: "open",
        priority: "low",
        createdAt: "Hace 5 horas",
    },
    {
        id: "T-005",
        subject: "API Key no funciona",
        tenant: "Lácteos del Valle",
        status: "pending",
        priority: "high",
        createdAt: "Hace 1 día",
    }
];

