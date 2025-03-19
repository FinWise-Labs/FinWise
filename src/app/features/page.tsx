import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, BarChart3, PiggyBank, MessageSquare, Shield, Bell, Users } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">FinWise Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover all the powerful tools and features that make FinWise the ultimate financial companion for your
          journey to financial wellness.
        </p>
      </div>

      {/* Feature Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCategory
          icon={<BarChart3 className="h-8 w-8 text-primary" />}
          title="Financial Tracking"
          description="Comprehensive tools to track your income, expenses, and overall financial health."
        />
        <FeatureCategory
          icon={<PiggyBank className="h-8 w-8 text-primary" />}
          title="Goal Setting"
          description="Set and track financial goals with visual progress indicators and smart recommendations."
        />
        <FeatureCategory
          icon={<MessageSquare className="h-8 w-8 text-primary" />}
          title="AI-Powered Advice"
          description="Get personalized financial recommendations from our advanced AI advisor."
        />
        <FeatureCategory
          icon={<Bell className="h-8 w-8 text-primary" />}
          title="Smart Alerts"
          description="Receive timely notifications about your finances to stay on track and avoid issues."
        />
        <FeatureCategory
          icon={<Shield className="h-8 w-8 text-primary" />}
          title="Security & Privacy"
          description="Bank-level security to keep your financial data safe and private at all times."
        />
        <FeatureCategory
          icon={<Users className="h-8 w-8 text-primary" />}
          title="Family Sharing"
          description="Coordinate finances with family members while maintaining privacy for personal transactions."
        />
      </div>

      {/* Detailed Features */}
      <div className="space-y-24">
        {/* Financial Tracking */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Financial Tracking</h2>
              <p className="text-gray-600 mb-6">
                Keep track of every aspect of your finances with our comprehensive tracking tools. From daily expenses
                to long-term investments, FinWise gives you complete visibility into your financial life.
              </p>
              <div className="space-y-4">
                <FeatureItem text="Track unlimited transactions across all your accounts" />
                <FeatureItem text="Automatically categorize expenses for better insights" />
                <FeatureItem text="Monitor income sources and spending patterns" />
                <FeatureItem text="Generate detailed financial reports" />
                <FeatureItem text="Sync with your bank accounts for real-time updates" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Financial Tracking Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Goal Setting */}
        <section>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Goal Setting</h2>
              <p className="text-gray-600 mb-6">
                Set meaningful financial goals and track your progress with visual indicators. Whether you're saving for
                a vacation, a home, or retirement, FinWise helps you stay on track and reach your goals faster.
              </p>
              <div className="space-y-4">
                <FeatureItem text="Create unlimited financial goals with custom timelines" />
                <FeatureItem text="Track progress with visual indicators and milestone celebrations" />
                <FeatureItem text="Receive AI-powered suggestions to reach goals faster" />
                <FeatureItem text="Adjust goals as your financial situation changes" />
                <FeatureItem text="Set recurring contributions to automate your progress" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Goal Setting Interface"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* AI-Powered Advice */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">AI-Powered Advice</h2>
              <p className="text-gray-600 mb-6">
                Get personalized financial recommendations from our advanced AI advisor. Our system analyzes your
                spending patterns, income, and goals to provide tailored advice that helps you make better financial
                decisions.
              </p>
              <div className="space-y-4">
                <FeatureItem text="Chat with our AI financial advisor anytime" />
                <FeatureItem text="Receive personalized budget optimization suggestions" />
                <FeatureItem text="Get investment recommendations based on your risk profile" />
                <FeatureItem text="Learn about saving opportunities specific to your spending habits" />
                <FeatureItem text="Access educational content tailored to your financial situation" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="AI Advisor Interface"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Smart Alerts */}
        <section>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Smart Alerts</h2>
              <p className="text-gray-600 mb-6">
                Stay informed with intelligent notifications about your financial life. FinWise monitors your accounts
                and spending patterns to alert you about important events, potential issues, and opportunities.
              </p>
              <div className="space-y-4">
                <FeatureItem text="Get notified when you're approaching budget limits" />
                <FeatureItem text="Receive alerts about unusual spending patterns" />
                <FeatureItem text="Stay updated on bill due dates and payment confirmations" />
                <FeatureItem text="Celebrate when you reach financial milestones" />
                <FeatureItem text="Get security alerts for suspicious account activity" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Smart Alerts Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Security & Privacy */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Security & Privacy</h2>
              <p className="text-gray-600 mb-6">
                Your financial data deserves the highest level of protection. FinWise employs bank-level security
                measures to ensure your information remains safe and private at all times.
              </p>
              <div className="space-y-4">
                <FeatureItem text="256-bit encryption for all your financial data" />
                <FeatureItem text="Two-factor authentication for account access" />
                <FeatureItem text="Secure API connections to financial institutions" />
                <FeatureItem text="Privacy controls to manage what data is shared" />
                <FeatureItem text="Regular security audits and compliance checks" />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Security Features"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

interface FeatureCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Define the types for FeatureItem props
interface FeatureItemProps {
  text: string;
}

function FeatureCategory({ icon, title, description }: FeatureCategoryProps) {
  return (
    <Card className="h-full hover:shadow-md transition">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 p-2 bg-primary/10 rounded-lg w-fit">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function FeatureItem({ text }: FeatureItemProps) {
  return (
    <div className="flex items-start">
      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  )
}

