export type UserRole = "user" | "admin";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  name?: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

// Authentication related types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  password_confirmation: string;
}

export interface UserUpdateData {
  email?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  password?: string;
  password_confirmation?: string;
  current_password?: string;
}
