// src/app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    // Step 1: Get OAuth2 access token
    const authResponse = await axios.post(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID!,
          password: process.env.PAYPAL_CLIENT_SECRET!,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Step 2: Capture order
    const captureResponse = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(captureResponse.data);
  }  catch (error) {
  const err = error as AxiosError;

  console.error('Error in capture-order:', err.response?.data || err.message);
  return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
}
}
