// app/api/get-registration-details/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { web_token } = body;

    if (!web_token) {
      return NextResponse.json({ error: 'Missing web_token' }, { status: 400 });
    }

    const postData = {
      module_name: 'registration_details',
      keys: {
        data: [{ web_token }],
      },
      cid: process.env.CID,
    };

    const externalResponse = await fetch(process.env.API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await externalResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
