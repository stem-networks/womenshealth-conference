// app/api/payment-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { web_token } = await req.json();

    if (!web_token) {
      return NextResponse.json({ error: "Missing web_token" }, { status: 400 });
    }

    const paymentCheckData = {
      module_name: "payment_check",
      keys: { data: [{ web_token }] },
      cid: process.env.CID, // ✅ Secure, not exposed to client
    };

    const apiRes = await axios.post(
      process.env.API_URL || "",
      paymentCheckData
    );

    return NextResponse.json(apiRes.data);
  } catch (error: unknown) {
    console.error("API error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
