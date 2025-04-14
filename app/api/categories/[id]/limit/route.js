// app/api/categories/[id]/limit/route.js
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { limit } = await req.json();

  const updatedCategory = await prisma.category.update({
    where: { id: parseInt(params.id) },
    data: { limit },
  });

  return NextResponse.json(updatedCategory);
}
