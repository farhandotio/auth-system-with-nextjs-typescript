import { auth } from '@/auth';
import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { shopName, shopAddress, shopType } = await req.json();

    if (!shopName || !shopAddress || !shopType) {
      return NextResponse.json(
        { message: 'All fields (Shop Name, Address, Type) are required.' },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: session.user.id, role: 'seller' },
      {
        $set: {
          shopName,
          shopAddress,
          shopType,
          requestedAt: new Date(),
          verificationStatus: 'pending',
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'Seller not found or you do not have permission.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Shop details updated successfully!', user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('SELLER_UPDATE_ERROR:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
