import useSWR from "swr";
import { getAllCategories } from "@/apis/categoriesApi";
import { Category } from "@/types/api/Category";


// Create a fetcher function for SWR.  This function wraps the Axios call.
// const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

type CategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

const useGetCategories = () => {
  // Use SWR to fetch the data from the local JSON file
  const { data, error, isLoading, mutate } = useSWR<CategoriesResponse>(
    "/categories",
    getAllCategories,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data:  data?.data || [],
    error: error,
    isLoading: isLoading,
    mutate: mutate,
    revalidate: () => mutate(),
  };
};

export default useGetCategories;
