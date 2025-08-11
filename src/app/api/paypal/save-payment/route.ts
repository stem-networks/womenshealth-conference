// src/app/api/paypal/save-payment/route.ts
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

    const blobPath = `${projectName}/registration/${web_token}.json`;
    const blobUrl = `${process.env.BLOB_BASE_URL}/${blobPath}`;

    // 1️⃣ Fetch existing registration record
    const fetchRes = await fetch(blobUrl);
    if (!fetchRes.ok) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }
    const existingData = await fetchRes.json();

    // 2️⃣ Prepare updated payment info
    const updatedPayment = {
      type: "Payment",
      payment_ref_id: payment_ref_id || "",
      status: status || "",
      total_price: total_price || "",
      payment_method: payment_method || "",
      other_info: other_info || {},
      updated_dt: new Date().toISOString(),
    };

    // 3️⃣ Handle array or object formats
    let newData;
    if (Array.isArray(existingData)) {
      const paymentIndex = existingData.findIndex(
        (item) => item.type && item.type.toLowerCase() === "payment"
      );
      if (paymentIndex === -1) {
        existingData.push(updatedPayment);
      } else {
        existingData[paymentIndex] = {
          ...existingData[paymentIndex],
          ...updatedPayment,
        };
      }
      newData = existingData;
    } else if (typeof existingData === "object" && existingData !== null) {
      existingData.payment = updatedPayment;
      newData = existingData;
    } else {
      return NextResponse.json({ error: "Invalid registration data format" }, { status: 500 });
    }

    // 4️⃣ Save updated JSON back to blob
    await put(blobPath, JSON.stringify(newData, null, 2), {
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

