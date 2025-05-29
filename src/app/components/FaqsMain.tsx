"use client"
import React, { useState } from 'react'
import { CommonContent, FAQItem } from "@/types";

interface FaqsMainProps {
    commonInfo: CommonContent;
}


const FaqsMain = ({ commonInfo }: FaqsMainProps) => {

    const faqs: FAQItem[] = commonInfo?.data?.faq || [];

    const half = Math.ceil(faqs.length / 2);
    const firstHalf = faqs.slice(0, half);
    const secondHalf = faqs.slice(half);


    const [activeIndexLeft, setActiveIndexLeft] = useState<number | null>(null);
    const [activeIndexRight, setActiveIndexRight] = useState<number | null>(null);

    const toggleAccordionLeft = (index: number) => {
        setActiveIndexLeft(activeIndexLeft === index ? null : index);
    };

    const toggleAccordionRight = (index: number) => {
        setActiveIndexRight(activeIndexRight === index ? null : index);
    };

    return (
        <div>
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
        </div>
    )
}

export default FaqsMain