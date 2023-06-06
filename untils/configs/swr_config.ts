import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export function useSWRConfig(url: string, options?: any) {
  const { data, error, mutate } = useSWR(url, fetcher, {
    ...options,
  });
  return {
    data,
    error,
    mutate,
    isLoading: !error && !data,
  };
}
