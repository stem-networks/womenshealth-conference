// // src/app/api/paypal/save-payment/route.ts
// import { AxiosError } from "axios";

// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const { payment_ref_id, web_token, total_price, other_info } = body;

//     if (!payment_ref_id || !web_token || !total_price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const apiRes = await axios.post(process.env.API_URL!, {
//       module_name: "payment",
//       keys: {
//         data: [
//           {
//             payment_ref_id,
//             web_token,
//             payment_method: "PayPal",
//             status: "success",
//             total_price,
//             other_info,
//             discount_amt: 0,
//           },
//         ],
//       },
//       cid: process.env.CID!,
//     });

//     return NextResponse.json({ status: "success", apiResponse: apiRes.data });
//   } catch (error) {
//     const err = error as AxiosError;

//     console.error(
//       "❌ Error saving payment:",
//       err.response?.data || err.message
//     );

//     return NextResponse.json(
//       { error: "Failed to save payment" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/paypal/save-payment/route.ts
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       payment_ref_id, // PayPal transaction ID
//       web_token,
//       total_price,
//       other_info, // This will be additional_info
//       payment_method = "PayPal",
//       status = "success",
//     } = body;

//     if (!payment_ref_id || !web_token || !total_price) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const formData = new FormData();
//     formData.append("or_payment", "1");
//     formData.append("paymentstatus", btoa(status === "success" ? "1" : "0"));
//     formData.append("transaction_id", btoa(payment_ref_id));
//     formData.append("payment_method", btoa(payment_method));
//     formData.append("total_price", btoa(String(total_price)));
//     formData.append("web_token", btoa(web_token));
//     formData.append(
//       "additional_info",
//       btoa(JSON.stringify(other_info || {}))
//     );

//     const cmsRes = await fetch(`${process.env.CMS_URL}`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         Accept: "*/*",
//       },
//     });

//     if (!cmsRes.ok) {
//       throw new Error(`CMS returned ${cmsRes.status}`);
//     }

//     const cmsData = await cmsRes.json();

//     return NextResponse.json({ status: "success", cmsResponse: cmsData });
//   } catch (error) {
//     console.error("❌ Error saving payment to CMS:", error);
//     return NextResponse.json(
//       { error: "Failed to save payment" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/paypal/save-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { put, list, ListBlobResult, ListBlobResultBlob } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      payment_ref_id, // PayPal transaction ID
      web_token,
      total_price,
      other_info, // additional_info
      payment_method = "PayPal",
      status = "success",
    } = body;

    if (!payment_ref_id || !web_token || !total_price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1️⃣ Save payment to CMS
    const formData = new FormData();
    formData.append("or_payment", "1");
    formData.append("paymentstatus", btoa(status === "success" ? "1" : "0"));
    formData.append("transaction_id", btoa(payment_ref_id));
    formData.append("payment_method", btoa(payment_method));
    formData.append("total_price", btoa(String(total_price)));
    formData.append("web_token", btoa(web_token));
    formData.append("additional_info", btoa(JSON.stringify(other_info || {})));

    const cmsRes = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "*/*" },
    });

    if (!cmsRes.ok) {
      throw new Error(`CMS returned ${cmsRes.status}`);
    }

    const cmsData = await cmsRes.json();

    // 2️⃣ Update registration JSON in Vercel Blob
    const blobList: ListBlobResult = await list();
    const registrationBlob = blobList.blobs.find((b: ListBlobResultBlob) =>
      b.pathname.includes(`/registration/${web_token}.json`)
    );

    if (!registrationBlob) {
      console.error("No registration blob found for token:", web_token);
      return NextResponse.json({ error: "Registration record not found" }, { status: 404 });
    }

    let existingData: Record<string, unknown> = {};
    try {
      const res = await fetch(registrationBlob.url);
      if (res.ok) {
        existingData = (await res.json()) as Record<string, unknown>;
      }
    } catch (err) {
      console.warn("Could not fetch existing registration data from blob", err);
    }

    // Add/update payment details
    existingData.payment = {
      status,
      method: payment_method,
      transaction_id: payment_ref_id,
      total_price,
      other_info: other_info || {},
      updated_dt: new Date().toISOString(),
    };

    // Save updated JSON back to blob
    await put(registrationBlob.pathname, JSON.stringify(existingData, null, 2), {
      access: "public",
      contentType: "application/json",
    });

    return NextResponse.json({
      status: "success",
      cmsResponse: cmsData,
      blobUpdate: "Payment details saved to registration record",
    });
  } catch (error) {
    console.error("❌ Error saving payment:", error);
    return NextResponse.json({ error: "Failed to save payment" }, { status: 500 });
  }
}

