import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@/redux/store";

interface DashboardRouteProps {
  children: ReactNode;
}

export default function DashboardRoute({ children }: DashboardRouteProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  console.log("isAuthenticated", isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
