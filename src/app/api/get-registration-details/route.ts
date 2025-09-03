// app/api/get-registration-details/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { projectName, web_token } = await req.json();

    if (!projectName || typeof projectName !== "string") {
      return NextResponse.json({ success: false, error: "Missing projectName" }, { status: 400 });
    }

    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json({ success: false, error: "Missing web_token" }, { status: 400 });
    }

    if (!process.env.BLOB_BASE_URL) {
      throw new Error("BLOB_BASE_URL is not set in environment variables");
    }

    // Dynamic path with project name
    // const BLOB_URL = `https://ikpc0vchliaejkc2.public.blob.vercel-storage.com/${projectName}/registration/${web_token}.json`;
    
    // Build URL dynamically from env + params
    const BLOB_URL = `${process.env.BLOB_BASE_URL}/${projectName}/registration/${web_token}.json`;

    try {
      const response = await fetch(BLOB_URL);

      if (!response.ok) {
        throw new Error("Blob not found");
      }

      const data = await response.json();

      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err) {
      console.error("Blob fetch error:", err);
      return NextResponse.json({ success: false, error: "User data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

