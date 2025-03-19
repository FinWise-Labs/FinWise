import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AiInsights() {
  const insights = [
    {
      id: 1,
      title: "Reduce dining out expenses",
      description:
        "You've spent 30% more on restaurants this month compared to your average. Consider cooking at home more often to save approximately $120 per month.",
    },
    {
      id: 2,
      title: "Savings opportunity detected",
      description:
        "Based on your spending patterns, you could increase your monthly savings by $250 by optimizing your subscription services.",
    },
    {
      id: 3,
      title: "Emergency fund progress",
      description:
        "At your current savings rate, you'll reach your emergency fund goal in 7 months. Increasing your monthly contribution by $100 would reduce this to 5 months.",
    },
  ]

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.id} className="bg-primary/5 p-4 rounded-lg">
          <h3 className="font-medium text-primary mb-1">{insight.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
        </div>
      ))}

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
        <div className="flex items-start">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Ask your AI Financial Advisor</h3>
            <p className="text-sm text-gray-600 mb-3">
              Get personalized financial advice based on your spending habits and goals.
            </p>
            <Link href="/advisor">
              <Button size="sm">Chat with Advisor</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

