import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { getProfile } from "@/services/auth";
import type { RootState } from "@/redux/store";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If we have a token (isAuthenticated is derived from token presence)
    // but no user data, fetch the user profile
    if (isAuthenticated) {
      const fetchUserProfile = async () => {
        try {
          const response = await getProfile();
          if (response.payload) {
            dispatch(setUser(response.payload));
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // Consider handling token invalidation here if needed
        }
      };

      fetchUserProfile();
    }
  }, [dispatch, isAuthenticated]);

  return null; // This component doesn't render anything
}
