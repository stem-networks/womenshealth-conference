// app/api/cleanup/route.ts
import { NextResponse } from "next/server";
import { list, del } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const { startDate, endDate, folderPath } = await req.json();

    if (!startDate || !endDate || !folderPath) {
      return NextResponse.json(
        { error: "startDate, endDate, and folderPath are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const files = await list();
    const deletedFiles: string[] = [];

    for (const blob of files.blobs) {
      if (blob.pathname.startsWith(folderPath)) {
        const uploadedTime = new Date(blob.uploadedAt);
        if (uploadedTime >= start && uploadedTime <= end) {
          await del(blob.pathname);
          deletedFiles.push(blob.pathname);
        }
      }
    }

    return NextResponse.json({
      message: `Deleted ${deletedFiles.length} file(s) in ${folderPath}`,
      deletedFiles,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
