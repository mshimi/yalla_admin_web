import apiClient from "../../../../common/api/ApiClient"
import { TransferExtra, TransferExtraTranslation } from "../types/TransferExtra "
import { Language } from "../../../../common/enums/Language"


class TransferExtraService {
  private baseUrl = "/admin/transfer/extra";

  /**
   * Get all TransferExtras.
   */
  async getAllTransferExtras(): Promise<TransferExtra[]> {
    const response = await apiClient.get<TransferExtra[]>(`${this.baseUrl}`);
    return response.data;
  }

  /**
   * Get a TransferExtra by ID.
   */
  async getTransferExtraById(id: number): Promise<TransferExtra> {
    const response = await apiClient.get<TransferExtra>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * Get all translations for a TransferExtra by ID.
   */
  async getTranslationsByTransferExtraId(id: number): Promise<TransferExtraTranslation[]> {
    const response = await apiClient.get<TransferExtraTranslation[]>(`${this.baseUrl}/${id}/translations`);
    return response.data;
  }

  /**
   * Save a new TransferExtra.
   */
  async saveTransferExtra(transferExtra: Partial<TransferExtra>): Promise<TransferExtra> {
    const response = await apiClient.post<TransferExtra>(`${this.baseUrl}`, transferExtra);
    return response.data;
  }

  /**
   * Update the pax value of a TransferExtra.
   */
  async updatePaxValue(id: number, paxValue: number): Promise<void> {
    await apiClient.patch(`${this.baseUrl}/${id}/pax-value`, null, {
      params: { paxValue },
    });
  }

  /**
   * Set a TransferExtra as not valid.
   */
  async setAsNotValid(id: number): Promise<void> {
    await apiClient.patch(`${this.baseUrl}/${id}/invalidate`);
  }

  /**
   * Update a translation of a TransferExtra.
   */
  async updateTranslation(id: number, lang: Language, name: string): Promise<void> {
    await apiClient.patch(`${this.baseUrl}/${id}/translation`, null, {
      params: { lang, name },
    });
  }

  /**
   * Delete a translation of a TransferExtra.
   */
  async deleteTranslation(translationId: number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/translation/${translationId}`);
  }

  /**
   * Add a new translation to a TransferExtra.
   */
  async addTranslation(id: number, lang: Language, name: string): Promise<void> {
    await apiClient.patch(`${this.baseUrl}/${id}/translation`, null, {
      params: { lang, name },
    });
  }

  /**
   * Upload an image for a TransferExtra.
   */
  async uploadImage(id: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await apiClient.post(`${this.baseUrl}/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Delete the image of a TransferExtra.
   */
  async deleteImage(id: number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}/image`);
  }
}

export default new TransferExtraService();