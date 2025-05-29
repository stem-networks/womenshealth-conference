// import React, { useState } from 'react'

// interface ContactFormData {
//     name: string;
//     email: string;
//     phone: string;
//     query: string;
//     category: string;
// }

// interface ContactFormErrors {
//     name?: string;
//     email?: string;
//     phone?: string;
//     query?: string;
//     userAnswer?: string;
// }

// interface BrochureFormData {
//     first_name: string;
//     email: string;
//     phone: string;
//     country: string;
//     message: string;
//     interested_in: string;
// }

// interface BrochureFormErrors {
//     first_name?: string;
//     email?: string;
//     phone?: string;
//     country?: string;
//     message?: string;
//     interested_in?: string;
// }

// // Generate random BODMAS expression
// const generateRandomMathExpression = (): { expression: string; correctAnswer: string } => {
//     const operations = ['+', '-', '*'];
//     const randomOperation = operations[Math.floor(Math.random() * operations.length)];

//     const num1 = Math.floor(Math.random() * 10) + 1;
//     const num2 = Math.floor(Math.random() * 10) + 1;
//     const num3 = Math.floor(Math.random() * 10) + 1;

//     const useParentheses = Math.random() < 0.5;
//     let expression: string;

//     if (useParentheses) {
//         expression = `(${num1} ${randomOperation} ${num2}) ${randomOperation} ${num3}`;
//     } else {
//         expression = `${num1} ${randomOperation} ${num2} ${randomOperation} ${num3}`;
//     }

//     const correctAnswer = eval(expression).toFixed(2); // returns string
//     return { expression, correctAnswer };
// };

// const Downloads = () => {

//     // Modal for sponsor and exhibitor 
//     const [showModal8, setShowModal8] = useState<boolean>(false);
//     const [modalHeading, setModalHeading] = useState<string>('');
//     const [contactFormData, setContactFormData] = useState<ContactFormData>({
//         name: '',
//         email: '',
//         phone: '',
//         query: '',
//         category: ''
//     });
//     const [contactFormErrors, setContactFormErrors] = useState<ContactFormErrors>({});

//     const [successModalContent, setSuccessModalContent] = useState<{
//         heading: string;
//         query: React.ReactNode;
//     }>({
//         heading: '',
//         query: ''
//     });



//     // Modal for Brochure 
//     const [brochureFormData, setBrochureFormData] = useState<BrochureFormData>({
//         first_name: '',
//         email: '',
//         phone: '',
//         country: '',
//         message: '',
//         interested_in: ''
//     });


//     const [brochureFormErrors, setBrochureFormErrors] = useState<BrochureFormErrors>({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showModal4, setShowModal4] = useState(false);
//     const [showModal5, setShowModal5] = useState(false);
//     const modalRef = useRef<HTMLDivElement | null>(null);

//     // Toggle Modal with dynamic heading and category
//     const toggleModal2 = (category: string, heading: string): void => {
//         if (!showModal8) {
//             const { expression, correctAnswer } = generateRandomMathExpression();
//             setMathExpression(expression);
//             setCorrectAnswer(correctAnswer);
//         }

//         setContactFormData((prevState) => ({
//             ...prevState,
//             category, // Set dynamic category
//         }));

//         setModalHeading(heading); // Set dynamic heading
//         setShowModal8(true); // Open modal
//     };

//     const handleCloseContact = (): void => {
//         setShowModal8(false);
//     };

//     const handleSuccessModal = (): void => {
//         setShowModal6(false);
//     };

//     const validateFormContact = (): ContactFormErrors => {
//         const errors: ContactFormErrors = {};


//         if (!contactFormData.name) {
//             errors.name = 'Name is required';
//         }

//         else if (!contactFormData.email) {
//             errors.email = 'Email address is required';
//         } else if (!/\S+@\S+\.\S+/.test(contactFormData.email)) {
//             errors.email = 'Email address is invalid';
//         }


//         else if (!contactFormData.phone) {
//             errors.phone = 'Phone number is required';
//         }

//         else if (!contactFormData.query) {
//             errors.query = 'Message is required';
//         }

//         else if (!userAnswer) {
//             errors.userAnswer = 'Anti-spam answer is required';
//         }

//         return errors;
//     };

//     const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const errors = validateFormContact();

//         if (Object.keys(errors).length === 0) {
//             if (parseFloat(userAnswer) !== parseFloat(correctAnswer || '0')) {
//                 setContactFormErrors({ userAnswer: 'Incorrect answer. Please try again.' });
//                 toast.error('Incorrect answer. Please try again.');

//                 const answerInput = document.getElementById('userAnswer');
//                 if (answerInput) answerInput.focus();

//                 return;
//             }

//             try {
//                 // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
//                 await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, {
//                     module_name: 'enquiry_form',
//                     keys: {
//                         data: [contactFormData]
//                     },
//                     cid: process.env.NEXT_PUBLIC_CID
//                 });

//                 setShowModal8(false);

//                 // Set success modal based on category
//                 setSuccessModalContent({
//                     heading: contactFormData.category === 'sponsor' ? 'Sponsorships' : 'Exhibitors',
//                     query: (
//                         <p>
//                             For {contactFormData.category} opportunities, please write to{' '}
//                             <Link href={`mailto:${general.cemail}`} title={general.cemail}>
//                                 {general.cemail}
//                             </Link>
//                         </p>
//                     )
//                 });
//                 setShowModal6(true);


//                 // Reset the form
//                 setContactFormData({
//                     name: '',
//                     email: '',
//                     phone: '',
//                     query: '',
//                     category: ''
//                 });
//                 setUserAnswer('');
//                 setContactFormErrors({});
//                 setError('');

//             } catch (err) {
//                 console.error('Submission error:', err); // <-- Use the error
//                 setError('Error submitting form. Please try again later.');
//                 toast.error('Error submitting form. Please try again later.');
//             }

//         } else {
//             setContactFormErrors(errors);

//             const firstErrorField = Object.keys(errors)[0];
//             const firstErrorMessage = errors[firstErrorField as keyof ContactFormErrors];

//             toast.error(firstErrorMessage || 'Please fill the form correctly.');

//             // Focus the field with the first error
//             const errorInput = document.getElementById(firstErrorField);
//             if (errorInput) errorInput.focus();
//         }
//     };

//     // Sample PPT download 
//     const handleDownloadPPT = () => {
//         const link: HTMLAnchorElement = document.createElement("a");
//         link.href = "/Sample PPT.pptx"; // File must exist in the public folder
//         link.setAttribute("download", "Sample PPT.pptx");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     // Sample Abstract Download 
//     const handleDownloadAbstract = () => {
//         const link: HTMLAnchorElement = document.createElement("a");
//         link.href = "/Sample Abstract.docx"; // File must exist in the public folder
//         link.setAttribute("download", "Sample Abstract.docx");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };


//     // Modal for Download Brochure 
//     // Function to open the modal
//     const openBrochureModal = () => {
//         setShowModal9(true);
//     };

//     // Function to close the modal
//     const closeBrochureModal = () => {
//         setShowModal9(false);
//         // Store the close time in localStorage
//         localStorage.setItem("brochureFormClosed", Date.now().toString());
//     };
//     const handleSubmitBrochure = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // Validate and focus on first invalid field
//         const focusAndNotify = (field: string, message: string) => {
//             toast.error(message);
//             const input = document.querySelector(`input[name="${field}"], textarea[name="${field}"], select[name="${field}"]`) as HTMLElement;
//             input?.focus();
//             setBrochureFormErrors({ [field]: message });
//         };

//         const { first_name, email, phone, country } = brochureFormData;

//         if (!first_name?.trim()) {
//             focusAndNotify('first_name', 'Name is required');
//             return;
//         }

//         if (!email?.trim()) {
//             focusAndNotify('email', 'Email address is required');
//             return;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             focusAndNotify('email', 'Email address is invalid');
//             return;
//         }

//         if (!phone?.trim()) {
//             focusAndNotify('phone', 'Phone number is required');
//             return;
//         }

//         if (!country?.trim()) {
//             focusAndNotify('country', 'Country is required');
//             return;
//         }

//         // Clear any previous errors
//         setBrochureFormErrors({});
//         setIsSubmitting(true);

//         try {
//             const submissionTime = Date.now().toString();
//             localStorage.setItem("brochureFormSubmitted", submissionTime);

//             const formData = new FormData();
//             formData.append('website_form', btoa("brochure_download"));
//             formData.append('cid', btoa(process.env.NEXT_PUBLIC_CID || ''));
//             formData.append('first_name', btoa(brochureFormData.first_name));
//             formData.append('last_name', btoa(""));
//             formData.append('email', btoa(brochureFormData.email));
//             formData.append('message', btoa(brochureFormData.message));
//             formData.append('country', btoa(brochureFormData.country));
//             formData.append('phone', btoa(brochureFormData.phone));

//             const addonInfo = { interested_in: brochureFormData.interested_in };
//             const additionalInfo = btoa(JSON.stringify(addonInfo));
//             formData.append('additional_info', additionalInfo);

//             const response = await axios.post('/api/brochure', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Accept': '*/*',
//                 },
//             });

//             if (response.status === 200) {
//                 handleDownload();
//                 closeBrochureModal();

//                 setBrochureFormData({
//                     first_name: '',
//                     email: '',
//                     phone: '',
//                     country: '',
//                     message: '',
//                     interested_in: ''
//                 });

//                 setUserAnswer('');
//                 setFormErrors({});
//             } else {
//                 toast.error('Failed to submit form. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             toast.error('An error occurred. Please try again later.');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     const handleDownload = async () => {
//         const conferenceName = `${general.clogotext}`;
//         const brochureFile = `${conferenceName}_Brochure.pdf`;
//         const brochureURL = `/${brochureFile}`;

//         try {
//             // Fetch the file first to check if it's available and downloading successfully
//             const response = await fetch(brochureURL);

//             // Check if the file exists and is downloadable (status code 200)
//             if (response.ok) {
//                 // Create a link to download the file
//                 const link = document.createElement('a');
//                 link.href = brochureURL;
//                 link.setAttribute('download', brochureFile);
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);

//                 // Show modal after download is initiated successfully
//                 setShowModal4(true);  // Show success modal
//             } else {
//                 // Handle the case where the file does not exist or another error occurs
//                 console.error("File not found or failed to download");
//                 setShowModal5(true);  // Show error modal
//             }
//         } catch (error) {
//             console.error("Error downloading the file:", error);
//             setShowModal5(true);  // Show error modal
//         }
//     };

//     const refreshCaptcha = () => {
//         const { expression, correctAnswer } = generateRandomMathExpression();
//         setMathExpression(expression);
//         setCorrectAnswer(correctAnswer);
//         // Optionally clear input field
//         // setUserAnswer('');
//     };

//     return (
//         <div>
//             <div className="down_wrap_style wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
//                 <div className="auto-container">
//                     <div className="row">
//                         <div className="col-md-10 mar_wrap55">
//                             <div className="ess_wrap5">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <h3>Essential <span>Downloads</span></h3>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="box_st1">
//                                             <Image src={edit} className="pol55" alt="Sample PPT" title="Sample PPT" loading="lazy" />
//                                             <h3>Sample PPT</h3>
//                                             <button type="button" title="Sample PPT" onClick={handleDownloadPPT}>
//                                                 Download{" "}
//                                                 <Image
//                                                     src={dow}
//                                                     alt="Sample PPT"
//                                                     title="Sample PPT"
//                                                     loading="lazy"
//                                                 />
//                                             </button>
//                                         </div>
//                                         <div className="blue_wrap55"></div>
//                                     </div>

//                                     <div className="col-md-4">
//                                         <div className="box_st1">
//                                             <Image src={edit} className="pol55" alt="Brochure" title="Brochure" loading="lazy" />
//                                             <h3>Brochure</h3>
//                                             <button type='button' title={`${general.clogotext}_Brochure`}
//                                                 onClick={openBrochureModal}
//                                             >Download <Image src={dow}
//                                                 alt={`${general.clogotext}_Brochure`} title={`${general.clogotext}_Brochure`} loading="lazy" /></button>
//                                         </div>
//                                         <div className="blue_wrap55"></div>
//                                     </div>

//                                     <div className="col-md-4">
//                                         <div className="box_st1">
//                                             <Image src={edit} className="pol55" alt="Sample Abstract" title="Sample Abstract" loading="lazy" />
//                                             <h3>Sample Abstract</h3>

//                                             <button type='button' title="Sample Abstract" onClick={handleDownloadAbstract}>Download{" "}<Image src={dow}
//                                                 alt="Sample Abstract" title="Sample Abstract" loading="lazy" /></button>
//                                         </div>
//                                         <div className="blue_wrap55"></div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {showModal6 && (
//                 <div className="modal" id="myModal" role="dialog">
//                     <div className="modal-dialog modal-confirm fade-in" role="document" ref={modalRef}>
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <div className="icon-box">
//                                     <i className="bx bx-envelope" style={{ marginBottom: "35px" }}></i>
//                                 </div>
//                                 <h4 className="modal-title w-100">{successModalContent.heading}</h4>
//                                 {successModalContent.query}
//                             </div>

//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-success btn-block" onClick={handleSuccessModal}>OK</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}


//             {showModal8 && (
//                 <div className="modal2" id="myModal" role="dialog">
//                     <div className="modal-dialog2 modal-confirm fade-in" role="document">
//                         <div className="modal-content2">
//                             <div className="modal-header">
//                                 <div className="icon-box">
//                                     <i className="bx bx-envelope" style={{ marginBottom: "35px" }}></i>
//                                 </div>
//                                 <h4 className="modal-title w-100">{modalHeading}</h4> {/* Dynamic Heading */}
//                                 <button type="button" className="close" onClick={handleCloseContact} style={{ fontSize: "30px" }}>
//                                     &times;
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <form
//                                     onSubmit={handleSubmitContact}
//                                 >
//                                     <div className="row">
//                                         <div className="d-flex name-info">
//                                             <div className="col-6 test">
//                                                 <label>Fullname:*</label>
//                                                 <input
//                                                     id="name"
//                                                     name="name"
//                                                     type="text"
//                                                     placeholder="Enter first name"
//                                                     value={contactFormData.name}
//                                                     onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
//                                                 />
//                                                 {contactFormErrors.name && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.name}</p>}
//                                             </div>
//                                             <div className="col-6 test2">
//                                                 <label>Email Address:*</label>
//                                                 <input
//                                                     id="email"
//                                                     name="email"
//                                                     type="text"
//                                                     placeholder="Enter email"
//                                                     value={contactFormData.email}
//                                                     onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
//                                                 />
//                                                 {contactFormErrors.email && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.email}</p>}
//                                             </div>
//                                         </div>
//                                         <div className='d-flex name-info'>
//                                             <div className='col-6 test'>
//                                                 <label>Phone Number:*</label>
//                                                 <input
//                                                     id="phone"
//                                                     name="phone"
//                                                     type='text'
//                                                     placeholder='Enter phone number'
//                                                     value={contactFormData.phone}
//                                                     onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
//                                                 />
//                                                 {contactFormErrors.phone && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.phone}</p>}
//                                             </div>
//                                             <div className='col-6 test2'>
//                                                 <label>Message:*</label>
//                                                 <textarea
//                                                     id="query"
//                                                     name="query"
//                                                     placeholder='Enter your message'
//                                                     value={contactFormData.query}
//                                                     onChange={(e) => setContactFormData({ ...contactFormData, query: e.target.value })}

//                                                 ></textarea>
//                                                 {contactFormErrors.query && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.query}</p>}
//                                             </div>
//                                         </div>
//                                         <div className='col-12'>
//                                             <p>Verify you’re human: What is <b>{mathExpression}</b> ?</p>
//                                             <input
//                                                 id="userAnswer"
//                                                 name="userAnswer"
//                                                 type='text'
//                                                 placeholder='Enter your answer'
//                                                 value={userAnswer}
//                                                 onChange={(e) => setUserAnswer(e.target.value)}
//                                             />
//                                             {contactFormErrors.userAnswer && <p style={{ color: 'red', textAlign: 'left' }}>{contactFormErrors.userAnswer}</p>}
//                                             <button type="button" title='Refresh Captcha' onClick={refreshCaptcha} className="btn btn-secondary mt-2">Refresh Captcha</button>
//                                         </div>
//                                         <input type="hidden" name="category" value={contactFormData.category || "joinourcommunity"} />
//                                     </div>
//                                     <div className="modal-footer">
//                                         <button type="submit" title="Submit" className="btn btn-success btn-block">Submit</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Downloads