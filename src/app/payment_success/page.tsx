// File: app/payment_success/page.tsx
import PaymentSuccess from "../components/PaymentSuccess";
import { ApiResponse } from "@/types";
import { Metadata } from "next";

import { getBaseUrl } from "@/lib/getBaseUrl";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // const generalData = await fetchGeneralData();
    // const meta = generalData?.pages?.sessions_meta?.[0] || {
    //     title: "Sessions",
    //     content: "Explore the sessions of the conference.",
    //     meta_keywords: "",
    // };

    // Canonical
    // const baseUrl = process.env.BASE_URL || "";
    const canonicalPath = "/payment_success"; // hardcode since we know this is sessions page
    const canonicalURL = `${getBaseUrl()}${canonicalPath}`;

    return {
      // title: meta.title,
      // description: meta.content,
      // keywords: meta.meta_keywords,
      metadataBase: new URL(getBaseUrl()),
      alternates: {
        canonical: canonicalURL,
      },
    };
  } catch (error) {
    console.error("Metadata generation error sessions:", error);
    return {
      title: "Register Details",
      description: "Explore the Register of the conference.",
      keywords: "",
    };
  }
}

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

const PaymentSuccessPage = async () => {
  const general = await fetchGeneralData();
  return <PaymentSuccess generalData={general} />;
};

export default PaymentSuccessPage;
