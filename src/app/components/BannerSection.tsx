"use client";

import React, { useState, useRef } from "react";
// import { toast } from "react-toastify";
import Link from "next/link";
// import { ApiResponse, IndexPageData } from "@/types";
// import countries from "../../data/countries";

// interface BrochureFormData {
//   first_name: string;
//   email: string;
//   phone: string;
//   country: string;
//   message: string;
//   interested_in: string;
// }

// interface BrochureFormErrors {
//   first_name?: string;
//   email?: string;
//   phone?: string;
//   country?: string;
//   message?: string;
//   interested_in?: string;
//   [key: string]: string | undefined;
// }

// interface BannerSectionProps {
//   generalbannerInfo: ApiResponse;
//   onelinerBannerInfo: IndexPageData;
// }

// type BannerContentItem = {
//   headding?: string;
//   tag_line?: string;
//   content?: string;
// };

// type ImportantDate = { date?: string };

// ——— Main Component
const BannerSection = () => {
  // Modal for Brochure
  // const [brochureFormData, setBrochureFormData] = useState<BrochureFormData>({
  //   first_name: "",
  //   email: "",
  //   phone: "",
  //   country: "",
  //   message: "",
  //   interested_in: "Oral Presentation",
  // });
  // const [brochureFormErrors, setBrochureFormErrors] =
  //   useState<BrochureFormErrors>({});
  // // const [isSubmitting, setIsSubmitting] = useState(false);
  // // const [showModal9, setShowModal9] = useState(false);
  const [showModal4, setShowModal4] = useState(true);
  // // const [showModal5, setShowModal5] = useState(false);
  // const [modalType, setModalType] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);

  // const shouldShowModal = (): boolean => {
  //   if (typeof window === "undefined") return true;
  //   const lastInteraction = localStorage.getItem("TentativeFormClosed");
  //   if (!lastInteraction) return true;

  //   const lastInteractionTime = parseInt(lastInteraction, 10);
  //   const currentTime = Date.now();
  //   const timeElapsed = currentTime - lastInteractionTime;
  //   return timeElapsed >= 24 * 60 * 60 * 1000;
  // };

  // useEffect(() => {
  //   if (typeof window === "undefined") return; // Ensure client-side

  //   if (shouldShowModal()) {
  //     const timer = setTimeout(() => {
  //       setModalType('tentative')
  //       // setShowModal9(true);
  //     }, 20000);

  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // const nameRef = useRef<HTMLInputElement>(null);
  // const emailRef = useRef<HTMLInputElement>(null);
  // const phoneRef = useRef<HTMLInputElement>(null);
  // const countryRef = useRef<HTMLSelectElement>(null);
  // // const interestedInRef = useRef<HTMLSelectElement>(null);

  // const general = generalbannerInfo?.data || {};

  // // ✦ Defensive typing for importantDates
  // const importantDates: ImportantDate[] = Array.isArray(
  //   onelinerBannerInfo?.importantDates
  // )
  //   ? (onelinerBannerInfo.importantDates as ImportantDate[])
  //   : [];

  // // ✦ bannerContent: array or object, handle both
  // const bannerContentRaw = onelinerBannerInfo?.bannerContent ?? {};
  // let bannerItems: BannerContentItem[] = [];
  // if (Array.isArray(bannerContentRaw)) {
  //   bannerItems = bannerContentRaw as BannerContentItem[];
  // } else if (bannerContentRaw && typeof bannerContentRaw === "object") {
  //   bannerItems = Object.values(bannerContentRaw) as BannerContentItem[];
  // }

  // if (!bannerItems.length) return null;

  // const firstBanner: BannerContentItem = bannerItems[0] || {};
  // const headding = firstBanner.headding ?? "";
  // const tag_line = firstBanner.tag_line ?? "";
  // const content = firstBanner.content ?? "";

  // const earlyBirdDateRaw: string =
  //   (importantDates[1] && importantDates[1].date) || "";

  // const formattedEarlyBirdDate = earlyBirdDateRaw
  //   ? earlyBirdDateRaw
  //     .replace(/<sub>/g, "<sup>")
  //     .replace(/<\/sub>/g, "</sup>")
  //     .replace(/<br\s*\/?>/g, " ")
  //   : "";

  // const openBrochureModal = (type: 'brochure' | 'tentative') => {
  //   setModalType(type); // 'brochure' or 'tentative'
  //   // setShowModal9(true);
  // }

  // const closeBrochureModal = () => {
  //   setShowModal9(false);
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("TentativeFormClosed", Date.now().toString());
  //   }
  // };

  const handleSuccess = (): void => {
    setShowModal4(false);
    // setShowModal5(false);
  };

  // const handleSubmitBrochure = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const errors = validateBrochureForm(brochureFormData);

  //   if (Object.keys(errors).length > 0) {
  //     setBrochureFormErrors(errors);

  //     const firstErrorField = Object.keys(errors)[0];
  //     const firstErrorMessage =
  //       errors[firstErrorField as keyof BrochureFormErrors];
  //     toast.error(firstErrorMessage);

  //     switch (firstErrorField) {
  //       case "first_name":
  //         nameRef.current?.focus();
  //         break;
  //       case "email":
  //         emailRef.current?.focus();
  //         break;
  //       case "phone":
  //         phoneRef.current?.focus();
  //         break;
  //       case "country":
  //         countryRef.current?.focus();
  //         break;
  //     }
  //     return;
  //   }

  //   setBrochureFormErrors({});
  //   setIsSubmitting(true);

  //   try {
  //     if (typeof window !== "undefined")
  //       localStorage.setItem("brochureFormSubmitted", Date.now().toString());

  //     const payload = {
  //       first_name: btoa(brochureFormData.first_name.trim()),
  //       email: btoa(brochureFormData.email.trim()),
  //       phone: btoa(brochureFormData.phone.trim()),
  //       country: btoa(brochureFormData.country.trim()),
  //       message: btoa(brochureFormData.message.trim()),
  //       interested_in: btoa(brochureFormData.interested_in.trim()),
  //       modalType,
  //     };

  //     const response = await fetch("/api/brochure", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       handleDownload();
  //       closeBrochureModal();
  //       setBrochureFormData({
  //         first_name: "",
  //         email: "",
  //         phone: "",
  //         country: "",
  //         message: "",
  //         interested_in: "",
  //       });
  //       setBrochureFormErrors({});
  //     } else {
  //       toast.error("Failed to submit form. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("An error occurred. Please try again later.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const validateBrochureForm = (
  //   data: typeof brochureFormData
  // ): BrochureFormErrors => {
  //   const errors: BrochureFormErrors = {};

  //   if (!data.first_name?.trim()) {
  //     errors.first_name = "Name is required";
  //   } else if (!data.email?.trim()) {
  //     errors.email = "Email address is required";
  //   } else if (!/\S+@\S+\.\S+/.test(data.email)) {
  //     errors.email = "Email address is invalid";
  //   } else if (!data.phone?.trim()) {
  //     errors.phone = "Phone number is required";
  //   } else if (!data.country?.trim()) {
  //     errors.country = "Country is required";
  //   }
  //   return errors;
  // };

  // const handleDownload = async () => {
  //   const conferenceName = `${general.clogotext}`;
  //   // const brochureFile = `${conferenceName}_Brochure.pdf`;
  //   // const brochureURL = `/${brochureFile}`;

  //   let fileName = '';
  //   let fileURL = '';

  //   if (modalType === 'tentative') {
  //     fileName = `${conferenceName} Scientific Program.pdf`;
  //     fileURL = `${fileName}`;
  //   } else {
  //     fileName = `${conferenceName}_Brochure.pdf`;
  //     fileURL = `/${fileName}`;
  //   }

  //   try {
  //     const response = await fetch(fileURL);
  //     if (response.ok) {
  //       const link = document.createElement("a");
  //       link.href = fileURL;
  //       link.setAttribute("download", fileName);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);

  //       setShowModal4(true);
  //     } else {
  //       console.error("File not found or failed to download");
  //       setShowModal5(true);
  //     }
  //   } catch (error) {
  //     console.error("Error downloading the file:", error);
  //     setShowModal5(true);
  //   }
  // };

  return (
    <div>
      {showModal4 && (
        <div className="modal" id="myModal" role="dialog">
          <div
            className="modal-dialog modal-confirm fade-in"
            role="document"
            ref={modalRef}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="bx bx-calendar"
                    style={{ marginBottom: "35px" }}
                  >
                  </i>
                </div>
                <h4 className="modal-title w-100">Important Update</h4>
                <p className="mb-2" style={{ fontSize: "16px" }}>
                  Due to unforeseen circumstances, the conference has been <strong>postponed to 2026</strong>.
                </p>
                <p className="mb-2" >We will share the updated dates and details soon.</p>
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
                  onClick={handleSuccess}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default BannerSection;
