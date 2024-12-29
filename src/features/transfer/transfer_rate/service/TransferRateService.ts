import TransferRate  from "../types/TransferRate";
import  AddTransferRateRequest  from "../types/AddTransferRateRequest";
import apiClient from "../../../../common/api/ApiClient";
import { PaginatedResponse } from "../../../../common/types/PaginatedResponse"

class TransferRateService {
  private _baseURL: string = "/admin/transfer/rates";

  /**
   * Get all active TransferRates with pagination and filters.
   * @param page Current page number (default: 0).
   * @param size Number of items per page (default: 10).
   * @param filters Additional filters to apply.
   * @returns A Promise that resolves to the paginated TransferRate list.
   */
  async getActiveTransferRates(
    page: number = 0,
    size: number = 30,
    filters: Record<string, string> = {}
  ): Promise<PaginatedResponse<TransferRate>> {
    const params = { page, size, ...filters };
    return (await apiClient.get(this._baseURL, { params })).data;
  }

  /**
   * Add a new TransferRate using area IDs.
   * @param dto The AddTransferRateDTO object containing source, destination, and rate.
   * @returns A Promise that resolves to the newly created TransferRate.
   */
  async addTransferRate(dto: AddTransferRateRequest): Promise<TransferRate> {
    return (await apiClient.post(this._baseURL, dto)).data;
  }

  /**
   * Add multiple TransferRates in bulk.
   * @param rates List of TransferRate objects to add.
   * @returns A Promise that resolves to the created TransferRates.
   */
  async addTransferRates(rates: TransferRate[]): Promise<TransferRate[]> {
    return (await apiClient.post(`${this._baseURL}/bulk`, rates)).data;
  }

  /**
   * Add multiple TransferRates using DTOs.
   * @param dto List of AddTransferRateDTO objects.
   * @returns A Promise that resolves to the created TransferRates.
   */
  async addTransferRatesFromDTO(dto: AddTransferRateRequest[]): Promise<TransferRate[]> {
    return (await apiClient.post(`${this._baseURL}/all`, dto)).data;
  }

  /**
   * Get a specific TransferRate for given source and destination areas.
   * @param sourceAreaId ID of the source area.
   * @param destinationAreaId ID of the destination area.
   * @returns A Promise that resolves to the TransferRate for the given areas.
   */
  async getTransferRateForAreas(sourceAreaId: number, destinationAreaId: number): Promise<TransferRate> {
    const params = { sourceAreaId, destinationAreaId };
    return (await apiClient.get(`${this._baseURL}/calc`, { params })).data;
  }

  /**
   * Deactivate a specific TransferRate.
   * @param id The ID of the TransferRate to deactivate.
   * @returns A Promise that resolves when the TransferRate is deactivated.
   */
  async setTransferRateInactive(id: number): Promise<void> {
    await apiClient.patch(`${this._baseURL}/${id}/deactivate`);
  }


  /**
   * Deactivate a specific TransferRate.
   * @param id The ID of the TransferRate to deactivate.
   * @returns A Promise that resolves when the TransferRate is deactivated.
   */
  async reactiveTransferRate(id: number): Promise<TransferRate> {
   return (await apiClient.patch(`${this._baseURL}/${id}/activate`)).data;
  }

}

export default new TransferRateService();