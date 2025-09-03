import React from 'react'
import Link from 'next/link';
// import Image from 'next/image';
import { getBaseUrl } from "@/lib/getBaseUrl";
import { ApiResponse } from '@/types';
import { Metadata } from 'next';
import SwiperGallery from '../components/SwiperGallery';

async function fetchGeneralData(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch general data");
    return res.json();
}

async function fetchGeneralDataStatic(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch general data statically");
    return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const generalData = await fetchGeneralDataStatic();
        const meta = generalData?.pages?.venue?.[0] || {
            title: "Venue",
            content: "Explore the Venue of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/venue"; // hardcode since we know this is sessions page
        const canonicalURL = `${getBaseUrl()}${canonicalPath}`;

        return {
            title: meta.title,
            description: meta.content,
            keywords: meta.meta_keywords,
            metadataBase: new URL(getBaseUrl()),
            alternates: {
                canonical: canonicalURL,
            },
        };
    } catch (error) {
        console.error("Metadata generation error Venue:", error);
        return {
            title: "Venue",
            description: "Explore the Venue of the conference.",
            keywords: "",
        };
    }
}


const Venue = async () => {
    const generalFetch = await fetchGeneralData();
    const general = generalFetch?.data || {};

    return (
        <div>

            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Venue</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
                Venue
            </h2>

            <div className="venue-page">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'
                                >
                                    <div className='content1'>
                                        {/* <div className='heading speaker-heading'>Speaker Guidelines</div> */}

                                        <div className='heading poster-heading'>Venue Details:</div>

                                        {(() => {
                                            const addressParts = [, general.v1, general.v2].filter(Boolean); // Remove empty values

                                            if (addressParts.length === 0) return null;

                                            // Add a period at the end of the last item (venue_p1)
                                            const formattedAddress = addressParts.join("<br />");

                                            return <p className="venue-heading venue-address" dangerouslySetInnerHTML={{ __html: formattedAddress }} />;
                                        })()}


                                        <p className='venue-heading-p'><b>General Inquiries: </b><Link href={`mailto:${general?.cemail || ""}`} title={general?.cemail || ''}>{general?.cemail || ''}</Link></p>


                                        <div
                                            className='heading Participants-heading poster-heading'>
                                            Information:
                                        </div>
                                        <ul>
                                            <li><b>Accessibility: </b>The venue is well-connected by public transport, including MRT, buses, and taxis, ensuring smooth access for all attendees.</li>
                                            <li><b>Accommodation: </b> A range of hotels, from budget to luxury, are available nearby to suit different preferences.</li>
                                            <li><b>Facilities: </b> Equipped with modern conference halls, networking lounges, and on-site dining options to enhance your event experience.</li>
                                            <li><b>Local Attractions: </b> {general.venue_p1 ? general.venue_p1 : ''} offers a vibrant mix of cultural, entertainment, and sightseeing options, making it an ideal destination for both business and leisure.</li>

                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Venue Hotel images and map  */}

                    <div className='hotel-map-block'>
                        <div className='venue-mapping-block'>
                            {/* <div className='venue-mapping-left-block'>
                                <h3>Hotel Images</h3>
                                <div className='hotelImages-block'>
                                    <Image src="/images/images/hotel1.webp" width={200} height={200} alt="" title="" />
                                    <Image src="/images/images/hotel2.webp" width={200} height={200} alt="" title="" />
                                    <Image src="/images/images/hotel3.webp" width={200} height={200} alt="" title="" />
                                    <Image src="/images/images/hotel4.webp" width={200} height={200} alt="" title="" />
                                </div>
                            </div> */}
                            <div className='venue-mapping-right-block'>
                                <h3>Map</h3>
                                <div className="google-map">
                                    <div style={{ width: "100%", height: "300px" }}>

                                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.5137950041217!2d6.102712799999999!3d46.2201263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c654ba27a4fad%3A0xeae08a7a56633043!2sIntercityHotel%20Geneva!5e0!3m2!1sen!2sin!4v1747975520473!5m2!1sen!2sin" width="100%"
                                            height="100%"
                                            style={{ border: "0" }}
                                            loading="lazy"
                                            allowFullScreen
                                            referrerPolicy="no-referrer-when-downgrade"></iframe> */}

                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95780.6243159463!2d2.1401890999999997!3d41.392667949999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49816718e30e5%3A0x44b0fb3d4f47660a!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sin!4v1755149952443!5m2!1sen!2sin" width="100%"
                                            height="100%"
                                            style={{ border: "0" }}
                                            loading="lazy"
                                            allowFullScreen
                                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Attractions-block'>
                        <h3>City Attractions</h3>
                        <SwiperGallery />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Venue