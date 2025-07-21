import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data_source', 'index_page.json');
    const fileData = await readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    return NextResponse.json({
      oneliner: jsonData.oneliner,
      bannerContent: jsonData.banner_conent,
      sessions: jsonData.sessions,
      importantDates: jsonData.important_dates,
      venueImages: jsonData.venue_images || {},
    });
  } catch (error) {
    console.error('Error reading index_page.json:', error);
    return NextResponse.json(
      { error: 'Failed to load index page data' },
      { status: 500 }
    );
  }
}
