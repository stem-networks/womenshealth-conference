"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import countries from "../../data/countries";
import { toast } from 'react-toastify';
// import Captcha from "./Captcha"; // Make sure you have this component

interface FormData {
  module_name: string;
  title: string;
  name: string;
  email: string;
  alt_email: string;
  phone: string;
  whatsapp_number: string;
  city: string;
  country: string;
  organization: string;
  intrested: string;
  abstract_title: string;
  message: string;
  upload_abstract_file: File | null;
}


interface CaptchaRefType {
  focusCaptcha: () => void;
}

type PossibleRef =
  | React.RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >
  | React.RefObject<CaptchaRefType | null>;

interface FormAutoData {
  title: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  alt_email: string;
  phone: string;
  whatsapp_number: string;
  city: string;
  country: string;
  organization: string;
  intrested: string;
  abstract_title: string;
  message: string;
  form_type: string;
  submit_status: string;
  web_token?: string;
}

// type CaptchaRefType = {
//   focusCaptcha: () => void;
//   resetCaptchaInput: () => void;
//   refreshCaptcha: () => void;
// };

// type FieldRef = React.RefObject<
//   HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
// > | CaptchaRefType | null;

// Your custom captcha ref type
interface CaptchaRefType {
  focusCaptcha: () => void;
  resetCaptchaInput: () => void;
  refreshCaptcha: () => void;

}

// FieldRef type union includes both types of refs
type FieldRef =
  | React.RefObject<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >
  | React.RefObject<CaptchaRefType | null>
  | null;

// Usage:

interface Errors {
  [key: string]: string | null;
}

interface CaptchaValue {
  text: string;
  captchaId: string;
}

import map2 from "../../../public/images/images/map.png";
import { ApiResponse } from "@/types";
import Captcha, { CaptchaRef } from "./Captcha";

interface generalInfoProps {
  generalInfo: ApiResponse;
}

const AbstractSubmission: React.FC<generalInfoProps> = ({ generalInfo }) => {
  const general = generalInfo?.data || {};
  // const conf_id = Number(process.env.NEXT_PUBLIC_CID || 0);

  const [formData, setFormData] = useState<FormData>({
    module_name: "abstract_save",
    title: "",
    // cid: conf_id,
    name: "",
    email: "",
    alt_email: "",
    phone: "",
    whatsapp_number: "",
    city: "",
    country: "",
    organization: "",
    intrested: "",
    abstract_title: "",
    message: "",
    upload_abstract_file: null,
  });

  const [formAutoData, setFormAutoData] = useState<FormAutoData>({
    title: "",
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    alt_email: "",
    phone: "",
    whatsapp_number: "",
    city: "",
    country: "",
    organization: "",
    intrested: "",
    abstract_title: "",
    message: "",
    form_type: "abstract",
    submit_status: "0",
  });

  // console.log(formAutoData);

  const [selectedFileName, setSelectedFileName] =
    useState<string>("No File Chosen");
  const [errors, setErrors] = useState<Errors>({});
  //   const [modalContent, setModalContent] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<CaptchaValue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  console.log(captchaValue);

  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Refs for input fields
  const titleRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const altEmailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const intrestedRef = useRef<HTMLSelectElement>(null);
  const abstractTitleRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // const captchaRef = React.useRef<CaptchaRefType>(null);
  const captchaRef = useRef<CaptchaRef>(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);

  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | undefined;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;
    const files = target.files;

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "upload_abstract_file" && files) {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/rtf",
      ];

      if (!allowedTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          upload_abstract_file: "Please select a PDF, DOC, DOCX, or RTF file.",
        }));
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      setSelectedFileName(file.name);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      setFormAutoData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    const formErrors: Errors = {};
    let firstErrorField: FieldRef = null;

    // ====== VALIDATION ======
    if (!formData.title) {
      formErrors.title = "Title is required";
      firstErrorField = titleRef;
    } else if (!formData.name) {
      formErrors.name = "Name is required";
      firstErrorField = nameRef;
    } else if (!formData.email) {
      formErrors.email = "Email is required";
      firstErrorField = emailRef;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is Invalid";
      firstErrorField = emailRef;
    } else if (formData.alt_email && !/\S+@\S+\.\S+/.test(formData.alt_email)) {
      formErrors.alt_email = "Alternative Email is Invalid";
      firstErrorField = altEmailRef;
    } else if (!formData.phone) {
      formErrors.phone = "Phone number is required";
      firstErrorField = phoneRef;
    } else if (!formData.city) {
      formErrors.city = "City is required";
      firstErrorField = cityRef;
    } else if (!formData.country) {
      formErrors.country = "Country is required";
      firstErrorField = countryRef;
    } else if (!formData.organization) {
      formErrors.organization = "Organization is required";
      firstErrorField = organizationRef;
    } else if (!formData.intrested) {
      formErrors.intrested = "Interested In is required";
      firstErrorField = intrestedRef;
    } else if (!formData.abstract_title) {
      formErrors.abstract_title = "Abstract Title is required";
      firstErrorField = abstractTitleRef;
    } else if (!formData.upload_abstract_file) {
      formErrors.upload_abstract_file = "Abstract file is required";
      firstErrorField = fileRef;
    }

    // ====== CAPTCHA CHECK ======

    else if (!captchaValue || !captchaValue.text || captchaValue.text.trim() === "") {
      formErrors.captcha = "CAPTCHA is required";
      setErrors(formErrors);
      toast.error(formErrors.captcha);

      captchaRef.current?.focusCaptcha?.();

      return;
    }

    else if (!isCaptchaValid) {
      formErrors.captcha = "Invalid CAPTCHA";
      setErrors(formErrors);
      toast.error(formErrors.captcha);

      // captchaRef.current?.refreshCaptcha();
      captchaRef.current?.focusCaptcha?.();

      return;
    }

    // ====== SHOW VALIDATION ERRORS ======
    if (Object.keys(formErrors).length > 0) {
      setErrors({ ...formErrors });

      const firstErrorMessage = Object.values(formErrors)[0];
      toast.error(
        firstErrorMessage ?? "Validation Error"
      );

      if (firstErrorField?.current?.focus) {
        firstErrorField.current.focus();
      }

      return;
    }

    // ====== SUBMIT FORM ======
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(
          key,
          value instanceof File ? value : String(value)
        );
      }
    });

    try {
      const response = await fetch("/api/abstract", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        // toast.success("Abstract form submitted successfully!", {
        //   autoClose: 3000,
        // });

        setShowModal(true);

        setFormData({
          module_name: "abstract_save",
          title: "",
          name: "",
          email: "",
          alt_email: "",
          phone: "",
          whatsapp_number: "", // add missing field
          city: "",
          country: "",
          organization: "",
          intrested: "",
          abstract_title: "",
          message: "", //  add missing field
          upload_abstract_file: null,
        });
        captchaRef.current?.refreshCaptcha();

      }


      else {
        toast.error(result.error || "Failed to submit the form");
        await logError(
          `Abstract Form Submission Error: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("There was an error submitting the form. Please try again.");

      await logError(
        `Abstract Form Submission Error: ${error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    fieldName: string,
    nextFieldRef?: PossibleRef
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newErrors: Errors = {};
      let fieldValid = true;

      if (fieldName === "title" && !formData.title) {
        newErrors.title = "Title is required";
        fieldValid = false;
      } else if (fieldName === "name" && !formData.name) {
        newErrors.name = "Name is required";
        fieldValid = false;
      } else if (fieldName === "email") {
        if (!formData.email) {
          newErrors.email = "Email is required";
          fieldValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is Invalid";
          fieldValid = false;
        }
      } else if (
        fieldName === "alt_email" &&
        formData.alt_email &&
        !/\S+@\S+\.\S+/.test(formData.alt_email)
      ) {
        newErrors.alt_email = "Alternative Email is Invalid";
        fieldValid = false;
      } else if (fieldName === "phone" && !formData.phone) {
        newErrors.phone = "Phone number is required";
        fieldValid = false;
      } else if (fieldName === "city" && !formData.city) {
        newErrors.city = "City is required";
        fieldValid = false;
      } else if (fieldName === "country" && !formData.country) {
        newErrors.country = "Country is required";
        fieldValid = false;
      } else if (fieldName === "organization" && !formData.organization) {
        newErrors.organization = "Organization is required";
        fieldValid = false;
      } else if (fieldName === "intrested" && !formData.intrested) {
        newErrors.intrested = "Intrested In is required";
        fieldValid = false;
      } else if (fieldName === "abstract_title" && !formData.abstract_title) {
        newErrors.abstract_title = "Abstract Title is required";
        fieldValid = false;
      } else if (
        fieldName === "upload_abstract_file" &&
        !formData.upload_abstract_file
      ) {
        newErrors.upload_abstract_file = "Abstract file is required";
        fieldValid = false;
      }

      if (!fieldValid) {
        setErrors(newErrors);
        toast.error(newErrors[fieldName]!);

        switch (fieldName) {
          case "title":
            titleRef.current?.focus();
            break;
          case "name":
            nameRef.current?.focus();
            break;
          case "email":
            emailRef.current?.focus();
            break;
          case "alt_email":
            altEmailRef.current?.focus();
            break;
          case "phone":
            phoneRef.current?.focus();
            break;
          case "city":
            cityRef.current?.focus();
            break;
          case "country":
            countryRef.current?.focus();
            break;
          case "organization":
            organizationRef.current?.focus();
            break;
          case "abstract_title":
            abstractTitleRef.current?.focus();
            break;
          case "upload_abstract_file":
            fileRef.current?.focus();
            break;
          case "captcha":
            captchaRef.current?.focusCaptcha();
            break;
        }
        return;
      }

      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));

      if (nextFieldRef?.current) {
        if (
          "focusCaptcha" in nextFieldRef.current &&
          typeof nextFieldRef.current.focusCaptcha === "function"
        ) {
          nextFieldRef.current.focusCaptcha();
        } else if (
          "focus" in nextFieldRef.current &&
          typeof nextFieldRef.current.focus === "function"
        ) {
          nextFieldRef.current.focus();
        }
      } else if (fieldName === "upload_abstract_file" && !isCaptchaValid) {
        captchaRef.current?.focusCaptcha();
      }
    }
  };

  const handleCaptchaInputChange = () => {
    // Clear only the CAPTCHA-related error message
    // setFormErrors((prevErrors) => {
    //   const { captcha, ...rest } = prevErrors;
    //   return rest;
    // });
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.captcha;
      return newErrors;
    });
  };

  const closeModal = () => {
    setShowModal(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handleDownloadAbstract = () => {
    const link = document.createElement("a");
    link.href = "/Sample Abstract.docx";
    link.setAttribute("download", "Sample Abstract.docx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const logError = async (message: string) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("form_based", "Abstract Submission Form");
  //     formData.append("cid", process.env.NEXT_PUBLIC_CID || "");
  //     formData.append("error_message", message);

  //     const name =
  //       document.querySelector<HTMLInputElement>('input[name="name"]')?.value ||
  //       "";
  //     const email =
  //       document.querySelector<HTMLInputElement>('input[name="email"]')
  //         ?.value || "";
  //     formData.append("name", name);
  //     formData.append("email", email);

  //     await fetch("/api/register", {
  //       method: "POST",
  //       body: formData,
  //     });
  //   } catch (err) {
  //     console.error("Error Logging API Failure", err);
  //   }
  // };

  const logError = async (message: string) => {
    try {
      const formErrorData = new FormData();
      formErrorData.append("name", formData.name || "N/A");
      formErrorData.append("email", formData.email || "N/A");
      formErrorData.append("form_based", "Abstract Form");
      formErrorData.append("error_message", message);

      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formErrorData,
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to log error to Telegram via telegram");
      }
    } catch (error) {
      console.error("Failed to send error to /api/send-to-telegram:", error);
    }
  };

  // const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // const handleFieldUpdate = (fieldName: keyof FormAutoData, value: string) => {
  //   setFormAutoData((prevState) => {
  //     const updatedData = {
  //       ...prevState,
  //       [fieldName]: value,
  //       submit_status: prevState.submit_status || "0",
  //     };

  //     // Email validation and conditional API trigger
  //     if (fieldName === "email") {
  //       if (!value.trim()) {
  //         setErrors((prev) => ({ ...prev, email: "Email is required." }));
  //         console.error("Email is required. API not triggered.");
  //         return updatedData;
  //       }

  //       if (!isValidEmail(value)) {
  //         setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
  //         console.error("Invalid email format. API not triggered.");
  //         return updatedData;
  //       }

  //       // Clear previous error
  //       setErrors((prev) => ({ ...prev, email: "" }));

  //       // Send data only when email is present and valid
  //       sendFullFormData(updatedData);
  //     }

  //     return updatedData;
  //   });
  // };

  // const handleFieldUpdate = (fieldName: keyof FormAutoData, value: string) => {
  //   setFormAutoData((prevState) => ({
  //     ...prevState,
  //     [fieldName]: value,
  //     submit_status: prevState.submit_status || "0",
  //   }));
  // };

  // const sendFullFormData = async (
  //   updatedData: FormAutoData,
  //   submitStatus?: string
  // ) => {
  //   try {
  //     const formData = new FormData();

  //     Object.entries(updatedData).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     if (submitStatus) {
  //       formData.append("submit_status", submitStatus);
  //     }

  //     const response = await axios.post("/api/send-to-cms", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (response.data?.data?.web_token) {
  //       setFormAutoData((prevState) => ({
  //         ...prevState,
  //         web_token: response.data.data.web_token,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error saving form data:", error);
  //   }
  // };

  // const sendFullFormData = async (
  //   updatedData: FormAutoData,
  //   submitStatus?: string
  // ) => {
  //   try {
  //     const formData = new FormData();

  //     Object.entries(updatedData).forEach(([key, value]) => {
  //       formData.append(key, value || "");
  //     });

  //     if (submitStatus) {
  //       formData.append("submit_status", submitStatus);
  //     }

  //     const response = await axios.post("/api/send-to-cms", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log("Response:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error sending form data:", error);
  //     return null;
  //   }
  // };

  // const isValidEmail = (email: string): boolean => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  // const handleBlur = (
  //   e: React.FocusEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   const { name, value } = e.target;

  //   const updatedData = {
  //     ...formAutoData,
  //     [name]: value,
  //     submit_status: formAutoData.submit_status || "0",
  //   };

  //   setFormAutoData(updatedData);

  //   // Validate email only if it exists
  //   const emailValue = name === "email" ? value : updatedData.email;

  //   if (!emailValue) {
  //     if (name === "email") {
  //       setErrors((prev) => ({ ...prev, email: "Email is required." }));
  //     }
  //     return; // Don't send API if email is missing
  //   }

  //   if (!isValidEmail(emailValue)) {
  //     if (name === "email") {
  //       setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
  //     }
  //     return; // Don't send API if email is invalid
  //   }

  //   // Clear email error and send form data
  //   if (name === "email") {
  //     setErrors((prev) => ({ ...prev, email: "" }));
  //   }

  //   sendFullFormData(updatedData);
  // };

  const sendFullFormData = async (
    updatedData: FormAutoData,
    submitStatus?: string
  ) => {
    try {
      // First validate the email
      if (!updatedData.email || !isValidEmail(String(updatedData.email))) {
        console.error("Cannot send form data - invalid or missing email");
        return null;
      }

      const formData = new FormData();

      Object.entries(updatedData).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      if (submitStatus) {
        formData.append("submit_status", submitStatus);
      }

      const response = await axios.post("/api/send-to-cms", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending form data:", error);
      return null;
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formAutoData,
      [name]: value,
      submit_status: formAutoData.submit_status || "0",
    };

    setFormAutoData(updatedData);

    // Validate email only if it exists
    const emailValue = name === "email" ? value : updatedData.email;

    if (!emailValue) {
      if (name === "email") {
        setErrors((prev) => ({ ...prev, email: "Email is required." }));
      }
      return; // Don't send API if email is missing
    }

    if (!isValidEmail(emailValue)) {
      if (name === "email") {
        setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      }
      return; // Don't send API if email is invalid
    }

    // Clear email error and send form data
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    // The email is valid at this point, so we can send the data
    sendFullFormData(updatedData);
  };

  return (
    <div>
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-12">
              <Link href="/" title="Navigate to Homepage">
                Home
              </Link>{" "}
              <i className="fa fa-angle-right"></i>
              <span>Abstract Submission</span>
            </div>
          </div>
        </div>
      </div>
      <h2
        className="abs_wrap5 wow fadeInUp"
        data-wow-delay="400ms"
        data-wow-duration="1000ms"
      >
        Abstract Submission
      </h2>
      <div className="bg_add_form15">
        <div className="auto-container">
          <div className="row clearfix">
            <form
              id="abstractform"
              ref={formRef}
              onSubmit={handleSubmit}
              method="POST"
            >
              <div
                className="col-md-8 wow fadeInUp"
                data-wow-delay="400ms"
                data-wow-duration="1000ms"
              >
                <div className="row clearfix">
                  <div className="col-md-6 left15">
                    <select
                      name="title"
                      className="set157"
                      id="title"
                      onChange={handleChange}
                      ref={titleRef}
                      onKeyDown={(e) => handleKeyDown(e, "title", nameRef)}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.title}
                      onBlur={handleBlur}
                    >
                      <option value="">Select</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Miss.">Miss.</option>
                      <option value="Mrs.">Mrs.</option>
                    </select>
                    {errors.title && (
                      <div className="error">{errors.title}</div>
                    )}
                  </div>
                  <div className="col-md-6 left16">
                    <input
                      name="name"
                      id="name"
                      className="set157"
                      placeholder="Name"
                      type="text"
                      onChange={handleChange}
                      ref={nameRef}
                      onKeyDown={(e) => handleKeyDown(e, "name", emailRef)}
                      disabled={isSubmitting}
                      autoComplete="new-password"
                      value={formData.name}
                      // onBlur={(e) => handleFieldUpdate("name", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6 left15">
                    <input
                      name="email"
                      id="email"
                      className="set157"
                      placeholder="Email"
                      type="text"
                      onChange={handleChange}
                      ref={emailRef}
                      onKeyDown={(e) => handleKeyDown(e, "email", altEmailRef)}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.email}
                      // onBlur={(e) => handleFieldUpdate("email", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6 left16">
                    <input
                      name="alt_email"
                      id="alt_email"
                      className="set157"
                      placeholder="Alternative Email"
                      type="text"
                      onChange={handleChange}
                      ref={altEmailRef}
                      onKeyDown={(e) => handleKeyDown(e, "alt_email", phoneRef)}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.alt_email}
                      // onBlur={(e) =>
                      //   handleFieldUpdate("alt_email", e.target.value)
                      // }
                      onBlur={handleBlur}
                    />
                    {errors.alt_email && (
                      <div className="error">{errors.alt_email}</div>
                    )}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6 left15">
                    <input
                      name="phone"
                      id="phone"
                      className="set157"
                      placeholder="Phone"
                      type="text"
                      onChange={handleChange}
                      ref={phoneRef}
                      onKeyDown={(e) => handleKeyDown(e, "phone", whatsappRef)}
                      disabled={isSubmitting}
                      autoComplete="new-password"
                      value={formData.phone}
                      // onBlur={(e) => handleFieldUpdate("phone", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {errors.phone && (
                      <div className="error">{errors.phone}</div>
                    )}
                  </div>
                  <div className="col-md-6 left16">
                    <input
                      name="whatsapp_number"
                      id="whatsapp_number"
                      className="set157"
                      placeholder="WhatsApp Number"
                      type="text"
                      onChange={handleChange}
                      ref={whatsappRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "whatsapp_number", cityRef)
                      }
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.whatsapp_number}
                      // onBlur={(e) =>
                      //   handleFieldUpdate("whatsapp_number", e.target.value)
                      // }
                      onBlur={handleBlur}
                    />
                    {errors.whatsapp_number && (
                      <div className="error">{errors.whatsapp_number}</div>
                    )}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6 left15">
                    <input
                      name="city"
                      id="city"
                      className="set157"
                      placeholder="City"
                      type="text"
                      onChange={handleChange}
                      ref={cityRef}
                      onKeyDown={(e) => handleKeyDown(e, "city", countryRef)}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.city}
                      // onBlur={(e) => handleFieldUpdate("city", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {errors.city && <div className="error">{errors.city}</div>}
                  </div>
                  <div className="col-md-6 left16">
                    <select
                      name="country"
                      className="set156"
                      id="country"
                      onChange={handleChange}
                      ref={countryRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "country", organizationRef)
                      }
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.country}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country: string) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <div className="error">{errors.country}</div>
                    )}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-6 left15">
                    <input
                      name="organization"
                      id="organization"
                      className="set157"
                      placeholder="Organization"
                      type="text"
                      onChange={handleChange}
                      ref={organizationRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "organization", intrestedRef)
                      }
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.organization}
                      // onBlur={(e) =>
                      //   handleFieldUpdate("organization", e.target.value)
                      // }
                      onBlur={handleBlur}
                    />
                    {errors.organization && (
                      <div className="error">{errors.organization}</div>
                    )}
                  </div>
                  <div className="col-md-6 left16">
                    <select
                      name="intrested"
                      className="set156"
                      id="intrested"
                      onChange={handleChange}
                      ref={intrestedRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "intrested", abstractTitleRef)
                      }
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.intrested}
                    >
                      <option value="">Interested In</option>
                      <option value="Oral Presentation">
                        Oral Presentation
                      </option>
                      <option value="Poster Presentation">
                        Poster Presentation
                      </option>
                      <option value="Delegate">Delegate</option>
                    </select>
                    {errors.intrested && (
                      <div className="error">{errors.intrested}</div>
                    )}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <input
                      name="abstract_title"
                      id="abstract_title"
                      className="set157"
                      placeholder="Abstract Title"
                      type="text"
                      onChange={handleChange}
                      ref={abstractTitleRef}
                      onKeyDown={(e) =>
                        handleKeyDown(e, "abstract_title", messageRef)
                      }
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.abstract_title}
                      // onBlur={(e) =>
                      //   handleFieldUpdate("abstract_title", e.target.value)
                      // }
                      onBlur={handleBlur}
                    />
                    {errors.abstract_title && (
                      <div className="error">{errors.abstract_title}</div>
                    )}
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <textarea
                      name="message"
                      id="message"
                      className="set158"
                      placeholder="Message"
                      onChange={handleChange}
                      ref={messageRef}
                      onKeyDown={(e) => handleKeyDown(e, "message", fileRef)}
                      disabled={isSubmitting}
                      autoComplete="off"
                      value={formData.message}
                      // onBlur={(e) =>
                      //   handleFieldUpdate("message", e.target.value)
                      // }
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.message && (
                      <div className="error">{errors.message}</div>
                    )}
                  </div>
                </div>

                <div className="row clearfix">
                  <div className="col-md-12 mar_lk55">
                    <div className="upload_wrap15 col-lg-6 pd0">
                      <div className="upload_wrat55">
                        <span>Upload Your Abstract File* :</span>
                        <span>
                          <button
                            type="button"
                            className="ab-dbtn"
                            onClick={handleDownloadAbstract}
                            title="Download Sample Abstract File"
                          >
                            Download Sample Abstract File
                          </button>
                        </span>
                      </div>
                      <span className="back_wrapblue">
                        <input
                          name="upload_abstract_file"
                          className="abck155"
                          type="file"
                          id="upload_abstract_file"
                          onChange={handleChange}
                          ref={fileRef}
                          onKeyDown={(e) =>
                            handleKeyDown(e, "upload_abstract_file", captchaRef)
                          }
                          disabled={isSubmitting}
                        />
                        <b>Choose file</b>
                        <span id="selected_file">{selectedFileName}</span>
                      </span>

                      <span className="selct_wrap_pdf">
                        Select PDF, DOC, DOCX or rtf File
                      </span>
                      {errors.upload_abstract_file && (
                        <div className="error">
                          {errors.upload_abstract_file}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12" style={{ marginTop: "20px" }}>
                    {/* <Captcha onValidChange={setIsCaptchaValid} /> */}

                    <Captcha
                      ref={captchaRef}
                      onValidate={setIsCaptchaValid}
                      onInputChange={handleCaptchaInputChange}
                      setCaptchaValue={setCaptchaValue}
                      isSubmitting={isSubmitting}
                    />
                    {formErrors.captcha && (
                      <p className="error">{formErrors.captcha}</p>
                    )}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-6">
                    <button
                      type="submit"
                      name="submit"
                      className="bt_nmk5"
                      title="Submit Abstract"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Please Wait..." : "Submit Abstract"}
                    </button>
                    {/* <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Abstract"}
                    </button> */}
                  </div>
                </div>
              </div>
            </form>
            <div
              className="col-md-4 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <div className="sq_abmainbox">
                <div className="sq_abbox1"></div>
                <div className="sq_abbox2"></div>
                <span className="nur_wrap11">
                  {general ? general.clogotext : ""}
                </span>
                <span className="nur_wrap22">CONFERENCE</span>
                <span className="nur_wrap33">
                  {general ? general.full_length_dates : ""}
                </span>
                <span className="map_l55 sq_map">
                  <Image
                    src={map2}
                    alt={general ? general.clname : ""}
                    title={general ? general.clname : ""}
                  />
                  {general ? general.venue_p1 : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal" id="myModal" tabIndex={-1} role="dialog">
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
                <h4 className="modal-title w-100">
                  Abstract Submitted Successfully!
                </h4>
                <p>We will get in touch with you shortly.</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={closeModal}
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

export default AbstractSubmission;
