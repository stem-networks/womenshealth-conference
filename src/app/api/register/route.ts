 // src/app/api/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");

    // If request is multipart/form-data (from FormData)
    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const data: Record<string, string> = {};

      formData.forEach((value, key) => {
        if (typeof value === "string") {
          data[key] = value;
        }
      });

      // Add server-only CID
      data["cid"] = process.env.CID ?? "";

      const response = await axios.post(process.env.API_URL as string, data);

      return NextResponse.json(response.data, { status: 200 });
    }

    // If request is JSON
    const payload = await req.json();
    const fullPayload = {
      ...payload,
      cid: process.env.CID ?? "",
    };

    const response = await axios.post(
      process.env.API_URL as string,
      fullPayload
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error("Server API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
