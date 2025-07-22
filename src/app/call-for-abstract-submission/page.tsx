import React from "react";
import AbstractSubmission from "../components/AbstractSubmission";
import { Metadata } from "next";
import { ApiResponse } from "@/types";

import { getBaseUrl } from "@/lib/getBaseUrl";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralDataStatic();
    const meta = generalData?.pages?.submit_abstract?.[0] || {
      title: "Abstract Submission",
      content: "Explore the Abstract Submission of the conference.",
      meta_keywords: "",
    };

    // Canonical
    const baseUrl = process.env.BASE_URL || "";
    const canonicalPath = "/call-for-abstract-submission"; // hardcode since we know this is sessions page
    const canonicalURL = `${baseUrl}${canonicalPath}`;

    return {
      title: meta.title,
      description: meta.content,
      keywords: meta.meta_keywords,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: canonicalURL,
      },
    };
  } catch (error) {
    console.error("Metadata generation error Abstract Submission:", error);
    return {
      title: "Abstract Submission",
      description: "Explore the Abstract Submission of the conference.",
      keywords: "",
    };
  }
}

const SubmitAbstractPage = async () => {
  const [general] = await Promise.all([fetchGeneralData()]);
  return (
    <div>
      <AbstractSubmission generalInfo={general} />
    </div>
  );
};

export default SubmitAbstractPage;
