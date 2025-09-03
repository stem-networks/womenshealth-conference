// // app/api/payment/confirm/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { projectName, web_token } = await req.json();

//     if (!projectName || typeof projectName !== "string") {
//       return NextResponse.json(
//         { success: false, error: "Missing projectName" },
//         { status: 400 }
//       );
//     }

//     if (!web_token || typeof web_token !== "string") {
//       return NextResponse.json(
//         { success: false, error: "Missing web_token" },
//         { status: 400 }
//       );
//     }

//     if (!process.env.BLOB_BASE_URL) {
//       throw new Error("BLOB_BASE_URL is not set in environment variables");
//     }

//     // Build blob URL just like payment-check
//     const BLOB_URL = `${process.env.BLOB_BASE_URL}/${projectName}/payment/${web_token}.json`;

//     // Fetch from Vercel Blob
//     const response = await fetch(BLOB_URL);

//     if (!response.ok) {
//       throw new Error("Blob not found");
//     }

//     const paymentData = await response.json();

//     // Return confirmation response
//     return NextResponse.json(
//       { success: true, status: 200, data: paymentData },
//       { status: 200 }
//     );

//   } catch (err) {
//     console.error("[API] Payment Confirm Error:", err);
//     return NextResponse.json(
//       { success: false, status: 500, error: "Payment confirm failed." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { projectName, web_token } = await req.json();

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

    if (!process.env.BLOB_BASE_URL) {
      throw new Error("BLOB_BASE_URL is not set in environment variables");
    }

    const BLOB_URL = `${process.env.BLOB_BASE_URL}/${projectName}/payment/${web_token}.json`;

    // 🔁 Retry up to 3 times (1s delay) in case blob is not immediately available
    let lastError: Error | null = null;
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetch(BLOB_URL);
        if (response.ok) {
          const paymentData = await response.json();
          return NextResponse.json(
            { success: true, status: 200, data: paymentData },
            { status: 200 }
          );
        } else {
          lastError = new Error(`Blob fetch failed: ${response.status}`);
        }
      } catch (err) {
        lastError = err instanceof Error ? err : new Error("Unknown error");
      }

      // wait 1 second before retrying
      await new Promise((res) => setTimeout(res, 1000));
    }

    throw lastError || new Error("Blob not found after retries");
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown confirm error";
    console.error("[API] Payment Confirm Error:", err);
    return NextResponse.json(
      { success: false, status: 500, error: `Payment confirm failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

