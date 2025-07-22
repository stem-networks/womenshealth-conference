// Components
// import WelcomeMessage from "./components/WelcomeMessage";
// import Members from "./components/Members";
// import Speakers from "./components/Speakers";
import BannerSection from "./components/BannerSection";
import SessionsComponent from "./components/SessionContent";
import MainSlider from "./components/MainSlider";
import ImportantDates from "./components/ImportantDates";
import FaqsMain from "./components/FaqsMain";
import AbstractNetwork from "./components/AbstractNetwork";
import Downloads from "./components/Downloads";
import VolunteerCommunity from "./components/VolunteerCommunity";
import Venue from "./components/Venue";

// Types
import { Metadata } from "next";
import {
  IndexPageData,
  ApiResponse,
  CommonContent,
  RegistrationInfo,
} from "@/types";

import { getBaseUrl } from "@/lib/getBaseUrl";

// Fetch functions
async function fetchGeneralData(): Promise<ApiResponse> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch general data");
  return res.json();
}

async function fetchIndexPageData(): Promise<IndexPageData> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/index-page`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch index page data");
  return res.json();
}

async function fetchRegPageData(): Promise<RegistrationInfo> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/reg-page-data`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch registration page data");
  return res.json();
}

async function fetchCommonData(): Promise<CommonContent> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/common-content`, {
    method: "POST",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch common content");
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

// Metadata generator
export async function generateMetadata(): Promise<Metadata> {
  try {
    const generalData = await fetchGeneralDataStatic();
    const meta = generalData?.pages?.index?.[0] || {
      title: "Conference",
      content:
        "Discover engaging sessions and expert talks at our global conference event.",
      meta_keywords: "",
    };

    // Canonical
    const baseUrl = getBaseUrl() || "";
    const canonicalURL = `${baseUrl}/`;

    console.log("Loaded ENV Vars", {
      API_URL: process.env.API_URL,
      BASE_URL: getBaseUrl(),
    });

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
    console.error("Metadata generation error:", error);
    return {
      title: "Conference",
      description:
        "Discover engaging sessions and expert talks at our global conference event.",
      keywords: "",
    };
  }
}

// Main page component
const Home = async () => {
  const [general, indexPageData, commonContent, registerData] =
    await Promise.all([
      fetchGeneralData(),
      fetchIndexPageData(),
      fetchCommonData(),
      fetchRegPageData(),
    ]);
  // console.log('Sessions',indexPageData)

  const general_info = general?.data || {};
  const sessions = indexPageData.sessions || [];

  const sessionContent =
    indexPageData?.oneliner?.sessions?.content ||
    "Session content will be updated soon.";

  return (
    <div>
      <BannerSection
        generalbannerInfo={general}
        onelinerBannerInfo={indexPageData}
      />
      {/* <WelcomeMessage />
      <Members /> */}
      {/* Uncomment when sessions are ready */}
      <SessionsComponent
        generalInfo={general_info}
        sessions={sessions}
        sessionContent={sessionContent}
      />
      {/* <Speakers /> */}
      <MainSlider generalInfo={general} registerInfo={registerData} />
      <ImportantDates onelinerInfo={indexPageData} />
      <FaqsMain commonInfo={commonContent} />
      <Venue onelinerVenueInfo={indexPageData} />
      <AbstractNetwork
        generalAbstractInfo={general}
        onelinerAbstractInfo={indexPageData}
      />
      <Downloads generalDownloadsInfo={general} />
      <VolunteerCommunity
        generalVolunteerInfo={general}
        onelinerVolunteerInfo={indexPageData}
      />
    </div>
  );
};

export default Home;
