// app/api/payment/confirm/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      payment_ref_id,
      web_token,
      payment_method,
      status,
      total_price,
      other_info,
      discount_amt,
    } = body;

    const payload = {
      module_name: "payment",
      keys: {
        data: [
          {
            payment_ref_id,
            web_token,
            payment_method,
            status,
            total_price,
            other_info,
            discount_amt,
          },
        ],
      },
      cid: process.env.CID, // Secure: not exposed to client
    };

    const apiUrl = process.env.API_URL; // e.g. https://example.com/api/save

    const res = await fetch(apiUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to save payment: ${result.message}`);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("[API] Payment Confirm Error:", err);
    return NextResponse.json({ success: false, error: "Payment save failed." }, { status: 500 });
  }
}
