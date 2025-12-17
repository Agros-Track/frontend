import api from '../api/client';

// Define types based on your backend response structure
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: {
      name:string,
      role_id: number,
      slug: string
    }
  };
}

export const authService = {
  // Login user
  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    // Store token in localStorage
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};
