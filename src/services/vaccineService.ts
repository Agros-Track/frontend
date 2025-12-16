import api from '../api/client';

// Define types based on your backend response structure
export interface Vaccine {
  id: string;
  name: string;
  description: string;
  requiredFor: string[]; // species
}

export interface VaccinationRecord {
  id: string;
  animalId: string;
  vaccineId: string;
  date: string;
  nextDueDate: string;
  veterinarianId: string;
}

export const vaccineService = {
  // Get all vaccines
  getVaccines: async () => {
    const response = await api.get<Vaccine[]>('/vaccines');
    return response.data;
  },

  // Get vaccination records for an animal
  getVaccinationRecords: async (animalId: string) => {
    const response = await api.get<VaccinationRecord[]>(`/vaccinations?animalId=${animalId}`);
    return response.data;
  },

  // Create vaccination record
  createVaccinationRecord: async (data: Omit<VaccinationRecord, 'id'>) => {
    const response = await api.post<VaccinationRecord>('/vaccinations', data);
    return response.data;
  },

  // Update vaccination record
  updateVaccinationRecord: async (id: string, data: Partial<VaccinationRecord>) => {
    const response = await api.put<VaccinationRecord>(`/vaccinations/${id}`, data);
    return response.data;
  },

  // Delete vaccination record
  deleteVaccinationRecord: async (id: string) => {
    const response = await api.delete(`/vaccinations/${id}`);
    return response.data;
  },
};