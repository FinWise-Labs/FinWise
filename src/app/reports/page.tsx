"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, ArrowDown, ArrowUp, TrendingDown, TrendingUp, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import MonthlyExpenseChart from "@/components/reports/monthly-expense-chart"
import CategoryBreakdownChart from "@/components/reports/category-breakdown-chart"
import IncomeVsExpenseChart from "@/components/reports/income-vs-expense-chart"
import SavingsRateChart from "@/components/reports/savings-rate-chart"
import AiInsightsReport from "@/components/reports/ai-insights-report"

export default function ReportsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [reportPeriod, setReportPeriod] = useState("month")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Financial Reports</h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2025}
              />
            </PopoverContent>
          </Popover>

          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Total Income"
          value="$4,675.25"
          change="+5.2%"
          trend="up"
          icon={<ArrowUp className="h-5 w-5" />}
          description="vs. last month"
        />
        <SummaryCard
          title="Total Expenses"
          value="$2,840.00"
          change="-3.8%"
          trend="down"
          icon={<ArrowDown className="h-5 w-5" />}
          description="vs. last month"
        />
        <SummaryCard
          title="Net Savings"
          value="$1,835.25"
          change="+12.4%"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description="vs. last month"
        />
        <SummaryCard
          title="Savings Rate"
          value="39.3%"
          change="+7.1%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          description="vs. last month"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Expense Trend</CardTitle>
                <CardDescription>Your spending over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyExpenseChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Comparison of income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeVsExpenseChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown by Category</CardTitle>
              <CardDescription>Where your money went this month</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdownChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryBreakdownChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Expense Categories</CardTitle>
                <CardDescription>Your biggest spending areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Housing</span>
                      <span className="font-medium">$1,200.00</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "42%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">42% of total expenses</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Food</span>
                      <span className="font-medium">$450.00</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "16%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">16% of total expenses</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Utilities</span>
                      <span className="font-medium">$325.00</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "11%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">11% of total expenses</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Growth</CardTitle>
                <CardDescription>Month-over-month changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Entertainment</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                    <div className="flex items-center text-red-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">+24%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Transportation</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span className="font-medium">-12%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Shopping</p>
                      <p className="text-sm text-muted-foreground">vs. last month</p>
                    </div>
                    <div className="flex items-center text-red-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">+8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Income Sources</CardTitle>
              <CardDescription>Breakdown of your income streams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {/* Income sources chart would go here */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Salary</span>
                      <span className="font-medium">$4,250.00</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "91%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">91% of total income</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Freelance</span>
                      <span className="font-medium">$350.00</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "7%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">7% of total income</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Investments</span>
                      <span className="font-medium">$75.25</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "2%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">2% of total income</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Income Trend</CardTitle>
              <CardDescription>Your income over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {/* Income trend chart would go here */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Income trend visualization would appear here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings Rate</CardTitle>
                <CardDescription>Percentage of income saved over time</CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsRateChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>Progress towards your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Emergency Fund</span>
                      <span>$6,500 / $10,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">65% complete</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Vacation to Europe</span>
                      <span>$2,750 / $5,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "55%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">55% complete</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">New Car</span>
                      <span>$8,000 / $25,000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "32%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">32% complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Net Worth Growth</CardTitle>
              <CardDescription>Your financial growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {/* Net worth chart would go here */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Net worth visualization would appear here
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Financial Insights</CardTitle>
              <CardDescription>Personalized analysis of your financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <AiInsightsReport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number; // Assuming value can be a string or number
  change: string; // You can adjust this type if change is more specific
  trend: "up" | "down"; // Trend can only be "up" or "down"
  icon: ReactNode; // Assuming icon is a React component or element
  description: string;
}

function SummaryCard({
  title,
  value,
  change,
  trend,
  icon,
  description,
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div
            className={`p-2 rounded-full ${trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            {icon}
          </div>
        </div>
        <div
          className={`flex items-center mt-4 text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
        >
          {change} {description}
        </div>
      </CardContent>
    </Card>
  );
}


