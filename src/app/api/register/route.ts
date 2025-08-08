// src/app/api/register/route.ts
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
