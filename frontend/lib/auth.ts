import api from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export const login = async (data: LoginData): Promise<string> => {
  const response = await api.post("/auth/login", data);
  const token = response.data.access_token;
  localStorage.setItem("token", token);
  return token;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}; 
