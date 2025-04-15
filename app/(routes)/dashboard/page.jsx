"use client"

import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  IndianRupeeIcon,
  PieChartIcon,
  WalletIcon,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import DashboardSkeleton from "@/app/_components/loading/DashboardSkeleton"

// Colors for charts (Black and White Theme)
const COLORS = ["#000000", "#555555", "#AAAAAA", "#CCCCCC", "#EEEEEE", "#FFFFFF"]

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState({
    totalSpent: 0,
    totalLimit: 0,
    numberOfBudgets: 0,
    categories: [],
  })
  const [timeframe, setTimeframe] = useState("month")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    console.log("userId", userId);
    
    axios
      .get(`/api/expense/summary?userId=${userId}`)
      .then((response) => {
        setDashboardData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error)
      })
  }, [])

  // Calculate remaining budget
  const remainingBudget = dashboardData.totalLimit - dashboardData.totalSpent

  // Calculate percentage of total budget used
  const budgetUsedPercentage = (dashboardData.totalSpent / dashboardData.totalLimit) * 100

  // Prepare data for category comparison chart
  const categoryComparisonData = dashboardData.categories.map((category) => ({
    name: category.name,
    spent: category.totalSpent,
    limit: category.limit,
    remaining: category.limit - category.totalSpent,
  }))

  // Prepare data for spending distribution pie chart
  const spendingDistributionData = dashboardData.categories
    .filter((category) => category.totalSpent > 0)
    .map((category) => ({
      name: category.name,
      value: category.totalSpent,
    }))

  // If no spending, show a placeholder
  if (spendingDistributionData.length === 0) {
    spendingDistributionData.push({
      name: "No Expenses Yet",
      value: 1,
    })
  }

  // Find the category with highest spending
  const highestSpendingCategory = [...dashboardData.categories].sort((a, b) => b.totalSpent - a.totalSpent)[0]



  if (isLoading) {
    return <DashboardSkeleton />
  }
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Track and manage your expenses across all categories</p>
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
          <Button>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex py-2"><IndianRupeeIcon className="mt-1"/>{dashboardData.totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold py-2 flex"><IndianRupeeIcon className="mt-1"/>{remainingBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{budgetUsedPercentage.toFixed(1)}% of total budget used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Expense</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestSpendingCategory?.name || "N/A"}</div>
            <p className="text-xs text-muted-foreground flex">
              <IndianRupeeIcon size={20} className="font-bold"/>{highestSpendingCategory?.totalSpent?.toLocaleString() || 0} (
              {((highestSpendingCategory?.totalSpent / highestSpendingCategory?.limit) * 100 || 0).toFixed(1)}% of
              limit)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Categories</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.numberOfBudgets}</div>
            <p className="text-xs text-muted-foreground">Active budget categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="spending">Spending Distribution</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
  <Card>
    <CardHeader>
      <CardTitle>Budget vs. Spending by Category</CardTitle>
      <CardDescription>Compare your spending against budget limits for each category</CardDescription>
    </CardHeader>
    <CardContent className="pl-2">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip
              formatter={(value) => [
                <span className="flex items-center">
                  <IndianRupeeIcon className="h-4 w-4 mr-1" />
                  {value.toLocaleString()}
                </span>,
                undefined
              ]}
              labelFormatter={(label) => `Category: ${label}`}
              contentStyle={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            />
            <Legend wrapperStyle={{ color: "#000000" }} />
            <Bar dataKey="spent" name="Amount Spent" fill="#555555" />
            <Bar dataKey="limit" name="Budget Limit" fill="#AAAAAA" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
</TabsContent>

        {/* Spending Distribution Chart */}
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Distribution</CardTitle>
              <CardDescription>How your expenses are distributed across categories</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#888888"
                      dataKey="value"
                    >
                      {spendingDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Amount"]}
                      contentStyle={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                    />
                    <Legend wrapperStyle={{ color: "#000000" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed Breakdown of Expenses */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Details</CardTitle>
              <CardDescription>Detailed breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Limit</TableHead>
                    <TableHead>Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.categories.reverse().map((category, index) => (
                    <TableRow key={category.id || index}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{category.limit.toLocaleString()}</TableCell>
                      <TableCell>{(category.limit - category.totalSpent).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}