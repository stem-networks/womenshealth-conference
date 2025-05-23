import { NextResponse } from "next/server";
import { fetchDataServer } from "@/lib/api";

export async function GET() {
  try {
    const data = await fetchDataServer();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
    console.log(error);
  }
}
