import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; 
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    
    // Add debug logging
    console.log('Login attempt:', { email });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}