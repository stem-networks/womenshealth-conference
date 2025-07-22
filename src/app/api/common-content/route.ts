import { NextResponse } from "next/server";
import { getCommonContent } from "@/lib/getCommonContent";

export async function POST() {
  try {
    const jsonData = await getCommonContent();
    return NextResponse.json({
      data: jsonData, // returns { guidelines, terms, faq }
    });
  } catch (error) {
    console.error("Error reading common content JSON:", error);
    return NextResponse.json(
      { error: "Failed to load common content" },
      { status: 500 }
    );
  }
}
