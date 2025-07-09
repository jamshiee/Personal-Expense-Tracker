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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "@/config/axiosInstance";
import { useRouter } from "next/navigation";

const expenseSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Amount must be a positive number"),
  description: z.string().min(1, "Description is required").min(3, "Description must be at least 3 characters long"),
  category: z.enum(["Food", "Transport", "Bills", "Shopping", "Others"], {
    required_error: "Please select a category",
  }),
});

export default function AddExpensePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router =useRouter()

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof expenseSchema>) {
    setLoading(true);
    
    try {
      console.log("Form submitted with data:", data);
      const response = await axiosInstance.post('/expenses', {
        amount: parseFloat(data.amount),
        description: data.description,
        category: data.category
      });
      console.log("Response from server:", response.data);
      toast.success("Expense added successfully!");
      router.push("/app/dashboard"); 
      form.reset();
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="container mx-auto max-w-2xl pt-8">
      

        {/* Main Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount Field */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              step="0.01"
                              className="pl-8 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category Field */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Category</FormLabel>
                        <FormControl>
                          <Select 
                            {...field}
                            className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                          >
                            <option value="">Select a category</option>
                            <option value="Food">🍔 Food</option>
                            <option value="Transport">🚗 Transport</option>
                            <option value="Bills">📄 Bills</option>
                            <option value="Shopping">🛍️ Shopping</option>
                            <option value="Others">📝 Others</option>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                      <FormControl>
                        <Input 
                          type="text" 
                          placeholder="What did you spend on?" 
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 bg-black/90 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Adding Expense...
                      </div>
                    ) : (
                      "Add Expense"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
     
      </div>
    </div>
  );
}
