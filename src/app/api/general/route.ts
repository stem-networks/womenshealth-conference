import { NextResponse } from "next/server";
import { getSkeletonData } from "@/lib/getSkeletonData";

export async function GET() {
  try {
    const jsonData = await getSkeletonData();
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Failed to read skeleton.json:", error);
    return NextResponse.json(
      { error: "Failed to load local JSON data" },
      { status: 500 }
    );
  }
}
