// app/api/enquiry/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { enquiryname, enquiryemail, category } = body;

    // Basic validation
    if (!enquiryname || !enquiryemail || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const payload = {
      module_name: "enquiry_form",
      keys: {
        data: [
          {
            name: enquiryname,
            email: enquiryemail,
            category,
          },
        ],
      },
      cid: process.env.CID,
    };

    const response = await axios.post(process.env.API_URL as string, payload);

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "Enquiry API Error:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
