// "use client"; // Required for client-side components in App Router

// import React from "react";
// import Image from "next/image";
// import Slider from "react-slick";
// // import webster from '/images/images/webster.jpg';
// // import webster_sign from '/images/images/webster_sign.png';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface SliderSettings {
//   dots: boolean;
//   infinite: boolean;
//   speed: number;
//   slidesToShow: number;
//   slidesToScroll: number;
//   arrows: boolean;
// }

// const WelcomeMessage = () => {
//   const settings: SliderSettings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   return (
//     <div className="welcome-message-main-block">
//       <div className="auto-container clearfix">
//         <div className="welcomemsg-section">
//           <div className="welcome-innerspace">
//             <div className="row justify-content-center align-items-center text-center">
//               <h2 className="welcome-title">WELCOME MESSAGE</h2>
//             </div>

//             {/* Only wrap the part you want to slide */}
//             <Slider {...settings}>
//               <div>
//                 <div className="grid-container">
//                   {/* Left Column (Author Image and Info) */}
//                   <div className="author-info text-center">
//                     <div className="author-img">
//                       <Image
//                         src="/images/images/webster.jpg"
//                         alt="Thomas J. Webster"
//                         width={50}
//                         height={50}
//                         title="Thomas J. Webster"
//                         className="img-fluid rounded-circle"
//                         priority // If this image is above the fold
//                       />
//                     </div>
//                     <div className="author-name">
//                       <h3>Thomas J. Webster</h3>
//                       <p>Hebei University of Technology</p>
//                       <p>United States</p>
//                     </div>
//                   </div>

//                   {/* Right Column (Title, Paragraph, and Signature) */}
//                   <div className="text-start content-info">
//                     <div className="content-nfo-scroll">
//                       <h2 className="message-title">
//                         Title: Not in the right environment to innovate and
//                         commercialize your research? MOVE! I did and now my
//                         breakthroughs are in 30,000 patients!
//                       </h2>
//                       <p className="message-body">
//                         Without a doubt, recent advances in drug delivery,
//                         genetic therapies, nanotechnology, AI, and pharmacology
//                         have revolutionized disease prevention, diagnosis, and
//                         treatment over the past century. But, how did this
//                         occur? Was your research part of these advancements?
//                         Have we innovated and commercialized enough? While some
//                         of these wonderful research advances have made it to the
//                         market helping real patients, many have not. Are we
//                         doing enough to translate pharma research into real
//                         products? Are companies not paying attention to this
//                         wonderful research? Are Universities not doing enough to
//                         help you? Is your research being licensed to Big Pharma?
//                         Starting new companies? What about federal funding
//                         agencies? Are they supporting your commercialization
//                         efforts? And, most importantly, are you in the right
//                         environment to innovate and commercialize your research?
//                       </p>
//                       <p className="message-body">
//                         Well in my own experience, above all else, it takes a
//                         supportive environment. We all have great ideas. But, it
//                         takes more than that. It takes a supportive community to
//                         translate lab research into commercial products. It
//                         takes determination and fortitude to see it through. You
//                         need to surround yourself with the right people – and if
//                         you are currently not around a supportive optimistic
//                         environment, leave ! Leave that negative,
//                         ultra-competitive University you are at - I did! Leave
//                         that company that is stifling your advances. Attend the
//                         right conferences, not those super competitive
//                         conferences where the same people give the same talks,
//                         and put your work down!
//                       </p>

//                       <p className="message-body">
//                         Once I found a truly supportive environment just 4 years
//                         ago, I was able to not only start numerous companies,
//                         but commercialize my research into medical devices now
//                         in over 30,000 patients with no failures, only success.
//                         No infection. No chronic inflammation. No implant
//                         loosening. No failures. Period. It just took courage to
//                         leave a University which did not care about my research
//                         and colleagues who only pushed their own research,
//                         constantly putting others down. Negativity everywhere!
//                         Once I found the right environment, everything else
//                         moved very quickly – including FDA approval and my
//                         research advances in patients in just 4 years!
//                       </p>

//                       <p className="message-body">
//                         So I encourage everyone to find that right environment.
//                         Attend the right conferences: Pharma, Pharmaceutics and
//                         Biotechnology Conference 2025 at the heart of innovation
//                         and commercialization! Meet the right people! Be
//                         energized by optimistic people! It will change your life
//                         once you make the commitment to surround yourself with
//                         positive people.
//                       </p>

//                       <p className="message-body">
//                         At the Pharma, Pharmaceutics and Biotechnology
//                         Conference 2025, we will not only discuss the next
//                         pharma breakthrough, but more importantly, we will
//                         discuss how to commercialize it!
//                       </p>

//                       <p className="message-body">
//                         I look forward to seeing everyone and sharing my story!
//                       </p>
//                     </div>

//                     <div className="signature">
//                       <Image
//                         src="/images/images/webster_sign.png"
//                         alt="Thomas J. Webster"
//                         title="Thomas J. Webster"
//                         className="signature-img"
//                         width={100}
//                         height={50}
//                         priority // If this image is above the fold
//                       />
//                       <p className="">Signature</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeMessage;
import React from 'react'

const WelcomeMessage = () => {
  return (
    <div>WelcomeMessage</div>
  )
}

export default WelcomeMessage