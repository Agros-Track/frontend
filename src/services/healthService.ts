import api from '../api/client';

// Define types based on your backend response structure
export interface HealthRecord {
  id: string;
  animalId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  veterinarianId: string;
}

export const healthService = {
  // Get health records for an animal
  getHealthRecords: async (animalId: string) => {
    const response = await api.get<HealthRecord[]>(`/health/records?animalId=${animalId}`);
    return response.data;
  },

  // Create health record
  createHealthRecord: async (data: Omit<HealthRecord, 'id'>) => {
    const response = await api.post<HealthRecord>('/health/records', data);
    return response.data;
  },

  // Update health record
  updateHealthRecord: async (id: string, data: Partial<HealthRecord>) => {
    const response = await api.put<HealthRecord>(`/health/records/${id}`, data);
    return response.data;
  },

  // Delete health record
  deleteHealthRecord: async (id: string) => {
    const response = await api.delete(`/health/records/${id}`);
    return response.data;
  },
};
