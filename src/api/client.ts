import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "https://back-end-mmol.onrender.com";

console.log("🔗 API Base URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log para debugging
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data);

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error);

    if (error.code === 'ECONNABORTED') {
      toast.error("La petición tardó demasiado. Por favor verifica tu conexión.");
      return Promise.reject(error);
    }

    if (!error.response) {
      toast.error("No se pudo conectar con el servidor. Verifica tu conexión.");
      return Promise.reject(error);
    }

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;

      console.error(`🔴 Error ${status}:`, data);

      switch (status) {
        case 401:
          toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          toast.error("No tienes permisos para realizar esta acción.");
          break;
        case 404:
          toast.error("Recurso no encontrado.");
          break;
        case 500:
          toast.error("Error en el servidor. Por favor intenta más tarde.");
          break;
        default:
          toast.error(data?.message || "Ha ocurrido un error inesperado.");
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      toast.error("No se pudo conectar con el servidor. Verifica tu conexión.");
    } else {
      // Algo sucedió al configurar la petición
      toast.error("Error al procesar la solicitud.");
    }

    return Promise.reject(error);
  }
);

export default api;
