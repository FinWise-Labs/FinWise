"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, subDays, isAfter, isBefore, parseISO } from "date-fns";
import {
  CalendarIcon,
  Download,
  Plus,
  Search,
  Edit,
  Trash2,
} from "lucide-react";
import TransactionForm from "@/components/transactions/transaction-form";
import TransactionDetails from "@/components/transactions/transaction-details";

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: "2025-03-15",
      description: "Salary Deposit",
      category: "Income",
      amount: 4250.0,
      type: "income",
    },
    {
      id: 2,
      date: "2025-03-15",
      description: "Rent Payment",
      category: "Housing",
      amount: -1200.0,
      type: "expense",
    },
    {
      id: 3,
      date: "2025-03-14",
      description: "Grocery Store",
      category: "Food",
      amount: -85.42,
      type: "expense",
    },
    {
      id: 4,
      date: "2025-03-13",
      description: "Freelance Work",
      category: "Income",
      amount: 350.0,
      type: "income",
    },
    {
      id: 5,
      date: "2025-03-12",
      description: "Gas Station",
      category: "Transportation",
      amount: -45.0,
      type: "expense",
    },
    {
      id: 6,
      date: "2025-03-11",
      description: "Movie Tickets",
      category: "Entertainment",
      amount: -32.5,
      type: "expense",
    },
    {
      id: 7,
      date: "2025-03-10",
      description: "Electric Bill",
      category: "Utilities",
      amount: -95.2,
      type: "expense",
    },
    {
      id: 8,
      date: "2025-03-09",
      description: "Dividend Payment",
      category: "Income",
      amount: 75.25,
      type: "income",
    },
  ];

  // Filter transactions based on search term, category, type, and date range
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || transaction.category === categoryFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    let matchesDateRange = true;
    if (dateRange.from && dateRange.to) {
      const transactionDate = parseISO(transaction.date);
      matchesDateRange =
        isAfter(transactionDate, dateRange.from) &&
        isBefore(transactionDate, dateRange.to);
    }

    return matchesSearch && matchesCategory && matchesType && matchesDateRange;
  });

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsAddingTransaction(true);
  };

  // Accept both string and number IDs
const handleDeleteTransaction = (id: string | number) => {
  // Convert to number if needed
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  alert(`Transaction ${numericId} would be deleted`);
};

  const handleViewDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const closeDetails = () => {
    setSelectedTransaction(null);
  };

  const closeTransactionForm = () => {
    setIsAddingTransaction(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => setIsAddingTransaction(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Transaction
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Transaction Filters</CardTitle>
          <CardDescription>
            Filter and search your transaction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange({
                        from: range?.from,
                        to: range?.to,
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
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
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          onClick={() => handleViewDetails(transaction)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell
                            className={`text-right font-medium ${
                              transaction.amount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "+" : ""}$
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
                                  handleDeleteTransaction(
                                    transaction.id.toString()
                                  );
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
                          No transactions found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </p>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
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
                    {filteredTransactions
                      .filter((t) => t.type === "income")
                      .map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          onClick={() => handleViewDetails(transaction)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            +${transaction.amount.toFixed(2)}
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
                                  handleDeleteTransaction(
                                    transaction.id.toString()
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
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
                    {filteredTransactions
                      .filter((t) => t.type === "expense")
                      .map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          onClick={() => handleViewDetails(transaction)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            -${Math.abs(transaction.amount).toFixed(2)}
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
                                  handleDeleteTransaction(
                                    transaction.id.toString()
                                  );
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Form Modal */}
      {isAddingTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedTransaction ? "Edit Transaction" : "Add New Transaction"}
            </h2>
            <TransactionForm
              transaction={selectedTransaction}
              onClose={closeTransactionForm}
            />
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && !isAddingTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg w-full max-w-md p-6">
            <TransactionDetails
              transaction={selectedTransaction}
              onClose={closeDetails}
              onEdit={handleEditTransaction}
              onDelete={(id) => handleDeleteTransaction(id.toString())} // Convert to string
            />
          </div>
        </div>
      )}
    </div>
  );
}
