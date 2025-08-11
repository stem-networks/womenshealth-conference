// app/api/update-payment/route.ts
import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectName, web_token, payment } = await req.json();

    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing projectName" },
        { status: 400 }
      );
    }
    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing web_token" },
        { status: 400 }
      );
    }
    if (!payment || typeof payment !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing payment data" },
        { status: 400 }
      );
    }

    const filePath = `${projectName}/registration/${web_token}.json`;

    // Find the blob
    const blobs = await list({ prefix: filePath });
    if (!blobs.blobs.length) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    // Public URL of the blob
    const fileUrl = blobs.blobs[0].url;

    // Fetch and parse JSON
    const res = await fetch(fileUrl);
    const existingData = await res.json();

    // Update payment field
    existingData.payment = {
      ...existingData.payment,
      ...payment,
    };

    // Save back to blob storage
    await put(filePath, JSON.stringify(existingData, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
    });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
