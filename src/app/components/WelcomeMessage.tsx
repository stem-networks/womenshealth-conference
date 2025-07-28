"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  arrows: boolean;
}

const WelcomeMessage = () => {
  const settings: SliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className='nursing-welcome-msg-block'>
      <div className='welcome-message-main-block'>
        <div className='auto-container clearfix'>
          <div className="welcomemsg-section">
            <div className='welcome-innerspace'>
              <div className="row justify-content-center align-items-center text-center">
                <h2 className="welcome-title">WELCOME MESSAGE</h2>
              </div>

              {/* Only wrap the part you want to slide */}
              <Slider {...settings}>
                <div>
                  <div className="grid-container">
                    {/* <!-- Left Column (Author Image and Info) --> */}
                    <div className="author-info text-center">
                      <div className="author-img">
                        <Image src="/images/images/david.webp" width={250} height={250} alt="David Zechman" title='David Zechman' className="img-fluid rounded-circle" />
                      </div>
                      <div className="author-name">
                        <h3>David Zechman</h3>
                        <p>The Zechman Group</p>
                        <p>USA</p>
                      </div>
                    </div>

                    {/* Right Column (Title, Paragraph, and Signature) */}
                    <div className="text-start content-info">
                      <div className='content-nfo-scroll'>
                        {/* <h2 className="message-title">
                                                Title: Not in the right environment to innovate and commercialize your research? MOVE! I did and now my breakthroughs are in 30,000 patients!
                                            </h2> */}
                        <p className="message-body">
                          My name is David Zechman and I am honored to serve as a keynote speaker at the Nursing, Womens Health and Gynecology Conference 2025 coming october. I was in healthcare for 39 plus years starting as a bedside respiratory therapist and ending as a hospital President and CEO at three different hospitals. Subsequently, my experiences provide me with a unique understanding of the daily challenges faced by healthcare providers, especially nursing.  This conference will provide you with a wonderful opportunity to interact with leading professionals in the field of nursing that will provide helpful knowledge, experiences, and current trends in a relaxed, learning environment.  This is like enjoying learning and networking time at a conference like NGC that will support and nurture your professional growth.
                        </p>
                        <p className="message-body">
                          I highly recommend attending this terrific conference, and I look forward to meeting you coming October!
                        </p>

                        {/* <p className="message-body">I look forward to seeing everyone and sharing my story!</p> */}
                      </div>
                      {/* 
                                                <div className="signature">
                                                    <Image src={david_sign} alt="David Zechman" title='David Zechman' className="signature-img" width={100} />
                                                    <p className=''>Signature</p>
                                                </div> */}
                    </div>
                  </div>
                </div>

                {/* Add more slides if needed */}
                {/* <div>
                                <div className="grid-container">
                                    <div className="author-info text-center">
                                        <div className="author-img">
                                            <Image src={webster} alt="Another Author" title='Another Author' className="img-fluid rounded-circle" />
                                        </div>
                                        <div className="author-name">
                                            <h3>Another Author</h3>
                                            <p>Some University</p>
                                        </div>
                                    </div>

                                    <div className="text-start content-info">
                                        <h2 className="message-title">
                                            Title: Another inspirational message here!
                                        </h2>
                                        <p className="message-body">
                                            This is another slide content where we can show some more welcome messages or information for the conference attendees. Adding more slides allows for better engagement with the audience.
                                        </p>
                                        <div className="signature">
                                            <Image src={Sign} alt="Another Signature" className="signature-img" width={100} />
                                            <p className=''>Signature</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
