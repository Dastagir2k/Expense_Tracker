import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // 🌟 Add default categories for this user
  const defaultCategories = ['Food', 'Transport', 'Rent'];
  await Promise.all(
    defaultCategories.map(name =>
      prisma.category.create({
        data: {
          name,
          limit: 0, // set a default limit if needed
          userId: user.id,
        },
      })
    )
  );
  console.log('User created:', user);
  

  return NextResponse.json({ user });
}
