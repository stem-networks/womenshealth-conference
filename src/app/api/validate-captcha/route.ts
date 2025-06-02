import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, captchaId } = await req.json();

    if (!captchaId || !text) {
      return NextResponse.json({ valid: false, error: "Missing captchaId or text" }, { status: 400 });
    }

    // ✅ Get cookies from the request
    const captchaCookie = req.cookies.get('captcha')?.value;

    if (!captchaCookie) {
      return NextResponse.json({ valid: false, error: "Captcha not found or expired" });
    }

    const { id: storedId, text: storedText } = JSON.parse(captchaCookie);

    if (captchaId !== storedId) {
      return NextResponse.json({ valid: false, error: "Invalid captcha ID" });
    }

    const isValid = text.toLowerCase() === storedText.toLowerCase();

    // ✅ Clear the cookie by setting maxAge: 0 in the response
    const response = NextResponse.json({ valid: isValid });
    response.cookies.set('captcha', '', {
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
