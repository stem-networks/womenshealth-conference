// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

function sanitizeSegment(s: string) {
  // letters, numbers, dashes, underscores only
  return s.replace(/[^a-zA-Z0-9-_]/g, "");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const projectRaw = (form.get("project") as string) || "uploads";

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file payload" },
        { status: 400 }
      );
    }

    const project = sanitizeSegment(projectRaw) || "uploads";

    const allowedExtensions = ["pdf", "doc", "docx", "rtf"] as const;
    const name: string = file.name || "upload";
    const ext = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
    if (
      !allowedExtensions.includes(ext as (typeof allowedExtensions)[number])
    ) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (2MB max)" },
        { status: 400 }
      );
    }

    const hexTimestamp = Date.now().toString(16);
    const randomDecimal = Math.random().toString().slice(2, 8);
    const uniqueName = `abstract_${hexTimestamp}.${randomDecimal}.${ext}`;
    const fileName = `${project}/abstract/${uniqueName}`;

    const blob = await put(fileName, file, {
      access: "public", // or "private"
      addRandomSuffix: false, // we already generate a unique name
    });

    return NextResponse.json({ fileUrl: blob.url }, { status: 200 });
  } catch (err) {
    // Surface the actual error to logs and client
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "string"
        ? err
        : "unknown error";
    console.error("Upload error:", message);
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 }
    );
  }
}
