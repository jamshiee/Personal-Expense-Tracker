"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, TrendingUp, Plus } from "lucide-react";
import axiosInstance from "@/config/axiosInstance";
import { toast } from "sonner";

interface CategorySummary {
  [category: string]: number;
}

export default function ExpenseSummaryByCategory() {
  const [summary, setSummary] = useState<CategorySummary>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axiosInstance.get("/expenses/summary");
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching expense summary:", error);
      setError("Failed to load expense summary");
      toast.error("Failed to load expense summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };





  const totalAmount = Object.values(summary).reduce((sum, amount) => sum + amount, 0);
  const hasExpenses = Object.keys(summary).length > 0 && totalAmount > 0;



  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          Expense Summary by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading summary...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">⚠️</div>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchSummary} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : !hasExpenses ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">No expense data available</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your expenses to see detailed breakdowns by category.
            </p>
            <Button onClick={() => window.location.href = '/app/addexpense'}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Expense
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Category Breakdown */}
            {Object.entries(summary)
              .sort(([, a], [, b]) => b - a) // Sort by amount descending
              .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-white border rounded">
                  <span className="font-medium">{category}</span>
                  <span className="text-gray-900">{formatCurrency(amount)}</span>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
