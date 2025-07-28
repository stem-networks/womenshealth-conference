import { NextResponse } from "next/server";
import { getSessionsData } from "@/lib/getSessionsData";

// Support GET as well as POST
export async function GET() {
    try {
        const jsonData = await getSessionsData();
        return NextResponse.json({ data: jsonData });
    } catch (error) {
        console.error("Error reading session content JSON (GET):", error);
        return NextResponse.json(
            { error: "Failed to load session content" },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        const jsonData = await getSessionsData();
        return NextResponse.json({ data: jsonData });
    } catch (error) {
        console.error("Error reading session content JSON (POST):", error);
        return NextResponse.json(
            { error: "Failed to load session content" },
            { status: 500 }
        );
    }
}
