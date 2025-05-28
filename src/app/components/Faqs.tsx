"use client";


// src/app/components/Faqs.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { FAQItem } from '../../types';

interface Props {
//   generalInfo: any;
  faqsContent: FAQItem[];
}

const Faqs: React.FC<Props> = ({  faqsContent }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // console.log("faq data in comp",faqsContent);

  return (
    <div>
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-12">
              <Link href="/" title="Navigate to Homepage">Home</Link> <i className="fa fa-angle-right"></i>
              <span>FAQs</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">FAQs</h2>

      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 mar_center">
            <div className="row clearfix faqs-class">
              <div className="col-lg-10 col-md-10 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                <div className="faqsblock">
                  <div className="content-column">
                    <div className="inner-box">
                      <ul className="accordion-box">
                        {faqsContent.length > 0 ? (
                          faqsContent.map((faq, index) => (
                            <li
                              key={faq.faq_id}
                              className={`accordion block wow fadeInUp ${activeIndex === index ? 'active-block' : ''}`}
                              data-wow-delay={`${index * 200}ms`}
                              data-wow-duration="1500ms"
                            >
                              <div className={`acc-btn ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                                <div className="icon-outer">
                                  <i className="bx bxs-arrow-from-left hide5"></i>
                                  <i className="bx bxs-arrow-from-top show5"></i>
                                </div>
                                {faq.faq_question}
                              </div>
                              <div className={`acc-content ${activeIndex === index ? 'current' : ''}`}>
                                <div className="content clearfix">
                                  <p dangerouslySetInnerHTML={{ __html: faq.faq_ans || '' }} />
                                </div>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p>No FAQs available.</p>
                        )}
                      </ul>
                    </div>
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

export default Faqs;
