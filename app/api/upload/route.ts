import path from 'path';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ path: `/uploads/${filename}` });
  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}