import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export default function GoalInsights() {
  return (
    <div className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg">
        <div className="flex items-start mb-3">
          <TrendingUp className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <h3 className="font-medium">Emergency Fund Progress</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          At your current savings rate of $250/month, you'll reach your emergency fund goal in 14 months. Increasing
          your monthly contribution by $100 would reduce this to 10 months.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Adjust Contribution
        </Button>
      </div>

      <div className="bg-primary/5 p-4 rounded-lg">
        <div className="flex items-start mb-3">
          <TrendingUp className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <h3 className="font-medium">Vacation Fund Optimization</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Your Europe vacation goal is currently 55% funded. Based on your spending patterns, you could allocate an
          additional $75/month from entertainment expenses to reach your goal 2 months earlier.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          See Recommendation
        </Button>
      </div>

      <div className="bg-primary/5 p-4 rounded-lg">
        <div className="flex items-start mb-3">
          <TrendingUp className="h-5 w-5 text-primary mr-2 mt-0.5" />
          <h3 className="font-medium">Goal Prioritization</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          You're currently working on 6 financial goals simultaneously. Consider focusing on your 2-3 highest priority
          goals to make faster progress and achieve them sooner.
        </p>
        <Button variant="outline" size="sm" className="w-full">
          Prioritize Goals
        </Button>
      </div>

      <div className="mt-6">
        <Button variant="link" className="w-full flex items-center justify-center">
          Get personalized goal advice <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

