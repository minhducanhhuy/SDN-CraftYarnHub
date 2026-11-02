import { apiClient } from './api';
import { Category } from '../types';

export const categoriesService = {
  async getAll(type?: string): Promise<{ success: boolean; data: Category[] }> {
    return apiClient.get('/categories', { params: { type } }) as any;
  },
  async getOne(idOrSlug: string): Promise<{ success: boolean; data: Category }> {
    return apiClient.get(`/categories/${idOrSlug}`) as any;
  },
};

