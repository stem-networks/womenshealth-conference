import { Suspense } from "react";
import RegisterDetailsClient from "../components/RegisterDetails";
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
    // const baseUrl = process.env.BASE_URL || '';
    const canonicalPath = "/register_details"; // hardcode since we know this is sessions page
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
      title: "Register",
      description: "Explore the Register of the conference.",
      keywords: "",
    };
  }
}

export default function RegisterDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterDetailsClient />
    </Suspense>
  );
}
