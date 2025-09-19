export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: number | null;
  photo?: string | null;
  password: string;
  adress: string;
  gender: string | null;
  createdAt?: Date;
  updateAt?: Date;
}
