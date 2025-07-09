"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export function SignInForm() {
  const [error, setError] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);

    const router = useRouter();
  
  const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
   setloading(true);
    setError(undefined);

    try {
      const response = await axiosInstance.post("/auth/login", data);
      if (response) {

        localStorage.setItem("token", response.data.accessToken);
        toast.success("Login successful! ");
        console.log("Form submission successful:", response.data);
        router.push("/app/dashboard");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        toast.error("Registration unsuccessful! "+ err.response.data.message);

      }else{
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      console.log("Form submitted with error:", err.response);
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && <p className="text-destructive">{error}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
       
      </div>


    </>
  );
}
