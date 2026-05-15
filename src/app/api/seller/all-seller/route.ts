import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const search = searchParams.get('search') || '';

    const status = searchParams.get('status');
    const shopType = searchParams.get('shopType');

    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    let query: any = { role: 'seller' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { shopName: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) query.verificationStatus = status;
    if (shopType) query.shopType = shopType;

    const [sellers, totalSellers] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ [sortBy]: sortOrder as any })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        sellers,
        pagination: {
          totalSellers,
          totalPages: Math.ceil(totalSellers / limit),
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('GET_SELLERS_ERROR:', error);
    return NextResponse.json(
      { message: `Failed to fetch sellers: ${error.message}` },
      { status: 500 }
    );
  }
}
