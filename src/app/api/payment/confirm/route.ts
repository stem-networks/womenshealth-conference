// // app/api/payment/confirm/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       payment_ref_id,
//       web_token,
//       payment_method,
//       status,
//       total_price,
//       other_info,
//       discount_amt,
//     } = body;

//     const payload = {
//       module_name: "payment",
//       keys: {
//         data: [
//           {
//             payment_ref_id,
//             web_token,
//             payment_method,
//             status,
//             total_price,
//             other_info,
//             discount_amt,
//           },
//         ],
//       },
//       cid: process.env.CID, // Secure: not exposed to client
//     };

//     const apiUrl = process.env.API_URL; // e.g. https://example.com/api/save

//     const res = await fetch(apiUrl!, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(`Failed to save payment: ${result.message}`);
//     }

//     return NextResponse.json({ success: true, data: result });
//   } catch (err) {
//     console.error("[API] Payment Confirm Error:", err);
//     return NextResponse.json({ success: false, error: "Payment save failed." }, { status: 500 });
//   }
// }

// app/api/payment/confirm/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      payment_ref_id,
      web_token,
      payment_method,
      status,
      total_price,
      other_info,
      discount_amt,
    } = body;

    // Prepare CMS form data
    const formData = new FormData();
    formData.append("or_payment", "1"); // CMS trigger
    formData.append("paymentstatus", btoa(status === "success" ? "1" : "0"));
    formData.append("transaction_id", btoa(payment_ref_id));
    formData.append("payment_method", btoa(payment_method || "PayPal"));
    formData.append("total_price", btoa(total_price || "0"));
    formData.append("web_token", btoa(web_token));

    // Add optional info
    const addonInfo = {
      other_info: other_info || "",
      discount_amt: discount_amt || 0,
    };
    formData.append("additional_info", btoa(JSON.stringify(addonInfo)));

    // Include conference ID
    formData.append("cid", btoa(process.env.CID || ""));

    const cmsRes = await fetch(process.env.CMS_URL || "", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "*/*",
      },
    });

    const cmsData = await cmsRes.json();

    if (cmsData.result !== "success") {
      throw new Error(`CMS payment save failed: ${cmsData.message || "Unknown error"}`);
    }

    return NextResponse.json({ success: true, data: cmsData });
  } catch (err) {
    console.error("[API] Payment Confirm Error:", err);
    return NextResponse.json(
      { success: false, error: "Payment save failed." },
      { status: 500 }
    );
  }
}
