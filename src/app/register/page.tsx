// src/app/faqs/page.tsx
import { Metadata } from "next";
import { ApiResponse, RegistrationInfo } from "@/types";
import Registration from "../components/Registration";

import { getBaseUrl } from "@/lib/getBaseUrl";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

async function fetchRegisterData(): Promise<RegistrationInfo> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/reg-page-data`, {
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
    const meta = generalData?.pages?.register?.[0] || {
      title: "Register",
      content: "Explore the Register of the conference.",
      meta_keywords: "",
    };

    // Canonical
    // const baseUrl = process.env.BASE_URL || "";
    const canonicalPath = "/register"; // hardcode since we know this is sessions page
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
      title: "Register",
      description: "Explore the Register of the conference.",
      keywords: "",
    };
  }
}

//  SSR Page Component
const RegisterPage = async () => {
  const [general, registerData] = await Promise.all([
    fetchGeneralData(),
    fetchRegisterData(),
  ]);

  return <Registration generalData={general} registerData={registerData} />;
};

export default RegisterPage;
