"use client";

import React, { useState, useRef } from "react";

import Link from "next/link";
import Head from "next/head";
// import { useRouter } from 'next/router';
import { useAppData } from "../context/AppDataContext";
import WelcomeMessage from "./components/WelcomeMessage";
import Members from "./components/Members";
import Speakers from "./components/Speakers";
import Slider from "react-slick";
import Image from "next/image";
import { OnelinerData, SessionItem } from "@/types";
import axios from "axios";

// Images 
import img4 from '../../public/images/images/img4.webp';
import icon1 from '../../public/images/images/icon_1.png';
import icon2 from '../../public/images/images/icon_2.png';
import icon3 from '../../public/images/images/icon_3.png';
import icon4 from '../../public/images/images/icon_4.png';
import icon5 from '../../public/images/images/icon_5.png';
import icon6 from '../../public/images/images/icon_6.png';
import icon7 from '../../public/images/images/icon_7.png';
import icon8 from '../../public/images/images/icon_8.png';
import edit from '../../public/images/images/edit.png';
import dow from '../../public/images/images/dow.png';
import backgroundImage2 from '../../public/images/images/bg2.webp';
import mess from '../../public/images/images/mess.png';
import mess1 from '../../public/images/images/mess1.png';
import mess2 from '../../public/images/images/mess2.png';
import ph from '../../public/images/images/ph.png';
import { toast } from 'react-toastify';

interface VenueImage {
  image: string;
  alt_text: string;
}

interface VenueImages {
  [key: string]: VenueImage;
}

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

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  query: string;
  category: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  query?: string;
  userAnswer?: string;
}



// Generate random BODMAS expression
const generateRandomMathExpression = (): { expression: string; correctAnswer: string } => {
  const operations = ['+', '-', '*'];
  const randomOperation = operations[Math.floor(Math.random() * operations.length)];

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

const Home = () => {
  // const router = useRouter();
  const { indexPageData, commonContent, general, pages, registrationInfo } =
    useAppData();

  const [activeIndexLeft, setActiveIndexLeft] = useState<number | null>(null);
  const [activeIndexRight, setActiveIndexRight] = useState<number | null>(null);

  // Modal for vounteer
  const [showModal, setShowModal] = useState(false);
  const [mathExpression, setMathExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(''); // For general errors
  const [showModal3, setShowModal3] = useState(false); // For success modal
  const [showModal6, setShowModal6] = useState(false); // For success modal
  const [showModal9, setShowModal9] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    category: 'volunteer',
  });

  // Modal for sponsor and exhibitor 
  const [showModal8, setShowModal8] = useState<boolean>(false);
  const [modalHeading, setModalHeading] = useState<string>('');
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    query: '',
    category: ''
  });

  const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({});

  const [successModalContent, setSuccessModalContent] = useState<{
    heading: string;
    query: React.ReactNode;
  }>({
    heading: '',
    query: ''
  });


  // const [userAnswer, setUserAnswer] = useState<string>('');
  // const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  // const [mathExpression, setMathExpression] = useState<string>('');
  // const [error, setError] = useState<string>('');


  console.log("Error", error)
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

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

  // validation of volunteer form 

  const validateForm = (): FormErrorType => {
    const errors: FormErrorType = {};


    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    else if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    else if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    else if (!userAnswer.trim()) {
      errors.userAnswer = 'Answer is required';
    }

    return errors;
  };


  // Submit for Volunteer 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm();
    setFormErrors(errors); // Always set inline errors

    const fieldOrder = ['firstName', 'lastName', 'email', 'userAnswer'];

    // Show toast + focus only for first error
    for (const field of fieldOrder) {
      if (errors[field as keyof typeof errors]) {
        toast.error(errors[field as keyof typeof errors] as string);

        // Focus the relevant field
        switch (field) {
          case 'firstName':
            firstNameRef.current?.focus();
            break;
          case 'lastName':
            lastNameRef.current?.focus();
            break;
          case 'email':
            emailRef.current?.focus();
            break;
          case 'userAnswer':
            captchaRef.current?.focus();
            break;
        }

        return;
      }
    }

    // Check captcha separately
    if (parseFloat(userAnswer) !== parseFloat(correctAnswer || '0')) {
      const captchaError = 'Incorrect answer. Please try again.';
      toast.error(captchaError);
      setFormErrors({ ...errors, userAnswer: captchaError });
      captchaRef.current?.focus();
      return;
    }

    // Submit form
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
        module_name: 'enquiry_form',
        keys: {
          data: [{
            name: fullName,
            email: formData.email,
            category: formData.category,
          }],
        },
        cid: process.env.NEXT_PUBLIC_CID,
      });

      toast.success('Form submitted successfully!');
      setShowModal(false);
      setShowModal3(true);

      // Clear everything
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        category: 'volunteer',
      });
      setUserAnswer('');
      setFormErrors({});
      setError('');
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
      console.error(err);
    }
  };

  const handleSuccess = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowModal3(false);
    setError('');
  };

  // Modal for Download Brochure 
  // Function to open the modal
  const openBrochureModal = () => {
    setShowModal9(true);
  };

  // Function to close the modal
  const closeBrochureModal = () => {
    setShowModal9(false);
    // Store the close time in localStorage
    localStorage.setItem("brochureFormClosed", Date.now().toString());
  };






  const toggleAccordionLeft = (index: number) => {
    setActiveIndexLeft(activeIndexLeft === index ? null : index);
  };

  const toggleAccordionRight = (index: number) => {
    setActiveIndexRight(activeIndexRight === index ? null : index);
  };

  console.log("indexdata page ", indexPageData);
  console.log("commondata page", commonContent);
  console.log("general page", general);
  console.log("pages page", pages);
  console.log("register page", registrationInfo);

  // Get canonical URL
  const canonicalUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const bannerContent = indexPageData?.bannerContent || {};
  const bannerId = Object.keys(bannerContent)[0]; // Get the first key in the bannerContent object (ID)

  const banner = bannerContent && bannerContent[bannerId];

  const { headding, tag_line, content } = banner || {};

  // const oneliner = (indexPageData?.oneliner || {}) as {
  //   sessions?: { content?: string };
  // };
  // const sessionContent = oneliner.sessions?.content || "";

  const oneliner: OnelinerData = indexPageData?.oneliner || {};
  const sessionContent = oneliner?.sessions?.content || "";

  const sessions: SessionItem[] = indexPageData?.sessions || [];

  const splitIndex = Math.ceil(sessions.length / 2);
  const firstList = sessions.slice(0, splitIndex);
  const secondList = sessions.slice(splitIndex);

  // const importantDatesContent = oneliner?.important_dates?.content || "";
  const importantDatesContent = oneliner.important_dates?.content || "";
  const submitAbstractContent = oneliner.Submit_Your_Abstract?.content || "";
  const networkingHeading = oneliner.Explore_Our_Comprehensive_Networking_Services?.headding || "";
  const networkingContent = oneliner.Explore_Our_Comprehensive_Networking_Services?.content || "";
  const valunteerContent = oneliner.Be_A_Volunteer?.content || "";


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    afterChange: () => {
      // Get all slides
      document.querySelectorAll(".slick-slide").forEach((slide) => {
        const isHidden = slide.getAttribute("aria-hidden") === "true";

        // Disable interactive elements in hidden slides
        slide.querySelectorAll("a, button").forEach((el) => {
          el.setAttribute("tabindex", isHidden ? "-1" : "0");
        });
      });
    },
  };

  const faqs = commonContent?.faqs || [];
  // console.log("faqs", faqs); 
  const middleIndex = Math.ceil(faqs.length / 2);
  const firstHalf = faqs.slice(0, middleIndex);
  const secondHalf = faqs.slice(middleIndex);

  const venueImages: VenueImages = indexPageData?.venueImages || {};

  // console.log("venue images", venueImages); 

  // Sample PPT download 
  const handleDownloadPPT = () => {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = "/Sample PPT.pptx"; // File must exist in the public folder
    link.setAttribute("download", "Sample PPT.pptx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sample Abstract Download 
  const handleDownloadAbstract = () => {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = "/Sample Abstract.docx"; // File must exist in the public folder
    link.setAttribute("download", "Sample Abstract.docx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Toggle Modal with dynamic heading and category
  const toggleModal2 = (category: string, heading: string): void => {
    if (!showModal8) {
      const { expression, correctAnswer } = generateRandomMathExpression();
      setMathExpression(expression);
      setCorrectAnswer(correctAnswer);
    }

    setContactFormData((prevState) => ({
      ...prevState,
      category, // Set dynamic category
    }));

    setModalHeading(heading); // Set dynamic heading
    setShowModal8(true); // Open modal
  };

  const handleCloseContact = (): void => {
    setShowModal8(false);
  };

  const handleSuccessModal = (): void => {
    setShowModal6(false);
  };

  const validateFormContact = (): ContactFormErrors => {
    const errors: ContactFormErrors = {};


    if (!contactFormData.name) {
      errors.name = 'Name is required';
    }

    else if (!contactFormData.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
      errors.email = 'Email address is invalid';
    }


    else if (!contactFormData.phone) {
      errors.phone = 'Phone number is required';
    }

    else if (!contactFormData.query) {
      errors.query = 'Message is required';
    }

    else if (!userAnswer) {
      errors.userAnswer = 'Anti-spam answer is required';
    }

    return errors;
  };

  const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateFormContact();

    if (Object.keys(errors).length === 0) {
      if (parseFloat(userAnswer) !== parseFloat(correctAnswer || '0')) {
        setContactFormErrors({ userAnswer: 'Incorrect answer. Please try again.' });
        toast.error('Incorrect answer. Please try again.');

        const answerInput = document.getElementById('userAnswer');
        if (answerInput) answerInput.focus();

        return;
      }

      try {
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
          module_name: 'enquiry_form',
          keys: {
            data: [contactFormData]
          },
          cid: process.env.NEXT_PUBLIC_CID
        });

        setShowModal8(false);

        // Set success modal based on category
        setSuccessModalContent({
          heading: contactFormData.category === 'sponsor' ? 'Sponsorships' : 'Exhibitors',
          query: (
            <p>
              For {contactFormData.category} opportunities, please write to{' '}
              <Link href={`mailto:${general.cemail}`} title={general.cemail}>
                {general.cemail}
              </Link>
            </p>
          )
        });
        setShowModal6(true);


        // Reset the form
        setContactFormData({
          name: '',
          email: '',
          phone: '',
          query: '',
          category: ''
        });
        setUserAnswer('');
        setContactFormErrors({});
        setError('');

      } catch (err) {
        console.error('Submission error:', err); // <-- Use the error
        setError('Error submitting form. Please try again later.');
        toast.error('Error submitting form. Please try again later.');
      }

    } else {
      setContactFormErrors(errors);

      const firstErrorField = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorField as keyof ContactFormErrors];

      toast.error(firstErrorMessage || 'Please fill the form correctly.');

      // Focus the field with the first error
      const errorInput = document.getElementById(firstErrorField);
      if (errorInput) errorInput.focus();
    }
  };


  return (
    <div>
      <Head>
        <title>{pages?.index[0].title || ""}</title>
        <meta name="description" content={pages?.index[0].content || ""} />
        <meta name="keywords" content={pages?.index[0].meta_keywords || ""} />
        <link rel="canonical" href={canonicalUrl || ""} />
      </Head>

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
                    <i className="fa fa-hourglass-half" aria-hidden="true"></i>
                    <span>
                      Early Bird Registration closes on{" "}
                      <span
                        className="marquee-date"
                        dangerouslySetInnerHTML={{
                          __html: (
                            indexPageData?.importantDates?.[1]?.date || ""
                          )
                            .replace(/<sub>/g, "<sup>")
                            .replace(/<\/sub>/g, "</sup>")
                            .replace(/<br\s*\/?>/g, " "),
                        }}
                      />
                    </span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span className="me-2">For discount queries contact </span>
                    <i className="bx bxs-phone-call box-phone"></i>
                    <b>
                      <a
                        href={`tel:${general?.phone || ""}`}
                        title={`${general?.phone || ""}`}
                      >
                        {general?.phone || ""}
                      </a>
                    </b>
                  </div>
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
                      <span
                        className="marquee-date"
                        dangerouslySetInnerHTML={{
                          __html: (
                            indexPageData?.importantDates?.[1]?.date || ""
                          )
                            .replace(/<sub>/g, "<sup>")
                            .replace(/<\/sub>/g, "</sup>")
                            .replace(/<br\s*\/?>/g, " "),
                        }}
                      />
                    </span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span>Avail special discounts for students and groups</span>
                  </div>
                  <div className="marquee-item">
                    <i className="fa fa-bell bell-icon" aria-hidden="true"></i>
                    <span className="me-2">For discount queries contact </span>
                    <i className="bx bxs-phone-call box-phone"></i>
                    <b>
                      <a
                        href={`tel:${general?.phone || ""}`}
                        title={`${general?.phone || ""}`}
                      >
                        {general?.phone || ""}
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
              <p>{content || ""}</p>
              <button
                type="button"
                title={`${general?.clogotext}_Brochure`}
                onClick={openBrochureModal}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      <WelcomeMessage />
      <Members />

      <div className="session_wrap1" id="sessions-block">
        <div className="clearfix">
          <div className="row clearfix session-img">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <h2>Sessions</h2>
              <p>{sessionContent ? sessionContent : ""}</p>
            </div>
            <div
              className="col-md-4  session_wra155 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1600ms"
            >
              <div className="sq_mainbox">
                <div className="sq_box1"></div>
                <div className="sq_box2"></div>
                <span className="nur_wrap1">
                  {general ? general?.clogotext : ""}
                </span>
                <span className="nur_wrap2">CONFERENCE</span>
                <span className="nur_wrap3">
                  {general ? general?.full_length_dates : ""}
                </span>
                <span className="nur_wrap4">
                  {general ? general?.venue_p1 : ""}
                </span>
              </div>
            </div>
            <div
              className="col-md-8 mar_mk55 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1800ms"
            >
              <div className="add_wrap_session">
                <ul>
                  {firstList.map((session: SessionItem, index: number) => (
                    <li key={index}>
                      <span>{session.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="add_wrap_session">
                <ul>
                  {secondList.map((session: SessionItem, index: number) => (
                    <li key={index}>
                      <span>{session.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="list-of-topics-navigation-block">
                <p>
                  Explore{" "}
                  <Link href="list-of-topics" title="List Of Topics">
                    all topics for {general?.confkeyword}.
                  </Link>{" "}
                  Submit your abstract to present at the conference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Speakers />

      <div className="book_wrap">
        <Slider {...sliderSettings}>
          {/* Slide 1 - Book Today */}
          <div className="auto-container clearfix" aria-hidden="false">
            <div className="row clearfix">
              <div
                className="col-md-12 wow fadeInUp animated"
                data-wow-delay="200ms"
                data-wow-duration="1000ms"
              >
                <h2>Book Today &amp; Save huge!</h2>
                {/* <h3>Listener @ ${listenerDiscountedFee} | Presenter @ ${presenterDiscountedFee}</h3> */}
                {/* { listenerDiscountedFee > 0 && presenterDiscountedFee > 0 && (
                  <h3>Listener @ ${listenerDiscountedFee} | Presenter @ ${presenterDiscountedFee}</h3>
                )} */}

                <a href="/register" title="Register" tabIndex={0}>
                  Register now
                </a>
              </div>
            </div>
          </div>

          {/* Slide 2 - Sponsor */}
          <div className="auto-container clearfix" aria-hidden="false">
            <div className="row clearfix">
              <div
                className="col-md-12 wow fadeInUp animated"
                data-wow-delay="200ms"
                data-wow-duration="1000ms"
              >
                <h2>Engage, Influence, Inspire</h2>
                <h3>Become a Sponsor and Leave a Lasting Impression!</h3>
                <button
                  type="button"
                  title="Contact"
                  className="index-contact"
                  tabIndex={0}
                  onClick={() => toggleModal2("sponsor", "Sponsorship Form")}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 - Exhibitor */}
          <div className="auto-container clearfix" aria-hidden="false">
            <div className="row clearfix">
              <div
                className="col-md-12 wow fadeInUp animated"
                data-wow-delay="200ms"
                data-wow-duration="1000ms"
              >
                <h2>Make your brand stand out</h2>
                <h3>Become an exhibitor at our International Conference</h3>
                <button
                  type="button"
                  title="Contact"
                  className="index-contact"
                  tabIndex={0}
                  onClick={() => toggleModal2('exhibitor', 'Exhibitor Form')}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <div className="import_wrap">
        <div className="auto-container clearfix">
          <div className="row test-imp-row">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <h2>
                Important <span>Dates</span>
              </h2>
              <p>{importantDatesContent ? importantDatesContent : ""}</p>
            </div>

            <div className="test-imp">
              <div className="row test-imp-row">
                <div className="col-md-3"></div>
                <div
                  className="col-md-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="200ms"
                  data-wow-duration="1000ms"
                >
                  <div className="date-mainblock-color1">
                    <div className="date-topbg-color1">
                      <div className="pull-left date-lflex">
                        <div className="date-circle1"></div>
                        <div className="date-lstrip1"></div>
                        <div className="date-circle2"></div>
                        <div className="date-lstrip2"></div>
                      </div>
                      <div className="pull-right date-rflex">
                        <div className="date-circle1"></div>
                        <div className="date-lstrip3"></div>
                        <div className="date-circle2"></div>
                        <div className="date-lstrip4"></div>
                      </div>
                    </div>
                    <div className="date-textblock">
                      <div
                        className="may_wrap15"
                        dangerouslySetInnerHTML={{
                          __html:
                            indexPageData?.importantDates?.[0]?.date || "",
                        }}
                      >
                        {/* 28<sub>TH</sub> <span>MAY 2024</span> */}
                      </div>
                      <div className="earl_wrap">
                        {indexPageData?.importantDates?.[0]?.text || ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="400ms"
                  data-wow-duration="1200ms"
                >
                  <div className="date-mainblock-color2">
                    <div className="date-topbg-color2">
                      <div className="pull-left date-lflex">
                        <div className="date-circle1"></div>
                        <div className="date-rstrip1"></div>
                        <div className="date-circle2"></div>
                        <div className="date-rstrip2"></div>
                      </div>
                      <div className="pull-right date-rflex">
                        <div className="date-circle1"></div>
                        <div className="date-rstrip3"></div>
                        <div className="date-circle2"></div>
                        <div className="date-rstrip4"></div>
                      </div>
                    </div>
                    <div className="date-textblock">
                      <div
                        className="may_wrap15 rih5 "
                        dangerouslySetInnerHTML={{
                          __html:
                            indexPageData?.importantDates?.[1]?.date || "",
                        }}
                      ></div>
                      <div className="earl_wrap">
                        {indexPageData?.importantDates?.[1]?.text || ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq_wrap">
        <div className="auto-container">
          <div className="row clearfix">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <h3 className="bot_wrap156">
                FAQ<span className="org_wrap">s</span>
              </h3>
            </div>
            <div className="col-md-6">
              <div className="content-column">
                <div className="inner-box">
                  <ul className="accordion-box">
                    {firstHalf
                      ? firstHalf.map((faq, index) => (
                        <li
                          key={faq.faq_id}
                          className={`accordion block wow fadeInUp ${activeIndexLeft === index ? "active-block" : ""
                            }`}
                          data-wow-delay={`${index * 200}ms`}
                          data-wow-duration="1500ms"
                        >
                          <div
                            className={`acc-btn ${activeIndexLeft === index ? "active" : ""
                              }`}
                            onClick={() => toggleAccordionLeft(index)}
                          >
                            <div className="icon-outer">
                              <i className="bx bxs-arrow-from-left hide5"></i>
                              <i className="bx bxs-arrow-from-top show5"></i>
                            </div>
                            {faq ? faq.faq_question : ""}
                          </div>
                          <div
                            className={`acc-content ${activeIndexLeft === index ? "current" : ""
                              }`}
                          >
                            <div className="content clearfix">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: faq ? faq.faq_ans : "",
                                }}
                              />
                            </div>
                          </div>
                        </li>
                      ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="content-column">
                <div className="inner-box">
                  <ul className="accordion-box">
                    {secondHalf
                      ? secondHalf.map((faq, index) => (
                        <li
                          key={faq.faq_id}
                          className={`accordion block wow fadeInUp ${activeIndexRight === index ? "active-block" : ""
                            }`}
                          data-wow-delay={`${index * 200}ms`}
                          data-wow-duration="1500ms"
                        >
                          <div
                            className={`acc-btn ${activeIndexRight === index ? "active" : ""
                              }`}
                            onClick={() => toggleAccordionRight(index)}
                          >
                            <div className="icon-outer">
                              <i className="bx bxs-arrow-from-left hide5"></i>
                              <i className="bx bxs-arrow-from-top show5"></i>
                            </div>
                            {faq ? faq.faq_question : ""}
                          </div>
                          <div
                            className={`acc-content ${activeIndexRight === index ? "current" : ""
                              }`}
                          >
                            <div className="content clearfix">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: faq ? faq.faq_ans : "",
                                }}
                              />
                            </div>
                          </div>
                        </li>
                      ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq_wrap">
        <div className="auto-container">
          <div className="row clearfix">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <h3 className="bot_wrap157 mty155">
                Venue <span className="org_wrap">Highlights</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="bg_wrap_acc5 test-heghlight">
          <div className="auto-container clearfix">
            <div className="row">
              <div className="col-md-12">
                {Object.values(venueImages).map((imageData, index) => {
                  // Full image path construction
                  const imagePath = `/images/${imageData.image}`;

                  return (
                    <div
                      key={`venue-img-${index}`}
                      className={`add_bh15${index + 4} ${index % 2 === 0 ? "add_bh154" : "add_bh155"
                        } wow fadeInUp`}
                      data-wow-delay={`${200 + index * 100}ms`}
                      data-wow-duration="1000ms"
                    >
                      <div className="venue-image-wrapper">
                        <Image
                          src={imagePath}
                          alt={imageData.alt_text}
                          width={500}
                          height={300}
                          className="gallery_wra15"
                          priority={index < 3} // Priority for first 3 images
                          onError={(e) => {
                            console.log(e);
                            console.error("Image failed to load:", imagePath);
                            // You could set a fallback image here if needed
                          }}
                        />
                        <span className="image-caption">
                          {imageData.alt_text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spek_wrap">
        <div className="set_gray_wrap1 wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
          <div className="add_style1">
            <hr />
            <h3> {submitAbstractContent ? submitAbstractContent : ""}</h3>
            <Link href="/call-for-abstract-submission" title='Submit Your Abstract'>Submit Your Abstract</Link>
          </div>
        </div>
        <div className="set_gray_wrap2 wow fadeInUp" data-wow-delay="500ms" data-wow-duration="1000ms"><Image
          src={img4} alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" /></div>
      </div>

      <div className="import_wrap2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="200ms"
              data-wow-duration="1000ms">
              <h3>{networkingHeading ? networkingHeading : ""}</h3>
              <p>{networkingContent ? networkingContent : ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="enhan_wrap">
        <div className="auto-container clearfix">
          <div className="row clearfix">
            <div className="col-md-3 col-sm-6  wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1">
                <Image src={icon1} alt="Personal encounters" title="Personal encounters" loading="lazy" />
                <p>Personal encounters</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1">
                <Image src={icon2} alt="Networking opportunities" title="Networking opportunities" loading="lazy" />
                <p>Networking opportunities</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="600ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1 top156">
                <Image src={icon3} alt="Career Growth" title="Career Growth" loading="lazy" />
                <p> Career Growth</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="800ms" data-wow-duration="1000ms">
              <div className="wrap_iocn2 top156">
                <Image src={icon8} alt="Scholars help" title="Scholars help" loading="lazy" />
                <p>Scholars help</p>
              </div>
            </div>
            <div className="col-md-12 wow fadeInUp" data-wow-delay="1000ms" data-wow-duration="1000ms">
              <hr />
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1100ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1 top156">
                <Image src={icon4} alt="New learnings" title="New learnings" loading="lazy" />
                <p>New learnings</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1200ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1">
                <Image src={icon5} alt="Contribute to research advancements" title="Contribute to research advancements" loading="lazy" />
                <p>Contribute to research advancements</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1300ms" data-wow-duration="1000ms">
              <div className="wrap_iocn1">
                <Image src={icon6} alt="Exchange of ideas" title="Exchange of ideas" loading="lazy" />
                <p>Exchange of ideas</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1400ms" data-wow-duration="1000ms">
              <div className="wrap_iocn2 top156">
                <Image src={icon7} alt="Knowledge sharing" title="Knowledge sharing" loading="lazy" />
                <p>Knowledge sharing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Downloads  */}
      <div className="down_wrap_style wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-10 mar_wrap55">
              <div className="ess_wrap5">
                <div className="row">
                  <div className="col-md-12">
                    <h3>Essential <span>Downloads</span></h3>
                  </div>
                  <div className="col-md-4">
                    <div className="box_st1">
                      <Image src={edit} className="pol55" alt="Sample PPT" title="Sample PPT" loading="lazy" />
                      <h3>Sample PPT</h3>
                      <button type="button" title="Sample PPT" onClick={handleDownloadPPT}>
                        Download{" "}
                        <Image
                          src={dow}
                          alt="Sample PPT"
                          title="Sample PPT"
                          loading="lazy"
                        />
                      </button>
                    </div>
                    <div className="blue_wrap55"></div>
                  </div>

                  <div className="col-md-4">
                    <div className="box_st1">
                      <Image src={edit} className="pol55" alt="Brochure" title="Brochure" loading="lazy" />
                      <h3>Brochure</h3>
                      <button type='button' title={`${general.clogotext}_Brochure`}
                        onClick={openBrochureModal}
                      >Download <Image src={dow}
                        alt={`${general.clogotext}_Brochure`} title={`${general.clogotext}_Brochure`} loading="lazy" /></button>
                    </div>
                    <div className="blue_wrap55"></div>
                  </div>

                  <div className="col-md-4">
                    <div className="box_st1">
                      <Image src={edit} className="pol55" alt="Sample Abstract" title="Sample Abstract" loading="lazy" />
                      <h3>Sample Abstract</h3>

                      <button type='button' title="Sample Abstract" onClick={handleDownloadAbstract}>Download{" "}<Image src={dow}
                        alt="Sample Abstract" title="Sample Abstract" loading="lazy" /></button>
                    </div>
                    <div className="blue_wrap55"></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="volue_wrap" style={{ backgroundImage: `url(${backgroundImage2.src})` }}>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-7 amr_wrap15">
              <div className="box_wrap155"></div>

              <div className="volu_wrap wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
                <h3>Be A Volunteer</h3>
              </div>

              <div className="box_wrap_add1 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">

                <h3 dangerouslySetInnerHTML={{ __html: valunteerContent || '' }} />
              </div>

              <div className="box_wrap154"></div>

              <div className="apple_wrap wow fadeInUp" data-wow-delay="500ms" data-wow-duration="1000ms">
                <button
                  type="button"
                  title='Apply Now'
                  className='apply-now-btn'
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

      <div className="cont_wrap_add  wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
        <div className="auto-container clearfix">
          <div className="row clearfix">
            <div className="col-md-9 mar_wrap1579">
              <div className="call_cont_st1">
                <div className="wr_sty1">
                  <div className="logo_cont15"><Image src="/images/images/logo-hd-1.svg" alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" width={200} height={80} /></div>
                  <div className="cont_head_st1">
                    <h3>Discover Whats Next in {general.clname ? general.clname : ""}</h3>
                    <p>Join our community today for the latest news, exclusive interviews, and unique insights from world-renowned speakers and experts.</p>
                  </div>
                  <form id="joinourcommunityform" method="post">
                    <div className="row">
                      <div className="col-md-12 cont_wrap14666">
                        <label>Email Address:*</label>
                        <input
                          name="email"
                          type="email"
                          placeholder='Enter Email'
                          id="joinourcommunityemail"
                        // value={communityFormData ? communityFormData.email : ""}
                        // onChange={handleCommunityChange}
                        />
                        {/* {formErrors ? formErrors.email && <div id="joinourcommunityemail-error" style={{ color: "red" }}>{formErrors ? formErrors.email : ""}</div> : ""} */}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>First Name:*</label>
                        <input
                          name="fname"
                          id="joinourcommunityfname"
                          type="text"
                          placeholder='Enter First Name'
                        // value={communityFormData ? communityFormData.fname : " "}
                        // onChange={handleCommunityChange}
                        />
                        {/* {formErrors ? formErrors.fname && <div id="jocfname-error" style={{ color: "red" }}>{formErrors ? formErrors.fname : ""}</div> : ""} */}
                      </div>
                      <div className="col-md-6 cont_wrap14666">
                        <label>Last Name:*</label>
                        <input
                          name="lname"
                          id="joinourcommunitylname"
                          type="text"
                          placeholder='Enter Last Name'
                        // value={communityFormData ? communityFormData.lname : ""}
                        // onChange={handleCommunityChange}
                        />
                        {/* {formErrors.lname && <div id="joclname-error" style={{ color: "red" }}>{formErrors.lname}</div>} */}
                      </div>
                      <div className="col-md-12">
                        <div className="sbtn">
                          <input
                            name="submit"
                            value="Submit"
                            title="Submit"
                            className="appy15"
                            type="button"
                            id="joinourcommunitysubmitbtn"
                          // onClick={handleCommunitySubmit}
                          />
                        </div>
                        <input type="hidden" name="category" value="joinourcommunity" />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="wr_sty2">
                  <div className="img_wrap156">
                    <Image src={mess1} className="mess15" alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" />
                    <span className="jum55">{general.full_length_dates ? general.full_length_dates : ""}</span>
                    <Image src={mess2} className="mess16" alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" />
                    <span className="jum56">{general.venue_p1 ? general.venue_p1 : ""}</span>
                    <span className="jum57"><Image src={ph} alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" /> <Link href={`tel:${general?.phone}`} className='' title={general?.phone}>{general?.phone}</Link></span>
                    <Image src={mess} className="img15444" alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" />
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
                  <i className="material-icons" style={{ marginBottom: '35px' }}>
                    &#10003;
                  </i>
                </div>
                <h4 className="modal-title w-100">Volunteer</h4>
                <button type="button" className="close" onClick={handleClose} style={{ fontSize: '30px' }}>
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
                        type='text'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
                    </div>
                    <div className='d-flex name-info'>
                      <div className='col-6 test'>
                        <label>First Name:*</label>
                        <input
                          type='text'
                          ref={firstNameRef}
                          name="firstName"
                          placeholder='Enter first name'
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                        {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
                      </div>
                      <div className='col-6 test2'>
                        <label>Last Name:*</label>
                        <input
                          type='text'
                          ref={lastNameRef}
                          name="lastName"
                          placeholder='Enter last name'
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                        {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
                      </div>
                    </div>
                    <div className="col-12">
                      <p>
                        Verify you’re human: What is <b>{mathExpression}</b>?
                      </p>
                      <input
                        type='text'
                        placeholder='Enter your answer'
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      {formErrors.userAnswer && <p style={{ color: 'red' }}>{formErrors.userAnswer}</p>}
                      <button type="button" title='Refresh Captcha' onClick={refreshCaptcha} className="btn btn-secondary mt-2">Refresh Captcha</button>

                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" title="Submit" className="btn btn-success btn-block">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal3 && (
        <div className="modal" id="myModal" role="dialog">
          <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="material-icons" style={{ marginBottom: "35px" }}>&#10003;</i>
                </div>
                <h4 className="modal-title w-100">Form submitted successfully!</h4>
                <p>Thank you for your submission. We will get back to you shortly.</p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-success btn-block" onClick={handleSuccess}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal6 && (
        <div className="modal" id="myModal" role="dialog">
          <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bx bx-envelope" style={{ marginBottom: "35px" }}></i>
                </div>
                <h4 className="modal-title w-100">{successModalContent.heading}</h4>
                {successModalContent.query}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-success btn-block" onClick={handleSuccessModal}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showModal8 && (
        <div className="modal2" id="myModal" role="dialog">
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bx bx-envelope" style={{ marginBottom: "35px" }}></i>
                </div>
                <h4 className="modal-title w-100">{modalHeading}</h4> {/* Dynamic Heading */}
                <button type="button" className="close" onClick={handleCloseContact} style={{ fontSize: "30px" }}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmitContact}
                >
                  <div className="row">
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>Fullname:*</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter first name"
                          value={contactFormData.name}
                          onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                        />
                        {contactFormErrors.name && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.name}</p>}
                      </div>
                      <div className="col-6 test2">
                        <label>Email Address:*</label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          placeholder="Enter email"
                          value={contactFormData.email}
                          onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                        />
                        {contactFormErrors.email && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.email}</p>}
                      </div>
                    </div>
                    <div className='d-flex name-info'>
                      <div className='col-6 test'>
                        <label>Phone Number:*</label>
                        <input
                          id="phone"
                          name="phone"
                          type='text'
                          placeholder='Enter phone number'
                          value={contactFormData.phone}
                          onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                        />
                        {contactFormErrors.phone && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.phone}</p>}
                      </div>
                      <div className='col-6 test2'>
                        <label>Message:*</label>
                        <textarea
                          id="query"
                          name="query"
                          placeholder='Enter your message'
                          value={contactFormData.query}
                          onChange={(e) => setContactFormData({ ...contactFormData, query: e.target.value })}

                        ></textarea>
                        {contactFormErrors.query && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.query}</p>}
                      </div>
                    </div>
                    <div className='col-12'>
                      <p>Verify you’re human: What is <b>{mathExpression}</b> ?</p>
                      <input
                        id="userAnswer"
                        name="userAnswer"
                        type='text'
                        placeholder='Enter your answer'
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                      />
                      {contactFormErrors.userAnswer && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.userAnswer}</p>}
                      <button type="button" title='Refresh Captcha' onClick={refreshCaptcha} className="btn btn-secondary mt-2">Refresh Captcha</button>
                    </div>
                    <input type="hidden" name="category" value={contactFormData.category || "joinourcommunity"} />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" title="Submit" className="btn btn-success btn-block">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal9 && (
        <div className="modal2 brochure-form-modal" id="myModal" role="dialog">
          <div className="modal-dialog2 modal-confirm fade-in" role="document">
            <div className="modal-content2">
              <div className="modal-header">
                <div className="icon-box">
                  <i className="bx bx-file" style={{ marginBottom: "35px" }}></i>
                </div>
                <h4 className="modal-title w-100">Download Brochure</h4>
                <button type="button" className="close" onClick={closeBrochureModal} style={{ fontSize: "30px" }}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form
                // onSubmit={handleSubmitBrochure}
                >
                  <div className="row">
                    <div className="d-flex name-info">
                      <div className="col-6 test">
                        <label>Name:*</label>
                        <input
                          type="text"
                          placeholder="Enter name"
                        // value={brochureFormData.first_name}
                        // onChange={(e) => setBrochureFormData({ ...brochureFormData, first_name: e.target.value })}
                        // disabled={isSubmitting} // Disable field during submission
                        />
                        {/* {formErrors.first_name && <p style={{ color: 'red', textAlign: 'left' }}>{formErrors.first_name}</p>} */}
                      </div>
                      <div className="col-6 test2">
                        <label>Email Address:*</label>
                        <input
                          type="text"
                          placeholder="Enter email"
                        // value={brochureFormData.email}
                        // onChange={(e) => setBrochureFormData({ ...brochureFormData, email: e.target.value })}
                        // disabled={isSubmitting} // Disable field during submission
                        />
                        {/* {formErrors.email && <p style={{ color: 'red', textAlign: 'left' }}>{formErrors.email}</p>} */}
                      </div>
                    </div>
                    <div className='d-flex name-info'>
                      <div className='col-6 test'>
                        <label>Phone Number:*</label>
                        <input
                          type='text'
                          placeholder='Enter phone number'
                        // value={brochureFormData.phone}
                        // onChange={(e) => setBrochureFormData({ ...brochureFormData, phone: e.target.value })}
                        // disabled={isSubmitting} // Disable field during submission
                        />
                        {/* {formErrors.phone && <p style={{ color: 'red', textAlign: 'left' }}>{formErrors.phone}</p>} */}
                      </div>
                      <div className='col-6 test2 country-drop'>
                        <label>Country:*</label>
                        <div className='country-drop-block'>
                          <select
                            className="set156"
                            name="country"
                          // value={brochureFormData.country}
                          // onChange={(e) => setBrochureFormData({ ...brochureFormData, country: e.target.value })}
                          // disabled={isSubmitting} // Disable field during submission
                          >
                            <option value="">Select Country</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            {/* <option value="Cote d'Ivoire">Cote d'Ivoire</option> */}
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard and McDonald Islands">Heard and McDonald Islands</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            {/* <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option> */}
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao">Lao</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="North Macedonia">North Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="St. Helena">St. Helena</option>
                            <option value="St. Pierre and Miquelon">St. Pierre and Miquelon</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States of America">United States of America</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Vatican City State">Vatican City State</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zaire">Zaire</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>
                        {/* {formErrors.country && <p style={{ color: 'red', textAlign: 'left' }}>{formErrors.country}</p>} */}
                      </div>
                    </div>
                    <div className='d-flex name-info'>
                      <div className='col-6 test country-drop'>
                        <label>Interested In:*</label>
                        <div className='country-drop-block'>
                          <select
                            className="set156"
                            name="interested_in"
                          // value={brochureFormData.interested_in}
                          // onChange={(e) => setBrochureFormData({ ...brochureFormData, interested_in: e.target.value })}
                          // disabled={isSubmitting} // Disable field during submission
                          >
                            <option value="Oral Presentation">Oral Presentation</option>
                            <option value="Poster Presentation">Poster Presentation</option>
                            <option value="Delegate (Participation)">Delegate (Participation)</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        {/* {formErrors.interested_in && <p style={{ color: 'red', textAlign: 'left' }}>{formErrors.interested_in}</p>} */}
                      </div>
                      <div className='col-6 test2'>
                        <label>Query (Optional):</label>

                        <textarea
                          placeholder="Enter Your Query"
                        // value={brochureFormData.message}
                        // onChange={(e) => setBrochureFormData({ ...brochureFormData, message: e.target.value })}
                        // disabled={isSubmitting} // Disable field during submission
                        />

                      </div>

                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      // title={isSubmitting ? 'Please wait' : 'Proceed'}
                      className="btn btn-success btn-block"
                    // disabled={isSubmitting} // Disable button during submission
                    >Proceed
                      {/* {isSubmitting ? 'Please wait' : 'Proceed'} */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );

};
export default Home;
