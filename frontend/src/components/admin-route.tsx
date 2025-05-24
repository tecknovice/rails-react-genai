import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "@/redux/store";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log("user", user);

  if (user?.role !== "admin") {
    // Redirect non-admin users to dashboard or show access denied
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
