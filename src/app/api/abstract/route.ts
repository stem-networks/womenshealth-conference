// // app/api/abstract/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // Create new FormData to relay
//     const relayForm = new FormData();
//     for (const [key, value] of formData.entries()) {
//       relayForm.append(key, value);
//     }

//     // ✅ Add server-side CID (not public)
//     const cid = process.env.CID;
//     if (!cid) throw new Error("CID is not defined in environment variables.");
//     relayForm.append("cid", cid);

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

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      title,
      name,
      email,
      alt_email,
      phone,
      country,
      intrested,
      abstract_title,
      upload_abstract_file, // Base64-encoded URL of uploaded file
    } = data;

    const cid = process.env.CID || "";

    // Prepare form data for CMS
    const formData = new FormData();
    formData.append("cid", btoa(cid));
    formData.append("abstract_title", abstract_title);
    formData.append("title", title);
    formData.append("fname", name);
    formData.append("lname", btoa("")); // No last name
    formData.append("country", country);
    formData.append("email", email);
    formData.append("altemail", alt_email);
    formData.append("phone", phone);
    formData.append("abstract_category", intrested);
    formData.append("track", btoa("")); // Optional
    formData.append("postal_details", btoa("")); // Optional
    formData.append("abstract_attachment_url", upload_abstract_file);

    // Include extra fields in additional_info
    // formData.append(
    //   "additional_info",
    //   btoa(
    //     JSON.stringify({
    //       whatsapp_number,
    //       city,
    //       organization,
    //       message,
    //     })
    //   )
    // );

    if (data.other_info) {
      formData.append("additional_info", data.other_info); // already base64-encoded
    }


    const apiRes = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "*/*" },
    });

    if (apiRes.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to submit abstract" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Abstract API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}



