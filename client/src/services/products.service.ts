import { apiClient } from './api';
import { Product } from '../types';

export const productsService = {
  async getAll(params?: {
    category?: string;
    search?: string;
  }): Promise<{ success: boolean; data: Product[]; total: number }> {
    return apiClient.get('/products', { params }) as any;
  },
  async getById(id: string): Promise<{ success: boolean; data: Product }> {
    return apiClient.get(`/products/${id}`) as any;
  },
};

