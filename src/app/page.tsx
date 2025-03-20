import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  PiggyBank,
  Shield,
  CheckCircle,
  CreditCard,
  Smartphone,
  Users,
  Zap,
  TrendingUp,
  DollarSign,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import photo from "../../public/openart-image_dIIlBSI-_1742460828772_raw.jpg";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="animated-gradient-bg text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
                New: AI-Powered Insights
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                FinWise: Your Smart Financial Companion
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Take control of your finances with AI-powered insights and
                personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-white text-primary font-semibold hover:bg-gray-100 transition group"
                  >
                    Get Started{" "}
                    <ArrowRight className="ml-2 h-5 w-5 btn-icon-animate" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border border-white text-white font-semibold hover:bg-white/10 transition"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-30"></div>
                <Image
                  src={photo}
                  width={500}
                  height={500}
                  alt="Financial Dashboard Preview"
                  className="relative rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat-card">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Active Users
              </h3>
              <p className="text-3xl font-bold">250K+</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% growth</span>
              </div>
            </div>

            <div className="stat-card">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Money Managed
              </h3>
              <p className="text-3xl font-bold">$2.5B</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Across accounts</span>
              </div>
            </div>

            <div className="stat-card">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Goals Achieved
              </h3>
              <p className="text-3xl font-bold">1.2M</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Financial targets</span>
              </div>
            </div>

            <div className="stat-card">
              <h3 className="text-gray-500 text-sm font-medium mb-1">
                Avg. Savings
              </h3>
              <p className="text-3xl font-bold">+27%</p>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <LineChart className="h-4 w-4 mr-1" />
                <span>For our users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Key Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Powerful Tools for Your Finances
            </h2>
            <p className="text-gray-600 text-lg">
              FinWise combines powerful financial tools with AI technology to
              help you achieve your financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Expense & Income Tracking"
              description="Log daily transactions to monitor your financial health with intuitive visualizations."
            />
            <FeatureCard
              icon={<PiggyBank className="h-10 w-10" />}
              title="Goal Setting & Progress"
              description="Set financial goals and track your progress with motivating visual indicators."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10" />}
              title="AI Chatbot Advisor"
              description="Get personalized financial advice based on your unique spending habits."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Secure & Private"
              description="Your financial data is encrypted and protected with industry-leading security."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Getting started with FinWise is easy. Follow these simple steps to
              begin your journey to financial wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Connect Your Accounts"
              description="Securely link your financial accounts or manually enter your transactions."
            />
            <StepCard
              number={2}
              title="Set Your Goals"
              description="Define what you want to achieve, whether it's saving for a vacation or paying off debt."
            />
            <StepCard
              number={3}
              title="Get Personalized Insights"
              description="Receive AI-powered recommendations tailored to your spending habits and goals."
            />
          </div>

          <div className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-center mb-8 gradient-heading">
              The FinWise Difference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Smart Budget Optimization
                  </h4>
                  <p className="text-gray-600">
                    Our AI analyzes your spending patterns and suggests
                    adjustments to help you save more without sacrificing your
                    lifestyle.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Proactive Financial Alerts
                  </h4>
                  <p className="text-gray-600">
                    Receive timely notifications about unusual spending,
                    upcoming bills, and opportunities to save.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Comprehensive Financial Reports
                  </h4>
                  <p className="text-gray-600">
                    Get detailed monthly reports that break down your spending,
                    saving, and progress toward financial goals.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Personalized Learning Resources
                  </h4>
                  <p className="text-gray-600">
                    Access educational content tailored to your financial
                    situation and goals to improve your financial literacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              What Our Users Say
            </h2>
            <p className="text-gray-600 text-lg">
              Thousands of users have transformed their financial lives with
              FinWise. Here are some of their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="FinWise helped me pay off $15,000 in credit card debt in just 18 months. The personalized recommendations made all the difference."
              author="Sarah J."
              role="Teacher"
              image="/placeholder.svg?height=60&width=60"
            />
            <TestimonialCard
              quote="As a freelancer with irregular income, budgeting was always a challenge. FinWise's AI adapts to my income patterns and helps me stay on track."
              author="Michael T."
              role="Graphic Designer"
              image="/placeholder.svg?height=60&width=60"
            />
            <TestimonialCard
              quote="I've tried many financial apps, but FinWise is the only one that actually changed my spending habits. I'm saving 20% more each month!"
              author="Priya K."
              role="Software Engineer"
              image="/placeholder.svg?height=60&width=60"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section - New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the plan that fits your financial journey. All plans
              include our core features.
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="p-1">
                <TabsTrigger value="monthly" className="px-6 py-2">
                  Monthly Billing
                </TabsTrigger>
                <TabsTrigger value="yearly" className="px-6 py-2">
                  Yearly Billing{" "}
                  <Badge className="ml-2 bg-green-100 text-green-800">
                    Save 20%
                  </Badge>
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
                    "Expense & Income Tracking",
                    "Basic Budget Tools",
                    "Up to 3 Financial Goals",
                    "Monthly Financial Report",
                  ]}
                  buttonText="Get Started Free"
                  buttonVariant="outline"
                />
                <PricingCard
                  title="Premium"
                  price="$9.99"
                  description="Most popular for individuals"
                  features={[
                    "Everything in Basic",
                    "Unlimited Financial Goals",
                    "AI-Powered Insights",
                    "Smart Budget Optimization",
                    "Priority Support",
                  ]}
                  buttonText="Start 14-Day Free Trial"
                  buttonVariant="default"
                  highlighted={true}
                />
                <PricingCard
                  title="Family"
                  price="$19.99"
                  description="Best for households"
                  features={[
                    "Everything in Premium",
                    "Up to 5 User Accounts",
                    "Family Budget Coordination",
                    "Shared Financial Goals",
                    "Advanced Financial Planning",
                  ]}
                  buttonText="Start 14-Day Free Trial"
                  buttonVariant="outline"
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
                    "Expense & Income Tracking",
                    "Basic Budget Tools",
                    "Up to 3 Financial Goals",
                    "Monthly Financial Report",
                  ]}
                  buttonText="Get Started Free"
                  buttonVariant="outline"
                />
                <PricingCard
                  title="Premium"
                  price="$95.88"
                  period="per year"
                  description="Most popular for individuals"
                  features={[
                    "Everything in Basic",
                    "Unlimited Financial Goals",
                    "AI-Powered Insights",
                    "Smart Budget Optimization",
                    "Priority Support",
                  ]}
                  buttonText="Start 14-Day Free Trial"
                  buttonVariant="default"
                  highlighted={true}
                />
                <PricingCard
                  title="Family"
                  price="$191.88"
                  period="per year"
                  description="Best for households"
                  features={[
                    "Everything in Premium",
                    "Up to 5 User Accounts",
                    "Family Budget Coordination",
                    "Shared Financial Goals",
                    "Advanced Financial Planning",
                  ]}
                  buttonText="Start 14-Day Free Trial"
                  buttonVariant="outline"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Questions & Answers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Have questions about FinWise? Find answers to common questions
              below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FaqItem
              question="Is my financial data secure?"
              answer="Yes, we use bank-level 256-bit encryption to protect your data. We never store your bank credentials, and all connections are made through secure APIs."
            />
            <FaqItem
              question="How does the AI advisor work?"
              answer="Our AI analyzes your spending patterns, income, and financial goals to provide personalized recommendations. It learns from your habits to offer increasingly relevant advice over time."
            />
            <FaqItem
              question="Can I connect multiple bank accounts?"
              answer="You can connect as many financial accounts as you need, including checking, savings, credit cards, loans, and investment accounts."
            />
            <FaqItem
              question="Is there a mobile app available?"
              answer="Yes, FinWise is available on iOS and Android devices. You can download the app from the App Store or Google Play Store."
            />
            <FaqItem
              question="Can I cancel my subscription anytime?"
              answer="Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access until the end of your billing period."
            />
            <FaqItem
              question="How do I get help if I have questions?"
              answer="We offer support via email, chat, and our help center. Premium and Family plan subscribers also get priority support."
            />
          </div>
        </div>
      </section>

      {/* App Features Section - New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Cross-Platform
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Available on All Your Devices
            </h2>
            <p className="text-gray-600 text-lg">
              Access FinWise anytime, anywhere. Your financial data syncs
              seamlessly across all platforms.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-30"></div>
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="FinWise on multiple devices"
                  className="relative rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-start">
                <div className="feature-icon-container mr-4">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Mobile Apps</h4>
                  <p className="text-gray-600">
                    Native apps for iOS and Android with biometric
                    authentication for quick and secure access.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="feature-icon-container mr-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">
                    Real-time Notifications
                  </h4>
                  <p className="text-gray-600">
                    Get instant alerts about transactions, budget limits, and
                    financial opportunities.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="feature-icon-container mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Family Sharing</h4>
                  <p className="text-gray-600">
                    Coordinate finances with family members while maintaining
                    privacy for personal transactions.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="feature-icon-container mr-4">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Offline Mode</h4>
                  <p className="text-gray-600">
                    Add transactions even without internet connection - they'll
                    sync when you're back online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of users who have improved their financial health
            with FinWise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-primary font-semibold hover:bg-gray-100 transition group"
              >
                Start Your Free Trial{" "}
                <ArrowRight className="ml-2 h-5 w-5 btn-icon-animate" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border border-white text-white font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md card-hover">
      <div className="feature-icon-container inline-flex mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-md card-hover">
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  image,
}) => {
  return (
    <Card className="h-full card-hover">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <div className="text-4xl text-primary mb-4">"</div>
          <p className="text-gray-700 mb-6 italic">{quote}</p>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-30"></div>
            <img
              src={image || "/placeholder.svg"}
              alt={author}
              className="relative w-12 h-12 rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period = "per month",
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}) => {
  return (
    <Card
      className={`h-full card-hover ${
        highlighted ? "border-primary shadow-lg" : ""
      }`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-end mb-2">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex-grow mb-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="p-1 rounded-full bg-green-100 mr-2 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant={buttonVariant}
          className={`w-full ${highlighted ? "btn-gradient" : ""}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md card-hover">
      <h4 className="text-lg font-semibold mb-2">{question}</h4>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};
