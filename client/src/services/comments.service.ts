import { apiClient } from './api';
import { CommentItem } from '../types';

export const commentsService = {
  async getByPattern(patternId: string): Promise<{ success: boolean; data: CommentItem[]; total: number }> {
    return apiClient.get('/comments', { params: { patternId } }) as any;
  },
  async create(data: {
    pattern_id: string;
    author_name: string;
    rating: number;
    content: string;
  }): Promise<{ success: boolean; data: CommentItem; message: string }> {
    return apiClient.post('/comments', data) as any;
  },
};

