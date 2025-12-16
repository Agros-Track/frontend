import api from '../api/client';

// Define types based on your backend response structure
export interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  healthStatus: string;
  farmId: string;
}

export const animalService = {
  // Get all animals
  getAnimals: async () => {
    const response = await api.get<Animal[]>('/animals');
    return response.data;
  },

  // Get animal by ID
  getAnimalById: async (id: string) => {
    const response = await api.get<Animal>(`/animals/${id}`);
    return response.data;
  },

  // Create new animal
  createAnimal: async (data: Omit<Animal, 'id'>) => {
    const response = await api.post<Animal>('/animals', data);
    return response.data;
  },

  // Update animal
  updateAnimal: async (id: string, data: Partial<Animal>) => {
    const response = await api.put<Animal>(`/animals/${id}`, data);
    return response.data;
  },

  // Delete animal
  deleteAnimal: async (id: string) => {
    const response = await api.delete(`/animals/${id}`);
    return response.data;
  },
};
