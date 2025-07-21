import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    // Define the path to your local common_content.json file
    const filePath = path.join(process.cwd(), 'data_source', 'common_content.json');

    // Read the file
    const fileData = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    return NextResponse.json({
      data: jsonData, // returns { guidelines, terms, faq }
    });
  } catch (error) {
    console.error('Error reading common content JSON:', error);
    return NextResponse.json(
      { error: 'Failed to load common content' },
      { status: 500 }
    );
  }
}
