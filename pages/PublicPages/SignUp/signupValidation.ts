import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string({ required_error: "phone is required" }), 
  password: z.string({ required_error: "password is required" }),
  address: z.string({ required_error: "address is required" }),
  gender: z.string().optional(),
  role: z.string().optional(),
});
