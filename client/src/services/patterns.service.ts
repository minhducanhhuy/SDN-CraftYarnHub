import { apiClient } from './api';
import { Pattern } from '../types';

export const patternsService = {
  async getAll(params?: {
    q?: string;
    category?: string;
    difficulty?: string;
  }): Promise<{ success: boolean; data: Pattern[]; total: number }> {
    return apiClient.get('/patterns', { params }) as any;
  },
  async getFeatured(): Promise<{ success: boolean; data: Pattern[] }> {
    return apiClient.get('/patterns/featured') as any;
  },
  async getById(id: string): Promise<{ success: boolean; data: Pattern }> {
    return apiClient.get(`/patterns/${id}`) as any;
  },
  async like(id: string): Promise<{ success: boolean; data: Pattern }> {
    return apiClient.patch(`/patterns/${id}/like`) as any;
  },
};

