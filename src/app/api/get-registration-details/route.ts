// // app/api/get-registration-details/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { web_token } = body;

//     if (!web_token) {
//       return NextResponse.json({ error: 'Missing web_token' }, { status: 400 });
//     }

//     const postData = {
//       module_name: 'registration_details',
//       keys: {
//         data: [{ web_token }],
//       },
//       cid: process.env.CID,
//     };

//     const externalResponse = await fetch(process.env.API_URL!, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     });

//     const data = await externalResponse.json();

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Server API error:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

// app/api/get-registration-details/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { web_token } = await req.json();

    if (!web_token || typeof web_token !== "string") {
      return NextResponse.json({ success: false, error: "Missing web_token" }, { status: 400 });
    }

    const BLOB_URL = `https://ikpc0vchliaejkc2.public.blob.vercel-storage.com/registration/${web_token}.json`;

    try {
      const response = await fetch(BLOB_URL);

      if (!response.ok) {
        throw new Error("Blob not found");
      }

      const data = await response.json();

      return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err) {
      console.error("Blob fetch error:", err);
      return NextResponse.json({ success: false, error: "User data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}


