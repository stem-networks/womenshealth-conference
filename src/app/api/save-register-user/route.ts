// app/api/save-register-user/route.ts
import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const BLOB_PATH = "registration/register_user_details.json";

export async function POST(req: NextRequest) {
    try {
        const incoming = await req.json();

        const defaultValue = (val: string | number | null | undefined, fallback = "wmty"): string | number => {
            return val === undefined || val === null || val === "" ? fallback : val;
        };


        const newEntry = {
            id: defaultValue(incoming.id, "0") as string | null,
            edition_id: defaultValue(incoming.edition_id, "0"),
            title: defaultValue(incoming.title),
            name: defaultValue(incoming.name),
            email: defaultValue(incoming.email),
            phone: defaultValue(incoming.phone),
            alt_email: defaultValue(incoming.alt_email),
            whatsapp: defaultValue(incoming.whatsapp),
            institution: defaultValue(incoming.institution),
            reg_price: defaultValue(incoming.reg_price),
            participants: defaultValue(incoming.participants),
            country: defaultValue(incoming.country),
            occupancy: defaultValue(incoming.occupancy),
            nights: defaultValue(incoming.nights),
            checkin_date: defaultValue(incoming.checkin_date),
            checkout_date: defaultValue(incoming.checkout_date),
            occupancy_price: defaultValue(incoming.occupancy_price),
            accompanying: defaultValue(incoming.accompanying),
            accompanying_price: defaultValue(incoming.accompanying_price),
            sub_type: defaultValue(incoming.sub_type),
            reg_type: defaultValue(incoming.reg_type),
            price_type: defaultValue(incoming.price_type),
            discount_reg: defaultValue(incoming.discount_reg),
            discount_accom: defaultValue(incoming.discount_accom),
            total_price: defaultValue(incoming.total_price),
            currency_rate: defaultValue(incoming.currency_rate),
            created_dt: defaultValue(incoming.created_dt),
            updated_dt: defaultValue(incoming.updated_dt),
            status: defaultValue(incoming.status),
            url_link: null,
            reg_date: defaultValue(incoming.reg_date),
            transaction_id: null,
            attempt: defaultValue(incoming.attempt, "1"),
            viewed_by: null,
            viewed_status: "0",
            viewed_dt: defaultValue(incoming.viewed_dt),
            reply_status: "0",
            reply_by: null,
            reply_dt: defaultValue(incoming.reply_dt),
            type: "Registration",
            email_check_status: "0",
            created_by: "User",
            received_dt: defaultValue(incoming.received_dt),
            payment_type: "",
            web_token: defaultValue(incoming.web_token),
            cid: defaultValue(incoming.cid),
            description: "",
            other_info: null,
        };

        let existingData: Record<string, unknown>[] = [];

        try {
            const blobs = await list();
            const existingBlob = blobs.blobs.find(b => b.pathname === BLOB_PATH);

            if (existingBlob) {
                const json = await fetch(existingBlob.url).then(res => res.json());
                existingData = Array.isArray(json) ? json : [];
            } else {
                console.warn("Blob not found. Creating new...");
            }
        } catch (error) {
            console.error("Failed to fetch blob list or data:", error);
        }

        existingData.push(newEntry);

        const updatedBlob = await put(BLOB_PATH, JSON.stringify(existingData, null, 2), {
            access: "public",
            contentType: "application/json",
        });

        return NextResponse.json({ success: true, url: updatedBlob.url });
    } catch (error) {
        console.error("Error saving registration data:", error);
        return NextResponse.json({ success: false, error: "Unable to save registration data" }, { status: 500 });
    }
}
