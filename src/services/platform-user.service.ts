import api from "../api/client";

/**
 * Obtener usuarios de plataforma (Super Admin)
 */
export const getPlatformUsers = async () => {
  const { data } = await api.get("/platform-users");
  return data;
};

/**
 * Crear usuario de plataforma
 */
export const createPlatformUser = async (payload: any) => {
  const { data } = await api.post("/platform-users", payload);
  return data;
};

/**
 * Activar / Bloquear usuario de plataforma
 */
export const togglePlatformUserStatus = async (id: string) => {
  const { data } = await api.patch(`/platform-users/${id}/toggle-status`);
  return data;
};
