import { connectMongo } from "@/lib/db";
import product from "@/app/schema/product";
import {  NextRequest,NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  await connectMongo();

  const data = await req.json();
  const id = req.nextUrl.pathname.split('/').pop();

  const updated = await product.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  await connectMongo();
  const id = req.nextUrl.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }
  const deleted = await product.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product deleted' });
}