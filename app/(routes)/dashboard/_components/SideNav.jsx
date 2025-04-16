'use client'

import { Button } from '@/components/ui/button'
import { BrainCircuit, LayoutGrid, LogOutIcon, PiggyBank, ReceiptText } from 'lucide-react'
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
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function SideNav() {
  const router = useRouter()
  const path = usePathname()
  
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard"
    },
    {
      id: 2,
      name: "Budget",
      icon: PiggyBank,
      path: "/dashboard/budgets"
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses"
    },
    {
      id: 4,
      name: "Insights",
      icon: BrainCircuit,
      path: "/dashboard/insights"
    },
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Logout response:', response);
      
   
        localStorage.removeItem('user');
       window.location.href = '/login';
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='flex flex-col h-screen p-5 border-r shadow-sm'>
      {/* Logo Section */}
      <div className='flex items-center gap-2 mb-10'>
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          alt="logo"
        />
        <span className="text-xl font-bold">ExpenseTracker</span>
      </div>

      {/* Navigation Menu */}
      <div className='flex-1'>
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div className={`flex gap-2 items-center p-4 mb-2 rounded-lg transition-all
              ${path === menu.path 
                ? 'bg-blue-100 text-primary' 
                : 'text-gray-500 hover:bg-blue-50 hover:text-primary'
              }`}
            >
              <menu.icon className="w-5 h-5" />
              <span className="font-medium">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout Section */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 mt-auto"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout from your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SideNav