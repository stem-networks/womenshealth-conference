// src/app/api/paypal/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { totalAmount, description } = await req.json();

    const PAYPAL_API_BASE = process.env.PAYPAL_ENV === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com';

    // Step 1: Get OAuth2 access token from PayPal
    const authResponse = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
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

    // Step 2: Create PayPal order
    const orderResponse = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalAmount,
            },
            description,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json({ orderID: orderResponse.data.id });
  } catch (error) {
    const err = error as AxiosError;

    console.error('Error in create-order:', err.response?.data || err.message);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
