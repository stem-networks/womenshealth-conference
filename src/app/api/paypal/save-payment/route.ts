// src/app/api/paypal/save-payment/route.ts
import { AxiosError } from "axios";

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { payment_ref_id, web_token, total_price, other_info } = body;

    if (!payment_ref_id || !web_token || !total_price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiRes = await axios.post(process.env.API_URL!, {
      module_name: "payment",
      keys: {
        data: [
          {
            payment_ref_id,
            web_token,
            payment_method: "PayPal",
            status: "success",
            total_price,
            other_info,
            discount_amt: 0,
          },
        ],
      },
      cid: process.env.CID!,
    });

    return NextResponse.json({ status: "success", apiResponse: apiRes.data });
  } catch (error) {
    const err = error as AxiosError;

    console.error(
      "❌ Error saving payment:",
      err.response?.data || err.message
    );

    return NextResponse.json(
      { error: "Failed to save payment" },
      { status: 500 }
    );
  }
}
