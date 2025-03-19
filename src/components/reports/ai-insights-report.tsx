import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"

export default function AiInsightsReport() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Spending Alert</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Your entertainment spending has increased by 24% compared to last month. This is significantly higher
                than your historical average of 8% growth in this category.
              </p>
            </div>
            <div className="mt-2">
              <div className="-mx-2 -my-1.5 flex">
                <button className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Savings Achievement</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Congratulations! Your savings rate of 39.3% this month is your highest in the past 12 months. You're
                making excellent progress toward your financial goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personalized Recommendations</h3>

        <Card className="p-4 border-l-4 border-blue-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">Optimize Subscription Services</h4>
              <p className="mt-1 text-sm text-gray-600">
                We've identified 3 subscription services with overlapping features. Consolidating these could save you
                approximately $45 per month.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-blue-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">Increase Retirement Contributions</h4>
              <p className="mt-1 text-sm text-gray-600">
                Based on your current savings rate and income, you could increase your retirement contributions by 2%
                without significantly impacting your monthly budget.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-blue-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium">Refinance Opportunity</h4>
              <p className="mt-1 text-sm text-gray-600">
                Current interest rates suggest you might benefit from refinancing your student loans. This could
                potentially save you $2,400 over the remaining loan term.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Monthly Financial Summary</h3>
        <p className="text-sm text-blue-700">
          March was a strong month for your finances. Your income increased slightly while you maintained good expense
          control in most categories. Your emergency fund is now 65% funded, and you're on track to reach your vacation
          savings goal by July. The increase in entertainment spending is the main area to monitor going forward.
        </p>
      </div>
    </div>
  )
}

