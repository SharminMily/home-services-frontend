"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// const uri = `${baseUrl}`;

export const signUpUser = async (userData: FieldValues) => {
  const formData = new FormData();
  const { file, ...restData } = userData;

  if (file) formData.append("file", file);

  formData.append("data", JSON.stringify(restData));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return await res.json();
};


export const loginUser = async (userData: FieldValues) => {
  // console.log(loginUser);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // console.log(res);
    const userInfo = await res.json();
    if (userInfo.success) {
      (await cookies()).set("accessToken", userInfo.data.accessToken);
    }

    return userInfo;
  } catch (error) {
    console.error(error);
  }
};


