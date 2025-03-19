import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about FinWise. Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="mb-12">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is FinWise?</AccordionTrigger>
                    <AccordionContent>
                      FinWise is an AI-powered financial management platform that helps you track expenses, set and
                      achieve financial goals, and receive personalized financial advice. Our platform combines
                      intuitive tracking tools with advanced AI to provide insights and recommendations tailored to your
                      unique financial situation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How is FinWise different from other financial apps?</AccordionTrigger>
                    <AccordionContent>
                      FinWise stands out with its AI-powered financial advisor that provides personalized
                      recommendations based on your spending patterns and goals. Unlike other apps that simply track
                      expenses, FinWise actively helps you optimize your finances with smart alerts, budget
                      optimization, and tailored advice to help you reach your financial goals faster.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is FinWise available on mobile devices?</AccordionTrigger>
                    <AccordionContent>
                      Yes, FinWise is available on iOS and Android devices. You can download our mobile app from the App
                      Store or Google Play Store. Your data syncs seamlessly between all your devices, allowing you to
                      manage your finances anytime, anywhere.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do I need to connect my bank accounts?</AccordionTrigger>
                    <AccordionContent>
                      Connecting your bank accounts is optional but recommended for the best experience. FinWise can
                      automatically import and categorize your transactions, saving you time and ensuring your financial
                      data is always up-to-date. If you prefer, you can also manually enter transactions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I get started with FinWise?</AccordionTrigger>
                    <AccordionContent>
                      Getting started is easy! Simply sign up for an account, set up your profile, and you can begin
                      tracking your finances right away. For the best experience, we recommend connecting your financial
                      accounts and setting up your first financial goal. Our onboarding process will guide you through
                      each step.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      You can create an account by clicking the "Sign Up" button on our homepage. You can sign up using
                      your email address and creating a password, or you can use Google for a quicker signup process.
                      After creating your account, you'll be guided through a simple onboarding process to set up your
                      profile.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I change my email address or password?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can change your email address and password in your account settings. Go to your profile
                      page, click on the "Security" tab, and you'll find options to update your email address and
                      password. For security reasons, you'll need to verify your identity when making these changes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                    <AccordionContent>
                      If you wish to delete your account, go to your profile settings, scroll to the bottom, and click
                      on "Delete Account." You'll be asked to confirm this action. Please note that account deletion is
                      permanent and all your data will be removed from our systems in accordance with our data retention
                      policy.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I have multiple users on one account?</AccordionTrigger>
                    <AccordionContent>
                      Our Family plan allows up to 5 user accounts that can be linked together for household financial
                      management. Each user maintains their personal account with private transactions, while also
                      having access to shared household expenses and goals. This is perfect for families or partners who
                      want to manage finances together.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the AI financial advisor work?</AccordionTrigger>
                    <AccordionContent>
                      Our AI financial advisor analyzes your spending patterns, income, savings rate, and financial
                      goals to provide personalized recommendations. It learns from your habits over time to offer
                      increasingly relevant advice. You can interact with the advisor through our chat interface to ask
                      specific questions about your finances or get general financial advice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I set multiple financial goals?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can set multiple financial goals with different timelines and priorities. Our Basic plan
                      allows up to 3 goals, while Premium and Family plans offer unlimited goals. For each goal, you can
                      track progress, set up automatic contributions, and receive AI-powered suggestions to help you
                      reach your goals faster.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What types of reports does FinWise provide?</AccordionTrigger>
                    <AccordionContent>
                      FinWise provides a variety of financial reports, including monthly spending summaries, income vs.
                      expense comparisons, category breakdowns, savings rate tracking, and goal progress reports.
                      Premium and Family plans offer more detailed reports with weekly updates and advanced analytics on
                      spending patterns and financial health.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I customize expense categories?</AccordionTrigger>
                    <AccordionContent>
                      Yes, Premium and Family plan subscribers can create custom expense categories and tags to better
                      organize their transactions. This allows you to track spending in ways that are meaningful to your
                      specific financial situation. Basic plan users have access to our standard set of categories.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do smart alerts work?</AccordionTrigger>
                    <AccordionContent>
                      Smart alerts monitor your financial activity and notify you about important events such as
                      approaching budget limits, unusual spending patterns, bill due dates, goal milestones, and
                      potential security concerns. You can customize which alerts you receive and how you receive them
                      (email, push notifications, or in-app).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), as well
                      as PayPal. For annual subscriptions, we also offer payment via bank transfer. All payments are
                      processed securely through our payment providers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I change my subscription plan?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can upgrade or downgrade your subscription plan at any time from your account settings.
                      If you upgrade, the change takes effect immediately and you'll be charged the prorated difference
                      for the remainder of your billing cycle. If you downgrade, the change will take effect at the
                      start of your next billing cycle.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with FinWise
                      within the first 30 days of your paid subscription, contact our support team for a full refund.
                      After 30 days, refunds are provided on a case-by-case basis.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      You can cancel your subscription at any time from your account settings. Go to the "Billing"
                      section and click on "Cancel Subscription." Your subscription will remain active until the end of
                      your current billing period. After cancellation, your account will be downgraded to the Basic
                      plan.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take security very seriously. FinWise uses bank-level 256-bit encryption to protect your
                      data both in transit and at rest. We implement multiple layers of security, including secure API
                      connections to financial institutions, regular security audits, and compliance with industry
                      standards for financial data protection.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Does FinWise store my bank credentials?</AccordionTrigger>
                    <AccordionContent>
                      No, FinWise never stores your bank login credentials. When you connect your financial accounts, we
                      use secure third-party services like Plaid that use token-based authentication. This means we can
                      access your transaction data without ever seeing or storing your actual bank credentials.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does two-factor authentication work?</AccordionTrigger>
                    <AccordionContent>
                      Two-factor authentication adds an extra layer of security to your account. When enabled, you'll
                      need to provide a verification code in addition to your password when signing in. This code can be
                      delivered via SMS, email, or generated by an authenticator app. We strongly recommend enabling
                      this feature for maximum account security.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What happens if I detect unauthorized access to my account?</AccordionTrigger>
                    <AccordionContent>
                      If you suspect unauthorized access to your account, immediately change your password and contact
                      our support team. We'll help you secure your account, investigate the unauthorized access, and
                      take appropriate measures to protect your data. We also recommend reviewing your recent account
                      activity and enabling additional security features like two-factor authentication if you haven't
                      already.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What is your privacy policy?</AccordionTrigger>
                    <AccordionContent>
                      Our privacy policy outlines how we collect, use, and protect your personal and financial
                      information. We never sell your data to third parties and only use it to provide and improve our
                      services. You can review our complete privacy policy on our website. We're committed to
                      transparency and giving you control over your data.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is here to help. Contact us anytime and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/docs">Browse Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

