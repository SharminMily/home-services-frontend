export interface Service {
  upazila_id: string;
  upazila: any;
  id: string;
  title: string;
  description: string;
  category_id: string;
  image: string;
  price: number;
  document?: string;
  location_id: string;
  createdAt: Date;
}
