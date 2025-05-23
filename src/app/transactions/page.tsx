"use client";

import TransactionTable from "@/components/transactions/transaction-table";

export default function TransactionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TransactionTable />
    </div>
  );
}