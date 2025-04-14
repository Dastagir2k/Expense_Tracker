// app/api/expenses/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { amount, note, categoryId, userId } = body;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { expenses: true },
  });

  const totalSpent = category.expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (totalSpent + amount > category.limit) {
    return NextResponse.json(
      { message: 'Limit exceeded!' },
      { status: 400 }
    );
  }

  const expense = await prisma.expense.create({
    data: {
      amount,
      note,
      categoryId,
      userId,
    },
  });

  return NextResponse.json(expense);
}



  // Calculate total spent for each category
  export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get('userId'));

    const categories = await prisma.category.findMany({
      where: { userId: userId }, // replace with actual userId
      include: {
        expenses: true,
      },
    });
    
    // Calculate total spent for each category
    categories.forEach(category => {
      category.totalSpent = category.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    });
    console.log(categories);
    
    return NextResponse.json(categories);
  }

