// app/api/update-payment/route.ts
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

type Payment = {
  type: string;
  payment_ref_id: string;
  status: string;
  total_price: string | number;
  payment_method: string;
  other_info: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { projectName, web_token, payment } = body as {
      projectName?: string;
      web_token?: string;
      payment?: Payment;
    };

    if (!projectName)
      return NextResponse.json(
        { success: false, error: "Missing projectName" },
        { status: 400 }
      );
    if (!web_token)
      return NextResponse.json(
        { success: false, error: "Missing web_token" },
        { status: 400 }
      );
    if (!payment)
      return NextResponse.json(
        { success: false, error: "Missing payment data" },
        { status: 400 }
      );

    // 🔑 Permanent blob key — must stay the same for overwrites to work
    const filePath = `${projectName}/registration/${web_token}.json`;

    // 1️⃣ Try to fetch the existing file (ignore if not found)
    let existingData: Record<string, unknown> = {};
    try {
      // ⚠️ Replace with your actual blob base URL
      const blobBaseUrl = process.env.BLOB_BASE_URL || "";
      if (blobBaseUrl) {
        const existingRes = await fetch(
          `${blobBaseUrl}/${filePath}?t=${Date.now()}`,
          { cache: "no-store" }
        );
        if (existingRes.ok) {
          existingData = await existingRes.json();
        }
      }
    } catch {
      // file might not exist yet — that's fine
    }

    // 2️⃣ Merge the new payment with existing payment fields
    const mergedPayment = { ...(existingData.payment || {}), ...payment };

    // 3️⃣ Prepare updated data
    const updatedData = {
      ...existingData,
      payment: mergedPayment,
      updated_dt: new Date().toISOString(),
    };

    // 4️⃣ Upload and overwrite
    await put(filePath, JSON.stringify(updatedData, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false, // prevents UUID in filename
      allowOverwrite: true, // ✅ official way to overwrite
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
      filePath,
      payment: mergedPayment,
    });
  } catch (err: unknown) {
    console.error("Payment update error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
