// app/api/registration-details/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { web_token } = await req.json();

        if (!web_token || typeof web_token !== "string") {
            return NextResponse.json(
                { success: false, error: "Missing web_token" },
                { status: 400 }
            );
        }

        const BLOB_URL = `https://<your-project>.vercel.app/registration/${web_token}.json`; // Replace <your-project> correctly

        try {
            const response = await fetch(BLOB_URL);

            if (!response.ok) {
                throw new Error(`Blob not found: ${response.status}`);
            }

            const data = await response.json();
            return NextResponse.json({ success: true, data }, { status: 200 });
        } catch (err) {
            console.error("Blob fetch error:", err);
            return NextResponse.json(
                { success: false, error: "User data not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
