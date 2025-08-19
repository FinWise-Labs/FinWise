"use client";

import React, { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'react-hot-toast';

interface Transaction {
  _id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
  note?: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  onTransactionUpdated: (updatedTransaction: Transaction) => void;
  onTransactionCreated: (newTransaction: Transaction) => void;
}

export default function TransactionModal({
  isOpen,
  onClose,
  transaction,
  onTransactionUpdated,
  onTransactionCreated,
}: TransactionModalProps) {
  const { user, isLoading } = useUser();
  const [date, setDate] = useState<Date | undefined>(
    transaction ? new Date(transaction.date) : new Date()
  );
  const [type, setType] = useState<"income" | "expense">(transaction?.type || "expense");
  const [amount, setAmount] = useState(
    transaction ? Math.abs(transaction.amount).toString() : ""
  );
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [category, setCategory] = useState(transaction?.category || "");
  const [note, setNote] = useState(transaction?.note || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!transaction;

  // Reset form when modal opens/closes or transaction changes
  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        setDate(new Date(transaction.date));
        setType(transaction.type);
        setAmount(Math.abs(transaction.amount).toString());
        setDescription(transaction.description);
        setCategory(transaction.category);
        setNote(transaction.note || "");
      } else {
        // Reset for new transaction
        setDate(new Date());
        setType("expense");
        setAmount("");
        setDescription("");
        setCategory("");
        setNote("");
      }
    }
  }, [isOpen, transaction]);

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
      toast.error("You must be logged in to save a transaction.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
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
        description: description.trim(),
        note: note.trim(),
      };

      if (isEditing && transaction) {
        // Update existing transaction
        const response = await fetch("/api/transactions", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId: transaction._id,
            ...transactionData,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update transaction");
        }

        const data = await response.json();
        onTransactionUpdated(data.transaction);
        toast.success("Transaction updated successfully!");
      } else {
        // Create new transaction
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create transaction");
        }

        const data = await response.json();
        onTransactionCreated(data.transaction);
        toast.success("Transaction created successfully!");
      }

      onClose();
    } catch (error: any) {
      console.error("Error saving transaction:", error);
      toast.error(`Error saving transaction: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Transaction" : "Add New Transaction"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Make changes to your transaction details below."
              : "Fill in the details for your new transaction."
            }
          </DialogDescription>
        </DialogHeader>

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
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting 
                ? "Saving..." 
                : isEditing 
                  ? "Update Transaction" 
                  : "Create Transaction"
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}