"use client"

import React, { useState, useRef } from 'react'
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import Link from 'next/link';
// import axios from 'axios';
import { ApiResponse, RegistrationInfo } from '@/types';

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

interface MainSliderProps {
    generalInfo: ApiResponse;
    registerInfo: RegistrationInfo;
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

const MainSlider = ({ generalInfo, registerInfo }: MainSliderProps) => {

    const general = generalInfo?.data || {}
    const regPrices = registerInfo?.increment_price || {}

    const listenerTotal = {
        inPerson: regPrices["Listener (In-Person)"]?.total || null,
    };

    const presenterTotal = {
        inPerson: regPrices["Presenter (In-Person)"]?.total || null,
    };

    const [showModal8, setShowModal8] = useState<boolean>(false);
    const [mathExpression, setMathExpression] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [contactFormData, setContactFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        query: '',
        category: ''
    });
    const [modalHeading, setModalHeading] = useState<string>('');
    const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({});
    const [showModal6, setShowModal6] = useState(false); // For success modal
    const [successModalContent, setSuccessModalContent] = useState<{
        heading: string;
        query: React.ReactNode;
    }>({
        heading: '',
        query: ''
    });
    const [userAnswer, setUserAnswer] = useState('');

    const modalRef = useRef<HTMLDivElement | null>(null);

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

    // const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     setIsSubmitting(true);
    //     const errors = validateFormContact();

    //     if (Object.keys(errors).length === 0) {
    //         if (parseFloat(userAnswer) !== parseFloat(correctAnswer || '0')) {
    //             setContactFormErrors({ userAnswer: 'Incorrect answer. Please try again.' });
    //             toast.error('Incorrect answer. Please try again.');
    //             setIsSubmitting(false);
    //             const answerInput = document.getElementById('userAnswer');
    //             if (answerInput) answerInput.focus();

    //             return;
    //         }

    //         try {
    //             await axios.post('/api/contact', {
    //                 formData: contactFormData,
    //             });

    //             setShowModal8(false);

    //             // Set success modal based on category
    //             setSuccessModalContent({
    //                 heading: contactFormData.category === 'sponsor' ? 'Sponsorships' : 'Exhibitors',
    //                 query: (
    //                     <p>
    //                         For {contactFormData.category} opportunities, please write to{' '}
    //                         <Link href={`mailto:${general?.cemail}`} title={general?.cemail}>
    //                             {general?.cemail}
    //                         </Link>
    //                     </p>
    //                 )
    //             });
    //             setShowModal6(true);


    //             // Reset the form
    //             setContactFormData({
    //                 name: '',
    //                 email: '',
    //                 phone: '',
    //                 query: '',
    //                 category: ''
    //             });
    //             setUserAnswer('');
    //             setContactFormErrors({});
    //             // setError('');

    //         } catch (err) {
    //             console.error('Submission error:', err); // <-- Use the error
    //             // setError('Error submitting form. Please try again later.');
    //             toast.error('Error submitting form. Please try again later.');
    //         }
    //         finally {
    //             setIsSubmitting(false)
    //         }

    //     } else {
    //         setContactFormErrors(errors);

    //         const firstErrorField = Object.keys(errors)[0];
    //         const firstErrorMessage = errors[firstErrorField as keyof ContactFormErrors];

    //         toast.error(firstErrorMessage || 'Please fill the form correctly.');

    //         // Focus the field with the first error
    //         const errorInput = document.getElementById(firstErrorField);
    //         if (errorInput) errorInput.focus();
    //         setIsSubmitting(false);
    //     }
    // };

    // UTF-8 safe Base64 encoder
    function utf8ToBase64(str: string) {
        const bytes = new TextEncoder().encode(str);
        let binary = "";
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return btoa(binary);
    }

    const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const errors = validateFormContact();

        if (Object.keys(errors).length === 0) {
            if (parseFloat(userAnswer) !== parseFloat(correctAnswer || '0')) {
                setContactFormErrors({ userAnswer: 'Incorrect answer. Please try again.' });
                toast.error('Incorrect answer. Please try again.');
                setIsSubmitting(false);
                const answerInput = document.getElementById('userAnswer');
                if (answerInput) answerInput.focus();

                return;
            }

            try {

                const payload = {
                    name: utf8ToBase64(contactFormData.name.trim()),
                    email: utf8ToBase64(contactFormData.email.trim()),
                    phone: utf8ToBase64(contactFormData.phone.trim()),
                    query: utf8ToBase64(contactFormData.query.trim()),
                };

                await fetch("/api/sponsor-exhibitor", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                // Close modal and show success
                setShowModal8(false);
                setSuccessModalContent({
                    heading: contactFormData.category === 'sponsor' ? 'Sponsorships' : 'Exhibitors',
                    query: (
                        <p>
                            For {contactFormData.category} opportunities, please write to{' '}
                            <Link href={`mailto:${general?.cemail}`} title={general?.cemail}>
                                {general?.cemail}
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
                // setError('');

            } catch (err) {
                console.error('Submission error:', err); // <-- Use the error
                // setError('Error submitting form. Please try again later.');
                toast.error('Error submitting form. Please try again later.');
            }
            finally {
                setIsSubmitting(false)
            }

        } else {
            setContactFormErrors(errors);

            const firstErrorField = Object.keys(errors)[0];
            const firstErrorMessage = errors[firstErrorField as keyof ContactFormErrors];

            toast.error(firstErrorMessage || 'Please fill the form correctly.');

            // Focus the field with the first error
            const errorInput = document.getElementById(firstErrorField);
            if (errorInput) errorInput.focus();
            setIsSubmitting(false);
        }
    };

    const refreshCaptcha = () => {
        const { expression, correctAnswer } = generateRandomMathExpression();
        setMathExpression(expression);
        setCorrectAnswer(correctAnswer);
    };

    return (
        <div>
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
                                {/* {listenerTotal.inPerson > 0 && presenterTotal.inPerson > 0 && ( */}
                                <h3>Listener @ ${listenerTotal.inPerson} | Presenter @ ${presenterTotal.inPerson}</h3>
                                {/* )} */}

                                <Link href="/register" title="Register" tabIndex={0}>
                                    Register now
                                </Link>
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
                                                    placeholder="Enter Full name"
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                disabled={isSubmitting}
                                                placeholder='Enter your answer'
                                                value={userAnswer}
                                                onChange={(e) => setUserAnswer(e.target.value)}
                                            />
                                            {contactFormErrors.userAnswer && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.userAnswer}</p>}
                                            <button type="button" title='Refresh Captcha' disabled={isSubmitting} onClick={refreshCaptcha} className="btn btn-secondary mt-2">Refresh Captcha</button>
                                        </div>
                                        <input type="hidden" name="category" value={contactFormData.category || "joinourcommunity"} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" title={isSubmitting ? 'Please Wait..' : "Submit"} disabled={isSubmitting} className="btn btn-success btn-block">{isSubmitting ? 'Please Wait..' : "Submit"}</button>
                                    </div>
                                </form>
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
        </div>
    )
}

export default MainSlider