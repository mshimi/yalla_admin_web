import apiClient from "../../../../common/api/ApiClient";
import { Category } from "../types/Category"
import { CategoryTranslation } from "../types/CategoryTranslation"
import { CategoryAdmin } from "../types/CategoryAdmin"
import api from "../../../../common/api/ApiClient"


class CategoryService {
  private _baseURL: string = "/excursions/categories";

  /**
   * Get all categories (optionally with filters).
   */
  async getAllCategories(filters: Record<string, string> = {}): Promise<Category[]> {
    const response = await apiClient.get(this._baseURL, { params: filters });
    return response.data;
  }

  /**
   * Get all categories with missing translations (admin view).
   */
  async getCategoriesForAdmin(): Promise<CategoryAdmin[]> {
    const response = await apiClient.get(`${this._baseURL}/with-missing-languages`);
    return response.data;
  }

  /**
   * Get a specific category by ID.
   */
  async getCategory(id: number): Promise<Category> {
    return (await apiClient.get(`${this._baseURL}/${id}`)).data;
  }

  /**
   * Create a new category.
   */
  async createCategory(dto: Category): Promise<Category> {
    return (await apiClient.post(this._baseURL, dto)).data;
  }

  /**
   * Update a category by ID.
   */
  async updateCategory(id: number, dto: Category): Promise<Category> {
    return (await apiClient.put(`${this._baseURL}/${id}`, dto)).data;
  }

  /**
   * Delete a category.
   */
  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete(`${this._baseURL}/${id}`);
  }

  /**
   * Upload or update image for category.
   */
  async uploadImage(id: number, file: File): Promise<Category> {
    const formData = new FormData();
    formData.append("image", file);


    return (await apiClient.post(`${this._baseURL}/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })).data;
  }



  /**
   * Delete image for a category.
   */
  async deleteImage(id: number): Promise<void> {
    await apiClient.delete(`${this._baseURL}/${id}/image`);
  }

  /**
   * Delete a specific translation.
   */
  async deleteTranslation(categoryId: number, lang: string): Promise<void> {
    await apiClient.delete(`${this._baseURL}/${categoryId}/translation/${lang}`);
  }

  /**
   * Replace all translations for a category.
   */
  async updateTranslations(categoryId: number, translations: CategoryTranslation[]): Promise<void> {
    await apiClient.put(`${this._baseURL}/${categoryId}/translations`, translations);
  }
}

export default new CategoryService();
