// // src/app/api/paypal/capture-order/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import axios, { AxiosError } from 'axios';

// export async function POST(req: NextRequest) {
//   try {
//     const { orderID } = await req.json();
//     // console.log('📥 Received orderID:', orderID);

//     const PAYPAL_API_BASE = process.env.PAYPAL_ENV === 'live'
//       ? 'https://api-m.paypal.com'
//       : 'https://api-m.sandbox.paypal.com';

//     // Step 1: Get OAuth2 access token
//     const authResponse = await axios.post(
//       `${PAYPAL_API_BASE}/v1/oauth2/token`,
//       'grant_type=client_credentials',
//       {
//         auth: {
//           username: process.env.PAYPAL_CLIENT_ID!,
//           password: process.env.PAYPAL_CLIENT_SECRET!,
//         },
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     const accessToken = authResponse.data.access_token;
//     // console.log('🔐 PayPal Access Token:', accessToken);

//     // Step 2: Capture order
//     const captureResponse = await axios.post(
//       `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // console.log('✅ PayPal capture response:', captureResponse.data);
//     return NextResponse.json(captureResponse.data);
//   } catch (error) {
//     const err = error as AxiosError;
//     console.error('❌ Error in capture-order:', err.response?.data || err.message);

//     return NextResponse.json(
//       { error: 'Failed to capture order', details: err.response?.data || err.message },
//       { status: 500 }
//     );
//   }
// }

// app/api/paypal/capture-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json();

    const PAYPAL_API_BASE =
      process.env.PAYPAL_ENV === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Step 1: Get OAuth2 access token
    const authResponse = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID!,
          password: process.env.PAYPAL_CLIENT_SECRET!,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = authResponse.data.access_token;

    // Step 2: Capture order
    const captureResponse = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(captureResponse.data);
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error in capture-order:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to capture order" },
      { status: 500 }
    );
  }
}
