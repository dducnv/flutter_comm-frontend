import { cookies } from "next/headers";

const APP_URL = process.env.API_URL + "/api/v1";
export const appApi = {
  async get(path: string, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return await fetch(`${APP_URL}${path}`, {
      method: "GET",
      cache: "no-store",
      next: {
        ...next,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    });
  },
  post(path: string, data: any, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(`${APP_URL}${path}`, {
      method: "POST",
      next: {
        ...next,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify(data),
    });
  },
  put(path: string, data: any, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(`${APP_URL}${path}`, {
      method: "PUT",
      next: {
        ...next,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify(data),
    });
  },
  remove(path: string, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(`${APP_URL}${path}`, {
      method: "DELETE",
      next: {
        ...next,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    });
  },
};
