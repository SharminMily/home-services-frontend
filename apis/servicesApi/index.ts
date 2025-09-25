import { baseUrl } from "@/utils/config";

export type IPaginationOptions = {
    page?:number;
    limit?: number;
    serchTerm? : string | number| undefined;
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


const uri = `${baseUrl}/services`;

// const buildQueryString = (query: Record<string, any>) => {
//   const params = new URLSearchParams();
//   Object.entries(query).forEach(([key, value]) => {
//     if (value !== undefined && value !== null) {
//       params.append(key, value.toString());
//     }
//   });
//   return params.toString();
// };

export const getAllServices = async () => {
  const res = await fetch(uri, { cache: "no-store" }); 
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const json = await res.json();
  return json?.data?.data || [];
};





