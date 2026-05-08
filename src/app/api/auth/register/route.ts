import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existUser = await User.findOne({
      email,
    });

    if (existUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Register Error: ${error}` }, { status: 500 });
  }
}
