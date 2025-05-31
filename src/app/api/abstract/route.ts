// // app/api/abstract/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData(); // handles multipart/form-data

//     // Convert FormData to FormData again (for API relay)
//     const relayForm = new FormData();
//     for (const [key, value] of formData.entries()) {
//       relayForm.append(key, value);
//     }

//     const apiUrl = process.env.API_URL;

//     if (!apiUrl) {
//       throw new Error("API_URL is not defined in environment variables.");
//     }

//     const response = await axios.post(apiUrl, relayForm, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return NextResponse.json({ success: true, data: response.data });
//   } catch (error) {
//     const err = error as Error;
//     console.error("Server form submission error:", err);
//     return NextResponse.json(
//       { success: false, error: err.message || "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/abstract/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Create new FormData to relay
    const relayForm = new FormData();
    for (const [key, value] of formData.entries()) {
      relayForm.append(key, value);
    }

    // ✅ Add server-side CID (not public)
    const cid = process.env.CID;
    if (!cid) throw new Error("CID is not defined in environment variables.");
    relayForm.append("cid", cid);

    const apiUrl = process.env.API_URL;
    if (!apiUrl) {
      throw new Error("API_URL is not defined in environment variables.");
    }

    const response = await axios.post(apiUrl, relayForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    const err = error as Error;
    console.error("Server form submission error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
