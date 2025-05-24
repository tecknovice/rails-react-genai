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
import DashboardRoute from "@/components/dashboard-route";
import DashboardLayout from "@/layouts/dashboard";
import DashboardHome from "@/pages/dashboard/home";
import DefaultLayout from "@/layouts/default";
import Home from "@/pages/Home";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AdminRoute from "@/components/admin-route";
import AdminLayout from "@/layouts/admin";
import AdminHome from "@/pages/admin/home";
import AuthInitializer from "@/components/auth-initializer";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
            </Route>
            <Route
              path="/dashboard"
              element={
                <DashboardRoute>
                  <DashboardLayout />
                </DashboardRoute>
              }
            >
              <Route index element={<DashboardHome />} />
            </Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminHome />} />
              {/* Add other admin routes */}
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
