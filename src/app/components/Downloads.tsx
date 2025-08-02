"use client";
import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ApiResponse } from '@/types';
import countries from '../../data/countries';

// Images 
import edit from '../../../public/images/images/edit.png';
import dow from '../../../public/images/images/dow.png';


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
    [key: string]: string | undefined; // Add this line
}

interface DownloadsProps {
    generalDownloadsInfo: ApiResponse;
}

const Downloads: React.FC<DownloadsProps> = ({ generalDownloadsInfo }) => {


    const general = generalDownloadsInfo?.data || {}

    // Modal for Brochure 
    const [brochureFormData, setBrochureFormData] = useState<BrochureFormData>({
        first_name: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        interested_in: 'Oral Presentation'
    });
    const [brochureFormErrors, setBrochureFormErrors] = useState<BrochureFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [userAnswer, setUserAnswer] = useState('');
    const [showModal9, setShowModal9] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [modalType, setModalType] = useState('');
    const modalRef = useRef<HTMLDivElement | null>(null);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);
    const interestedInRef = useRef<HTMLSelectElement>(null);

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

    // Modal for Download Brochure 
    const openBrochureModal = (type: 'brochure' | 'tentative') => {
        setModalType(type); // 'brochure' or 'tentative'
        setShowModal9(true);
    }

    // Function to close the modal
    const closeBrochureModal = () => {
        setShowModal9(false);
        // Store the close time in localStorage
        localStorage.setItem("brochureFormClosed", Date.now().toString());
    };

    const handleSuccess = (): void => {
        setShowModal4(false);
        setShowModal5(false);
    };

    const handleSubmitBrochure = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateBrochureForm(brochureFormData);

        if (Object.keys(errors).length > 0) {
            setBrochureFormErrors(errors);

            const firstErrorField = Object.keys(errors)[0];
            const firstErrorMessage = errors[firstErrorField as keyof BrochureFormErrors];
            toast.error(firstErrorMessage);

            switch (firstErrorField) {
                case 'first_name':
                    nameRef.current?.focus(); break;
                case 'email':
                    emailRef.current?.focus(); break;
                case 'phone':
                    phoneRef.current?.focus(); break;
                case 'country':
                    countryRef.current?.focus(); break;
            }
            return;
        }

        setBrochureFormErrors({});
        setIsSubmitting(true);

        try {
            localStorage.setItem('brochureFormSubmitted', Date.now().toString());

            // Encode payload values using btoa
            const payload = {
                first_name: btoa(brochureFormData.first_name.trim()),
                email: btoa(brochureFormData.email.trim()),
                phone: btoa(brochureFormData.phone.trim()),
                country: btoa(brochureFormData.country.trim()),
                message: btoa(brochureFormData.message.trim()),
                interested_in: btoa(brochureFormData.interested_in.trim()),
                modalType,
            };

            const response = await fetch('/api/brochure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                handleDownload();
                closeBrochureModal();

                setBrochureFormData({
                    first_name: '',
                    email: '',
                    phone: '',
                    country: '',
                    message: '',
                    interested_in: '',
                });

                // setUserAnswer('');
                setBrochureFormErrors({});
            } else {
                toast.error('Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateBrochureForm = (data: typeof brochureFormData): BrochureFormErrors => {
        const errors: BrochureFormErrors = {};

        if (!data.first_name?.trim()) {
            errors.first_name = 'Name is required';
        }

        else if (!data.email?.trim()) {
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email address is invalid';
        }

        else if (!data.phone?.trim()) {
            errors.phone = 'Phone number is required';
        }

        else if (!data.country?.trim()) {
            errors.country = 'Country is required';
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
                                                onClick={() => openBrochureModal('brochure')}
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

            {showModal9 && (
                <div className="modal2 brochure-form-modal" id="myModal" role="dialog">
                    <div className="modal-dialog2 modal-confirm fade-in" role="document">
                        <div className="modal-content2">
                            <div className="modal-header">
                                <div className="icon-box">
                                    <i className="bx bx-file" style={{ marginBottom: "35px" }}></i>
                                </div>
                                <h4 className="modal-title w-100">{modalType === 'brochure' ? 'Download Brochure' : 'Download Scientific Program'}</h4>
                                <button type="button" className="close" onClick={closeBrochureModal} style={{ fontSize: "30px" }}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <form
                                    onSubmit={handleSubmitBrochure}
                                >
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
                                                    onChange={(e) => setBrochureFormData({ ...brochureFormData, first_name: e.target.value })}
                                                    disabled={isSubmitting} // Disable field during submission
                                                />
                                                {brochureFormErrors.first_name && <p style={{ color: 'red', textAlign: 'left' }}>{brochureFormErrors.first_name}</p>}
                                            </div>
                                            <div className="col-6 test2">
                                                <label>Email Address:*</label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    ref={emailRef}
                                                    placeholder="Enter email"
                                                    value={brochureFormData.email}
                                                    onChange={(e) => setBrochureFormData({ ...brochureFormData, email: e.target.value })}
                                                    disabled={isSubmitting} // Disable field during submission
                                                />
                                                {brochureFormErrors.email && <p style={{ color: 'red', textAlign: 'left' }}>{brochureFormErrors.email}</p>}
                                            </div>
                                        </div>
                                        <div className='d-flex name-info'>
                                            <div className='col-6 test'>
                                                <label>Phone Number:*</label>
                                                <input
                                                    type='text'
                                                    name="phone"
                                                    ref={phoneRef}
                                                    placeholder='Enter phone number'
                                                    value={brochureFormData.phone}
                                                    onChange={(e) => setBrochureFormData({ ...brochureFormData, phone: e.target.value })}
                                                    disabled={isSubmitting} // Disable field during submission
                                                />
                                                {brochureFormErrors.phone && <p style={{ color: 'red', textAlign: 'left' }}>{brochureFormErrors.phone}</p>}
                                            </div>
                                            <div className='col-6 test2 country-drop'>
                                                <label>Country:*</label>
                                                <div className='country-drop-block'>
                                                    <select
                                                        className="set156"
                                                        name="country"
                                                        ref={countryRef}
                                                        value={brochureFormData.country}
                                                        onChange={(e) => setBrochureFormData({ ...brochureFormData, country: e.target.value })}
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
                                                {brochureFormErrors.country && <p style={{ color: 'red', textAlign: 'left' }}>{brochureFormErrors.country}</p>}
                                            </div>
                                        </div>
                                        <div className='d-flex name-info'>
                                            <div className='col-6 test country-drop'>
                                                <label>Interested In:*</label>
                                                <div className='country-drop-block'>
                                                    <select
                                                        className="set156"
                                                        name="interested_in"
                                                        ref={interestedInRef}
                                                        value={brochureFormData.interested_in}
                                                        onChange={(e) => setBrochureFormData({ ...brochureFormData, interested_in: e.target.value })}
                                                        disabled={isSubmitting} // Disable field during submission
                                                    >
                                                        <option value="Oral Presentation">Oral Presentation</option>
                                                        <option value="Poster Presentation">Poster Presentation</option>
                                                        <option value="Delegate (Participation)">Delegate (Participation)</option>
                                                        <option value="Volunteer">Volunteer</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                {brochureFormErrors.interested_in && <p style={{ color: 'red', textAlign: 'left' }}>{brochureFormErrors.interested_in}</p>}
                                            </div>
                                            <div className='col-6 test2'>
                                                <label>Query (Optional):</label>

                                                <textarea
                                                    placeholder="Enter Your Query"
                                                    value={brochureFormData.message}
                                                    onChange={(e) => setBrochureFormData({ ...brochureFormData, message: e.target.value })}
                                                    disabled={isSubmitting} // Disable field during submission
                                                />

                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="submit"
                                            title={isSubmitting ? 'Please wait' : 'Proceed'}
                                            className="btn btn-success btn-block"
                                            disabled={isSubmitting} // Disable button during submission
                                        >
                                            {isSubmitting ? 'Please wait' : 'Proceed'}
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
                    <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="icon-box">
                                    <i className="material-icons" style={{ marginBottom: "35px" }}>&#10003;</i>
                                </div>
                                <h4 className="modal-title w-100">{modalType === 'brochure' ? 'Brochure downloading..!' : 'Scientific program downloading..!'}</h4>
                                <p>Thank you for your interest. If you have any questions, feel free to reach out to us. </p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-block" onClick={handleSuccess}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal5 && (
                <div className="modal" id="myModal2" role="dialog">
                    <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="icon-box">
                                    <i className="bx bx-x" style={{ marginBottom: "35px" }}></i>
                                </div>
                                <h4 className="modal-title w-100">Failed to Download</h4>
                                <p>An error occurred while downloading. Please try again later.</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-block" onClick={handleSuccess}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Downloads