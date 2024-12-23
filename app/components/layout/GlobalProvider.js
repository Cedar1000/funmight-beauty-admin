"use client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const ClientLayout = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>

    
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        />
        <div>{children}</div>
     
      </QueryClientProvider>
  );
};

export default ClientLayout;
