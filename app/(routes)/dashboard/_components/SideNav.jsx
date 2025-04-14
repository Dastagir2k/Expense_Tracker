'use client'
import { LayoutGrid, PiggyBank, ReceiptCent, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {
  const menuList=[
    {
      id:1,
      name:"Dashboard",
      icon:LayoutGrid,
      path:"/dashboard"
    },
    {
      id:2,
      name:"Budget",
      icon:PiggyBank,
      path:"/dashboard/budgets"
    },
    {
      id:3,
      name:"Expenses",
      icon:ReceiptText,
      path:"/dashboard/expenses"
    }
  ]

  const path=usePathname()
  useEffect(()=>{
    console.log(path);
    
  })
  return (
    <div className='h-screen p-5 border shadow-xl'>

                  <Image
                  src="/logo.svg"
                  width={50}
                  height={50}
                  alt="logo"/>
                  <span className="text-xl font-bold">ExpenseTracker</span>
              <div>
                {menuList.map((menu,index)=>(
                  <Link href={menu.path} key={index}>
                  <h1 className={`flex gap-2 items-center text-gray-500 font-medium p-5 mt-10 cursor-pointer rounded-md
                  hover:text-primary hover:bg-blue-100
                  ${path==menu.path && 'text-primary bg-blue-100'}`}>
                    <menu.icon/>
                    {menu.name
                    }</h1>
                    </Link>
                ))}
              </div>
    </div>
  )
}

export default SideNav