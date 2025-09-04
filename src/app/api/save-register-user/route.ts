// app/api/save-register-user/route.ts
// import { put, list } from "@vercel/blob";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const incoming = await req.json();

//         const defaultValue = (val: string | number | null | undefined, fallback = "wmty"): string | number => {
//             return val === undefined || val === null || val === "" ? fallback : val;
//         };

//         const web_token = defaultValue(incoming.web_token, `${Date.now()}_${Math.floor(Math.random() * 100000)}`);

//         // ✅ Extract project name from site_url (or fallback)
//         const siteUrl = incoming.site_url || "";
//         const projectName = siteUrl
//             ? siteUrl.replace(/^https?:\/\//, "").replace(".com", "")
//             : "default_project";

//         // ✅ Store inside projectName/registration folder
//         const BLOB_PATH = `${projectName}/registration/${web_token}.json`;

//         const newEntry = {
//             id: defaultValue(incoming.id, "0") as string | null,
//             edition_id: defaultValue(incoming.edition_id, "0"),
//             title: defaultValue(incoming.title),
//             name: defaultValue(incoming.name),
//             email: defaultValue(incoming.email),
//             phone: defaultValue(incoming.phone),
//             alt_email: defaultValue(incoming.alt_email),
//             whatsapp: defaultValue(incoming.whatsapp),
//             institution: defaultValue(incoming.institution),
//             reg_price: defaultValue(incoming.reg_price),
//             participants: defaultValue(incoming.participants),
//             country: defaultValue(incoming.country),
//             occupancy: defaultValue(incoming.occupancy),
//             nights: defaultValue(incoming.nights),
//             checkin_date: defaultValue(incoming.checkin_date),
//             checkout_date: defaultValue(incoming.checkout_date),
//             occupancy_price: defaultValue(incoming.occupancy_price),
//             accompanying: defaultValue(incoming.accompanying),
//             accompanying_price: defaultValue(incoming.accompanying_price),
//             sub_type: defaultValue(incoming.sub_type),
//             reg_type: defaultValue(incoming.reg_type),
//             price_type: defaultValue(incoming.price_type),
//             discount_reg: defaultValue(incoming.discount_reg),
//             discount_accom: defaultValue(incoming.discount_accom),
//             total_price: defaultValue(incoming.total_price),
//             currency_rate: defaultValue(incoming.currency_rate),
//             created_dt: defaultValue(incoming.created_dt),
//             updated_dt: defaultValue(incoming.updated_dt),
//             status: defaultValue(incoming.status),
//             url_link: null,
//             reg_date: defaultValue(incoming.reg_date),
//             transaction_id: null,
//             attempt: defaultValue(incoming.attempt, "1"),
//             viewed_by: null,
//             viewed_status: "0",
//             viewed_dt: defaultValue(incoming.viewed_dt),
//             reply_status: "0",
//             reply_by: null,
//             reply_dt: defaultValue(incoming.reply_dt),
//             type: "Registration",
//             email_check_status: "0",
//             created_by: "User",
//             received_dt: defaultValue(incoming.received_dt),
//             payment_type: "",
//             web_token: web_token,
//             cid: defaultValue(incoming.cid),
//             description: "",
//             other_info: null,
//             site_url: siteUrl,            

//         };

//         // ✅ Check if a blob with the same token already exists in this folder
//         const blobs = await list();
//         const alreadyExists = blobs.blobs.find(b => b.pathname === BLOB_PATH);
//         if (alreadyExists) {
//             return NextResponse.json({ success: false, error: "Token already exists" }, { status: 409 });
//         }

//         // ✅ Upload to the correct folder path
//         const uploaded = await put(BLOB_PATH, JSON.stringify(newEntry, null, 2), {
//             access: "public",
//             contentType: "application/json",
//         });

//         return NextResponse.json({ success: true, web_token, url: uploaded.url });
//     } catch (error) {
//         console.error("Error saving registration data:", error);
//         return NextResponse.json({ success: false, error: "Unable to save registration data" }, { status: 500 });
//     }
// }

import { put, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const incoming = await req.json();

        // const defaultValue = (val: string | number | null | undefined, fallback = "wmty"): string | number => {
        //     return val === undefined || val === null || val === "" ? fallback : val;
        // };

        const defaultValue = (
            val: string | number | null | undefined,
            fallback: string | number = "N/A"
        ): string | number => {
            return val === undefined || val === null || val === "" ? fallback : val;
        };

        const web_token = defaultValue(incoming.web_token, `${Date.now()}_${Math.floor(Math.random() * 100000)}`);

        //  Extract project name from site_url (or fallback)
        // const siteUrl = incoming.site_url || "";
        // const projectName = siteUrl
        //     ? siteUrl.replace(/^https?:\/\//, "").replace(".com", "")
        //     : "default_project";

        const siteUrl = incoming.site_url || "";
        let projectName = "default_project";

        if (siteUrl) {
            try {
                const { hostname } = new URL(siteUrl);
                const parts = hostname.split(".");

                if (parts.length > 2) {
                    // Has subdomain → take only the first part
                    projectName = parts[0];
                } else {
                    // No subdomain → take the domain name without TLD
                    projectName = parts[0];
                }
            } catch (e) {
                console.error("Invalid siteUrl:", siteUrl, e);
            }
        }

        // Store inside projectName/registration folder
        const BLOB_PATH = `${projectName}/registration/${web_token}.json`;

        const newEntry = {
            id: defaultValue(incoming.id, "0") as string | null,
            // edition_id: defaultValue(incoming.edition_id, "0"),
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
            // sub_type: defaultValue(incoming.sub_type),
            reg_type: defaultValue(incoming.reg_type),
            price_type: defaultValue(incoming.price_type),
            discount_reg: defaultValue(incoming.discount_reg),
            discount_accom: defaultValue(incoming.discount_accom),
            total_price: defaultValue(incoming.total_price),
            // currency_rate: defaultValue(incoming.currency_rate),
            // created_dt: defaultValue(incoming.created_dt),
            // updated_dt: defaultValue(incoming.updated_dt),
            status: defaultValue(incoming.status),
            // url_link: null,
            reg_date: defaultValue(incoming.reg_date),
            // transaction_id: null,
            // attempt: defaultValue(incoming.attempt, "1"),
            // viewed_by: null,
            // viewed_status: "0",
            // viewed_dt: defaultValue(incoming.viewed_dt),
            // reply_status: "0",
            // reply_by: null,
            // reply_dt: defaultValue(incoming.reply_dt),
            type: "Registration",
            email_check_status: "0",
            // created_by: "User",
            // received_dt: defaultValue(incoming.received_dt),
            // payment_type: "",
            web_token: web_token,
            cid: defaultValue(incoming.cid),
            // description: "",
            other_info: null,
            site_url: siteUrl,

        };

        // ✅ Check if a blob with the same token already exists in this folder
        const blobs = await list();
        const alreadyExists = blobs.blobs.find(b => b.pathname === BLOB_PATH);
        if (alreadyExists) {
            return NextResponse.json({ success: false, error: "Token already exists" }, { status: 409 });
        }

        // ✅ Upload to the correct folder path
        const uploaded = await put(BLOB_PATH, JSON.stringify(newEntry, null, 2), {
            access: "public",
            contentType: "application/json",
        });

        return NextResponse.json({ success: true, web_token, url: uploaded.url });
    } catch (error) {
        console.error("Error saving registration data:", error);
        return NextResponse.json({ success: false, error: "Unable to save registration data" }, { status: 500 });
    }
}