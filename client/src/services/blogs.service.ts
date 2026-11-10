import { apiClient } from "./api";
import { Blog } from "../types";

export const blogsService = {
  async getAll(
    category?: string,
  ): Promise<{ success: boolean; data: Blog[]; total: number }> {
    return apiClient.get("/blogs", { params: { category } }) as any;
  },
  async getBySlugOrId(
    slugOrId: string,
  ): Promise<{ success: boolean; data: Blog }> {
    return apiClient.get(`/blogs/${slugOrId}`) as any;
  },
  async create(
    data: Partial<Blog>,
  ): Promise<{ success: boolean; data: Blog; message: string }> {
    return apiClient.post("/blogs", data) as any;
  },
  async update(
    id: string,
    data: Partial<Blog>,
  ): Promise<{ success: boolean; data: Blog; message: string }> {
    return apiClient.put(`/blogs/${id}`, data) as any;
  },
  async delete(
    id: string,
  ): Promise<{
    success: boolean;
    data: { id: string; title: string };
    message: string;
  }> {
    return apiClient.delete(`/blogs/${id}`) as any;
  },
};
