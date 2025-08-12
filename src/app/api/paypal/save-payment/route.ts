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
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      payment_ref_id,
      web_token,
      total_price,
      other_info,
      payment_method,
      status,
      discount_amt,
    } = body;

    if (!payment_ref_id || !web_token || !total_price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("or_payment", "1"); // CMS payment trigger
    formData.append("paymentstatus", btoa(status === "success" ? "1" : "0"));
    formData.append("transaction_id", btoa(payment_ref_id));
    formData.append("payment_method", btoa(payment_method || "PayPal"));
    formData.append("total_price", btoa(total_price.toString()));
    formData.append("other_info", btoa(other_info?.toString() || ""));
    formData.append("discount_amt", btoa(discount_amt?.toString() || "0"));
    formData.append("web_token", btoa(web_token));

    // Send directly to CMS
    const cmsRes = await fetch(process.env.CMS_URL!, {
      method: "POST",
      body: formData,
    });

    const cmsResult = await cmsRes.json();
    return NextResponse.json(cmsResult);
  } catch (error) {
    console.error("❌ Error saving payment:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
