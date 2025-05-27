// app/api/paypal-client-id/route.ts (for App Router)
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    clientId: process.env.PAYPAL_CLIENT_ID || "", // No NEXT_PUBLIC_ prefix
  });
}
