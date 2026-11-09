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
  async create(data: Partial<Product>): Promise<{ success: boolean; data: Product }> {
    return apiClient.post('/products', data) as any;
  },
  async update(id: string, data: Partial<Product>): Promise<{ success: boolean; data: Product }> {
    return apiClient.put(`/products/${id}`, data) as any;
  },
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/products/${id}`) as any;
  },
};

