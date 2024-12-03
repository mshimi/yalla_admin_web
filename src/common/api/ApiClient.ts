import axios from "axios";
import type { AxiosInstance } from "axios";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/authentication/states/AuthSlice";
import { useLocation } from "react-router-dom";

const apiClient:AxiosInstance = axios.create({
  baseURL: '/api',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });





// Request interceptor to add the auth token to headers
apiClient.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem("token");
         
       //   config.headers['Access-Control-Allow-Origin'] = '*';
        //  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
          if(token){
              config.headers['Authorization'] = `Bearer ${token}`;

          }


      return config;
  },
  (error) => Promise.reject(error)
);


// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {

//       const originalRequest = error.config as AxiosRequestConfigWithRetry;

//       if (!originalRequest) {
//           return Promise.reject(error);
//       }

//       // Check if the error status is 401 or 403
//       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           const refreshToken = localStorage.getItem('refreshToken');

//           if (!refreshToken) {
//               // No refreshToken, logout
//               authService.logout();
//               return Promise.reject(error);
//           }

//           // Avoid infinite loops
//           if (!originalRequest._retry) {
//               originalRequest._retry = true;

//               try {
//                   // Attempt to refresh the token
//                   const authResponse = await authService.refreshToken();

//                   // Update token in localStorage
//                   localStorage.setItem('token', authResponse.token);

//                   // Update Axios default headers
//                   api.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`;

//                   // Update the original request's headers
//                   if (originalRequest.headers) {
//                       originalRequest.headers['Authorization'] = `Bearer ${authResponse.token}`;
//                   }

//                   // Retry the original request
//                   return api(originalRequest);
//               } catch (refreshError) {
//                   // Refresh token failed, logout
//                   authService.logout();
//                   return Promise.reject(refreshError);
//               }
//           } else {
//               // Already retried, but still getting 401 or 403, logout
//               authService.logout();
//               return Promise.reject(error);
//           }
//       }

//       // For other errors, reject the error
//       return Promise.reject(error);
//   }
// );



  export default apiClient;