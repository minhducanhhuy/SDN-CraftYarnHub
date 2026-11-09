import { apiClient } from './api';
import { Order } from '../types';

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  address: string;
  note?: string;
  items: {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
    image_url?: string;
  }[];
  total_amount: number;
}

export const ordersService = {
  create: async (payload: CreateOrderPayload): Promise<{ success: boolean; data: Order; message: string }> => {
    return apiClient.post('/orders', payload);
  },

  getAll: async (status?: string, phone?: string): Promise<{ success: boolean; data: Order[]; total: number }> => {
    return apiClient.get('/orders', { params: { status, phone } });
  },

  lookup: async (q: string): Promise<{ success: boolean; data: Order[]; message: string }> => {
    return apiClient.get('/orders/lookup', { params: { q } });
  },

  getById: async (id: string): Promise<{ success: boolean; data: Order }> => {
    return apiClient.get(`/orders/${id}`);
  },

  updateStatus: async (id: string, status: string): Promise<{ success: boolean; data: Order }> => {
    return apiClient.patch(`/orders/${id}/status`, { status });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete(`/orders/${id}`);
  },
};

