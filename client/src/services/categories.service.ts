import { apiClient } from './api';
import { Category } from '../types';

export const categoriesService = {
  async getAll(type?: string): Promise<{ success: boolean; data: Category[] }> {
    return apiClient.get('/categories', { params: { type } }) as any;
  },
  async getOne(idOrSlug: string): Promise<{ success: boolean; data: Category }> {
    return apiClient.get(`/categories/${idOrSlug}`) as any;
  },
  async create(data: Partial<Category>): Promise<{ success: boolean; data: Category; message: string }> {
    return apiClient.post('/categories', data) as any;
  },
  async update(id: string, data: Partial<Category>): Promise<{ success: boolean; data: Category; message: string }> {
    return apiClient.put(`/categories/${id}`, data) as any;
  },
  async delete(id: string): Promise<{ success: boolean; data: { id: string; name: string }; message: string }> {
    return apiClient.delete(`/categories/${id}`) as any;
  },
};

