import api from "../api/client";

export const getTenants = async () => {
  const response = await api.get("/tenants");
  return response.data;
};

export const getTenantById = async (id: string) => {
  const response = await api.get(`/tenants/${id}`);
  return response.data;
};

export const createTenant = async (payload: any) => {
  const response = await api.post("/tenants", payload);
  return response.data;
};
