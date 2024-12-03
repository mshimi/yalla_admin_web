import apiClient from "../../../common/api/ApiClient";
import type User from "../types/User";


export interface LoginResponse {
    token: string;
    refreshToken: string;
    
  }
  


  const authEndPoint = '/auth/';

export class AuthSerivce {
    

async login(email: string, password: string): Promise<LoginResponse> {
   return (await apiClient.post(authEndPoint+"login", { username:email, password })).data;
}

async getCurrentUser(): Promise<User> {
    return (await apiClient.get(authEndPoint+"user")).data;
}

async refreshToken(refreshToken:string): Promise<LoginResponse> {
    return (await apiClient.get(authEndPoint+"refresh")).data;
}

}