/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/utils/config";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category_id: string;
  image?: string;
  upazila?: { id: string; name: string };
}

export type IPaginationOptions = {
    page?:number;
    limit?: number;
    searchTerm? : string | number| undefined;
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}
 export type IOptionsResult = {
  page: number,
  limit: number,
  skip: number,
  sortBy: string,
  sortOrder: string
}

 export interface serviceFilter {
   title?: string;
   category?: string;
   location?: string;
  }

// const uri = `${baseUrl}/services`;

const buildQueryString = (query: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  return params.toString();
};


export const getAllServices = async (filter: serviceFilter = {
  title: "",
  category: "",
  location: ""
}) => {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    // if (!accessToken) {
    //   throw new Error("Access token not found");
    // }

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined.");
    }

    const queryString = buildQueryString(filter);
    const url = `${baseUrl}/services${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: accessToken,
      },
      next: { tags: ["MY-Service"] },
    });

     const json = await res.json();

  // 
  return json?.data?.data || [];
  } catch (error) {
    console.error("getService error:", error);
    return null;
  }
};










// export const getAllServices = async () => {
//   const res = await fetch(uri, { cache: "no-store" }); 
//   if (!res.ok) {
//     throw new Error("Failed to fetch services");
//   }

//   const json = await res.json();
//   return json?.data?.data || [];
// };








