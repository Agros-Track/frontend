import api from '../api/client';

// Define types based on your backend response structure
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string; // user ID
  farmId: string;
}

export const taskService = {
  // Get tasks
  getTasks: async (filters?: { status?: string; assignedTo?: string; farmId?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.assignedTo) params.append('assignedTo', filters.assignedTo);
    if (filters?.farmId) params.append('farmId', filters.farmId);
    const response = await api.get<Task[]>(`/tasks?${params.toString()}`);
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string) => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  createTask: async (data: Omit<Task, 'id'>) => {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  // Update task
  updateTask: async (id: string, data: Partial<Task>) => {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
