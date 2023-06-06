import { appApi } from "@/untils/configs/app_api_config";
import { useSWRConfig } from "@/untils/configs/swr_config";

export function useTags(option?: any) {
  const {
    data: tags,
    error,
    mutate,
    isLoading,
  }: any = useSWRConfig(`/api/tags`, {
    dedupingInterval: 2 * 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...option,
  });

  return {
    tags,
    error,
    mutate,
    isLoading,
    isLogin: tags?.id ? true : false,
  };
}
