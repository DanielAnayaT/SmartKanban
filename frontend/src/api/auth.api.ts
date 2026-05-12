import api from "./axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const loginApi = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerApi = async (
  data: RegisterRequest
): Promise<void> => {
  await api.post("/auth/register", data);
};
