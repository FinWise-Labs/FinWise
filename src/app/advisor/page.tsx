import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ChatInterface from "@/components/advisor/chat-interface"

export default function AdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Financial Advisor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Chat with Your Financial Advisor</CardTitle>
              <CardDescription>
                Ask questions about your finances, get personalized advice, and learn how to achieve your financial
                goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
              <CardDescription>Not sure what to ask? Try these topics.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10">
                  How can I improve my savings rate?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10">
                  What's the best way to pay off my debt?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10">
                  How should I budget for an upcoming vacation?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10">
                  What investment options should I consider?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10">
                  How can I reduce my monthly expenses?
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>Based on your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">
                    Your dining out expenses have increased by 20% this month.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-medium text-green-800">
                    You're on track to reach your emergency fund goal by August.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-800">
                    Consider reviewing your subscription services to save $45/month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

