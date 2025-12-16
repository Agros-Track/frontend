import api from '../api/client';

// Define types based on your backend response structure
export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ProductionRecord {
  animalId: string;
  liters: number;
  date: string;
}

export const workerService = {
  // Get tasks for the current worker
  getTasks: async () => {
    const response = await api.get<Task[]>('/worker/tasks');
    return response.data;
  },

  // Register production
  registerProduction: async (data: ProductionRecord) => {
    const response = await api.post('/production', data);
    return response.data;
  },

  // Update task status
  updateTaskStatus: async (taskId: string, status: string) => {
    const response = await api.patch(`/tasks/${taskId}`, { status });
    return response.data;
  },
};
