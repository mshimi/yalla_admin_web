import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios"
import ErrorNotifier from "./common/error_handlers/Notifier"
import "react-toastify/dist/ReactToastify.css";
import Notifier from "./common/error_handlers/Notifier"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"





export const queryClient = new QueryClient({
  defaultOptions: {
    queries:  {
      retry: 3,
      refetchOnWindowFocus: true,
      
     
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
        <Notifier />
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
