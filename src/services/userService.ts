import api from '../api/client';

// Define types based on your backend response structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'veterinarian' | 'worker';
  farmId?: string;
}

export const userService = {
  // Get all users
  getUsers: async () => {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (data: Omit<User, 'id'>) => {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>) => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
