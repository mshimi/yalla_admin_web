import { BaseService } from "./BaseService";
import api from '../api/ApiClient';

export abstract class BaseServiceWithImage<T, ID> extends BaseService<T, ID> {
    constructor(baseUrl: string) {
        super(baseUrl);
        
      }


      async saveImage(id: ID, file: File): Promise<T> {
        const formData = new FormData();
        formData.append("image", file);
        return (
            await api.post(`${this.baseUrl}/${id}/image`, formData, {
              headers: {
                "Content-Type": "multipart/form-data", // Ensure the correct content type
              },
            })
          ).data;


}

async deleteImage(id: ID): Promise<void> {
       
    return (await api.delete(`${this.baseUrl}/${id}/image`));


}




}