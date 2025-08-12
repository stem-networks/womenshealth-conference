import BannerSection from "./components/BannerSection";
// import SessionsComponent from "./components/SessionContent";
// import MainSlider from "./components/MainSlider";
// import ImportantDates from "./components/ImportantDates";
// import FaqsMain from "./components/FaqsMain";
// import AbstractNetwork from "./components/AbstractNetwork";
// import Downloads from "./components/Downloads";
// import VolunteerCommunity from "./components/VolunteerCommunity";
// import Venue from "./components/Venue";
// import { Metadata } from "next";
// import {
//   IndexPageData,
//   ApiResponse,
//   CommonContent,
//   RegistrationInfo,
// } from "@/types";
// import { getBaseUrl } from "@/lib/getBaseUrl";
// import {
//   emptyApiResponse,
//   emptyIndexPageData,
//   emptyCommonContent,
//   emptyRegisterInfo,
// } from "@/lib/fallbacks";
// import Members from "./components/Members";
// import WelcomeMessage from "./components/WelcomeMessage";
// import Link from "next/link";

// async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
//   try {
//     return await fn();
//   } catch (e) {
//     console.error("SSR fetch failed:", e);
//     return fallback;
//   }
// }

// async function fetchGeneralData(): Promise<ApiResponse> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
//   if (!res.ok) throw new Error("Failed to fetch general data");
//   return res.json();
// }

// async function fetchIndexPageData(): Promise<IndexPageData> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/index-page`, {
//     method: "POST",
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch index page data");
//   return res.json();
// }

// async function fetchRegPageData(): Promise<RegistrationInfo> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/reg-page-data`, {
//     method: "POST",
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch registration page data");
//   return res.json();
// }

// async function fetchCommonData(): Promise<CommonContent> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/common-content`, {
//     method: "POST",
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch common content");
//   return res.json();
// }

// async function fetchGeneralDataStatic(): Promise<ApiResponse> {
//   const baseUrl = getBaseUrl();
//   const res = await fetch(`${baseUrl}/api/general`, {
//     next: { revalidate: 3600 }, // Cache for 1 hour
//   });
//   if (!res.ok) throw new Error("Failed to fetch general data statically");
//   return res.json();
// }

// // Metadata generator
// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const generalData = await fetchGeneralDataStatic();
//     const meta = generalData?.pages?.index?.[0] || {
//       title: "Conference",
//       content:
//         "Discover engaging sessions and expert talks at our global conference event.",
//       meta_keywords: "",
//     };

//     // Canonical
//     const baseUrl = getBaseUrl() || "";
//     const canonicalURL = `${baseUrl}/`;

//     return {
//       title: meta.title,
//       description: meta.content,
//       keywords: meta.meta_keywords,
//       metadataBase: new URL(baseUrl),
//       alternates: {
//         canonical: canonicalURL,
//       },
//     };
//   } catch (error) {
//     console.error("Metadata generation error:", error);
//     return {
//       title: "Conference",
//       description:
//         "Discover engaging sessions and expert talks at our global conference event.",
//       keywords: "",
//     };
//   }
// }

const Home = async () => {
  // const [general, indexPageData] =
  //   await Promise.all([
  //     safeFetch<ApiResponse>(fetchGeneralData, emptyApiResponse),
  //     safeFetch<IndexPageData>(fetchIndexPageData, emptyIndexPageData),
  //     safeFetch<CommonContent>(fetchCommonData, emptyCommonContent),
  //     safeFetch<RegistrationInfo>(fetchRegPageData, emptyRegisterInfo),
  //   ]);

  // const general_info = general?.data || emptyApiResponse.data;
  // const sessions = indexPageData?.sessions || [];
  // const sessionContent =
  //   indexPageData?.oneliner?.sessions?.content ||
  //   "Session content will be updated soon.";

  return (
    <div>
      <BannerSection
      />
      {/*<WelcomeMessage />
      <Members />
      <SessionsComponent
        generalInfo={general_info}
        sessions={sessions}
        sessionContent={sessionContent}
      />
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
      /> */}


      {/* <div className="modal" id="myModal" role="dialog">
        <div
          className="modal-dialog modal-confirm fade-in"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold text-danger">Important Update</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <h4 className="modal-title w-100"></h4>
               <p className="mb-2">
          Due to unforeseen circumstances, the conference has been <strong>postponed to 2026</strong>.
        </p>
        <p className="mb-2">We will share the updated dates and details soon.</p>
        <p className="mb-2">
          For any queries, please write to:{" "}
          <Link href="mailto:nwgc@stemnetwork.net" className="text-decoration-none fw-semibold">
            nwgc@stemnetwork.net
          </Link>
        </p>
        <p className="mb-0">Thank you for your understanding and continued support.</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success btn-block"
              // onClick={handleSuccess}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Home;
