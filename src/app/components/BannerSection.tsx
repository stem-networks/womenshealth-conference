"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { ApiResponse, IndexPageData } from "@/types";
import countries from "../../data/countries";

interface BrochureFormData {
  first_name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  interested_in: string;
}

interface BrochureFormErrors {
  first_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  message?: string;
  interested_in?: string;
  [key: string]: string | undefined;
}

interface BannerSectionProps {
  generalbannerInfo: ApiResponse;
  onelinerBannerInfo: IndexPageData;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  generalbannerInfo,
  onelinerBannerInfo,
}) => {
  // Modal for Brochure
  const [brochureFormData, setBrochureFormData] = useState<BrochureFormData>({
    first_name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    interested_in: "Oral Presentation",
  });
  const [brochureFormErrors, setBrochureFormErrors] =
    useState<BrochureFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal9, setShowModal9] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side

    if (shouldShowModal()) {
      const timer = setTimeout(() => {
        setShowModal9(true);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, []);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const interestedInRef = useRef<HTMLSelectElement>(null);

  const general = generalbannerInfo?.data || {};
  const importantDates = onelinerBannerInfo?.importantDates || [];
  const bannerContent = onelinerBannerInfo?.bannerContent || {};

  // SAFE: always ensures array (Object.values on {} is [])
  const bannerItems = Array.isArray(bannerContent)
    ? bannerContent
    : Object.values(bannerContent || {});

  // Prevent crash: if no items, return null early
  if (!bannerItems || bannerItems.length === 0) return null;

  // Safe destructure with default empty object
  const firstBanner = bannerItems[0] || {};
  const headding = firstBanner.headding || "";
  const tag_line = firstBanner.tag_line || "";
  const content = firstBanner.content || "";

  const earlyBirdDateRaw = importantDates?.[1]?.date || "";

  const formattedEarlyBirdDate = earlyBirdDateRaw
    .replace(/<sub>/g, "<sup>")
    .replace(/<\/sub>/g, "</sup>")
    .replace(/<br\s*\/?>/g, " ");

  const openBrochureModal = () => {
    setShowModal9(true);
  };

  const closeBrochureModal = () => {
    setShowModal9(false);
    // Store the close time in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("brochureFormClosed", Date.now().toString());
    }
  };

  const handleSuccess = (): void => {
    setShowModal4(false);
    setShowModal5(false);
  };

  const handleSubmitBrochure = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateBrochureForm(brochureFormData);

    if (Object.keys(errors).length > 0) {
      setBrochureFormErrors(errors);

      const firstErrorField = Object.keys(errors)[0];
      const firstErrorMessage =
        errors[firstErrorField as keyof BrochureFormErrors];
      toast.error(firstErrorMessage);

      switch (firstErrorField) {
        case "first_name":
          nameRef.current?.focus();
          break;
        case "email":
          emailRef.current?.focus();
          break;
        case "phone":
          phoneRef.current?.focus();
          break;
        case "country":
          countryRef.current?.focus();
          break;
      }
      return;
    }

    setBrochureFormErrors({});
    setIsSubmitting(true);

    try {
      if (typeof window !== "undefined")
        localStorage.setItem("brochureFormSubmitted", Date.now().toString());

      // Encode payload values using btoa
      const payload = {
        first_name: btoa(brochureFormData.first_name.trim()),
        email: btoa(brochureFormData.email.trim()),
        phone: btoa(brochureFormData.phone.trim()),
        country: btoa(brochureFormData.country.trim()),
        message: btoa(brochureFormData.message.trim()),
        interested_in: btoa(brochureFormData.interested_in.trim()),
      };

      const response = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        handleDownload();
        closeBrochureModal();

        setBrochureFormData({
          first_name: "",
          email: "",
          phone: "",
          country: "",
          message: "",
          interested_in: "",
        });

        setBrochureFormErrors({});
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateBrochureForm = (
    data: typeof brochureFormData
  ): BrochureFormErrors => {
    const errors: BrochureFormErrors = {};

    if (!data.first_name?.trim()) {
      errors.first_name = "Name is required";
    } else if (!data.email?.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    } else if (!data.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (!data.country?.trim()) {
      errors.country = "Country is required";
    }
    return errors;
  };

  const handleDownload = async () => {
    const conferenceName = `${general.clogotext}`;
    const brochureFile = `${conferenceName}_Brochure.pdf`;
    const brochureURL = `/${brochureFile}`;

    try {
      const response = await fetch(brochureURL);
      if (response.ok) {
        const link = document.createElement("a");
        link.href = brochureURL;
        link.setAttribute("download", brochureFile);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setShowModal4(true);
      } else {
        console.error("File not found or failed to download");
        setShowModal5(true);
      }
    } catch (error) {
      console.error("Error downloading the file:", error);
      setShowModal5(true);
    }
  };

  const shouldShowModal = (): boolean => {
    if (typeof window === "undefined") return true;
    const lastInteraction = localStorage.getItem("brochureFormClosed");
    if (!lastInteraction) return true;

    const lastInteractionTime = parseInt(lastInteraction, 10);
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastInteractionTime;
    return timeElapsed >= 24 * 60 * 60 * 1000;
  };

  return (
    <div>
      {/* ... rest of your component remains unchanged ... */}
      {/* (paste in your full modal/component JSX as you already have) */}
      {/* No code change required below here except as shown above */}
    </div>
  );
};

export default BannerSection;
