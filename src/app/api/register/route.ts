//  // src/app/api/register/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const contentType = req.headers.get("content-type");

//     // If request is multipart/form-data (from FormData)
//     if (contentType && contentType.includes("multipart/form-data")) {
//       const formData = await req.formData();
//       const data: Record<string, string> = {};

//       formData.forEach((value, key) => {
//         if (typeof value === "string") {
//           data[key] = value;
//         }
//       });

//       // Add server-only CID
//       data["cid"] = process.env.CID ?? "";

//       const response = await axios.post(process.env.API_URL as string, data);

//       return NextResponse.json(response.data, { status: 200 });
//     }

//     // If request is JSON
//     const payload = await req.json();
//     const fullPayload = {
//       ...payload,
//       cid: process.env.CID ?? "",
//     };

//     const response = await axios.post(
//       process.env.API_URL as string,
//       fullPayload
//     );

//     return NextResponse.json(response.data, { status: 200 });
//   } catch (err) {
//     console.error("Server API error:", err);
//     return NextResponse.json(
//       { success: false, error: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();

//     const { title, name, email, alt_email, phone, whatsapp_number, country, institution, no_of_participants, no_of_accompanying, final_amt_input, reg_category, reg_tot_hidden, price_of_each_accompanying, occupency_text, occupancy, check_insel, check_outsel, nights } = data;

//     const cid = process.env.CID || "";

//     const formData = new FormData();
//     formData.append("or", btoa("1"));
//     formData.append("cid", btoa(cid));
//     formData.append("title", title);
//     formData.append("fname", name);
//     formData.append("lname", btoa(""));
//     formData.append("country", country);
//     formData.append("email", email);
//     formData.append("alt_email", alt_email);
//     formData.append("phone", phone);
//     formData.append("whatsapp", whatsapp_number);
//     formData.append("institution", institution);
//     formData.append("no_of_participants", no_of_participants);
//     formData.append("no_of_accompanying", no_of_accompanying);
//     formData.append("amount", final_amt_input);
//     formData.append("registration_type", reg_category);
//     formData.append("registration_fee_per_participant", reg_tot_hidden);
//     formData.append("accompanying_fee", price_of_each_accompanying);
//     formData.append("accommodation_occupancy_type", occupency_text);
//     formData.append("accommodation_fee_per_night", occupancy);
//     formData.append("check_in_date", check_insel);
//     formData.append("check_out_date", check_outsel);
//     formData.append("number_of_nights", nights);
//     formData.append("accommodation_fee", occupancy);
//     formData.append("additional_info", btoa(JSON.stringify({})));

//     const apiRes = await fetch(`${process.env.CMS_URL}`, {
//       method: "POST",
//       body: formData,
//       headers: { Accept: "*/*" },
//     });

//     const result = await apiRes.json();
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error("Register API Error:", error);
//     return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cid = process.env.CID || "";

    const formData = new FormData();
    formData.append("or", "1");
    formData.append("cid", data.cid || btoa(cid));
    formData.append("title", data.title);
    formData.append("fname", data.name);
    formData.append("lname", btoa(""));
    formData.append("country", data.country);
    formData.append("email", data.email);
    formData.append("altemail", data.alt_email); // FIXED
    formData.append("phone", data.phone);
    formData.append("whatsapp_number", data.whatsapp_number); // FIXED
    formData.append("institution", data.institution);
    formData.append("no_of_participants", data.no_of_participants);
    formData.append("no_of_accompanying", data.no_of_accompanying);
    formData.append("amount", data.final_amt_input);
    formData.append("registration_type", data.reg_category);
    formData.append("registration_fee_per_participant", data.reg_tot_hidden);
    formData.append("accompanying_fee", data.price_of_each_accompanying);
    formData.append("accommodation_occupancy_type", data.occupency_text);
    formData.append("accommodation_fee_per_night", data.occupancy);
    formData.append("check_in_date", data.check_insel);
    formData.append("check_out_date", data.check_outsel);
    formData.append("number_of_nights", data.nights);
    formData.append("accommodation_fee", data.accommodation_fee || data.occupancy); // FIXED
    formData.append("web_token", data.web_token); // ADDED
    // formData.append("additional_info", btoa(JSON.stringify({ description: atob(data.description || "") })));

    const apiRes = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: formData,
    });

    const result = await apiRes.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
