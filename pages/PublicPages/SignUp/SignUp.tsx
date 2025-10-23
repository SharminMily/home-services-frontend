"use client";

// import { signUpUser } from "@/apis/auth";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { formSchema } from "./signupValidation";

// infer TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

const SignUp = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // setup form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "", 
      gender: "",
      address: "",
      role: "",
    },
  });

  // ✅ handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(file);
  };

  //  handle submit
const onSubmit = async (data: FormData) => {
  try {
    const formData = new FormData();

    // append all fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });

    // append file
    if (photo) {
      formData.append("file", photo); //  match backend
    } else {
      console.log(" No file selected to upload.");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    // safe response parsing
    if (!res.ok) {
      const errorText = await res.text(); // handle HTML or text errors
      throw new Error(errorText);
    }

    const userInfo = await res.json();
    console.log("Signup success:", userInfo);
   // ✅ save token to localStorage
    const token = userInfo?.data?.accessToken;
    if (token) {
      localStorage.setItem("accessToken", token);

      // Optional: decode token if needed
      // const decoded = jwtDecode<IUser>(token);
      // setUser(decoded);

      alert("Signup successful! Token saved.");
    } else {
      alert("Signup successful, but no token returned!");
    }

    reset();
  } catch (error) {
    console.error("Signup Error:", error);
    alert("Signup failed! Check console.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Container>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">GhorerFix</h1>
            <p className="text-lg">
              Get in touch with us for any inquiries or support.
            </p>
          </div>

          <Card className="border-primary shadow-md max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-exo text-primary">
                Signup your Account
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="border-primary rounded-md"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="border-primary rounded-md"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <Input
                    type="password"
                    placeholder="Your Password"
                    className="border-primary rounded-md"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Input
                    type="phone"
                    placeholder="Your Phone"
                    className="border-primary rounded-md"
                    {...register("phone")} // ✅ important
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <select
                    className="border border-primary rounded-md w-full p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register("gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <Input
                    type="text"
                    placeholder="Your Address"
                    className="border-primary rounded-md"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photoUpload"
                    className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg inline-block hover:bg-secondary transition"
                  >
                    {photo ? "Change Photo" : "Upload Photo"}
                  </label>
                  {photo && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected:{" "}
                      <span className="font-medium">{photo.name}</span>
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || isSubmitting || !isValid}
                  className="bg-primary text-white hover:bg-secondary transition-colors duration-300 rounded-md w-full"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </form>

              <div className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Login here
                </Link>
              </div>
            </CardContent>

            <p className="text-center text-sm py-2">
              Copyright © GhorerFix 2026.
            </p>
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default SignUp;
