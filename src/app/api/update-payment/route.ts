// app/api/update-payment/route.ts
import { list, put } from "@vercel/blob";
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

    // Path to the blob
    const BLOB_PATH = `${projectName}/registration/${web_token}.json`;

    // Check if blob exists
    const files = await list();
    const existingFile = files.blobs.find(b => b.pathname === BLOB_PATH);
    if (!existingFile) {
      return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
    }

    // Fetch existing data
    const res = await fetch(existingFile.url);
    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Unable to fetch existing registration" }, { status: 500 });
    }
    const existingData = await res.json();

    // Update payment object only
    existingData.payment = {
      ...existingData.payment,
      ...payment
    };

    // Save back to blob (overwrite)
    await put(BLOB_PATH, JSON.stringify(existingData, null, 2), {
      access: "public",
      contentType: "application/json"
    });

    return NextResponse.json({ success: true, message: "Payment updated successfully" });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
