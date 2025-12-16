import api from "../api/client";

// 🔹 TIPOS
export interface TenantAdmin {
  name: string;
  email: string;
  forcePasswordChange: boolean;
}

export interface CreateTenantPayload {
  name: string;
  nit: string;
  subdomain: string;
  plan: "Free" | "Pro" | "Enterprise";
  country: string;
  city?: string;
  logo?: string | null;
  admin: TenantAdmin;
}

export interface Tenant {
  id: string;
  name: string;
  nit: string;
  subdomain: string;
  plan: "Free" | "Pro" | "Enterprise";
  usersCount: number;
  usersLimit: number;
  storageUsed: string;
  storageLimit: string;
  status: "active" | "suspended";
  createdAt: string;
  logo: string | null;
  country: string;
  city?: string;
  admin?: TenantAdmin;
}

// 🔹 LISTAR TENANTS
export const getTenants = async (): Promise<Tenant[]> => {
  try {
    const response = await api.get("/tenants");
    console.log("✅ Tenants loaded:", response.data.length);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error loading tenants:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 OBTENER TENANT POR ID
export const getTenantById = async (id: string): Promise<Tenant> => {
  const response = await api.get(`/tenants/${id}`);
  return response.data;
};

// 🔹 CREAR TENANT
export const createTenant = async (payload: CreateTenantPayload): Promise<Tenant> => {
  console.log("🚀 Creating tenant with payload:", payload);
  
  try {
    const response = await api.post("/tenants", payload);
    console.log("✅ Tenant created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creating tenant:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 ACTUALIZAR TENANT
export const updateTenant = async (id: string, payload: Partial<CreateTenantPayload>): Promise<Tenant> => {
  const response = await api.put(`/tenants/${id}`, payload);
  return response.data;
};

// 🔹 ELIMINAR TENANT
export const deleteTenant = async (id: string): Promise<void> => {
  await api.delete(`/tenants/${id}`);
};

// 🔹 SUSPENDER/ACTIVAR TENANT
export const toggleTenantStatus = async (id: string, status: "active" | "suspended"): Promise<Tenant> => {
  const response = await api.patch(`/tenants/${id}/status`, { status });
  return response.data;
};
