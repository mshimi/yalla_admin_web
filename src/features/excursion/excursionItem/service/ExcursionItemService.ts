import apiClient from "../../../../common/api/ApiClient";
import { ExcursionItem } from "../types/ExcursionItem";
import { ExcursionItemTranslation } from "../types/ExcursionItemTranslation";
import { ExcursionItemAdmin } from "../types/ExcursionItemAdmin";
import { PaginatedResponse } from "../../../../common/types/PaginatedResponse"


export interface AdminItemQueryParams {
  page?: number;
  size?: number;
  key?: string;
}


class ExcursionItemService {
  private _baseURL: string = "/excursions/items";

  /**
   * Get all excursion items (optionally with filters).
   */
  async getAllItems(filters: Record<string, string> = {}): Promise<ExcursionItem[]> {
    const response = await apiClient.get(this._baseURL, { params: filters });
    return response.data;
  }

  /**
   * Get all items with missing translations (admin view).
   */
  async getItemsForAdmin(): Promise<ExcursionItemAdmin[]> {
    const response = await apiClient.get(`${this._baseURL}/with-missing-languages`);
    return response.data;
  }

  async getItemsForAdminPaginated(params: AdminItemQueryParams): Promise<PaginatedResponse<ExcursionItemAdmin>> {
    const response = await apiClient.get(`${this._baseURL}/with-missing-languages`, {
      params,
    });
    return response.data;
  }

  /**
   * Get a specific excursion item by ID.
   */
  async getItem(id: number): Promise<ExcursionItem> {
    return (await apiClient.get(`${this._baseURL}/${id}`)).data;
  }

  /**
   * Create a new excursion item.
   */
  async createItem(dto: ExcursionItem): Promise<ExcursionItem> {
    return (await apiClient.post(this._baseURL, dto)).data;
  }

  /**
   * Update an excursion item by ID.
   */
  async updateItem(id: number, dto: ExcursionItem): Promise<ExcursionItem> {
    return (await apiClient.put(`${this._baseURL}/${id}`, dto)).data;
  }

  /**
   * Delete an excursion item by ID.
   */
  async deleteItem(id: number): Promise<void> {
    await apiClient.delete(`${this._baseURL}/${id}`);
  }

  /**
   * Delete a specific translation.
   */
  async deleteTranslation(itemId: number, lang: string): Promise<void> {
    await apiClient.delete(`${this._baseURL}/${itemId}/translation/${lang}`);
  }

  /**
   * Replace all translations for an excursion item.
   */
  async updateTranslations(itemId: number, translations: ExcursionItemTranslation[]): Promise<void> {
    await apiClient.put(`${this._baseURL}/${itemId}/translations`, translations);
  }
}

export default new ExcursionItemService();
