"use client";

import React, { useState } from "react";

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

interface VenueImage {
  image: string;
  alt_text: string;
}

interface VenueImages {
  [key: string]: VenueImage;
}

const Home = () => {
  // const router = useRouter();
  const { indexPageData, commonContent, general, pages, registrationInfo } =
    useAppData();

  const [activeIndexLeft, setActiveIndexLeft] = useState<number | null>(null);
  const [activeIndexRight, setActiveIndexRight] = useState<number | null>(null);

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
  console.log("faqs", faqs);
  const middleIndex = Math.ceil(faqs.length / 2);
  const firstHalf = faqs.slice(0, middleIndex);
  const secondHalf = faqs.slice(middleIndex);

  const venueImages: VenueImages = indexPageData?.venueImages || {};

  console.log("venue images", venueImages);

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
                Home test 2
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
              // onClick={openBrochureModal}
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
                // onClick={() => toggleModal2("sponsor", "Sponsorship Form")}
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
                // onClick={() => toggleModal2('exhibitor', 'Exhibitor Form')}
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
                      // onClick={openBrochureModal}
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
                // onClick={toggleModal}
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
                  <div className="logo_cont15"><Image src="/images/images/logo-hd-1.svg" alt={general.clname ? general.clname : ""} title={general.clname ? general.clname : ""} loading="lazy" width={200} height={80}/></div>
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

    </div>
  );
};

export default Home;
