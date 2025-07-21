import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data_source', 'register_page_data.json');
    const fileData = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Error reading register_page_data.json:', error);
    return NextResponse.json(
      { error: 'Failed to load registration page data' },
      { status: 500 }
    );
  }
}
