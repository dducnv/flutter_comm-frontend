import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export function useSWRConfig(path: string, options?: any) {
  const { data, error, mutate } = useSWR(
    `https://fluttercommunityvn.vercel.app/${path}`,
    fetcher,
    {
      ...options,
    }
  );
  return {
    data,
    error,
    mutate,
    isLoading: !error && !data,
  };
}
