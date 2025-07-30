// // app/api/send-to-telegram/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name")?.toString() || "N/A";
//     const email = formData.get("email")?.toString() || "N/A";
//     const errorMessage =
//       formData.get("error_message")?.toString() || "No error message";
//     const formBased = formData.get("form_based")?.toString() || "Unknown Form";

//     // Prepare the message
//     const message = `
// *Frontend Error Log* 

//  *Form:* ${formBased}
//  *Name:* ${name}
//  *Email:* ${email}
//  *Error:* ${errorMessage}
//     `.trim();

//     // Encode message for Telegram
//     const encodedMessage = encodeURIComponent(message);

//     // Send to Telegram bot API
//     const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`;

//     await axios.get(telegramUrl);

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Telegram log error:", err);
//     return NextResponse.json(
//       { success: false, error: "Failed to log error to Telegram" },
//       { status: 500 }
//     );
//   }
// }

// app/api/send-to-telegram/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "N/A";
    const siteName = formData.get("siteName")?.toString() || "N/A";
    const email = formData.get("email")?.toString() || "N/A";
    const errorMessage =
      formData.get("error_message")?.toString() || "No error message";
    const formBased = formData.get("form_based")?.toString() || "Unknown Form";

    // Prepare the message
    const message = `
*Frontend Error Log* 

*Form:* ${formBased}
*Name:* ${name}
*Email:* ${email}

*Error:* ${errorMessage}

*Site Name:* ${siteName}
    `.trim();

    // Encode message for Telegram
    const encodedMessage = encodeURIComponent(message);

    // Send to Telegram bot API
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodedMessage}&parse_mode=Markdown`;

    await axios.get(telegramUrl);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Telegram log error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to log error to Telegram" },
      { status: 500 }
    );
  }
}
