
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/tokenVerify";
import React from "react";
const auth = {
  login: { text: "Sign in", url: "/sign-in" },
  signup: { text: "Sign up", url: "/sign-up" },
};
export default function AuthNavButtons() {

    const {user} = useAuth();

  if (user ) {
    return (
      <Button asChild size="sm" variant="outline">
        <a href="/app">Dashboard</a>
      </Button>
    
    );
  } else {
    return (
        <>
        <Button asChild variant="outline" size="sm">
          <a href={auth.login.url}>{auth.login.text}</a>
        </Button>
        <Button asChild size="sm">
          <a href={auth.signup.url}>{auth.signup.text}</a>
        </Button>
      </>
    );
  }
}
