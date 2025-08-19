"use client";

import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionFormProps {
  transaction?: {
    id: string;
    date: string;
    description: string;
    category: string;
    type: "income" | "expense";
    amount: number;
    note?: string;  
  };
  onClose: () => void;
}

export default function TransactionAddForm({
  transaction,
  onClose,
}: TransactionFormProps) {
  const { user, isLoading } = useUser(); // Get logged-in user
  const [date, setDate] = useState<Date | undefined>(
    transaction ? new Date(transaction.date) : new Date()
  );
  const [type, setType] = useState(transaction?.type || "expense");
  const [amount, setAmount] = useState(
    transaction ? Math.abs(transaction.amount).toString() : ""
  );
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [category, setCategory] = useState(transaction?.category || "");
  const [note, setNote] = useState(transaction?.note || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample categories
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investments",
    "Gifts",
    "Other Income",
  ];
  const expenseCategories = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Healthcare",
    "Education",
    "Personal Care",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.sub) {
      alert("You must be logged in to add a transaction.");
      return;
    }

    setIsSubmitting(true);

    try {
      const transactionData = {
        userId: user.sub,
        type,
        amount: parseFloat(amount),
        category,
        date: date ? date.toISOString() : new Date().toISOString(),
        description,
        note,  
      };

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        // Better error handling
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(`Failed to save transaction: ${response.status}`);
      }

      const result = await response.json();
      onClose();
      alert(
        transaction
          ? "Transaction updated successfully!"
          : "Transaction added successfully!"
      );
    } catch (error: any) {
      console.error('Error saving transaction:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="type">Transaction Type</Label>
        <Select
          value={type}
          onValueChange={(value: "income" | "expense") => setType(value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.00"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="What was this transaction for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {(type === "income" ? incomeCategories : expenseCategories).map(
              (cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Notes (Optional)</Label>  
        <Textarea
          id="note"
          placeholder="Add any additional details about this transaction"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || isLoading}>
          {isSubmitting ? "Saving..." : transaction ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
}