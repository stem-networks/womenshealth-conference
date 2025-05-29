// src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const fullPayload = {
      ...payload,
      cid: process.env.CID, // or use NEXT_PRIVATE_CID if not meant for frontend
    };

    const response = await axios.post(
      process.env.API_URL as string,
      fullPayload
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
  const err = error as Error;
  console.error("Server API error:", err.message || error);
  return NextResponse.json(
    { success: false, error: "Something went wrong. Please try again." },
    { status: 500 }
  );
}
}
