// app/api/categories/[id]/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const body = await req.json();
  const { name, limit } = body;

  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(params.id) },
    data: { name, limit },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE(req, { params }) {
  const deletedCategory = await prisma.category.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: 'Category deleted', deletedCategory });
}
