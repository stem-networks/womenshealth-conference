// // app/api/update-payment/route.ts
// import { list, put } from "@vercel/blob";
// import { NextRequest, NextResponse } from "next/server";

// type Payment = {
//   type?: string;
//   payment_ref_id?: string;
//   status?: string;
//   total_price?: string | number;
//   payment_method?: string;
//   other_info?: Record<string, unknown>;
// };

// // Helper to ensure we always return a readable error message
// function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) return error.message;
//   if (typeof error === "string") return error;
//   try {
//     return JSON.stringify(error);
//   } catch {
//     return "Unknown error";
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse body safely
//     let body: unknown;
//     try {
//       body = await req.json();
//     } catch {
//       return NextResponse.json(
//         { success: false, error: "Invalid JSON body" },
//         { status: 400 }
//       );
//     }

//     if (!body || typeof body !== "object") {
//       return NextResponse.json(
//         { success: false, error: "Invalid JSON body" },
//         { status: 400 }
//       );
//     }

//     const { projectName, web_token, payment } = body as {
//       projectName?: string;
//       web_token?: string;
//       payment?: Payment;
//     };

//     // Validate required fields
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
//     if (!payment || typeof payment !== "object") {
//       return NextResponse.json(
//         { success: false, error: "Missing payment data" },
//         { status: 400 }
//       );
//     }

//     const filePath = `${projectName}/registration/${web_token}.json`;

//     // 1) Check if blob exists
//     const { blobs } = await list({ prefix: filePath });
//     const found = blobs.find((b) => b.pathname === filePath);
//     if (!found) {
//       return NextResponse.json(
//         { success: false, error: "Registration not found" },
//         { status: 404 }
//       );
//     }

//     // 2) Read existing JSON file from public URL
//     const res = await fetch(found.url, { cache: "no-store" });
//     if (!res.ok) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: `Failed to read existing blob: ${res.status} ${res.statusText}`,
//         },
//         { status: 502 }
//       );
//     }

//     const existingData = (await res.json().catch(() => null)) as Record<
//       string,
//       unknown
//     > | null;

//     if (!existingData || typeof existingData !== "object") {
//       return NextResponse.json(
//         { success: false, error: "Blob content is not valid JSON" },
//         { status: 500 }
//       );
//     }

//     // 3) Merge payment data
//     const mergedPayment = {
//       ...(existingData.payment && typeof existingData.payment === "object"
//         ? existingData.payment
//         : {}),
//       ...payment,
//     };

//     const updated = {
//       ...existingData,
//       payment: mergedPayment,
//       updated_dt: new Date().toISOString(),
//     };

//     // 4) Save updated JSON back to blob storage
//     await put(filePath, JSON.stringify(updated, null, 2), {
//       access: "public",
//       contentType: "application/json",
//       allowOverwrite: true, // ✅ necessary to update existing file
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Payment updated successfully",
//       web_token,
//       filePath,
//     });
//   } catch (error: unknown) {
//     console.error("Payment update error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: getErrorMessage(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// app/api/update-payment/route.ts
import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

type Payment = {
  type?: string;
  payment_ref_id?: string;
  status?: string;
  total_price?: string | number;
  payment_method?: string;
  other_info?: Record<string, unknown>;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

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

    // Check blob existence
    const { blobs } = await list({ prefix: filePath });
    const found = blobs.find((b) => b.pathname === filePath);
    if (!found) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    // Read the existing JSON directly from blob URL with cache bypass
    const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to read existing blob: ${res.status} ${res.statusText}`,
        },
        { status: 502 }
      );
    }
    const existingData = (await res.json().catch(() => null)) as Record<string, unknown> | null;

    if (!existingData || typeof existingData !== "object") {
      return NextResponse.json(
        { success: false, error: "Blob content is not valid JSON" },
        { status: 500 }
      );
    }

    // Merge the payment fields
    const mergedPayment = {
      ...(existingData.payment && typeof existingData.payment === "object"
        ? existingData.payment
        : {}),
      ...payment,
    };

    const updated = {
      ...existingData,
      payment: mergedPayment,
      updated_dt: new Date().toISOString(),
    };

    // Write back with overwrite allowed
    await put(filePath, JSON.stringify(updated, null, 2), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });

    return NextResponse.json({
      success: true,
      message: "Payment updated successfully",
      web_token,
      filePath,
    });
  } catch (error: unknown) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
