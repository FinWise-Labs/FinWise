"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatInterface from "@/components/advisor/chat-interface";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AdvisorPage() {
  const { user, isLoading, error } = useUser();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Error
          </h2>
          <p className="text-gray-600">Please try logging in again.</p>
        </div>
      </div>
    );
  }

  const userId = user?.sub;

  // Additional safety check for userId
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            User ID Missing
          </h2>
          <p className="text-gray-600">
            Unable to retrieve user identifier. Please try logging out and back
            in.
          </p>
          <a
            href="/api/auth/logout"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 mt-4 inline-block"
          >
            Log Out
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
        <div className="text-sm text-gray-600">
          Welcome, {user.name || user.email}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Chat with Your Financial Advisor</CardTitle>
              <CardDescription>
                Ask questions about your finances, get personalized advice, and
                learn how to achieve your financial goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <ChatInterface userId={userId} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
              <CardDescription>
                Not sure what to ask? Try these topics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10 transition-colors">
                  How can I improve my savings rate?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10 transition-colors">
                  What's the best way to pay off my debt?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10 transition-colors">
                  How should I budget for an upcoming vacation?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10 transition-colors">
                  What investment options should I consider?
                </li>
                <li className="p-2 bg-primary/5 rounded-md cursor-pointer hover:bg-primary/10 transition-colors">
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
                    Consider reviewing your subscription services to save
                    $45/month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
