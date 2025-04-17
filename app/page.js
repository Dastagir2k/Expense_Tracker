import Link from "next/link"
import Image from "next/image"
import { ChevronRight, PieChart, Bell, TrendingUp, Lightbulb, Sparkles, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Header from "./_components/Header"
import Main from "./_components/Main"
import Feature from "./_components/Feature"
import How_It_Works from "./_components/How_It_Works"


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header/>

      <main className="flex-1">
        {/* Hero Section */}
        <Main/>

        {/* Features Section */}
        <Feature/>
        {/* How It Works Section */}
        <How_It_Works/>
        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">FAQ</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently asked questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our expense tracker.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the live tracking feature work?</AccordionTrigger>
                  <AccordionContent>
                    Our live tracking feature connects securely to your bank accounts and credit cards to automatically
                    import and categorize transactions as they occur. You can also manually add cash expenses. The
                    system updates in real-time, giving you an up-to-the-minute view of your financial situation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do the spending limit notifications work?</AccordionTrigger>
                  <AccordionContent>
                    You can set custom spending limits for different categories (like dining, entertainment, or
                    shopping). When you approach 80% of your limit, you'll receive a gentle reminder. If you exceed your
                    limit, you'll get an immediate notification so you can adjust your spending accordingly. All
                    notification settings are customizable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What kind of motivational content does the app provide?</AccordionTrigger>
                  <AccordionContent>
                    Our app delivers personalized motivational quotes and financial wisdom based on your spending habits
                    and goals. You'll receive daily motivation, celebrate financial milestones, and get encouragement
                    when you're making progress toward your goals. The content adapts to your financial journey to keep
                    you inspired.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How does the AI feature help me save money?</AccordionTrigger>
                  <AccordionContent>
                    Our AI analyzes your spending patterns to identify opportunities for savings. It can detect
                    subscriptions you might not be using, suggest better times for major purchases, and recommend budget
                    adjustments based on your income and spending history. The AI gets smarter over time as it learns
                    your financial habits.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. We use bank-level 256-bit encryption to protect your data. We never store your bank
                    credentials, and all connections are made through secure third-party services. Your privacy is our
                    top priority, and we never sell your personal or financial data to third parties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I use the app if I have multiple bank accounts?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can connect multiple bank accounts, credit cards, and investment accounts from different
                    financial institutions. Our app will consolidate all your financial information in one place, giving
                    you a complete picture of your finances.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 py-12 md:px-6">
          
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
