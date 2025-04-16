"use client"

import { use, useEffect, useState } from "react"
import { Plus, AlertTriangle, Trash2, IndianRupeeIcon } from "lucide-react"

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
import BudgetCardSkeleton from "@/app/_components/loading/BudgetCardSkeleton"


export default function BudgetPage() {
  // Initial default categories
  const [categories, setCategories] = useState([])
  const [userId, setUserId] = useState(null)
  // Add this near your other state declarations
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const userId = localStorage.getItem("userId")
    setUserId(userId)
    if (userId) {
      setIsLoading(true)
      axios.get(`/api/categories/?userId=${userId}`)
        .then((response) => {
          setCategories(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching categories:", error)
          setIsLoading(false)
        })
    }
  }, [])

  const [errorMessage, setErrorMessage] = useState(null);

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

 
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false)
  const [updatedLimit, setUpdatedLimit] = useState(0)
  const [selectedCategoryForUpdate, setSelectedCategoryForUpdate] = useState(null)

  // Calculate total spent for a category
  const calculateTotalSpent = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  // Add a new Expense to a category
  const handleAddExpense = () => {
    if (!selectedCategoryId || newExpense.amount <= 0 || newExpense.description.trim() === "") return

    setErrorMessage(null); // Reset error message

    try {
      axios.post("/api/expense", {
        amount: newExpense.amount,
        note: newExpense.description,
        categoryId: parseInt(selectedCategoryId),
        userId: parseInt(userId),
      }).then((response) => {
        
          setExpenseDialogOpen(false);
          setNewExpense({ amount: 0, description: "" });
          setCategories((prevCategories) =>
            prevCategories.map((category) => {
              if (category.id === selectedCategoryId) {
                return {
                  ...category,
                  expenses: [...category.expenses, response.data],
                };
              }
              return category;
            }
          ))
      }).catch((error) => {
        console.error("Error creating expense:", error);
        setErrorMessage("Failed to add expense. Please try again.");
      });
    } catch (error) {
      console.error("Error creating expense:", error);
      setErrorMessage("An unexpected error occurred.");
    }
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

  // Delete an Category
  const handleDeleteCategory = (id) => {
    // Send the delete request to the server\
    console.log(id);

    axios.delete(`/api/categories/${id}`)
      .then((response) => {
        console.log(response.data)
        setCategories(categories.filter((category) => category.id !== id))

      })
      .catch((error) => {
        console.error("Error deleting category:", error)
      })
  }

  // update the category limit
  const handleUpdateCategoryLimit = (id, newLimit) => {
    if (newLimit <= 0) return
    try {
      axios.put(`/api/categories/${id}/limit`, {
        limit: newLimit,
      })
        .then((response) => {
          console.log(response.data);

        }).catch((error) => {
          console.error("Error updating category limit:", error)
        })
    } catch (error) {
      console.error("Error updating category limit:", error)
    }
    const updatedCategories = categories.map((category) => {
      if (category.id === id) {
        return {
          ...category,
          limit: newLimit,
        }
      }
      return category
    })

    setCategories(updatedCategories)
  }

  //This helper function at the top of your component
  const getBudgetStatus = (percentUsed) => {
    if (percentUsed >= 100) {
      return {
        color: "bg-red-500",
        text: "text-red-500",
        message: "Over Budget",
        animate: "animate-pulse"
      }
    }
    if (percentUsed >= 80) {
      return {
        color: "bg-yellow-500",
        text: "text-yellow-500",
        message: "Approaching Limit"
      }
    }
    return {
      color: "bg-green-500",
      text: "text-green-500",
      message: "Within Budget"
    }
  }

  // Then replace your existing Progress and status section with this:



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
                  Limit <IndianRupeeIcon />
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
        {isLoading ? (
          <>
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
          </>
        ) :
          (categories.map((category) => {
            const totalSpent = calculateTotalSpent(category.expenses)
            const percentUsed = (totalSpent / category.limit) * 100
            const isOverBudget = totalSpent > category.limit

            return (
              <Card key={category.id} className={isOverBudget ? "border-red-400" : ""}>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription className="flex">Budget Limit: <IndianRupeeIcon className="text-sm font-medium" />{category.limit.toFixed(2)}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog
                        open={updateLimitDialogOpen && selectedCategoryForUpdate === category.id}
                        onOpenChange={(open) => {
                          setUpdateLimitDialogOpen(open)
                          if (open) {
                            setSelectedCategoryForUpdate(category.id)
                            setUpdatedLimit(category.limit)
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <span className="text-xs">Edit</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Budget Limit</DialogTitle>
                            <DialogDescription>Change the budget limit for {category.name}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="newLimit" className="text-right">
                                New Limit ($)
                              </Label>
                              <Input
                                id="newLimit"
                                type="number"
                                value={updatedLimit}
                                onChange={(e) => setUpdatedLimit(Number(e.target.value))}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => {
                              handleUpdateCategoryLimit(category.id, updatedLimit)
                              setUpdateLimitDialogOpen(false)
                            }}>
                              Update Limit
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the {category.name} category and all its associated expenses.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
               
                  <div className="space-y-2">
                    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full transition-all duration-300 rounded-full ${getBudgetStatus(percentUsed).color
                          } ${percentUsed >= 100 ? getBudgetStatus(percentUsed).animate : ""}`}
                        style={{ width: `${Math.min(percentUsed, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className={`flex items-center ${getBudgetStatus(percentUsed).text}`}>
                        {percentUsed >= 80 && <AlertTriangle className="h-4 w-4 mr-1" />}
                        <span>{getBudgetStatus(percentUsed).message}</span>
                      </div>
                      <span className="text-gray-500">
                        {percentUsed.toFixed(1)}%
                      </span>
                    </div>

                 
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
          }))
        }
      </div>
    </div>
  )
}