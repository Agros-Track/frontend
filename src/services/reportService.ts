import api from '../api/client';

// Define types based on your backend response structure
export interface Report {
  id: string;
  type: 'production' | 'health' | 'financial' | 'inventory';
  title: string;
  data: any; // JSON data
  generatedAt: string;
  generatedBy: string;
}

export const reportService = {
  // Get reports
  getReports: async (type?: string) => {
    const params = type ? `?type=${type}` : '';
    const response = await api.get<Report[]>(`/reports${params}`);
    return response.data;
  },

  // Generate report
  generateReport: async (data: { type: string; filters: any }) => {
    const response = await api.post<Report>('/reports/generate', data);
    return response.data;
  },

  // Get report by ID
  getReportById: async (id: string) => {
    const response = await api.get<Report>(`/reports/${id}`);
    return response.data;
  },

  // Delete report
  deleteReport: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },
};
