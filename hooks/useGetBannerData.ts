import useSWR from "swr";
import axios from "axios";

// Define the type of data you expect to receive.
interface BannerData {
  id: number;
  title: string;
  details: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  // Add other properties as needed
}

// Create a fetcher function for SWR.  This function wraps the Axios call.
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useGetBannerData = () => {
  // Use SWR to fetch the data from the local JSON file
  const { data, error, isLoading, mutate } = useSWR<BannerData[]>(
    "/hero.json",
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

export default useGetBannerData;
