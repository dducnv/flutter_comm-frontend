import { appApi } from "@/untils/configs/app_api_config";
import { useSWRConfig } from "@/untils/configs/swr_config";

export function useAuth(option?: any) {
  const {
    data: profile,
    error,
    mutate,
    isLoading,
  }: any = useSWRConfig(`/api/auth/me`, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...option,
  });

  async function logout() {
    await fetch(`/api/auth/logout`, {
      method: "DELETE",
    });
    await mutate({}, false);
  }

  return {
    profile,
    error,
    mutate,
    logout,
    isLoading,
    isLogin: profile?.uuid ? true : false,
  };
}
