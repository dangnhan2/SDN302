// import { NextRequest, NextResponse } from 'next/server';
// import order from '@/app/schema/order';
// import { connectMongo } from "@/lib/db";

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: { userId: string } }
// ) {
//   await connectMongo();

//   try {
//     const orders = await order.find({ userId: params.userId }).populate('items.productId');
//     return NextResponse.json(orders);
//   } catch (err) {
//     return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from '@/lib/db';
import Order from '@/app/schema/order';

export async function POST(req: NextRequest) {
  await connectMongo();

  const { userId } = await req.json();

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    console.error('Fetch order failed:', err);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}