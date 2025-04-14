import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const body = await req.json();
  const { name, limit, userId } = body;

  const category = await prisma.category.create({
    data: { name, limit, userId },
  });

  return NextResponse.json(category);
}


// api/categories?userId=3
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId'));

  const categories = await prisma.category.findMany({
    where: { userId: userId }, // replace with actual userId
    include: {
      expenses: true,
    },
  });
  return NextResponse.json(categories);
}

  