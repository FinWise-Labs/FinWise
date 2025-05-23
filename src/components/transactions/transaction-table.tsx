"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, subDays } from "date-fns";
import {
  CalendarIcon,
  Download,
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-hot-toast";
import TransactionEditModal from "@/components/transactions/trasaction-editform";
import TransactionDetailsModal from "@/components/transactions/transaction-details";

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

interface FilterState {
  search: string;
  category: string;
  type: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const TransactionTable = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsTransaction, setDetailsTransaction] =
    useState<Transaction | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    type: "all",
    dateFrom: subDays(new Date(), 30),
    dateTo: new Date(),
    page: 1,
    limit: 20,
    sortBy: "date",
    sortOrder: "desc",
  });

  // Debounced search
  const [searchInput, setSearchInput] = useState("");

  const userId = user?.sub;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch transactions when filters change
  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId, filters]);

  // Build query parameters
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    params.append("userId", userId || "");

    if (filters.search) params.append("search", filters.search);
    if (filters.category !== "all") params.append("category", filters.category);
    if (filters.type !== "all") params.append("type", filters.type);
    if (filters.dateFrom)
      params.append("dateFrom", filters.dateFrom.toISOString().split("T")[0]);
    if (filters.dateTo)
      params.append("dateTo", filters.dateTo.toISOString().split("T")[0]);

    params.append("page", filters.page.toString());
    params.append("limit", filters.limit.toString());
    params.append("sortBy", filters.sortBy);
    params.append("sortOrder", filters.sortOrder);
    console.log("Query Params:", params.toString()); // Debugging line
    return params.toString();
  }, [userId, filters]); // Build query params for API call

  // Fetch transactions from API with filters
  const fetchTransactions = async () => {
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = buildQueryParams();
      const response = await fetch(`/api/transactions?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(data.transactions || []);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.currentPage || 1);
      setCategories(data.categories || []);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching transactions:", error);
      toast.error(`Error fetching transactions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value, // Reset to page 1 when other filters change
    }));
  };

  // Handle date range change
  const handleDateRangeChange = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      dateFrom: range?.from,
      dateTo: range?.to,
      page: 1,
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Delete transaction
  const handleDeleteTransaction = async (transactionId: string) => {
    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/transactions?transactionId=${encodeURIComponent(
          transactionId
        )}&userId=${encodeURIComponent(userId)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete transaction");
      }

      toast.success("Transaction deleted successfully!");
      fetchTransactions(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting transaction:", error);
      toast.error(`Error deleting transaction: ${error.message}`);
    }
  };

  // Modal handlers
  const handleViewDetails = (transaction: Transaction) => {
    setDetailsTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setDetailsTransaction(null);
  };

  const handleEditFromDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleTransactionUpdated = (updatedTransaction: Transaction) => {
    fetchTransactions(); // Refresh the list to maintain filters
  };

  const handleTransactionCreated = (newTransaction: Transaction) => {
    fetchTransactions(); // Refresh the list to maintain filters
  };

  const clearFilters = () => {
    setSearchInput("");
    setFilters({
      search: "",
      category: "all",
      type: "all",
      dateFrom: subDays(new Date(), 30),
      dateTo: new Date(),
      page: 1,
      limit: 20,
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  // Handle CSV export with current filters
  const handleExportCSV = async () => {
    try {
      const queryParams = buildQueryParams();
      // Remove pagination for export to get all filtered results
      const exportParams = new URLSearchParams(queryParams);
      exportParams.delete("page");
      exportParams.delete("limit");

      const response = await fetch(
        `/api/transactions?${exportParams.toString()}`
      );
      const data = await response.json();
      const allTransactions = data.transactions || [];

      if (allTransactions.length === 0) {
        toast.error("No transactions to export");
        return;
      }

      const csvHeaders = ["Date", "Description", "Category", "Type", "Amount"];
      const csvData = allTransactions.map((transaction: Transaction) => [
        new Date(transaction.date).toLocaleDateString(),
        transaction.description,
        transaction.category,
        transaction.type,
        transaction.amount.toString(),
      ]);

      const csvContent = [
        csvHeaders.join(","),
        ...csvData.map((row: string[]) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `transactions_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("CSV exported successfully!");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderTransactionTable = () => (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
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
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow
                    key={transaction._id}
                    onClick={() => handleViewDetails(transaction)}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTransaction(transaction);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTransaction(transaction._id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Button onClick={handleAddTransaction}>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Transaction Filters</CardTitle>
          <CardDescription>
            Filter and search your transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-8"
              />
            </div>

            {/* Category */}
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type */}
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateFrom && filters.dateTo
                    ? `${format(filters.dateFrom, "LLL dd, y")} – ${format(
                        filters.dateTo,
                        "LLL dd, y"
                      )}`
                    : "Pick a date range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{ from: filters.dateFrom, to: filters.dateTo }}
                  onSelect={(range) => handleDateRangeChange(range)}
                  numberOfMonths={2}
                  defaultMonth={filters.dateFrom}
                />
              </PopoverContent>
            </Popover>

            {/* Clear */}
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => handleFilterChange("type", "all")}
          >
            All Transactions
          </TabsTrigger>
          <TabsTrigger
            value="income"
            onClick={() => handleFilterChange("type", "income")}
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            onClick={() => handleFilterChange("type", "expense")}
          >
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderTransactionTable()}
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          {renderTransactionTable()}
        </TabsContent>

        <TabsContent value="expense" className="space-y-4">
          {renderTransactionTable()}
        </TabsContent>
      </Tabs>

      {/* Pagination and Actions */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * filters.limit + 1} to{" "}
          {Math.min(currentPage * filters.limit, totalCount)} of {totalCount}{" "}
          transactions
        </p>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Modals */}
      <TransactionEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionCreated={handleTransactionCreated}
      />

      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        transaction={detailsTransaction}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default TransactionTable;
