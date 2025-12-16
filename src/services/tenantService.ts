import api from '../api/client';

// Define types based on your backend response structure
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  nit: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  plan: string;
  usersCount: number;
}

export const tenantService = {
  // Get all tenants
  getTenants: async (): Promise<Tenant[]> => {
    const response = await api.get<Tenant[]>('/tenants');
    return response.data;
  },

  // Get tenant by ID
  getTenantById: async (id: string): Promise<Tenant> => {
    const response = await api.get<Tenant>(`/tenants/${id}`);
    return response.data;
  },

  // Create new tenant
  createTenant: async (data: Omit<Tenant, 'id' | 'createdAt' | 'usersCount'>): Promise<Tenant> => {
    const response = await api.post<Tenant>('/tenants', data);
    return response.data;
  },

  // Update tenant
  updateTenant: async (id: string, data: Partial<Tenant>): Promise<Tenant> => {
    const response = await api.put<Tenant>(`/tenants/${id}`, data);
    return response.data;
  },

  // Delete tenant
  deleteTenant: async (id: string): Promise<void> => {
    await api.delete(`/tenants/${id}`);
  },
};
