import axios from "@/lib/axios";
import { Category } from "@/types/api/Category";
import useSWR from "swr";

// Create a fetcher function for SWR.  This function wraps the Axios call.
const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const useGetCategories = () => {
  // Use SWR to fetch the data from the local JSON file
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    "/categories",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    data: data,
    error: error,
    isLoading: isLoading,
    mutate: mutate,
    revalidate: () => mutate(),
  };
};

export default useGetCategories;
