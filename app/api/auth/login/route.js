import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  return NextResponse.json(user);
}