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

type BannerContentItem = {
  headding?: string;
  tag_line?: string;
  content?: string;
};

type ImportantDate = { date?: string };

// ——— Main Component
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
  const [modalType, setModalType] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);

  const shouldShowModal = (): boolean => {
    if (typeof window === "undefined") return true;
    const lastInteraction = localStorage.getItem("BrochureFormClosed");
    if (!lastInteraction) return true;

    const lastInteractionTime = parseInt(lastInteraction, 10);
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastInteractionTime;
    return timeElapsed >= 24 * 60 * 60 * 1000;
  };

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side

    if (shouldShowModal()) {
      const timer = setTimeout(() => {
        setModalType('brochure')
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

  // ✦ Defensive typing for importantDates
  const importantDates: ImportantDate[] = Array.isArray(
    onelinerBannerInfo?.importantDates
  )
    ? (onelinerBannerInfo.importantDates as ImportantDate[])
    : [];

  // ✦ bannerContent: array or object, handle both
  const bannerContentRaw = onelinerBannerInfo?.bannerContent ?? {};
  let bannerItems: BannerContentItem[] = [];
  if (Array.isArray(bannerContentRaw)) {
    bannerItems = bannerContentRaw as BannerContentItem[];
  } else if (bannerContentRaw && typeof bannerContentRaw === "object") {
    bannerItems = Object.values(bannerContentRaw) as BannerContentItem[];
  }

  if (!bannerItems.length) return null;

  const firstBanner: BannerContentItem = bannerItems[0] || {};
  const headding = firstBanner.headding ?? "";
  const tag_line = firstBanner.tag_line ?? "";
  const content = firstBanner.content ?? "";

  const earlyBirdDateRaw: string =
    (importantDates[1] && importantDates[1].date) || "";

  const formattedEarlyBirdDate = earlyBirdDateRaw
    ? earlyBirdDateRaw
      .replace(/<sub>/g, "<sup>")
      .replace(/<\/sub>/g, "</sup>")
      .replace(/<br\s*\/?>/g, " ")
    : "";

  const openBrochureModal = (type: 'brochure' | 'tentative') => {
    setModalType(type); // 'brochure' or 'tentative'
    setShowModal9(true);
  }

  const closeBrochureModal = () => {
    setShowModal9(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("BrochureFormClosed", Date.now().toString());
    }
  };

  const handleSuccess = (): void => {
    setShowModal4(false);
    setShowModal5(false);
  };

  // UTF-8 safe Base64 encoder
  function utf8ToBase64(str: string) {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  }

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

      const payload = {
        first_name: utf8ToBase64(brochureFormData.first_name.trim()),
        email: utf8ToBase64(brochureFormData.email.trim()),
        phone: utf8ToBase64(brochureFormData.phone.trim()),
        country: utf8ToBase64(brochureFormData.country.trim()),
        message: utf8ToBase64(brochureFormData.message.trim()),
        interested_in: utf8ToBase64(brochureFormData.interested_in.trim()),
        modalType,
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
    // const brochureFile = `${conferenceName}_Brochure.pdf`;
    // const brochureURL = `/${brochureFile}`;

    let fileName = '';
    let fileURL = '';

    if (modalType === 'tentative') {
      fileName = `${conferenceName} Scientific Program.pdf`;
      fileURL = `${fileName}`;
    } else {
      fileName = `${conferenceName}_Brochure.pdf`;
      fileURL = `/${fileName}`;
    }

    try {
      const response = await fetch(fileURL);
      if (response.ok) {
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", fileName);
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

  return (
    <div>
      {/* Body Start */}
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div
              className="col-lg-1 col-md-2 col-sm-2"
              style={{ textAlign: "start" }}
            >
              <Link href="/" title="Home">
                Home
              </Link>{" "}
              <i className="fa fa-angle-right"></i> <span></span>
            </div>
            <div className="col-lg-11 col-md-10 col-sm-10">
              <div className="marquee-wrapper">
                <div className="marquee-content">
                  {/* Your marquee items */}
                  <div className="marquee-item">
                    <i
                      className="fa fa-bell bell-icon bell-anim"
                      aria-hidden="true"
                    ></i>
                    <span>Limited speaker slots available</span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-hourglass-half" aria-hidden="true"></i>
                    <span>
                      Early Bird Registration closes on{" "}
                      {formattedEarlyBirdDate ? (
                        <span
                          className="marquee-date"
                          dangerouslySetInnerHTML={{
                            __html: formattedEarlyBirdDate,
                          }}
                        />
                      ) : (
                        <strong>To be announced</strong>
                      )}
                    </span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span>Avail special discounts for students and groups</span>
                  </div>
                  {/* <div className="marquee-item">
                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                    <span className='tentative-pdf-down highlight-program'><button onClick={() => openBrochureModal('tentative')} title={`${general.clogotext} Scientific Program`}>Download the Tentative Scientific Program (PDF)</button></span>
                  </div>  */}
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span className="me-2">For discount queries contact </span>
                    <i className="bx bxs-phone-call box-phone"></i>
                    <b>
                      <a
                        href={`tel:${general?.whatsapp || ""}`}
                        title={`${general?.whatsapp || ""}`}
                      >
                        {general?.whatsapp || ""}
                      </a>
                    </b>
                  </div>

                  {/* <!-- Repeat for looping --> */}
                  <div className="marquee-item">
                    <i
                      className="fa fa-bell bell-icon bell-anim"
                      aria-hidden="true"
                    ></i>
                    <span>Limited speaker slots available</span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-hourglass-half" aria-hidden="true"></i>
                    <span>
                      Early Bird Registration closes on{" "}
                      {formattedEarlyBirdDate ? (
                        <span
                          className="marquee-date"
                          dangerouslySetInnerHTML={{
                            __html: formattedEarlyBirdDate,
                          }}
                        />
                      ) : (
                        <strong>To be announced</strong>
                      )}
                    </span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span>Avail special discounts for students and groups</span>
                  </div>
                  {/* <div className="marquee-item">
                    <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
                    <span className='tentative-pdf-down highlight-program'><button onClick={() => openBrochureModal('tentative')} title={`${general.clogotext} Scientific Program`}>Download the Tentative Scientific Program (PDF)</button></span>
                  </div>  */}
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span className="me-2">For discount queries contact </span>
                    <i className="bx bxs-phone-call box-phone"></i>
                    <b>
                      <a
                        href={`tel:${general?.whatsapp || ""}`}
                        title={`${general?.whatsapp || ""}`}
                      >
                        {general?.whatsapp || ""}
                      </a>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner_wrap test-banner">
        <div className="auto-container clearfix">
          <div className="row clearfix">
            <div
              className="col-md-7 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1000ms"
            >
              <hr />
              <h3
                className="banner-heading-content"
                dangerouslySetInnerHTML={{ __html: headding || "" }}
              />
              <h2 className="banner-heading-tagline">{tag_line || ""}</h2>
              {/* <p>{content || ""}</p> */}
              <p dangerouslySetInnerHTML={{ __html: content || "" }}/>
              <button
                type="button"
                title={`${general?.clogotext}_Brochure`}
                onClick={() => openBrochureModal('brochure')}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal9 && (
        <div className="modal2 brochure-form-modal" id="myModal" role="dialog">
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="bx bx-file"
                    style={{ marginBottom: "35px" }}
                  ></i>
                </div>
                <h4 className="modal-title w-100"> {modalType === 'brochure' ? 'Download Brochure' : 'Download Scientific Program'}</h4>
                <button
                  type="button"
                  className="close"
                  onClick={closeBrochureModal}
                  style={{ fontSize: "30px" }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitBrochure}>
                  <div className="row">
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>Name:*</label>
                        <input
                          type="text"
                          name="first_name"
                          ref={nameRef}
                          placeholder="Enter name"
                          value={brochureFormData.first_name}
                          onChange={(e) =>
                            setBrochureFormData({
                              ...brochureFormData,
                              first_name: e.target.value,
                            })
                          }
                          disabled={isSubmitting} // Disable field during submission
                        />
                        {brochureFormErrors.first_name && (
                          <p style={{ color: "red", textAlign: "left" }}>
                            {brochureFormErrors.first_name}
                          </p>
                        )}
                      </div>
                      <div className="col-6 test2">
                        <label>Email Address:*</label>
                        <input
                          type="text"
                          name="email"
                          ref={emailRef}
                          placeholder="Enter email"
                          value={brochureFormData.email}
                          onChange={(e) =>
                            setBrochureFormData({
                              ...brochureFormData,
                              email: e.target.value,
                            })
                          }
                          disabled={isSubmitting} // Disable field during submission
                        />
                        {brochureFormErrors.email && (
                          <p style={{ color: "red", textAlign: "left" }}>
                            {brochureFormErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>Phone Number:*</label>
                        <input
                          type="text"
                          name="phone"
                          ref={phoneRef}
                          placeholder="Enter phone number"
                          value={brochureFormData.phone}
                          onChange={(e) =>
                            setBrochureFormData({
                              ...brochureFormData,
                              phone: e.target.value,
                            })
                          }
                          disabled={isSubmitting} // Disable field during submission
                        />
                        {brochureFormErrors.phone && (
                          <p style={{ color: "red", textAlign: "left" }}>
                            {brochureFormErrors.phone}
                          </p>
                        )}
                      </div>
                      <div className="col-6 test2 country-drop">
                        <label>Country:*</label>
                        <div className="country-drop-block">
                          <select
                            className="set156"
                            name="country"
                            ref={countryRef}
                            value={brochureFormData.country}
                            onChange={(e) =>
                              setBrochureFormData({
                                ...brochureFormData,
                                country: e.target.value,
                              })
                            }
                            disabled={isSubmitting} // Disable field during submission
                          >
                            <option value="">Select Country</option>
                            {countries.map((country: string) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                        {brochureFormErrors.country && (
                          <p style={{ color: "red", textAlign: "left" }}>
                            {brochureFormErrors.country}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex name-info">
                      <div className="col-6 test country-drop">
                        <label>Interested In:*</label>
                        <div className="country-drop-block">
                          <select
                            className="set156"
                            name="interested_in"
                            ref={interestedInRef}
                            value={brochureFormData.interested_in}
                            onChange={(e) =>
                              setBrochureFormData({
                                ...brochureFormData,
                                interested_in: e.target.value,
                              })
                            }
                            disabled={isSubmitting} // Disable field during submission
                          >
                            <option value="Oral Presentation">
                              Oral Presentation
                            </option>
                            <option value="Poster Presentation">
                              Poster Presentation
                            </option>
                            <option value="Delegate (Participation)">
                              Delegate (Participation)
                            </option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        {brochureFormErrors.interested_in && (
                          <p style={{ color: "red", textAlign: "left" }}>
                            {brochureFormErrors.interested_in}
                          </p>
                        )}
                      </div>
                      <div className="col-6 test2">
                        <label>Query (Optional):</label>

                        <textarea
                          placeholder="Enter Your Query"
                          value={brochureFormData.message}
                          onChange={(e) =>
                            setBrochureFormData({
                              ...brochureFormData,
                              message: e.target.value,
                            })
                          }
                          disabled={isSubmitting} // Disable field during submission
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      title={isSubmitting ? "Please wait" : "Proceed"}
                      className="btn btn-success btn-block"
                      disabled={isSubmitting} // Disable button during submission
                    >
                      {isSubmitting ? "Please wait" : "Proceed"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    className="material-icons"
                    style={{ marginBottom: "35px" }}
                  >
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">{modalType === 'brochure' ? 'Brochure downloading..!' : 'Scientific program downloading..!'}</h4>
                <p>
                  Thank you for your interest. If you have any questions, feel
                  free to reach out to us.{" "}
                </p>
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
      )}

      {showModal5 && (
        <div className="modal" id="myModal2" role="dialog">
          <div
            className="modal-dialog modal-confirm fade-in"
            role="document"
            ref={modalRef}
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bx bx-x" style={{ marginBottom: "35px" }}></i>
                </div>
                <h4 className="modal-title w-100">Failed to Download</h4>
                <p>
                  An error occurred while downloading. Please try again later.
                </p>
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
      )}
    </div>
  );
};

export default BannerSection;
