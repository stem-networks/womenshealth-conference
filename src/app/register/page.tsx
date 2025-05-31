// src/app/faqs/page.tsx
import { Metadata } from "next";
import { ApiResponse, RegistrationInfo } from "@/types";
import Registration from "../components/Registration";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

async function fetchRegisterData(): Promise<RegistrationInfo> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/reg-page-data`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch index page data");
  return res.json();
}

// For Metadata (SEO)
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
    console.error("Metadata generation error faq:", error);
    return {
      title: "FAQs",
      description: "Explore the FAQs of the conference.",
      keywords: "",
    };
  }
}

// ✅ SSR Page Component
const RegisterPage = async () => {
  const [general, registerData] = await Promise.all([
    fetchGeneralData(),
    fetchRegisterData(),
  ]);

  return <Registration generalData={general} registerData={registerData} />;
};

export default RegisterPage;
