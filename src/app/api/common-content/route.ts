import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const apiUrl = process.env.API_URL;
    const cid = process.env.CID;

    if (!apiUrl || !cid) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const response = await axios.post(apiUrl, {
      module_name: 'common_content',
      keys: { data: [] },
      cid: cid,
    });

    return NextResponse.json({
      faqs: response.data.data?.faq || [],
      // Add other common content fields as needed
    });
  } catch (error) {
    console.error('Error fetching common content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch common content' },
      { status: 500 }
    );
  }
}