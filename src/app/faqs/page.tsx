// src/app/faqs/page.tsx
import { Metadata } from "next";
import { ApiResponse, CommonContent } from "@/types";
import Faqs from "../components/Faqs";

import { getBaseUrl } from "@/lib/getBaseUrl";

// async function fetchGeneralData(): Promise<ApiResponse> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Failed to fetch general data");
//   return res.json();
// }

async function fetchCommonData(): Promise<CommonContent> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/common-content`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch index page data");
  return res.json();
}
async function fetchGeneralDataStatic(): Promise<ApiResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/general`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) throw new Error("Failed to fetch general data statically");
  return res.json();
}
// For Metadata (SEO)
export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralDataStatic();
    const meta = generalData?.pages?.FAQ?.[0] || {
      title: "FAQ",
      content: "Explore the FAQ of the conference.",
      meta_keywords: "",
    };

    // Canonical
    // const baseUrl = process.env.BASE_URL || "";
    const canonicalPath = "/faqs"; // hardcode since we know this is sessions page
    const canonicalURL = `${getBaseUrl()}${canonicalPath}`;

    return {
      title: meta.title,
      description: meta.content,
      keywords: meta.meta_keywords,
      metadataBase: new URL(getBaseUrl()),
      alternates: {
        canonical: canonicalURL,
      },
    };
  } catch (error) {
    console.error("Metadata generation error faq:", error);
    return {
      title: "FAQs",
      description: "Explore the FAQs of the conference.",
      keywords: "",
    };
  }
}

// SSR Page Component
const FaqsPage = async () => {
  const [commonContent] = await Promise.all([fetchCommonData()]);

  const faqsContent = commonContent?.data?.faq || [];

  return (
    <Faqs
      //   generalInfo={general_info}
      faqsContent={faqsContent}
    />
  );
};

export default FaqsPage;
