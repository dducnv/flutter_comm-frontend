import { cookies } from "next/headers";

export const appApi = {
  async get(url: string, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return await fetch(url, {
      method: "GET",
      cache: "no-cache",
      next: {
        ...next,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    });
  },
  post(url: string, data: any, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(url, {
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
  put(url: string, data: any, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(url, {
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
  remove(url: string, next?: NextFetchRequestConfig) {
    const token = cookies().get("access_token")?.value;
    const access_token = token ? `Bearer ${token}` : "";
    return fetch(url, {
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
