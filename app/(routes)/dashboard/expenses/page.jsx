"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Search, Trash2, IndianRupeeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ExpensesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`/api/categories?userId=${userId}`)
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error("Error fetching categories:", err));
    }
  }, []);

  const allExpenses = categories.flatMap(category => 
    category.expenses.map(expense => ({
      ...expense,
      categoryName: category.name
    }))
  );

  const filteredExpenses = allExpenses.filter(expense => 
    (expense.note && expense.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (expense.categoryName && expense.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  const deleteExpense = async (id) => {
    try {
      await fetch(`/api/expense/${id}`, {
        method: 'DELETE',
      });
      const userId = localStorage.getItem("userId");
      const response = await fetch(`/api/categories?userId=${userId}`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-10 space-y-6 px-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">Manage and track all your expenses in one place.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>You have {filteredExpenses.length} recorded expenses.</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search expenses..." 
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {expense.categoryName}
                      </span>
                    </TableCell>
                    <TableCell>{expense.note}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className="flex items-center justify-end gap-1">
                        <IndianRupeeIcon className="h-4 w-4" />
                        {expense.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="flex justify-between items-center p-4">
          <Button 
            variant="outline" 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {currentPage > 3 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageClick(1)}
                >
                  1
                </Button>
                {currentPage > 4 && (
                  <span className="px-2 py-2">...</span>
                )}
              </>
            )}
            {getPageNumbers().map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 py-2">...</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageClick(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}