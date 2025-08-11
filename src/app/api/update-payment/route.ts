// src/app/api/update-payment/route.ts
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectName,        // e.g. "diabetes-conference"
      web_token,          // e.g. "1754895912_29189"
      status,
      payment_method,
      payment_ref_id,
      total_price,
      other_info
    } = body;

    // Basic validation
    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json({ error: "Missing projectName" }, { status: 400 });
    }
    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json({ error: "Missing web_token" }, { status: 400 });
    }
    if (!process.env.BLOB_BASE_URL) {
      return NextResponse.json({ error: "BLOB_BASE_URL is not configured" }, { status: 500 });
    }

    // Build exact blob path
    const blobPath = `${projectName}/registration/${web_token}.json`;
    const blobUrl = `${process.env.BLOB_BASE_URL}/${blobPath}`;

    // Fetch the existing registration JSON
    let existingData: Record<string, unknown> = {};
    const fetchRes = await fetch(blobUrl);
    if (!fetchRes.ok) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    existingData = await fetchRes.json();

    // Update ONLY the payment field
    existingData.payment = {
      status,
      method: payment_method,
      transaction_id: payment_ref_id,
      total_price,
      other_info: other_info || {},
      updated_dt: new Date().toISOString(),
    };

    // Save updated JSON back to Vercel Blob
    await put(blobPath, JSON.stringify(existingData, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({
      status: "success",
      message: "Payment updated in Vercel",
    });
  } catch (error) {
    console.error("❌ Error updating payment in Vercel:", error);
    return NextResponse.json(
      { error: "Failed to update payment in Vercel" },
      { status: 500 }
    );
  }
}
