
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "./components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<SuperAdminDashboard />} />
              <Route path="/trainer" element={<TrainerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
