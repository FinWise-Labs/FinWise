import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, DollarSign, LineChart, PiggyBank } from "lucide-react"
import Link from "next/link"
import ExpenseChart from "@/components/dashboard/expense-chart"
import RecentTransactions from "@/components/dashboard/recent-transactions"
import GoalProgress from "@/components/dashboard/goal-progress"
import BudgetOverview from "@/components/dashboard/budget-overview"
import AiInsights from "@/components/dashboard/ai-insights"

// Define the types for the SummaryCard props
interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "same";
  trendValue: string;
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Total Balance"
          value="$12,580.00"
          description="Across all accounts"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          trendValue="2.5%"
        />
        <SummaryCard
          title="Monthly Income"
          value="$4,250.00"
          description="This month"
          icon={<ArrowUp className="h-5 w-5" />}
          trend="same"
          trendValue="0%"
        />
        <SummaryCard
          title="Monthly Expenses"
          value="$2,840.00"
          description="This month"
          icon={<ArrowDown className="h-5 w-5" />}
          trend="down"
          trendValue="4.2%"
        />
        <SummaryCard
          title="Savings Rate"
          value="33.2%"
          description="Of monthly income"
          icon={<PiggyBank className="h-5 w-5" />}
          trend="up"
          trendValue="1.8%"
        />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Your spending by category for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
                <CardDescription>Track your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <GoalProgress />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Your monthly budget status</CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetOverview />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8">
                <Link href="/expenses" className="text-primary hover:underline">
                  View detailed expense tracking
                </Link>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track and manage your financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8">
                <Link href="/goals" className="text-primary hover:underline">
                  View all financial goals
                </Link>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Financial Insights</CardTitle>
              <CardDescription>Personalized recommendations based on your financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <AiInsights />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// SummaryCard component with explicit types
function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        </div>
        <div
          className={`flex items-center mt-4 text-xs font-medium ${
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
          }`}
        >
          {trend === "up" ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : trend === "down" ? (
            <ArrowDown className="h-3 w-3 mr-1" />
          ) : (
            <LineChart className="h-3 w-3 mr-1" />
          )}
          <span>{trendValue} from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}
