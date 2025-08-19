"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  Tag, 
  StickyNote,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { format } from "date-fns";

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

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  onEdit,
  onDelete,
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM do, yyyy");
  };

  const formatAmount = (amount: number, type: "income" | "expense") => {
    const absAmount = Math.abs(amount);
    const sign = type === "income" ? "+" : "-";
    return `${sign}$${absAmount.toFixed(2)}`;
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(transaction);
    }
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && window.confirm("Are you sure you want to delete this transaction?")) {
      onDelete(transaction._id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {transaction.type === "income" ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            Transaction Details
          </DialogTitle>
          <DialogDescription>
            View complete information about this transaction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Amount</span>
            </div>
            <div
              className={`text-2xl font-bold ${
                transaction.type === "income" ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </div>
          </div>

          <Separator />

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Type</span>
              </div>
              <Badge 
                variant={transaction.type === "income" ? "default" : "secondary"}
                className={
                  transaction.type === "income" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200" 
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {transaction.type === "income" ? "Income" : "Expense"}
              </Badge>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Category</span>
              </div>
              <Badge variant="outline">{transaction.category}</Badge>
            </div>
          </div>

          <Separator />

          {/* Date */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Date</span>
            </div>
            <p className="text-sm text-gray-900">{formatDate(transaction.date)}</p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Description</span>
            </div>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
              {transaction.description}
            </p>
          </div>

          {/* Notes */}
          {transaction.note && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Notes</span>
                </div>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                  {transaction.note}
                </p>
              </div>
            </>
          )}

          {/* Transaction ID */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-500">Transaction ID</span>
            </div>
            <p className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded border">
              {transaction._id}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            {onDelete && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            {onEdit && (
              <Button 
                variant="default" 
                size="sm"
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}