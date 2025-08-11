// app/api/update-payment/route.ts
import { put, head, list, BlobNotFoundError } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

type Payment = {
  type: string;
  payment_ref_id: string;
  status: string;
  total_price: string | number;
  payment_method: string;
  other_info: Record<string, unknown>;
};

type StoredData = {
  payment?: Partial<Payment>;
  updated_dt?: string;
  [k: string]: unknown;
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

    if (!projectName) {
      return NextResponse.json(
        { success: false, error: "Missing projectName" },
        { status: 400 }
      );
    }
    if (!web_token) {
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

    // Stable key to support overwrite
    const filePath = `${projectName}/registration/${web_token}.json`;

    // Try to read existing data to merge; prefer SDK head() + fetch to avoid wrong base URLs
    const blobBaseUrl = process.env.BLOB_BASE_URL || "";
    if (!blobBaseUrl) {
      // Not fatal, but warn so you know reads may fail
      console.warn(
        "BLOB_BASE_URL is not set. Existing blob fetch will be skipped; merge will only use SDK head() existence check."
      );
    }

    let existingData: StoredData = {};

    // Try using SDK head() to determine existence
    let exists = false;
    try {
      await head(filePath);
      exists = true;
    } catch (e) {
      if (e instanceof BlobNotFoundError) {
        exists = false;
      } else {
        console.warn(
          "head() check failed; continuing without existence info:",
          e
        );
      }
    }

    // If we know it exists and we have a public base URL, fetch the latest content
    if (exists && blobBaseUrl) {
      try {
        const existingRes = await fetch(
          `${blobBaseUrl}/${filePath}?t=${Date.now()}`,
          { cache: "no-store" }
        );
        if (existingRes.ok) {
          existingData = (await existingRes.json()) as StoredData;
        }
      } catch (e) {
        console.warn(
          "Fetching existing blob content failed; will proceed with empty base:",
          e
        );
      }
    }

    // Merge new payment fields with existing payment fields (new fields win)
    const mergedPayment:
      | Payment
      | (Partial<Payment> & Record<string, unknown>) = {
      ...(existingData.payment || {}),
      ...payment,
    };

    const updatedData: StoredData = {
      ...existingData,
      payment: mergedPayment,
      updated_dt: new Date().toISOString(),
    };

    // Overwrite the blob with lower cache TTL so updates are visible sooner
    await put(filePath, JSON.stringify(updatedData, null, 2), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60, // reduce cache to improve perceived freshness
    });

    // Optional: sanity check there’s just one object under this key prefix
    // Helps detect accidental suffix writes elsewhere in your app
    try {
      const prefix = `${projectName}/registration/`;
      const listed = await list({ prefix });
      const matches = listed.blobs.filter((b) => b.pathname === filePath);
      if (matches.length !== 1) {
        console.warn(
          `Sanity check: expected 1 blob at ${filePath}, found ${matches.length}. ` +
            "This may indicate other writers are using different keys or suffixes."
        );
      }
    } catch (e) {
      // Non-fatal; listing requires appropriate permissions/environment
      console.warn("list() sanity check failed:", e);
    }

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
