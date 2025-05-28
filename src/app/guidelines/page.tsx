import Guidelines from "../components/Guidelines";
import { Metadata } from "next";
import { ApiResponse, CommonContent } from "@/types";

// Fetch general data for SEO metadata
async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

// Fetch common content (includes guidelines)
async function fetchCommonData(): Promise<CommonContent> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/common-content`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch common content");
  return res.json();
}

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralData();
    const meta = generalData?.pages?.FAQ?.[0] || {
      title: "FAQ",
      content: "Explore the FAQ of the conference.",
      meta_keywords: "",
    };

    return {
      title: meta.title,
      description: meta.content,
      keywords: meta.meta_keywords,
    };
  } catch (error) {
    console.error("Metadata generation error guidelines:", error);
    return {
      title: "FAQs",
      description: "Explore the FAQs of the conference.",
      keywords: "",
    };
  }
}

// ✅ Server Component
const GuidelinesPage = async () => {
  const commonContent = await fetchCommonData();

  // ✅ Access guidelines directly — no .data
  const guidelinesContentMain = commonContent?.data?.guidelines;
  const guidelinesContent = guidelinesContentMain?.content ?? "";

  return (
    <>
      <Guidelines guidelinesContent={guidelinesContent} />
    </>
  );
};

export default GuidelinesPage;
