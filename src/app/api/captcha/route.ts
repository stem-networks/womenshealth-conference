import { NextResponse } from "next/server";

export async function GET() {
  const text = Math.random().toString(36).substring(2, 6);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
    <rect width="100%" height="100%" fill="#eee" />
    <text x="10" y="35" font-size="24" font-family="Arial">${text}</text>
  </svg>`;

  const captchaId = Math.random().toString(36).substring(2, 10);
  const cookieValue = JSON.stringify({ id: captchaId, text });

  // ✅ Set cookie on the response object
  const response = NextResponse.json({
    captchaId,
    captchaData: svg,
  });

  response.cookies.set('captcha', cookieValue, {
    maxAge: 60 * 5, // 5 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
