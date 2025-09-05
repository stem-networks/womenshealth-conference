// app/api/send-to-cms/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const forwardFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      forwardFormData.append(key, value);
    }
    forwardFormData.append("cid", process.env.CID || ""); // enforce on server

    const response = await fetch(`${process.env.CMS_URL}`, {
      method: "POST",
      body: forwardFormData,
    });

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error forwarding form data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send form data to external API" },
      { status: 500 }
    );
  }
}
