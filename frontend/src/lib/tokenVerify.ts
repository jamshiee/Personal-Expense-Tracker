"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";

type DecodedUser = {
  email: string;
  fullname?: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
 const [loading, setLoading] = useState(true);
  const fetchUserFromToken = async () => {
    await axiosInstance
      .get("/getuser")
      .then((res) => {
        console.log("User data fetched successfully:", res.data.user);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setUser(null);
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserFromToken();
  }, []);


  return { user,loading };
};
