import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Inject private CID server-side
    const newBody = {
      ...body,
      cid: process.env.CID, // only available on server
    };

    const response = await fetch(`${process.env.DISCOUNT_CHECK_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error forwarding request:", errorMessage);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
