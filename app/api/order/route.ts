import { NextRequest, NextResponse } from 'next/server';
import { connectMongo } from "@/lib/db";
import order from '@/app/schema/order';

export async function POST(req: NextRequest) {
  await connectMongo();
  const body = await req.json();

  try {
    const newOrder = await order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Order creation failed', error: err }, { status: 400 });
  }
}