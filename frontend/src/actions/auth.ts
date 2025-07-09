"use client";

import axiosInstance from "@/config/axiosInstance";

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  fullname: string;
  email: string;
  password: string;
}

export async function signIn(data: SignInData) {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong. Please try again.",
    };
  }
}

export async function signUp(data: SignUpData) {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Something went wrong. Please try again.",
    };
  }
}

export async function signOut() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: "Failed to sign out",
    };
  }
}


