// app/api/payment-check/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const { web_token } = await req.json();

//     if (!web_token) {
//       return NextResponse.json({ error: "Missing web_token" }, { status: 400 });
//     }

//     const paymentCheckData = {
//       module_name: "payment_check",
//       keys: { data: [{ web_token }] },
//       cid: process.env.CID, // Secure, not exposed to client
//     };

//     const apiRes = await axios.post(
//       process.env.API_URL || "",
//       paymentCheckData
//     );

//     return NextResponse.json(apiRes.data);
//   } catch (error: unknown) {
//     console.error("API error:", error);

//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// app/api/payment-check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    // Example: https://<blob-url>/<projectName>/payment/<web_token>.json
    const BLOB_URL = `${process.env.BLOB_BASE_URL}/${projectName}/payment/${web_token}.json`;

    try {
      const response = await fetch(BLOB_URL);

      if (!response.ok) {
        throw new Error("Blob not found");
      }

      const data = await response.json();

      return NextResponse.json(
        { success: true, status: 200, data },
        { status: 200 }
      );
    } catch (err) {
      console.error("Blob fetch error:", err);
      return NextResponse.json(
        { success: false, status: 404, error: "Payment data not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, status: 500, error: "Server error" },
      { status: 500 }
    );
  }
}


