"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { deleteExpense as deleteExpenseAction, updateExpense as updateExpenseAction } from "@/actions/expenses";

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  filteredExpenses: Expense[];
  loading: boolean;
  onExpensesUpdate: (expenses: Expense[]) => void;
}

const categories = ["Food", "Transport", "Bills", "Shopping", "Others"];

export default function ExpenseTable({ 
  expenses, 
  filteredExpenses, 
  loading, 
  onExpensesUpdate 
}: ExpenseTableProps) {
  const [editingExpense, setEditingExpense] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    description: "",
    category: "",
  });

  // Delete expense
  const deleteExpense = async (id: number) => {
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const result = await deleteExpenseAction(id);
      if (result.success) {
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        onExpensesUpdate(updatedExpenses);
        toast.success("Expense deleted successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  // Start editing expense
  const startEdit = (expense: Expense) => {
    setEditingExpense(expense.id);
    setEditForm({
      amount: expense.amount.toString(),
      description: expense.description,
      category: expense.category,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingExpense(null);
    setEditForm({
      amount: "",
      description: "",
      category: "",
    });
  };

  // Save edited expense
  const saveEdit = async (id: number) => {
    try {
      const result = await updateExpenseAction(id, {
        amount: parseFloat(editForm.amount),
        description: editForm.description,
        category: editForm.category,
      });

      if (result.success) {
        const updatedExpenses = expenses.map(expense =>
          expense.id === id ? { ...expense, ...result.data.expense } : expense
        );
        onExpensesUpdate(updatedExpenses);
        
        setEditingExpense(null);
        setEditForm({
          amount: "",
          description: "",
          category: "",
        });
        toast.success("Expense updated successfully!");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: "bg-green-100 text-green-800",
      Transport: "bg-blue-100 text-blue-800",
      Bills: "bg-red-100 text-red-800",
      Shopping: "bg-purple-100 text-purple-800",
      Others: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense List</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading expenses...</span>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">No expenses found</h3>
            <p className="text-muted-foreground mb-4">
              {expenses.length === 0 
                ? "You haven't added any expenses yet. Start by adding your first expense!"
                : "No expenses match your current filters. Try adjusting your filter criteria."
              }
            </p>
            {expenses.length === 0 && (
              <Button onClick={() => window.location.href = '/app/addexpense'}>
                Add Your First Expense
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    {formatDate(expense.date)}
                  </TableCell>
                  <TableCell>
                    {editingExpense === expense.id ? (
                      <Input
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        className="min-w-[150px]"
                      />
                    ) : (
                      expense.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editingExpense === expense.id ? (
                      <Select
                        value={editForm.category}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="min-w-[120px]"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Badge className={getCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {editingExpense === expense.id ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={editForm.amount}
                        onChange={(e) => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                        className="min-w-[100px] text-right"
                      />
                    ) : (
                      formatCurrency(Number(expense.amount))
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingExpense === expense.id ? (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          onClick={() => saveEdit(expense.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(expense)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteExpense(expense.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
