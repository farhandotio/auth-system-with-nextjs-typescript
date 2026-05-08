import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const admin = await User.findOne({ role: 'admin' });

    return NextResponse.json(
      {
        exists: !!admin,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Check admin: ${error}` }, { status: 500 });
  }
}
