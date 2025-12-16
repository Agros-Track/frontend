// Grafana Dashboard URLs Configuration
export const GRAFANA_BASE_URL = "https://grafana-jirn.onrender.com";

export const GRAFANA_DASHBOARDS = {
  // Super Admin Dashboard
  SUPER_ADMIN: {
    url: `${GRAFANA_BASE_URL}/d/add7dvv/super-admin?orgId=1&from=now-6h&to=now&timezone=browser&var-query0=`,
    title: "Super Admin Dashboard",
  },
  
  // Admin Dashboard
  ADMIN: {
    url: `${GRAFANA_BASE_URL}/d/adgkmrz/admin?orgId=1&from=2025-12-10T00:00:00.000Z&to=2025-12-15T00:00:00.000Z&timezone=browser`,
    title: "Admin Dashboard",
  },
  
  // Veterinarian Dashboard
  VETERINARIAN: {
    url: `${GRAFANA_BASE_URL}/d/admqwxv/veterinarian?orgId=1&from=now-6h&to=now&timezone=browser`,
    title: "Veterinario Dashboard",
  },
  
  // Worker Dashboard
  WORKER: {
    url: `${GRAFANA_BASE_URL}/d/ad4frtg/wokers?orgId=1&from=now-6h&to=now&timezone=browser`,
    title: "Workers Dashboard",
  },
  
  // All Dashboards List
  ALL: `${GRAFANA_BASE_URL}/dashboards`,
};

// Helper function to get dashboard URL by role
export function getGrafanaDashboardByRole(role: string): { url: string; title: string } | null {
  const roleMap: Record<string, { url: string; title: string }> = {
    'SUPER_ADMIN': GRAFANA_DASHBOARDS.SUPER_ADMIN,
    'ADMIN': GRAFANA_DASHBOARDS.ADMIN,
    'VETERINARIAN': GRAFANA_DASHBOARDS.VETERINARIAN,
    'WORKER': GRAFANA_DASHBOARDS.WORKER,
  };
  
  return roleMap[role.toUpperCase()] || null;
}
