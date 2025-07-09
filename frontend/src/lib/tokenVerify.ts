import { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";

type DecodedUser = {
  email: string;
  fullname?: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const res = await axiosInstance.get("/getuser");

        // Assume backend sends { user: { ...decodedData } }
        if (res.status === 200 && res.data.user) {
          console.log("User data fetched successfully:", res.data.user);
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn("Unauthorized or token missing/invalid");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFromToken();
  }, []);

  return { user };
};
