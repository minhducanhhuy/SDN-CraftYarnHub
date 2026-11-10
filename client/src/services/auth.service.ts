import { apiClient } from './api';

export interface AdminUser {
  id: string;
  username: string;
  full_name: string;
  role: string;
  avatar: string;
}

const TOKEN_KEY = 'craft_admin_token';
const USER_KEY = 'craft_admin_user';

export const authService = {
  login: async (credentials: {
    username: string;
    password: string;
  }): Promise<{ success: boolean; data: { token: string; user: AdminUser }; message: string }> => {
    const res: any = await apiClient.post('/auth/login', credentials);
    if (res.success && res.data) {
      localStorage.setItem(TOKEN_KEY, res.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    }
    return res;
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getProfile: async (): Promise<{ success: boolean; data: AdminUser }> => {
    const token = localStorage.getItem(TOKEN_KEY);
    return apiClient.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) as any;
  },
};
