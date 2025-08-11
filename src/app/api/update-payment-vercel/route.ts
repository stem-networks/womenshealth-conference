// src/app/api/vercel/update-payment/route.ts
import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { web_token, status, payment_method, payment_ref_id, total_price, other_info } = body;

        if (!web_token) {
            return NextResponse.json({ error: "Missing web_token" }, { status: 400 });
        }

        const blobList = await list();
        const registrationBlob = blobList.blobs.find((b) =>
            b.pathname.includes(`/registration/${web_token}.json`)
        );

        if (!registrationBlob) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        let existingData: Record<string, unknown> = {};
        const res = await fetch(registrationBlob.url);
        if (res.ok) existingData = await res.json();

        existingData.payment = {
            status,
            method: payment_method,
            transaction_id: payment_ref_id,
            total_price,
            other_info: other_info || {},
            updated_dt: new Date().toISOString(),
        };

        await put(registrationBlob.pathname, JSON.stringify(existingData, null, 2), {
            access: "public",
            contentType: "application/json",
        });

        return NextResponse.json({ status: "success", message: "Payment updated in Vercel" });
    } catch (error) {
        console.error("❌ Error updating payment in Vercel:", error);
        return NextResponse.json({ error: "Failed to update payment in Vercel" }, { status: 500 });
    }
}
