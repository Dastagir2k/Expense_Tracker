import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId') || '0');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const categories = await prisma.category.findMany({
    where: { userId },
    include: {
      expenses: true,
    },
  });

  let totalSpent = 0;
  let totalLimit = 0;

  const categorySummaries = categories.map((category) => {
    const spent = category.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalSpent += spent;
    totalLimit += category.limit;

    return {
      id: category.id,
      name: category.name,
      limit: category.limit,
      totalSpent: spent,
    };
  });

  return NextResponse.json({
    userId,
    totalSpent,
    totalLimit,
    numberOfBudgets: categories.length,
    categories: categorySummaries,
  });
}
