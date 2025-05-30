import { NextRequest, NextResponse } from "next/server";

const captchaStore = new Map<string, string>();

// Example: you would have this populated by /api/captcha

export async function POST(req: NextRequest) {
  try {
    const { text, captchaId } = await req.json();

    if (!captchaId || !text) {
      return NextResponse.json({ valid: false, error: "Missing captchaId or text" }, { status: 400 });
    }

    // Lookup expected captcha text from the store
    const expectedText = captchaStore.get(captchaId);

    if (!expectedText) {
      // expired or invalid captchaId
      return NextResponse.json({ valid: false, error: "Captcha not found or expired" });
    }

    const isValid = text.toLowerCase() === expectedText.toLowerCase();

    // Optionally: remove captcha after one validation to prevent reuse
    captchaStore.delete(captchaId);

    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
