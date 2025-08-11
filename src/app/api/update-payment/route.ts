// src/app/api/update-payment/route.ts
// src/app/api/update-payment/route.ts
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectName,       // e.g. "diabetes-conference"
      web_token,         // e.g. "1754899790_27670"
      status,
      payment_method,
      payment_ref_id,
      total_price,
      other_info
    } = body;

    // Validate
    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json({ error: "Missing projectName" }, { status: 400 });
    }
    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json({ error: "Missing web_token" }, { status: 400 });
    }
    if (!process.env.BLOB_BASE_URL) {
      return NextResponse.json({ error: "BLOB_BASE_URL is not configured" }, { status: 500 });
    }

    // File path in blob storage
    const blobPath = `${projectName}/registration/${web_token}.json`;
    const blobUrl = `${process.env.BLOB_BASE_URL}/${blobPath}`;

    // 1️⃣ Fetch existing registration record
    const fetchRes = await fetch(blobUrl);
    if (!fetchRes.ok) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    const existingData = await fetchRes.json();

    // 2️⃣ Update only the `payment` field
    existingData.payment = {
      payment_ref_id: payment_ref_id || "",
      status: status || "",
      total_price: total_price || "",
      payment_method: payment_method || "",
      other_info: other_info || {},
      updated_dt: new Date().toISOString(),
    };

    // 3️⃣ Save updated JSON back
    await put(blobPath, JSON.stringify(existingData, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({
      status: "success",
      message: "Payment updated successfully",
    });

  } catch (error) {
    console.error("❌ Error updating payment:", error);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}

