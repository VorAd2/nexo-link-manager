import { api } from "./api";

export async function registerUser(username: string, password: string, is_admin = 0) {
  const response = await api.post("/api/register", {
    username,
    password,
    is_admin
  });

  return response.data;
}

export async function loginUser(username: string, password: string) {
  const response = await api.post("/api/login", {
    username,
    password,
  });

  return response.data;
}