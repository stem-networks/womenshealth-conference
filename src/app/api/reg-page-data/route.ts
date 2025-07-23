import { NextResponse } from "next/server";
import { getRegisterPageData } from "@/lib/getRegisterPageData";

export async function POST() {
  try {
    const jsonData = await getRegisterPageData();
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading register_page_data.json:", error);
    return NextResponse.json(
      { error: "Failed to load registration page data" },
      { status: 500 }
    );
  }
}
