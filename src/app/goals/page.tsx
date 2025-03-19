import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import GoalList from "@/components/goals/goal-list"
import GoalForm from "@/components/goals/goal-form"
import GoalInsights from "@/components/goals/goal-insights"

export default function GoalsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Financial Goals</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Goals</CardTitle>
              <CardDescription>Track and manage your progress towards financial freedom</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set up a new financial target to work towards</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Goal Insights</CardTitle>
              <CardDescription>AI-powered recommendations for your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalInsights />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

