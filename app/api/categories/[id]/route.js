import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, limit } = body;
  const id = await params.id;

  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name, limit },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE(req, { params }) {
  const id = await params.id;
  console.log('Deleting category with ID:', id);
  
  try {
    // First delete all related expenses
    await prisma.expense.deleteMany({
      where: { categoryId: parseInt(id) },
    });

    // Then delete the category
    const deletedCategory = await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Category deleted', deletedCategory });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}