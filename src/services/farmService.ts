import api from '../api/client';

// Define types based on your backend response structure
export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number; // in hectares
  ownerId: string;
}

export const farmService = {
  // Get all farms
  getFarms: async () => {
    const response = await api.get<Farm[]>('/farms');
    return response.data;
  },

  // Get farm by ID
  getFarmById: async (id: string) => {
    const response = await api.get<Farm>(`/farms/${id}`);
    return response.data;
  },

  // Create new farm
  createFarm: async (data: Omit<Farm, 'id'>) => {
    const response = await api.post<Farm>('/farms', data);
    return response.data;
  },

  // Update farm
  updateFarm: async (id: string, data: Partial<Farm>) => {
    const response = await api.put<Farm>(`/farms/${id}`, data);
    return response.data;
  },

  // Delete farm
  deleteFarm: async (id: string) => {
    const response = await api.delete(`/farms/${id}`);
    return response.data;
  },
};
