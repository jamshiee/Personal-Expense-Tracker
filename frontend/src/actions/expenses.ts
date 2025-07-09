"use client";

import axiosInstance from "@/config/axiosInstance";

export interface Expense {
  id?: number;
  amount: number;
  description: string;
  category: string;
  date?: string;
}

export interface ExpenseCreateData {
  amount: number;
  description: string;
  category: string;
}

export interface ExpenseUpdateData {
  amount?: number;
  description?: string;
  category?: string;
}

export async function getUser() {
  try {
    const response = await axiosInstance.get("/expenses/getuser");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      error: "Failed to load user data",
    };
  }
}

export async function createExpense(data: ExpenseCreateData) {
  try {
    const response = await axiosInstance.post('/expenses', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error adding expense:", error);
    return {
      success: false,
      error: "Failed to add expense. Please try again.",
    };
  }
}

export async function getExpenses() {
  try {
    const response = await axiosInstance.get("/expenses");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return {
      success: false,
      error: "Failed to load expenses",
    };
  }
}

export async function updateExpense(id: number, data: ExpenseUpdateData) {
  try {
    const response = await axiosInstance.put(`/expenses/${id}`, data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error updating expense:", error);
    return {
      success: false,
      error: "Failed to update expense",
    };
  }
}

export async function deleteExpense(id: number) {
  try {
    await axiosInstance.delete(`/expenses/${id}`);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return {
      success: false,
      error: "Failed to delete expense",
    };
  }
}

export async function getExpenseSummaryByCategory() {
  try {
    const response = await axiosInstance.get("/expenses/summary");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching expense summary:", error);
    return {
      success: false,
      error: "Failed to load expense summary",
    };
  }
}
