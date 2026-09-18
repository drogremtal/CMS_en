import apiClient from './client';
import type { Page, PageCreateDto, PageUpdateDto, PagePreviewDto } from '../types';

export const pagesApi = {
  async getPages(published?: boolean): Promise<Page[]> {
    const params = published !== undefined ? { published } : {};
    const response = await apiClient.get<Page[]>('/pages', { params });
    return response.data;
  },

  async getPage(id: number): Promise<Page> {
    const response = await apiClient.get<Page>(`/pages/${id}`);
    return response.data;
  },

  async getPageBySlug(slug: string): Promise<Page> {
    const response = await apiClient.get<Page>(`/pages/slug/${slug}`);
    return response.data;
  },

  async createPage(dto: PageCreateDto): Promise<Page> {
    const response = await apiClient.post<Page>('/pages', dto);
    return response.data;
  },

  async updatePage(id: number, dto: PageUpdateDto): Promise<void> {
    await apiClient.put(`/pages/${id}`, dto);
  },

  async deletePage(id: number): Promise<void> {
    await apiClient.delete(`/pages/${id}`);
  },

  async previewPage(id: number, dto: PagePreviewDto): Promise<PagePreviewDto> {
    const response = await apiClient.post<PagePreviewDto>(`/pages/${id}/preview`, dto);
    return response.data;
  },
};

export default pagesApi;
