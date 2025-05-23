import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import Blogs from "@/pages/Blogs.tsx";
import Register from "@/pages/Register.tsx";
import Login from "@/pages/Login.tsx";
import DashboardLayout from "@/layouts/Dashboard.tsx";
import DashboardHome from "@/pages/dashboard/home";
import DefaultLayout from "./layouts/Default";
import Home from "./pages/Home";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
