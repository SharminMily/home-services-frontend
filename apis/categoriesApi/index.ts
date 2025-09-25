import { baseUrl } from "@/utils/config";

const uri = `${baseUrl}/categories`;

export const getAllCategories = async () => {

  const res = await fetch(uri, { cache: "no-store" }); 
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const categoriesData = await res.json();
  return categoriesData;
};
