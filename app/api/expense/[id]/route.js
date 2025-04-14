// app/api/expenses/[id]/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const body = await req.json();
  const { amount, description, categoryId } = body;

  const updatedExpense = await prisma.expense.update({
    where: { id: parseInt(params.id) },
    data: { amount, description, categoryId },
  });

  return NextResponse.json(updatedExpense);
}

export async function DELETE(req, { params }) {
  const deletedExpense = await prisma.expense.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: 'Expense deleted', deletedExpense });
}
