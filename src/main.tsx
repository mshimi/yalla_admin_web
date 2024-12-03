import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios"




export const queryClient = new QueryClient({
  defaultOptions: {
    queries:  {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      throwOnError(error, query) {
        if(error instanceof AxiosError ) {
          if(error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return true;
          }
        } 

        return true;
      },
       
    },
    mutations: {
      onError: (error, variables, context) => {
        
      },
    },
  },
});



const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
