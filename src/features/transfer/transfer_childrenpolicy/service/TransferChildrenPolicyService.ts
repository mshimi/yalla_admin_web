import { AgeRange } from "../types/AgeRange";
import { TransferChildrenPolicy } from "../types/TransferChildrenPolicy";
import apiClient from "../../../../common/api/ApiClient"



class TransferChildrenPolicyService {

  private  _baseURL:string = "/admin/transfer/childrenpolicy";

  /**
   * Get the active TransferChildrenPolicy.
   * @returns A Promise that resolves to the active policy.
   */
  async getActivePolicy(): Promise<TransferChildrenPolicy|string> {
    return (await apiClient.get(this._baseURL + "/active")).data;

  }

  /**
   * Set a specific TransferChildrenPolicy as inactive.
   * @param id The ID of the policy to deactivate.
   * @returns A Promise that resolves when the policy is set to inactive.
   */
  async setPolicyAsInactive(id: number): Promise<void> {
    return (await apiClient.patch(this._baseURL +"/" +id +"/deactivate")).data;
  }

  /**
   * Add a new AgeRange to the active policy.
   * @param ageRange The AgeRange to add.
   * @returns A Promise that resolves to the updated policy.
   */
  async addAgeRangeToExistingPolicy(ageRange: AgeRange): Promise<TransferChildrenPolicy> {
    const response = await apiClient.post(`${this._baseURL}/add-age-range`, ageRange);
    return response.data;
  }

  /**
   * Create a new TransferChildrenPolicy with a list of AgeRanges.
   * @param ageRanges The list of AgeRanges for the new policy.
   * @returns A Promise that resolves to the newly created policy.
   */
  async createNewPolicyWithAgeRanges(ageRanges: AgeRange[]): Promise<TransferChildrenPolicy> {
    const response = await apiClient.post(`${this._baseURL}/new-policy`, ageRanges);
    return response.data;
  }
}

export default new  TransferChildrenPolicyService();