import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/authentication/states/AuthSlice";
import { useLocation } from "react-router-dom";
import { store } from "../../app/store";
import { addNotification } from "../error_handlers/notificationSlice";

// const dispatch = useAppDispatch();

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


apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      // Extract the error message from the API response
      const errorMessage = (error.response.data as { message?: string })?.message || "An unknown error occurred.";
      const details = (error.response.data as {details?: string[]})?.details ;

      // Use the store's dispatch method to dispatch the error
      store.dispatch(addNotification({ message: errorMessage, type: "error" , details: details }));
    }

    // Reject the error so it can be handled further downstream if needed
    return Promise.reject(error);
  }
);



  export default apiClient;