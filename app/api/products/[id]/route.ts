import { connectMongo } from "@/lib/db";
import product from "@/app/schema/product";
import {  NextRequest,NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();

  const data = await req.json();

  const updated = await product.findByIdAndUpdate(params.id, data, { new: true });

  if (!updated) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongo();

  const deleted = await product.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product deleted' });
}