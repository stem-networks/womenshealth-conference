// import { NextResponse } from "next/server";
// import path from "path";
// import { promises as fs } from "fs";

// export async function POST(req: Request) {
//     try {
//         const formData = await req.formData();
//         const file = formData.get("file") as File;

//         if (!file) {
//             return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//         }

//         const buffer = Buffer.from(await file.arrayBuffer());
//         const fileName = `${Date.now()}-${file.name}`;
//         const filePath = path.join(process.cwd(), "public", "uploads", fileName);

//         await fs.mkdir(path.dirname(filePath), { recursive: true });
//         await fs.writeFile(filePath, buffer);

//         return NextResponse.json({ fileUrl: `/uploads/${fileName}` });
//     } catch (error) {
//         console.error("File upload error:", error);
//         return NextResponse.json({ error: "File upload failed" }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // ===== FILE VALIDATION =====
        // 1. Allowed file extensions
        const allowedExtensions = ["pdf", "doc", "docx", "rtf"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
            return NextResponse.json(
                { error: "Invalid file type. Please upload a PDF, DOC, DOCX, or RTF file." },
                { status: 400 }
            );
        }

        // 2. Max file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size should be less than 2MB." },
                { status: 400 }
            );
        }

        // ===== FILE SAVING =====
        // Rename file similar to PHP style: abstract_<unique>.ext
        const uniqueId = `${Date.now().toString(16)}${Math.random().toString().slice(2, 8)}`;
        const randomDecimal = Math.random().toString().slice(2, 10);
        const uniqueName = `abstract_${uniqueId}.${randomDecimal}.${fileExtension}`;
        const filePath = path.join(process.cwd(), "public", "uploads", uniqueName);

        await fs.mkdir(path.dirname(filePath), { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ fileUrl: `/uploads/${uniqueName}` });
    } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }
}
