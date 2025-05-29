import React from 'react'
import Image from 'next/image';
import backgroundImage from '../../../public/images/images/bg.webp';

interface VenueImage {
    image: string;
    alt_text: string;
}

interface VenueImages {
    [key: string]: VenueImage;
}

interface VenueProps {
    onelinerVenueInfo: {
        venueImages?: VenueImages;
    };
}

const Venue: React.FC<VenueProps> = ({ onelinerVenueInfo }) => {

    console.log('Venue', onelinerVenueInfo.venueImages)
    const venueImages: VenueImages = onelinerVenueInfo?.venueImages || {};

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
                            <h3 className="bot_wrap157 mty155">
                                Venue <span className="org_wrap">Highlights</span>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg_wrap_acc5 test-heghlight" style={{ backgroundImage: `url(${backgroundImage.src})` }}>
                    <div className="auto-container clearfix">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    {Object.values(venueImages).map((imageData, index) => {
                                        // Full image path construction
                                        const imagePath = `/images/${imageData.image}`;

                                        return (
                                            <div
                                                key={`venue-img-${index}`}
                                                className={`add_bh15${index + 4} ${index % 2 === 0 ? "add_bh154" : "add_bh155"
                                                    } wow fadeInUp`}
                                                data-wow-delay={`${200 + index * 100}ms`}
                                                data-wow-duration="1000ms"
                                            >
                                                <div className="venue-image-wrapper">
                                                    <Image
                                                        src={imagePath}
                                                        alt={imageData.alt_text}
                                                        width={500}
                                                        height={300}
                                                        className="gallery_wra15"
                                                        priority={index < 3} // Priority for first 3 images
                                                    // onError={(e) => {
                                                    //     console.log(e);
                                                    //     console.error("Image failed to load:", imagePath);
                                                    // }}
                                                    />
                                                    <span className="image-caption">
                                                        {imageData.alt_text}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Venue