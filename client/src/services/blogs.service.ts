import { apiClient } from './api';
import { Blog } from '../types';

export const blogsService = {
  async getAll(category?: string): Promise<{ success: boolean; data: Blog[]; total: number }> {
    return apiClient.get('/blogs', { params: { category } }) as any;
  },
  async getBySlugOrId(slugOrId: string): Promise<{ success: boolean; data: Blog }> {
    return apiClient.get(`/blogs/${slugOrId}`) as any;
  },
};

