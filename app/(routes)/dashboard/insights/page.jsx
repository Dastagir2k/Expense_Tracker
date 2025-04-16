




"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowDownIcon,
  ArrowUpIcon,
  BrainCircuit,
  CheckCircle2,
  IndianRupeeIcon,
  LightbulbIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  XCircle,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import DashboardSkeleton from "@/app/_components/loading/DashboardSkeleton";

export default function InsightsPage() {
  const [timeframe, setTimeframe] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [insightsData, setInsightsData] = useState(null);

  // Fetch insights data from the API
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoading(true);
    axios
      .get(`/api/ai_insights?userId=${userId}`)
      .then((response) => {
        setInsightsData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching insights data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !insightsData) {
    return <div><DashboardSkeleton/></div>; 
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight flex items-center">
            <BrainCircuit className="mr-2 h-6 w-6" />
            AI Insights
          </h2>
          <p className="text-muted-foreground">
            Smart analysis of your spending habits and personalized recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Insights Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex">
              <IndianRupeeIcon className="mt-1" />
              {insightsData.analysis.spendingPatterns.reduce((total, item) => total + item.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex">
              {insightsData.analysis.categoriesApproachingOrExceedingLimits[0]?.percentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {insightsData.analysis.categoriesApproachingOrExceedingLimits[0]?.notes}
            </p>
          </CardContent>
        </Card>

        < Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unusual Spending</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insightsData.analysis.unusualSpendingPatterns.length}</div>
            <p className="text-xs text-muted-foreground">Patterns detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <LightbulbIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insightsData.recommendations.length}</div>
            <p className="text-xs text-muted-foreground">Actionable insights available</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Insights Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="unusual">Unusual Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LightbulbIcon className="mr-2 h-5 w-5" />
                AI Summary
              </CardTitle>
              <CardDescription>Key insights about your spending habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {insightsData.analysis.unusualSpendingPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 rounded-full bg-black p-1">
                      <AlertCircle className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-sm">{pattern.description}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {insightsData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 rounded-full bg-black p-1 mt-0.5 shrink-0">
                        <CheckCircle2 className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-sm">{rec.details}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
              <CardDescription>Insights for each spending category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insightsData.analysis.spendingPatterns.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-medium">{category.category}</h3>
                    <p className="text-sm text-muted-foreground">Spent: <IndianRupeeIcon className="h-3 w-3 inline" /> {category.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insightsData.recommendations.map((rec, index) => (
                  < div key={index} className="space-y-3">
                    <h4 className="font-medium">{rec.item}</h4>
                    <p className="text-sm text-muted-foreground">{rec.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Unusual Activity Tab */}
        <TabsContent value="unusual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unusual Spending Activity</CardTitle>
              <CardDescription>Transactions that deviate from your normal spending patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {insightsData.analysis.unusualSpendingPatterns.map((pattern, index) => (
                <div key={index} className="rounded-md border p-4">
                  <h3 className="font-medium">{pattern.description}</h3>
                  <p className="text-sm text-muted-foreground">{pattern.recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}