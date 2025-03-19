"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PricingPage() {
  const [frequency, setFrequency] = useState("monthly")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that fits your financial journey. All plans include our core features with no hidden fees.
        </p>
      </div>

      <Tabs defaultValue="monthly" value={frequency} onValueChange={setFrequency} className="w-full max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly Billing <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$0"
              description="Perfect for getting started"
              features={[
                { text: "Expense & Income Tracking", included: true },
                { text: "Basic Budget Tools", included: true },
                { text: "Up to 3 Financial Goals", included: true },
                { text: "Monthly Financial Report", included: true },
                { text: "AI-Powered Insights", included: false },
                { text: "Smart Budget Optimization", included: false },
                { text: "Unlimited Financial Goals", included: false },
                { text: "Priority Support", included: false },
              ]}
              buttonText="Get Started Free"
              buttonVariant="outline"
              mostPopular={false}
            />
            <PricingCard
              title="Premium"
              price="$9.99"
              period="per month"
              description="Most popular for individuals"
              features={[
                { text: "Expense & Income Tracking", included: true },
                { text: "Advanced Budget Tools", included: true },
                { text: "Unlimited Financial Goals", included: true },
                { text: "Weekly Financial Reports", included: true },
                { text: "AI-Powered Insights", included: true, new: true },
                { text: "Smart Budget Optimization", included: true },
                { text: "Custom Categories & Tags", included: true },
                { text: "Priority Support", included: true },
              ]}
              buttonText="Start 14-Day Free Trial"
              buttonVariant="default"
              mostPopular={true}
            />
            <PricingCard
              title="Family"
              price="$19.99"
              period="per month"
              description="Best for households"
              features={[
                { text: "Everything in Premium", included: true },
                { text: "Up to 5 User Accounts", included: true },
                { text: "Family Budget Coordination", included: true },
                { text: "Shared Financial Goals", included: true },
                { text: "Household Expense Analytics", included: true },
                { text: "Advanced Financial Planning", included: true },
                { text: "Bill Splitting Features", included: true, new: true },
                { text: "Dedicated Support Agent", included: true },
              ]}
              buttonText="Start 14-Day Free Trial"
              buttonVariant="outline"
              mostPopular={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$0"
              description="Perfect for getting started"
              features={[
                { text: "Expense & Income Tracking", included: true },
                { text: "Basic Budget Tools", included: true },
                { text: "Up to 3 Financial Goals", included: true },
                { text: "Monthly Financial Report", included: true },
                { text: "AI-Powered Insights", included: false },
                { text: "Smart Budget Optimization", included: false },
                { text: "Unlimited Financial Goals", included: false },
                { text: "Priority Support", included: false },
              ]}
              buttonText="Get Started Free"
              buttonVariant="outline"
              mostPopular={false}
            />
            <PricingCard
              title="Premium"
              price="$95.88"
              period="per year"
              description="Most popular for individuals"
              features={[
                { text: "Expense & Income Tracking", included: true },
                { text: "Advanced Budget Tools", included: true },
                { text: "Unlimited Financial Goals", included: true },
                { text: "Weekly Financial Reports", included: true },
                { text: "AI-Powered Insights", included: true, new: true },
                { text: "Smart Budget Optimization", included: true },
                { text: "Custom Categories & Tags", included: true },
                { text: "Priority Support", included: true },
              ]}
              buttonText="Start 14-Day Free Trial"
              buttonVariant="default"
              mostPopular={true}
              savings="Save $23.97 per year"
            />
            <PricingCard
              title="Family"
              price="$191.88"
              period="per year"
              description="Best for households"
              features={[
                { text: "Everything in Premium", included: true },
                { text: "Up to 5 User Accounts", included: true },
                { text: "Family Budget Coordination", included: true },
                { text: "Shared Financial Goals", included: true },
                { text: "Household Expense Analytics", included: true },
                { text: "Advanced Financial Planning", included: true },
                { text: "Bill Splitting Features", included: true, new: true },
                { text: "Dedicated Support Agent", included: true },
              ]}
              buttonText="Start 14-Day Free Trial"
              buttonVariant="outline"
              mostPopular={false}
              savings="Save $47.88 per year"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <FaqItem
            question="Can I switch plans later?"
            answer="Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. If you downgrade, the change will take effect at the start of your next billing cycle."
          />
          <FaqItem
            question="Is there a limit to how many transactions I can track?"
            answer="No, all plans allow for unlimited transaction tracking. The difference is in the additional features and capabilities available in each plan."
          />
          <FaqItem
            question="What happens after my free trial ends?"
            answer="After your 14-day free trial, you'll be automatically charged for the plan you selected. You can cancel anytime before the trial ends to avoid being charged."
          />
          <FaqItem
            question="Can I get a refund if I'm not satisfied?"
            answer="Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with FinWise within the first 30 days of your paid subscription, contact our support team for a full refund."
          />
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We offer custom enterprise plans for businesses and organizations with specific needs. Contact our sales team
          to discuss your requirements.
        </p>
        <Button size="lg">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  )
}

type Feature = {
  included: boolean;
  text: string;
  new?: boolean;
  tooltip?: string;
};

// Define allowed variants for the button
type ButtonVariant = "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | null;

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: Feature[];
  buttonText: string;
  buttonVariant: ButtonVariant; // Updated type
  mostPopular?: boolean;
  savings?: string;
}

function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonVariant = "link", // Default to "link"
  mostPopular = false,
  savings = "",
}: PricingCardProps) {
  return (
    <Card className={`relative h-full ${mostPopular ? "border-primary shadow-lg" : ""}`}>
      {mostPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge className="bg-primary text-white px-3 py-1">Most Popular</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-end mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-gray-500 ml-1">{period}</span>}
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
        {savings && (
          <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
            {savings}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 border border-gray-300 rounded-full mr-2 mt-0.5 flex-shrink-0" />
              )}
              <span className={feature.included ? "" : "text-gray-500"}>
                {feature.text}
                {feature.new && <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">New</Badge>}
              </span>
              {feature.tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-64">{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Define types for FAQ item props
interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
}