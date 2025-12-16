import api from '../api/client';

// Define types based on your backend response structure
export interface ProductionRecord {
  id: string;
  animalId: string;
  date: string;
  milkLiters?: number;
  eggsCount?: number;
  woolKg?: number;
  workerId: string;
}

export const productionService = {
  // Get production records
  getProductionRecords: async (filters?: { animalId?: string; dateFrom?: string; dateTo?: string }) => {
    const params = new URLSearchParams();
    if (filters?.animalId) params.append('animalId', filters.animalId);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    const response = await api.get<ProductionRecord[]>(`/production?${params.toString()}`);
    return response.data;
  },

  // Create production record
  createProductionRecord: async (data: Omit<ProductionRecord, 'id'>) => {
    const response = await api.post<ProductionRecord>('/production', data);
    return response.data;
  },

  // Update production record
  updateProductionRecord: async (id: string, data: Partial<ProductionRecord>) => {
    const response = await api.put<ProductionRecord>(`/production/${id}`, data);
    return response.data;
  },

  // Delete production record
  deleteProductionRecord: async (id: string) => {
    const response = await api.delete(`/production/${id}`);
    return response.data;
  },
};