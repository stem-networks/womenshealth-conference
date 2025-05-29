// src/app/api/log-error/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error_message, name = "N/A", email = "N/A" } = body;

    const formData = new FormData();
    formData.append("form_based", "Registration Form");
    formData.append("cid", process.env.CID || ""); // ✅ Secure server-only env var
    formData.append("error_message", error_message);
    formData.append("name", name);
    formData.append("email", email);
    const baseUrl = process.env.BASE_URL;

    const response = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Logging API failed:", await response.text());
      return NextResponse.json({ error: "Failed to log error" }, { status: 500 });
    }

    return NextResponse.json({ status: "logged" });
  } catch (err) {
    console.error("Server error while logging:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
