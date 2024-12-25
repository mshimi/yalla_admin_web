import apiClient from "../../../../common/api/ApiClient";
import { GeneralTransferRelease } from "../types/GeneralTransferRelease"

class ReleaseService {
  private _baseURL: string = "/admin/release";

  constructor() {}

  /**
   * Fetches the general release period.
   */
  async getGeneralRelease(): Promise<GeneralTransferRelease | null> {
    return (await apiClient.get(this._baseURL + "/transfer/general")).data;
  }

  /**
   * Fetches all active release periods.
   */
  async getRelease(): Promise<TransferRelease[]> {
    return (await apiClient.get(this._baseURL + "/transfer")).data;
  }

  /**
   * Marks a release period as inactive.
   * @param id The ID of the release period to be marked inactive.
   */
  async setReleaseInactive(id: number): Promise<void> {
    return (await apiClient.delete(this._baseURL + "/transfer/" + id)).data;
  }

  /**
   * Adds a new general release period.
   * @param releasePeriodDTO The release period data to add.
   */
  async addGeneralReleasePeriod(releasePeriodDTO: Partial<GeneralTransferRelease>): Promise<GeneralTransferRelease> {
    return (await apiClient.post(this._baseURL + "/transfer/general", releasePeriodDTO)).data;
  }

  /**
   * Adds a new specific release period.
   * @param releasePeriodDTO The release period data to add.
   */
  async addReleasePeriod(releasePeriodDTO: Partial<TransferRelease>): Promise<TransferRelease> {
    return (await apiClient.post(this._baseURL + "/transfer", releasePeriodDTO)).data;
  }


  async backToGeneralRelease({startDate, endDate }:{startDate:string, endDate:string}): Promise<TransferRelease[]> {
    return (await apiClient.post(this._baseURL + "/transfer/backtogeneral", {startDate, endDate })).data;
  }


}

export default new ReleaseService();