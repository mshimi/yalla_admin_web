import apiClient from "../../../../common/api/ApiClient";

class ReleaseService {

constructor() {}

private _baseURL:string = "/admin/release";

async getGeneralRelease(): Promise<GeneralTransferRelease|null>{
  return  (await apiClient.get(this._baseURL + "/transfer/general")).data;
}
    

}

export default new ReleaseService();