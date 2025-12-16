/**
 * Utilidad para probar la conexión con el backend
 */

import api from "../api/client";

export async function testBackendConnection() {
  try {
    console.log("🔍 Probando conexión con el backend...");
    
    // Intenta hacer una petición GET simple
    const response = await api.get("/health");
    console.log("✅ Backend conectado:", response.data);
    return true;
  } catch (error: any) {
    console.error("❌ Error conectando al backend:", error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error("❌ Error de red. Verifica:");
      console.error("  - URL del backend:", import.meta.env.VITE_API_URL);
      console.error("  - CORS configurado correctamente");
      console.error("  - Backend está ejecutándose");
    }
    
    return false;
  }
}

export async function testCreateTenant() {
  try {
    console.log("🧪 Probando creación de tenant...");
    
    const testPayload = {
      name: "Test Finca",
      nit: "123456789",
      subdomain: "testfinca",
      plan: "Free" as const,
      country: "co",
      logo: null,
      admin: {
        name: "Admin Test",
        email: "admin@test.com",
        forcePasswordChange: true,
      },
    };
    
    console.log("📤 Payload:", testPayload);
    
    const response = await api.post("/tenants", testPayload);
    console.log("✅ Tenant creado:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error creando tenant:", error.response?.data || error.message);
    throw error;
  }
}
