// "use client";
// import Image from "next/image";
// import Slider from "react-slick";

// const images = [
//     "/images/images/group_image1.webp",
//     "/images/images/group_image2.webp",
// ];

// export default function TabSlider({ general_info }: any) {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//     };

//     return (
//         <div>
//             <Slider {...settings}>
//                 <div>
//                     {images.map((src, index) => (
//                         <div key={index}  className="overview-image-block">
//                             <Image
//                                 src={src}
//                                 width={1200}
//                                 height={500}
//                                 alt={general_info?.clname || "Conference Image"}
//                                 title={general_info?.clname || "Conference Image"}
//                                 className="overview-img"
//                             />
//                         </div>
//                     ))}
//                 </div>

//             </Slider>
//         </div >
//     );
// }

"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

const TabSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div>
            {/* <Slider {...settings}>
                <div className="overview-image-block">
                    <Image src="/images/images/group_image2.webp" width={1200} height={500} alt="" title="" className="overview-img" />
                </div>
                <div className="overview-image-block">
                    <Image src="/images/images/group_image2.webp" width={1200} height={500} alt="" title="" className="overview-img" />
                </div>
            </Slider> */}

            <div className="tabsSlider-block">
                <Slider {...settings}>
                    {/* Slide 1 - Book Today */}
                    <div className="overview-image-block">
                        <Image src="/images/images/group_image1.webp" width={1200} height={500} alt="" title="" className="overview-img" />
                    </div>

                    {/* Slide 2 - Sponsor */}
                    <div className="overview-image-block">
                        <Image src="/images/images/group_image2.webp" width={1200} height={500} alt="" title="" className="overview-img" />
                    </div>

                </Slider>
            </div>
        </div>
    );
};

export default TabSlider;

