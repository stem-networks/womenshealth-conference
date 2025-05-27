import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.API_URL_WITH_PARAMS;
    if (!apiUrl) {
      throw new Error("API_URL_WITH_PARAMS not configured");
    }
  
    

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
