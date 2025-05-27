'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { SocialLinks, OnelinerData } from '@/types';
import { useAppData } from "../../context/AppDataContext";

interface FooterProps {
    socialLinks: SocialLinks;
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
    const { indexPageData, general } = useAppData();

    const oneliner: OnelinerData = indexPageData?.oneliner || {};
    const footerContent = oneliner?.footer_content?.content || "";


    // console.log("venue images", socialLinks); 

    return (
        <div>
            <div className="footer_wrap">
                <div className="footer_add_st1">
                    <Image src="/images/images/logo-hd-1.svg" alt={general ? general.clname : ""} title={general ? general.clname : ""} loading="lazy" width={200}
                        height={80} />
                    <hr />
                    <p>{footerContent ? footerContent : ""}</p>
                </div>

                <div className="box_wrap_fot1">
                    <div className="fot_add1">
                        <h4>Mail Us At</h4>
                        <p className="">
                            <i className='bx bxs-envelope'></i> <Link href={`mailto:${general?.cemail}`} title={general?.cemail}>{general?.cemail}</Link><br />
                            <i className='bx bxs-phone-call'></i> <Link href={`tel:${general?.phone}`} title={general?.phone}>{general?.phone}</Link><br />
                            <i className='bx bxl-whatsapp'></i> <Link href={`tel:${general?.whatsapp}`} title={general?.whatsapp}>{general?.whatsapp}</Link><br />
                        </p>
                        <h4>Follow Us</h4>
                        <p className="followus">

                            <Link href={socialLinks?.facebook?.link} title={socialLinks?.facebook?.title} target="_blank">
                                <i className='bx bxl-facebook'></i>
                            </Link>


                            <Link href={socialLinks?.instagram?.link} title={socialLinks?.instagram?.title} target="_blank">
                                <i className='bx bxl-instagram'></i>
                            </Link>


                            <Link href={socialLinks?.linkedin?.link} title={socialLinks?.linkedin?.title} target="_blank">
                                <i className='bx bxl-linkedin-square'></i>
                            </Link>


                            {/* <Link href="https://x.com/NursingCon91476" title="Nursing Conference 2025 Twitter" target="_blank">
                            <i className='bx bxl-twitter'></i>
                            </Link> */}
                        </p>
                    </div>

                    <div className="menu_footer">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/" title='Home'>Home</Link></li>
                            <li><Link href="/sessions" title='Sessions'>Sessions</Link></li>
                            <li><Link href="/guidelines" title='Guidelines'>Guidelines</Link></li>
                            <li><Link href="/faqs" title='FAQs'>FAQs</Link></li>
                            <li><Link href="/call-for-abstract-submission" title='Submit Abstract'>Submit Abstract</Link></li>
                            <li><Link href="/register" title='Register'>Register</Link></li>
                        </ul>
                    </div>

                    <div className="menu_footer2">
                        <h4>General Enquiry</h4>
                        <form id="enquiryForm"
                        //  onSubmit={handleSubmit}
                        >
                            <div className="form">
                                <div className="mb-2">
                                    <input
                                        type="text"
                                        name="enquiryname"
                                        id="enquiryname"
                                        placeholder="Name"
                                        className="form-control color-white"
                                    // value={formData.enquiryname}
                                    // onChange={handleChange}
                                    />
                                    {/* {formErrors.enquiryname && <div className="footer-error">{formErrors.enquiryname}</div>} */}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="enquiryemail"
                                    id="enquiryemail"
                                    className="form-control mt-2 color-white"
                                // value={formData.enquiryemail}
                                // onChange={handleChange}
                                />
                                {/* {formErrors.enquiryemail && <div className="footer-error">{formErrors.enquiryemail}</div>} */}
                                <div className="form-floating">
                                    <textarea
                                        className="form-control color-white"
                                        name="enquiryquery"
                                        placeholder="Query"
                                        id="enquiryquery"
                                        style={{ height: "50px" }}
                                    // value={formData.enquiryquery}
                                    // onChange={handleChange}
                                    ></textarea>
                                    {/* {formErrors.enquiryquery && <div className="footer-error">{formErrors.enquiryquery}</div>} */}
                                    <input type="hidden" name="category" id="category" value="enquiry" />
                                </div>

                                <button className="btn btn-primary w-100 mt-3" type="submit" title="Submit" id="enquiry_submit_btn">Submit</button>
                                {/* {error && <div className="footer-error">{error}</div>} */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="footer_last_wrap" style={{ justifyContent: "space-between" }}>
                <div className="last_st1">
                    <Link href="#" title='Terms of Use'>Terms of Use</Link>
                    <Link href="/privacy-policy" title='Privacy Policy'>Privacy Policy</Link>
                    <Link href="#" title='Contact Us'>Contact Us</Link>
                </div>
                <div className="last_st3">
                    Copyright © <Link href="https://stemnetwork.com" target="_blank" title='STEM Network'>STEM Network</Link>
                </div>
                {/* <div className="last_st3">
          Powered by <Link href="https://evega.com" target="_blank">Evega</Link>
        </div> */}
            </div>

            {/* {showModal2 && (
                <div className="modal" id="myModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-confirm fade-in" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="icon-box">
                                    <i className="material-icons" style={{ marginBottom: "35px" }}>&#10003;</i>
                                </div>
                                <h4 className="modal-title w-100">Your message has been successfully submitted!</h4>
                                <p>We’ll get back to you soon</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-block" onClick={handleSuccess}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}


        </div>
    )
}

export default Footer