// app/api/update-payment/route.ts
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectName, web_token, payment } = await req.json();

    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json({ success: false, error: "Missing projectName" }, { status: 400 });
    }
    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json({ success: false, error: "Missing web_token" }, { status: 400 });
    }
    if (!payment || typeof payment !== "object") {
      return NextResponse.json({ success: false, error: "Missing payment data" }, { status: 400 });
    }
    if (!process.env.BLOB_BASE_URL) {
      return NextResponse.json({ success: false, error: "Missing BLOB_BASE_URL env var" }, { status: 500 });
    }

    // Build direct blob URL
    const BLOB_URL = `${process.env.BLOB_BASE_URL}/${projectName}/registration/${web_token}.json`;

    // Fetch the existing file
    const res = await fetch(BLOB_URL);
    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    const existingData = await res.json();

    // Update payment object only
    existingData.payment = {
      ...existingData.payment,
      ...payment
    };

    // Save back to blob
    await put(
      `${projectName}/registration/${web_token}.json`,
      JSON.stringify(existingData, null, 2),
      { access: "public", contentType: "application/json" }
    );

    return NextResponse.json({ success: true, message: "Payment updated successfully" });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
