"use client"

import React from 'react'
import Link from 'next/link'
import { useAppData } from '../../context/AppDataContext';
import Image from 'next/image';
import map2 from '../../../public/images/images/map.png';
// import axios from 'axios';
// import toastr from "toastr"; 

const AbstractSubmission = () => {
    const { general } = useAppData();



    return (
        <div>
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Abstract Submission</span>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">Abstract Submission</h2>
            <div className="bg_add_form15">
                <div className="auto-container">
                    <div className="row clearfix">
                        <form id="abstractform"
                            //  ref={formRef} 
                            //  onSubmit={handleSubmit} 
                            method="POST">
                            <div className="col-md-8 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                                <div className="row clearfix">
                                    <div className="col-md-6 left15">
                                        <select name="title" className="set157" id="title"
                                            //  onChange={handleChange} ref={titleRef}
                                            //   onKeyDown={(e) => handleKeyDown(e, "title", nameRef)} disabled={isSubmitting} 
                                            autoComplete="off">
                                            <option value="">Select</option>
                                            <option value="Dr.">Dr.</option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Miss.">Miss.</option>
                                            <option value="Mrs.">Mrs.</option>
                                        </select>
                                        {/* {errors.title && <div className="error">{errors.title}</div>} */}
                                    </div>
                                    <div className="col-md-6 left16">
                                        <input name="name" id="name" className="set157" placeholder="Name" type="text"
                                            // onChange={handleChange} ref={nameRef} onKeyDown={(e) => handleKeyDown(e, "name", emailRef)} 
                                            // disabled={isSubmitting} 
                                            autoComplete="new-password"
                                        // onBlur={(e) => handleFieldUpdate("name", e.target.value)} 
                                        />
                                        {/* {errors.name && <div className="error">{errors.name}</div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-6 left15">
                                        <input name="email" id="email" className="set157" placeholder="Email" type="text"
                                        //  onChange={handleChange} ref={emailRef} onKeyDown={(e) => handleKeyDown(e, "email", altEmailRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("email", e.target.value)} 
                                        />
                                        {/* {errors.email && <div className="error">{errors.email}</div>}  */}
                                    </div>
                                    <div className="col-md-6 left16">
                                        <input name="alt_email" id="alt_email" className="set157" placeholder="Alternative Email" type="text"
                                        // onChange={handleChange} ref={altEmailRef} onKeyDown={(e) => handleKeyDown(e, "alt_email", phoneRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("alt_email", e.target.value)}
                                        />
                                        {/* {errors.alt_email && < className="error">{errors.alt_email}</ div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-6 left15">
                                        <input name="phone" id="phone" className="set157" placeholder="Phone" type="text"
                                        // onChange={handleChange} ref={phoneRef} onKeyDown={(e) => handleKeyDown(e, "phone", whatsappRef)} disabled={isSubmitting} autoComplete="new-password" onBlur={(e) => handleFieldUpdate("phone", e.target.value)} 
                                        />
                                        {/* {errors.phone && <div className="error">{errors.phone}</div>} */}
                                    </div>
                                    <div className="col-md-6 left16">
                                        <input name="whatsapp_number" id="whatsapp_number" className="set157" placeholder="WhatsApp Number" type="text"

                                            // onChange={handleChange} ref={whatsappRef} onKeyDown={(e) => handleKeyDown(e, "whatsapp_number", cityRef)} disabled={isSubmitting} 

                                            autoComplete="off"
                                        // onBlur={(e) => handleFieldUpdate("whatsapp_number", e.target.value)} 
                                        />
                                        {/* {errors.whatsapp_number && <div className="error">{errors.whatsapp_number}</div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-6 left15">
                                        <input name="city" id="city" className="set157" placeholder="City" type="text"
                                        // onChange={handleChange} ref={cityRef} onKeyDown={(e) => handleKeyDown(e, "city", countryRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("city", e.target.value)} 
                                        />
                                        {/* {errors.city && <div className="error">{errors.city}</div>} */}
                                    </div>
                                    <div className="col-md-6 left16">
                                        <select name="country" className="set156" id="country"
                                            //  onChange={handleChange} ref={countryRef} onKeyDown={(e) => handleKeyDown(e, "country", organizationRef)} disabled={isSubmitting}
                                            autoComplete="off">
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
                                        {/* {errors.country && <div className="error">{errors.country}</div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-6 left15">
                                        <input name="organization" id="organization" className="set157" placeholder="Organization" type="text"
                                        // onChange={handleChange} ref={organizationRef} onKeyDown={(e) => handleKeyDown(e, "organization", intrestedRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("organization", e.target.value)}
                                        />
                                        {/* {errors.organization && <div className="error">{errors.organization}</div>} */}
                                    </div>
                                    <div className="col-md-6 left16">
                                        <select name="intrested" className="set156" id="intrested"
                                            // onChange={handleChange} ref={intrestedRef} onKeyDown={(e) => handleKeyDown(e, "intrested", abstractTitleRef)} disabled={isSubmitting}
                                            autoComplete="off">
                                            <option value="">Interested In</option>
                                            <option value="Oral Presentation (In-Person)">Oral Presentation (In-Person)</option>
                                            <option value="Oral Presentation (Virtual)">Oral Presentation (Virtual)</option>
                                            <option value="Poster Presentation (In-Person)">Poster Presentation (In-Person)</option>
                                            <option value="Poster Presentation (Virtual)">Poster Presentation (Virtual)</option>
                                        </select>
                                        {/* {errors.intrested && <div className="error">{errors.intrested}</div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <input name="abstract_title" id="abstract_title" className="set157" placeholder="Abstract Title" type="text"
                                        //  onChange={handleChange} ref={abstractTitleRef} onKeyDown={(e) => handleKeyDown(e, "abstract_title", messageRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("abstract_title", e.target.value)} 
                                        />
                                        {/* {errors.abstract_title && <div className="error">{errors.abstract_title}</div>} */}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <textarea name="message" id="message" className="set158" placeholder="Message"
                                        // onChange={handleChange} ref={messageRef} onKeyDown={(e) => handleKeyDown(e, "message", fileRef)} disabled={isSubmitting} autoComplete="off" onBlur={(e) => handleFieldUpdate("message", e.target.value)}
                                        ></textarea>
                                        {/* {errors.message && <div className="error">{errors.message}</div>} */}
                                    </div>
                                </div>


                                <div className="row clearfix">
                                    <div className="col-md-12 mar_lk55">
                                        <div className="upload_wrap15 col-lg-6 pd0">
                                            <div className="upload_wrat55">
                                                <span>Upload Your Abstract File* :</span>
                                                <span>
                                                    <button type="button" className="ab-dbtn"
                                                        // onClick={handleDownloadAbstract} 
                                                        title="Download Sample Abstract File">Download Sample Abstract File</button>
                                                </span>
                                            </div>
                                            <span className="back_wrapblue"><input name="upload_abstract_file" className="abck155"
                                                type="file" id="upload_abstract_file"
                                            // onChange={handleChange} ref={fileRef} onKeyDown={(e) => handleKeyDown(e, "upload_abstract_file", captchaRef)} disabled={isSubmitting}
                                            /><b>Choose
                                                file</b>
                                                {/* <span id="selected_file">{selectedFileName}</span> */}
                                            </span>

                                            <span className="selct_wrap_pdf">Select PDF, DOC, DOCX or rtf File</span>
                                            {/* {errors.upload_abstract_file && <div className="error">{errors.upload_abstract_file}</div>} */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row clearfix">

                                    {/* <div className="col-md-12" style={{ marginTop: "20px" }}>
                                        <Captcha
                                            ref={captchaRef}
                                            setCaptchaValue={setCaptchaValue}
                                            onValidate={setIsCaptchaValid}
                                            onInputChange={() => setErrors((prevErrors) => ({ ...prevErrors, captcha: null }))}
                                            disabled={isSubmitting}
                                        />
                                        {errors.captcha && <p className="error">{errors.captcha}</p>}
                                    </div> */}

                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-6">
                                        <button type="submit" name="submit" className="bt_nmk5" title="Submit Abstract"
                                        //  disabled={isSubmitting}
                                        >Submit Abstract
                                            {/* {isSubmitting ? "Please Wait..." : "Submit Abstract"} */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-4 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="sq_abmainbox">
                                <div className="sq_abbox1"></div>
                                <div className="sq_abbox2"></div>
                                <span className="nur_wrap11">{general ? general.clogotext : ""}</span>
                                <span className="nur_wrap22">CONFERENCE</span>
                                <span className="nur_wrap33">{general ? general.full_length_dates : ""}</span>
                                {/* <span className="nur_wrap44">{general ? general.venue_p1 : ""}</span> */}
                                <span className="map_l55 sq_map">
                                    <Image src={map2} alt={general ? general.clname : ""} title={general ? general.clname : ""} />
                                    {general ? general.venue_p1 : ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* {showModal && (
                <div className="modal" id="myModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="icon-box">
                                    <i className="material-icons" style={{ marginBottom: "35px" }}>&#10003;</i>
                                </div>
                                <h4 className="modal-title w-100">Abstract Submitted Successfully!</h4>
                                <p>We will get in touch with you shortly.</p>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-block" onClick={closeModal}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

        </div>
    )
}

export default AbstractSubmission