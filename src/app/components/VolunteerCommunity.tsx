"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { ApiResponse, IndexPageData } from "@/types";
import Link from "next/link";

type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
};

type FormErrorType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  userAnswer?: string;
};

type CommunityFormData = {
  email: string;
  fname: string;
  lname: string;
  category: string;
};

type CommunityFormErrors = {
  email?: string;
  fname?: string;
  lname?: string;
};

interface VolunteerCommunityProps {
  generalVolunteerInfo: ApiResponse;
  onelinerVolunteerInfo: IndexPageData;
}

// Generate random BODMAS expression
const generateRandomMathExpression = (): {
  expression: string;
  correctAnswer: string;
} => {
  const operations = ["+", "-", "*"];
  const randomOperation =
    operations[Math.floor(Math.random() * operations.length)];

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const num3 = Math.floor(Math.random() * 10) + 1;

  const useParentheses = Math.random() < 0.5;
  let expression: string;

  if (useParentheses) {
    expression = `(${num1} ${randomOperation} ${num2}) ${randomOperation} ${num3}`;
  } else {
    expression = `${num1} ${randomOperation} ${num2} ${randomOperation} ${num3}`;
  }

  const correctAnswer = eval(expression).toFixed(2); // returns string
  return { expression, correctAnswer };
};

const VolunteerCommunity: React.FC<VolunteerCommunityProps> = ({
  generalVolunteerInfo,
  onelinerVolunteerInfo,
}) => {
  const general = generalVolunteerInfo?.data || {};
  const onelinerAbstract =
    onelinerVolunteerInfo?.oneliner?.Be_A_Volunteer?.content;

  // Modal for vounteer
  const [showModal, setShowModal] = useState(false);
  const [mathExpression, setMathExpression] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(""); // For general errors
  const [showModal3, setShowModal3] = useState(false); // For success modal
  const [submittingVolunteer, setSubmittingVolunteer] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    category: "volunteer",
  });
  console.log("Errror", error);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // form for discover community
  const [submitting, setSubmitting] = useState(false);

  const [communityFormData, setCommunityFormData] = useState<CommunityFormData>(
    {
      email: "",
      fname: "",
      lname: "",
      category: "joinourcommunity",
    }
  );

  const [communityFormErrors, setCommunityFormErrors] =
    useState<CommunityFormErrors>({});
  const [showModal2, setShowModal2] = useState(false);

  // Form for Discover Community

  const validateCommunityForm = (): CommunityFormErrors => {
    const errors: CommunityFormErrors = {};

    if (!communityFormData.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(communityFormData.email)) {
      errors.email = "Email address is invalid";
    } else if (!communityFormData.fname) {
      errors.fname = "First name is required";
    } else if (!communityFormData.lname) {
      errors.lname = "Last name is required";
    }

    return errors;
  };

  const handleCommunitySubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitting(true);
    const errors = validateCommunityForm();
    setCommunityFormErrors(errors); // Always set errors

    if (Object.keys(errors).length === 0) {
      try {
        const fullName = `${communityFormData.fname} ${communityFormData.lname}`;
        await axios.post("/api/community-submit", {
          name: fullName,
          email: communityFormData.email,
          category: communityFormData.category,
        });

        setShowModal2(true);
        setCommunityFormData({
          email: "",
          fname: "",
          lname: "",
          category: "joinourcommunity",
        });
        setCommunityFormErrors({}); // Clear previous errors
      } catch (error) {
        console.error("Error submitting community form:", error);
      } finally {
        setSubmitting(false); // Stop submitting
      }
    } else {
      // Focus and toast the first field that has an error
      const order = ["email", "fname", "lname"];
      for (const field of order) {
        if (errors[field as keyof CommunityFormErrors]) {
          toast.error(errors[field as keyof CommunityFormErrors]!);
          document.getElementById(`community-${field}`)?.focus();
          break;
        }
      }
      setSubmitting(false);
    }
  };

  // validation of volunteer form

  const validateForm = (): FormErrorType => {
    const errors: FormErrorType = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    } else if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!userAnswer.trim()) {
      errors.userAnswer = "Answer is required";
    }

    return errors;
  };

  // Submit for Volunteer
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors); // Always set inline errors

    const fieldOrder = ["firstName", "lastName", "email", "userAnswer"];

    // Show toast + focus only for first error
    for (const field of fieldOrder) {
      if (errors[field as keyof typeof errors]) {
        toast.error(errors[field as keyof typeof errors] as string);

        // Focus the relevant field
        switch (field) {
          case "firstName":
            firstNameRef.current?.focus();
            break;
          case "lastName":
            lastNameRef.current?.focus();
            break;
          case "email":
            emailRef.current?.focus();
            break;
          case "userAnswer":
            captchaRef.current?.focus();
            break;
        }

        return;
      }
    }

    // Check captcha separately
    if (parseFloat(userAnswer) !== parseFloat(correctAnswer || "0")) {
      const captchaError = "Incorrect answer. Please try again.";
      toast.error(captchaError);
      setFormErrors({ ...errors, userAnswer: captchaError });
      captchaRef.current?.focus();
      return;
    }

    setSubmittingVolunteer(true);

    // Submit form
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await axios.post("/api/enquiry", {
        enquiryname: fullName,
        enquiryemail: formData.email,
        enquiryquery: "",
        category: formData.category,
      });

      toast.success("Form submitted successfully!");
      setShowModal(false);
      setShowModal3(true);

      // Clear everything
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        category: "volunteer",
      });
      setUserAnswer("");
      setFormErrors({});
      setError("");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setSubmittingVolunteer(false)
    }
  };

  const handleSuccess = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowModal2(false);
    setShowModal3(false);
    // setShowModal5(false);
    setError("");
  };

  const toggleModal = () => {
    if (!showModal) {
      const { expression, correctAnswer } = generateRandomMathExpression();
      setMathExpression(expression);
      setCorrectAnswer(correctAnswer);
    }
    setShowModal(!showModal);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const refreshCaptcha = () => {
    const { expression, correctAnswer } = generateRandomMathExpression();
    setMathExpression(expression);
    setCorrectAnswer(correctAnswer);
    // Optionally clear input field
    // setUserAnswer('');
  };

  return (
    <div>
      <div
        className="volue_wrap"
        style={{ backgroundImage: `url('/images/images/bg2.webp')` }}
      >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-7 amr_wrap15">
              <div className="box_wrap155"></div>

              <div
                className="volu_wrap wow fadeInUp"
                data-wow-delay="300ms"
                data-wow-duration="1000ms"
              >
                <h3>Be A Volunteer</h3>
              </div>

              <div
                className="box_wrap_add1 wow fadeInUp"
                data-wow-delay="400ms"
                data-wow-duration="1000ms"
              >
                <h3
                  dangerouslySetInnerHTML={{ __html: onelinerAbstract || "" }}
                />
              </div>

              <div className="box_wrap154"></div>

              <div
                className="apple_wrap wow fadeInUp"
                data-wow-delay="500ms"
                data-wow-duration="1000ms"
              >
                <button
                  type="button"
                  title="Apply Now"
                  className="apply-now-btn"
                  id="volunteerapplybtn"
                  onClick={toggleModal}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="cont_wrap_add  wow fadeInUp"
        data-wow-delay="400ms"
        data-wow-duration="1000ms"
      >
        <div className="auto-container clearfix">
          <div className="row clearfix">
            <div className="col-md-9 mar_wrap1579">
              <div className="call_cont_st1">
                <div className="wr_sty1">
                  <div className="logo_cont15">
                    <Image
                      src="/images/images/logo-hd-1.svg"
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                      width={200}
                      height={80}
                    />
                  </div>
                  <div className="cont_head_st1">
                    <h3>
                      Discover Whats Next in{" "}
                      {general.clname ? general.clname : ""}
                    </h3>
                    <p>
                      Join our community today for the latest news, exclusive
                      interviews, and unique insights from world-renowned
                      speakers and experts.
                    </p>
                  </div>
                  <form
                    id="joinourcommunityform"
                    onSubmit={handleCommunitySubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 cont_wrap14666">
                        <label>Email Address:*</label>
                        <input
                          name="email"
                          id="community-email"
                          type="email"
                          placeholder="Enter Email"
                          disabled={submitting}
                          value={
                            communityFormData ? communityFormData.email : ""
                          }
                          autoComplete="off"
                          // onChange={handleCommunityChange}
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              email: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors
                          ? communityFormErrors.email && (
                            <div
                              id="joinourcommunityemail-error"
                              style={{ color: "red" }}
                            >
                              {communityFormErrors
                                ? communityFormErrors.email
                                : ""}
                            </div>
                          )
                          : ""}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>First Name:*</label>
                        <input
                          name="fname"
                          id="community-fname"
                          type="text"
                          placeholder="Enter First Name"
                          value={
                            communityFormData ? communityFormData.fname : " "
                          }
                          disabled={submitting}
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              fname: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors
                          ? communityFormErrors.fname && (
                            <div id="jocfname-error" style={{ color: "red" }}>
                              {communityFormErrors
                                ? communityFormErrors.fname
                                : ""}
                            </div>
                          )
                          : ""}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>Last Name:*</label>
                        <input
                          name="lname"
                          id="community-lname"
                          type="text"
                          placeholder="Enter Last Name"
                          disabled={submitting}
                          value={
                            communityFormData ? communityFormData.lname : ""
                          }
                          onChange={(e) =>
                            setCommunityFormData({
                              ...communityFormData,
                              lname: e.target.value,
                            })
                          }
                        />
                        {communityFormErrors.lname && (
                          <div id="joclname-error" style={{ color: "red" }}>
                            {communityFormErrors
                              ? communityFormErrors.lname
                              : ""}
                          </div>
                        )}
                      </div>
                      <div className="col-md-12">
                        <div className="sbtn">
                          <input
                            type="submit"
                            name="submit"
                            value={submitting ? "Submitting..." : "Submit"}
                            title="Submit"
                            className="appy15"
                            id="joinourcommunitysubmitbtn"
                            disabled={submitting}
                          />
                        </div>
                        <input
                          type="hidden"
                          name="category"
                          value="joinourcommunity"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="wr_sty2">
                  <div className="img_wrap156">
                    <Image
                      src="/images/images/mess1.png"
                      className="mess15"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                    <span className="jum55">
                      {general.full_length_dates
                        ? general.full_length_dates
                        : ""}
                    </span>
                    <Image
                      src="/images/images/mess2.png"
                      className="mess16"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                    <span className="jum56">
                      {general.venue_p1 ? general.venue_p1 : ""}
                    </span>
                    <span className="jum57">
                      <Image
                        src="/images/images/ph.png"
                        width={100}
                        height={100}
                        alt={general.clname ? general.clname : ""}
                        title={general.clname ? general.clname : ""}
                        loading="lazy"
                      />{" "}
                      <Link
                        href={`tel:${general?.phone}`}
                        className=""
                        title={general?.phone}
                      >
                        {general?.phone}
                      </Link>
                    </span>
                    <Image
                      src="/images/images/mess.png"
                      className="img15444"
                      width={100}
                      height={100}
                      alt={general.clname ? general.clname : ""}
                      title={general.clname ? general.clname : ""}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal2" id="myModal" role="dialog">
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i
                    className="material-icons"
                    style={{ marginBottom: "35px" }}
                  >
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">Volunteer</h4>
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  style={{ fontSize: "30px" }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <label>Email Address:*</label>
                      <input
                        ref={emailRef}
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        value={formData.email}
                        disabled={submittingVolunteer}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {formErrors.email && (
                        <p style={{ color: "red" }}>{formErrors.email}</p>
                      )}
                    </div>
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>First Name:*</label>
                        <input
                          type="text"
                          ref={firstNameRef}
                          name="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          disabled={submittingVolunteer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {formErrors.firstName && (
                          <p style={{ color: "red" }}>{formErrors.firstName}</p>
                        )}
                      </div>
                      <div className="col-6 test2">
                        <label>Last Name:*</label>
                        <input
                          type="text"
                          ref={lastNameRef}
                          name="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          disabled={submittingVolunteer}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {formErrors.lastName && (
                          <p style={{ color: "red" }}>{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <p>
                        Verify you’re human: What is <b>{mathExpression}</b>?
                      </p>
                      <input
                        type="text"
                        ref={captchaRef}
                        placeholder="Enter your answer"
                        value={userAnswer}
                        disabled={submittingVolunteer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      {formErrors.userAnswer && (
                        <p style={{ color: "red" }}>{formErrors.userAnswer}</p>
                      )}
                      <button
                        type="button"
                        title="Refresh Captcha"
                        onClick={refreshCaptcha}
                        className="btn btn-secondary mt-2"
                      >
                        Refresh Captcha
                      </button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      title="Submit"
                      className="btn btn-success btn-block"
                      disabled={submittingVolunteer}
                    >
                      {submittingVolunteer ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal2 && (
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
                <h4 className="modal-title w-100">
                  Thank you for subscribing!
                </h4>
                <p>
                  You’ll be hearing from us soon with exciting updates and
                  exclusive content.
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

      {showModal3 && (
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
                <h4 className="modal-title w-100">
                  Form submitted successfully!
                </h4>
                <p>
                  Thank you for your submission. We will get back to you
                  shortly.
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

export default VolunteerCommunity;
