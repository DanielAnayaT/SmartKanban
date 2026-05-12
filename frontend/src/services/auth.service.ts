import { loginApi, registerApi } from "../api/auth.api";
import type { LoginRequest, RegisterRequest } from "../types/auth";

export const login = async (data: LoginRequest) => {
  const response = await loginApi(data);
  localStorage.setItem("access_token", response.access_token);
  return response;
};

export const register = async (data: RegisterRequest) => {
  await registerApi(data);
};
