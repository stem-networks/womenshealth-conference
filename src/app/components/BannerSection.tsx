"use client"

import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link'
import { ApiResponse, IndexPageData } from '@/types';

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

interface BannerSectionProps {
    generalbannerInfo: ApiResponse;
    onelinerBannerInfo: IndexPageData;
}

// const BannerSection = ({BannerSection}) => {
const BannerSection: React.FC<BannerSectionProps> = ({ generalbannerInfo, onelinerBannerInfo }) => {

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
    const modalRef = useRef<HTMLDivElement | null>(null);


    //  Show modal after 20s only if 24 hours have passed
    useEffect(() => {
        if (typeof window === 'undefined') return; // Ensure client-side

        if (shouldShowModal()) {
            const timer = setTimeout(() => {
                console.log("Triggering modal...");
                setShowModal9(true);
            }, 20000);

            return () => clearTimeout(timer);
        }
    }, []);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);
    const interestedInRef = useRef<HTMLSelectElement>(null);

    const general = generalbannerInfo?.data || {}
    const importantDates = onelinerBannerInfo?.importantDates || [];
    const bannerContent = onelinerBannerInfo?.bannerContent || {};
    const bannerItems = Object.values(bannerContent);

    if (bannerItems.length === 0) return null;

    const { headding, tag_line, content } = bannerItems[0] || {};
    const earlyBirdDateRaw = importantDates?.[1]?.date || "";

    // Replace unwanted HTML tags safely
    const formattedEarlyBirdDate = earlyBirdDateRaw
        .replace(/<sub>/g, "<sup>")
        .replace(/<\/sub>/g, "</sup>")
        .replace(/<br\s*\/?>/g, " ");

    // console.log('Dates', importantDates)



    // Modal for Download Brochure 
    const openBrochureModal = () => {
        setShowModal9(true);
    };

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
        const brochureFile = `${conferenceName}_Brochure.pdf`;
        const brochureURL = `/${brochureFile}`;

        try {
            // Fetch the file first to check if it's available and downloading successfully
            const response = await fetch(brochureURL);

            // Check if the file exists and is downloadable (status code 200)
            if (response.ok) {
                // Create a link to download the file
                const link = document.createElement('a');
                link.href = brochureURL;
                link.setAttribute('download', brochureFile);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Show modal after download is initiated successfully
                setShowModal4(true);  // Show success modal
            } else {
                // Handle the case where the file does not exist or another error occurs
                console.error("File not found or failed to download");
                setShowModal5(true);  // Show error modal
            }
        } catch (error) {
            console.error("Error downloading the file:", error);
            setShowModal5(true);  // Show error modal
        }
    };

    //  Function to check if 24 hours have passed
    const shouldShowModal = (): boolean => {
        const lastInteraction = localStorage.getItem('brochureFormClosed');
        if (!lastInteraction) return true;

        const lastInteractionTime = parseInt(lastInteraction, 10);
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastInteractionTime;

        return timeElapsed >= 24 * 60 * 60 * 1000; // 24 hours
    };



    return (
        <div>

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
                                            {formattedEarlyBirdDate ? (
                                                <span
                                                    className="marquee-date"
                                                    dangerouslySetInnerHTML={{ __html: formattedEarlyBirdDate }}
                                                />
                                            ) : (
                                                <strong>To be announced</strong>
                                            )}
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
                                            {formattedEarlyBirdDate ? (
                                                <span
                                                    className="marquee-date"
                                                    dangerouslySetInnerHTML={{ __html: formattedEarlyBirdDate }}
                                                />
                                            ) : (
                                                <strong>To be announced</strong>
                                            )}
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
                                <h4 className="modal-title w-100">Brochure downloading..!</h4>
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

export default BannerSection