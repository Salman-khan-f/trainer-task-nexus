
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const App = () => (
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
    </UserProvider>
  </QueryClientProvider>
);

export default App;
