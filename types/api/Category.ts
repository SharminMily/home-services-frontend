export interface Category {
  id: string;
  name: string;
  popular: boolean | null;
  featured: boolean | null;
  latest: boolean | null;
  createdAt?: Date;
  updateAt?: Date;
}
