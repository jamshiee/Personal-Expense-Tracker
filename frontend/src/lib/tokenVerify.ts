
import React from "react";
import { useJwt } from "react-jwt";

type DecodedToken = {
  user?: unknown;
  [key: string]: unknown;
};

export const useTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const { decodedToken ,isExpired } = useJwt<DecodedToken>(token);

    if(isExpired){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  if(decodedToken && decodedToken.user) {
    localStorage.setItem("user", JSON.stringify(decodedToken.user));
  }


  return {
    isValid: !isExpired,
    user: decodedToken?.user || null
  }
};
