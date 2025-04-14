"use client"

import { use, useEffect, useState } from "react"
import { Plus, AlertTriangle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"

export default function BudgetPage() {
  // Initial default categories
  const [categories, setCategories] = useState([])
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    // Fetch categories from the server or local storage if needed
    const userId=localStorage.getItem("userId")
    setUserId(userId)
    if(userId){
      axios.get(`/api/categories/?userId=${userId}`)
        .then((response) => {
          setCategories(response.data)
          console.log(response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching categories:", error)
        })
    }
  }, [])

  // State for new category form
  const [newCategory, setNewCategory] = useState({
    name: "",
    limit: 0,
  })

  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    amount: 0,
    description: "",
  })

  // State to track which category we're adding an expense to
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  // State for dialogs
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)

  // Calculate total spent for a category
  const calculateTotalSpent = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.name.trim() === "" || newCategory.limit <= 0) return

    const newCategoryItem = {
      id: Date.now().toString(),
      name: newCategory.name,
      limit: newCategory.limit,
      expenses: [],
    }

    // Send the new category to the server
    axios.post("/api/categories", {
      name: newCategory.name,
      limit: newCategory.limit,
      userId: parseInt(userId),
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error("Error creating category:", error)
    })

    setCategories([...categories, newCategoryItem])
    setNewCategory({ name: "", limit: 0 })
    setCategoryDialogOpen(false)
  }

  // Add a new expense to a category
  const handleAddExpense = () => {
    if (!selectedCategoryId || newExpense.amount <= 0 || newExpense.description.trim() === "") return

    const newExpenseItem = {
      id: Date.now().toString(),
      amount: newExpense.amount,
      description: newExpense.description,
      date: new Date(),
    }

    const updatedCategories = categories.map((category) => {
      if (category.id === selectedCategoryId) {
        return {
          ...category,
          expenses: [...category.expenses, newExpenseItem],
        }
      }
      return category
    })

    setCategories(updatedCategories)
    setNewExpense({ amount: 0, description: "" })
    setExpenseDialogOpen(false)
  }

  // Delete a category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budget</h1>
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget Category</DialogTitle>
              <DialogDescription>Add a new category to track your expenses.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="limit" className="text-right">
                  Limit ($)
                </Label>
                <Input
                  id="limit"
                  type="number"
                  value={newCategory.limit || ""}
                  onChange={(e) => setNewCategory({ ...newCategory, limit: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Create Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const totalSpent = calculateTotalSpent(category.expenses)
          const percentUsed = (totalSpent / category.limit) * 100
          const isOverBudget = totalSpent > category.limit

          return (
            <Card key={category.id} className={isOverBudget ? "border-red-400" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>Budget Limit: ${category.limit.toFixed(2)}</CardDescription>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will delete the "{category.name}" budget category and all its expenses.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Spent: ${totalSpent.toFixed(2)}</span>
                    <span className="text-sm font-medium">Remaining: ${(category.limit - totalSpent).toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Progress value={Math.min(percentUsed, 100)} className={isOverBudget ? "bg-red-200" : ""} />
                    {isOverBudget && (
                      <div className="flex items-center text-red-500 text-sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        <span>Over budget by ${(totalSpent - category.limit).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  {category.expenses.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Recent Expenses</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {category.expenses.slice(-3).map((expense) => (
                          <div key={expense.id} className="flex justify-between text-sm p-2 bg-muted rounded-md">
                            <span>{expense.description}</span>
                            <span className="font-medium">${expense.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog
                  open={expenseDialogOpen && selectedCategoryId === category.id}
                  onOpenChange={(open) => {
                    setExpenseDialogOpen(open)
                    if (open) setSelectedCategoryId(category.id)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Expense to {category.name}</DialogTitle>
                      <DialogDescription>Record a new expense for this category.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                          Amount ($)
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          value={newExpense.amount || ""}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddExpense}>Add Expense</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}