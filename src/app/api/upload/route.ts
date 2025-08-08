// import { put } from "@vercel/blob";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const project = formData.get("project") as string;

//     if (!file || !project) {
//       return NextResponse.json({ error: "Missing file or project" }, { status: 400 });
//     }

//     const allowedExtensions = ["pdf", "doc", "docx", "rtf"];
//     const fileExtension = file.name.split(".").pop()?.toLowerCase();
//     if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
//       return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       return NextResponse.json({ error: "File too large (2MB max)" }, { status: 400 });
//     }

//     // Generate unique name: abstract_<hex_timestamp>.<random_decimal>.<ext>
//     const hexTimestamp = Date.now().toString(16);
//     const randomDecimal = Math.random().toString().slice(2, 8);
//     const uniqueName = `abstract_${hexTimestamp}.${randomDecimal}.${fileExtension}`;
//     const fileName = `${project}/${uniqueName}`;

//     //  Add logging here to debug
//     console.log("Uploading file:", fileName);

//     const blob = await put(fileName, file, {
//       access: "public", // change to "private" if needed
//     });

//     console.log("Uploaded to:", blob.url);

//     return NextResponse.json({ fileUrl: blob.url });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const project = formData.get("project") as string;

    if (!file || !project) {
      return NextResponse.json({ error: "Missing file or project" }, { status: 400 });
    }

    const allowedExtensions = ["pdf", "doc", "docx", "rtf"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (2MB max)" }, { status: 400 });
    }

    // Generate unique name: abstract_<hex_timestamp>.<random_decimal>.<ext>
    const hexTimestamp = Date.now().toString(16);
    const randomDecimal = Math.random().toString().slice(2, 8);
    const uniqueName = `abstract_${hexTimestamp}.${randomDecimal}.${fileExtension}`;

    // NEW: Store inside projectName/abstract folder
    const fileName = `${project}/abstract/${uniqueName}`;

    console.log("Uploading file:", fileName);

    const blob = await put(fileName, file, {
      access: "public", // change to "private" if needed
    });

    console.log("Uploaded to:", blob.url);

    return NextResponse.json({ fileUrl: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
