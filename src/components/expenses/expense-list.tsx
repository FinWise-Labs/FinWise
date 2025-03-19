"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2 } from "lucide-react"

export default function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Sample expense data
  const expenses = [
    {
      id: 1,
      date: "2025-03-15",
      description: "Rent Payment",
      category: "Housing",
      amount: 1200,
    },
    {
      id: 2,
      date: "2025-03-14",
      description: "Grocery Store",
      category: "Food",
      amount: 85.42,
    },
    {
      id: 3,
      date: "2025-03-13",
      description: "Gas Station",
      category: "Transportation",
      amount: 45.0,
    },
    {
      id: 4,
      date: "2025-03-12",
      description: "Movie Tickets",
      category: "Entertainment",
      amount: 32.5,
    },
    {
      id: 5,
      date: "2025-03-11",
      description: "Electric Bill",
      category: "Utilities",
      amount: 95.2,
    },
    {
      id: 6,
      date: "2025-03-10",
      description: "Internet Bill",
      category: "Utilities",
      amount: 65.0,
    },
    {
      id: 7,
      date: "2025-03-09",
      description: "Restaurant Dinner",
      category: "Food",
      amount: 78.35,
    },
    {
      id: 8,
      date: "2025-03-08",
      description: "Clothing Store",
      category: "Shopping",
      amount: 120.75,
    },
  ]

  // Filter expenses based on search term and category
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(expenses.map((expense) => expense.category))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-1/2"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="sm:w-1/2">
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
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No expenses found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

