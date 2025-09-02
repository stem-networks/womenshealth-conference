// app/api/save-payment-user/route.ts
import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const incoming = await req.json();

        // const defaultValue = (
        //     val: string | number | null | undefined,
        //     fallback = "wmty"
        // ): string | number => {
        //     return val === undefined || val === null || val === ""
        //         ? fallback
        //         : val;
        // };

        const defaultValue = <T extends string | number>(
            val: T | null | undefined,
            fallback?: T
        ): T | null => {
            if (val === undefined || val === null || val === "") {
                return fallback !== undefined ? fallback : null;
            }
            return val;
        };

        const web_token = defaultValue(
            incoming.web_token,
            `${Date.now()}_${Math.floor(Math.random() * 100000)}`
        );

        // Extract project name from site_url
        const siteUrl = incoming.site_url || "";
        const projectName = siteUrl
            ? siteUrl.replace(/^https?:\/\//, "").replace(".com", "")
            : "default_project";

        // Store inside projectName/payment folder
        const BLOB_PATH = `${projectName}/payment/${web_token}.json`;

        const newEntry = {
            transaction_id: defaultValue(incoming.transaction_id),
            payment_method: defaultValue(incoming.payment_method, "PayPal"),
            paymentstatus: defaultValue(incoming.paymentstatus, "0"),
            total_price: defaultValue(incoming.total_price, "0"),
            discount_amt: defaultValue(incoming.discount_amt, "0"),
            other_info: defaultValue(incoming.other_info, ""),
            status: defaultValue(incoming.status, "0"),
            created_dt: defaultValue(incoming.created_dt),
            updated_dt: defaultValue(incoming.updated_dt),
            web_token: web_token,
            cid: defaultValue(incoming.cid),
            site_url: siteUrl,
            type: "Payment",
            attempt: defaultValue(incoming.attempt, "1"),
        };

        // Prevent overwriting same token
        const blobs = await list();
        const alreadyExists = blobs.blobs.find(
            (b) => b.pathname === BLOB_PATH
        );
        if (alreadyExists) {
            return NextResponse.json(
                { success: false, error: "Token already exists" },
                { status: 409 }
            );
        }

        // Upload JSON blob
        const uploaded = await put(
            BLOB_PATH,
            JSON.stringify(newEntry, null, 2),
            {
                access: "public",
                contentType: "application/json",
            }
        );

        return NextResponse.json({
            success: true,
            web_token,
            url: uploaded.url,
        });
    } catch (error) {
        console.error("Error saving payment data:", error);
        return NextResponse.json(
            { success: false, error: "Unable to save payment data" },
            { status: 500 }
        );
    }
}
