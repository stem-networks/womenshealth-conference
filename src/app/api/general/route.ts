import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Absolute path to your JSON file at root/data_source/skeleton.json
    const filePath = path.join(process.cwd(), "data_source", "skeleton.json");

    // Read and parse the file
    const fileData = await readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Failed to read skeleton.json:", error);
    return NextResponse.json(
      { error: "Failed to load local JSON data" },
      { status: 500 }
    );
  }
}
