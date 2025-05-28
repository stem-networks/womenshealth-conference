// app/sessions/page.tsx

import { Metadata } from "next";
import { IndexPageData, ApiResponse } from "@/types";
import SessionsComponent from "../components/SessionContent";

async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

async function fetchIndexPageData(): Promise<IndexPageData> {
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/index-page`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch index page data");
  return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralData();
    const meta = generalData?.pages?.sessions_meta?.[0] || {
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

const SessionsPage = async () => {
  const [general, indexPageData] = await Promise.all([
    fetchGeneralData(),
    fetchIndexPageData(),
  ]);

  const general_info = general?.data || {};
  const sessions = indexPageData.sessions || [];

  const sessionContent =
    indexPageData?.oneliner?.sessions?.content ||
    "Session content will be updated soon.";

    

  return (
    <SessionsComponent
      generalInfo={general_info}
      sessions={sessions}
      sessionContent={sessionContent}
    />
  );
};

export default SessionsPage;
