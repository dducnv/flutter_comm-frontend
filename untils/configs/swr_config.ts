import useSWR from "swr";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export function useSWRConfig(path: string, options?: any) {
  const URL = "https://fluttercommunityvn.vercel.app/api/";
  const DevURL = "http://localhost:3000/api/";
  const { data, error, mutate } = useSWR(`${URL}${path}`, fetcher, {
    ...options,
  });
  return {
    data,
    error,
    mutate,
    isLoading: !error && !data,
  };
}
