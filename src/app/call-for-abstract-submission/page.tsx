import React from "react";
import AbstractSubmission from "../components/AbstractSubmission";
import { Metadata } from "next";
import { ApiResponse } from "@/types";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralData();
    const meta = generalData?.pages?.submit_abstract?.[0] || {
      title: "Sessions",
      content: "Explore the sessions of the conference.",
      meta_keywords: "",
    };

    return {
      title: meta.title,
      description: meta.content,
      keywords: meta.meta_keywords,
    };
  } catch (error) {
    console.error("Metadata generation error sessions:", error);
    return {
      title: "Sessions",
      description: "Explore the sessions of the conference.",
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
