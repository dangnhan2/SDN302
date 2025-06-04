import { connectMongo } from "@/lib/db";
import product from "../../schema/product";
import {  NextRequest,NextResponse } from 'next/server';

export async function GET(){
    await connectMongo();
    const products = await product.find();
    return Response.json(products);
}

export async function POST(req : NextRequest) {
  await connectMongo();
  const body = await req.json();

  const newProduct = new product(body);
  await newProduct.save();

  return NextResponse.json(newProduct, { status: 201 });
}