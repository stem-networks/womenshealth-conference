import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { getBaseUrl } from '@/lib/getBaseUrl';
import { ApiResponse } from '@/types';
import { Metadata } from 'next';

interface Speaker {
    id: number;
    image: string;
    name: string;
    institution: string;
    country: string;
    altText: string;
}

const speakersData: Speaker[] = [
    {
        id: 1,
        image: "/images/images/Lumin_Wang.png",
        name: "Lumin Wang",
        institution: "University of Michigan",
        country: "USA",
        altText: "Lumin Wang",
    },
    {
        id: 2,
        image: "/images/images/Thomas_Fassler.jpg",
        name: "Thomas Fassler",
        institution: "Technical University of Munich",
        country: "Germany",
        altText: "Thomas Fassler",
    },
    {
        id: 3,
        image: "/images/images/Muhammet_S_Toprak.png",
        name: "Muhammet S. Toprak",
        institution: "KTH Royal Institute of Technology",
        country: "Sweden",
        altText: "Muhammet S. Toprak",
    },
    {
        id: 4,
        image: "/images/images/changquan_Lai.jpg",
        name: "Changquan Lai",
        institution: "Nanyang Technological University (NTU)",
        country: "Singapore",
        altText: "Changquan Lai",
    },
    {
        id: 5,
        image: "/images/images/Ankur_Sood.jpg",
        name: "Ankur Sood",
        institution: "Yeungnam University",
        country: "South Korea",
        altText: "Ankur Sood",
    },
    {
        id: 6,
        image: "/images/images/Sumanta_Sahoo.jpg",
        name: "Sumanta Sahoo",
        institution: "Yeungnam University",
        country: "South Korea",
        altText: "Sumanta Sahoo",
    },
    {
        id: 7,
        image: "/images/images/Tungyang_Chen.jpg",
        name: "Tungyang Chen",
        institution: "National Cheng Kung University",
        country: "Taiwan",
        altText: "Tungyang Chen",
    },
    {
        id: 8,
        image: "/images/images/Yang_Wei_Lin.jpg",
        name: "Yang-Wei Lin",
        institution: "National Changhua University of Education",
        country: "Taiwan",
        altText: "Yang-Wei Lin",
    },
    {
        id: 9,
        image: "/images/images/Xiaolong_Wang.png",
        name: "Xiaolong Wang",
        institution: "Lanzhou Institute of Physics, Chinese Academy of Sciences",
        country: "China",
        altText: "Xiaolong Wang",
    },
    {
        id: 10,
        image: "/images/images/Guojiang_Wan.png",
        name: "Guojiang Wan",
        institution: "Southwest Jiaotong University",
        country: "China",
        altText: "Guojiang Wan",
    },
    {
        id: 11,
        image: "/images/images/Hu_Yi.jpg",
        name: "Hu Yi",
        institution: "The Hong Kong Polytechnic University",
        country: "China",
        altText: "Hu Yi",
    },
    {
        id: 12,
        image: "/images/images/Syazwani_Mohd_Zaki.jpg",
        name: "Syazwani Mohd Zaki",
        institution: "International Islamic University Malaysia (IIUM)",
        country: "Malaysia",
        altText: "Syazwani Mohd Zaki",
    },
    {
        id: 13,
        image: "/images/images/Leelakrishna_Reddy.jpg",
        name: "Leelakrishna Reddy",
        institution: "University of Johannesburg",
        country: "South Africa",
        altText: "Leelakrishna Reddy",
    },
    {
        id: 14,
        image: "/images/images/Karthikeyani_Anbukumaran.png",
        name: "Karthikeyani Anbukumaran",
        institution: "Guru Nanak College, University of Madras",
        country: "India",
        altText: "Karthikeyani Anbukumaran",
    },
    {
        id: 15,
        image: "/images/images/Ashok_Mahajan.jpg",
        name: "Ashok Mahajan",
        institution: "Swami Ramanand Teerth Marathwada University",
        country: "India",
        altText: "Ashok Mahajan",
    },
    {
        id: 16,
        image: "/images/images/Leonard_Mwaikambo.png",
        name: "Leonard Mwaikambo",
        institution: "University of Dar es Salaam",
        country: "Tanzania",
        altText: "Leonard Mwaikambo",
    },
];

async function fetchGeneralDataStatic(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch general data statically");
    return res.json();
}

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
    try {
        const generalData = await fetchGeneralDataStatic();
        const meta = generalData?.pages?.speakers?.[0] || {
            title: "Speakers",
            content: "Explore the Speakers of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/speakers"; // hardcode since we know this is sessions page
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
        console.error("Metadata generation error Speakers:", error);
        return {
            title: "Speakers",
            description: "Explore the Speakers of the conference.",
            keywords: "",
        };
    }
}

const speakers = () => {
    return (
        <div>

            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Speakers</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">Our Speakers 2025</h2>

            <div className="speakers-sections members-main-block">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'>

                                    <div className="">
                                        <section className="blog">
                                            {/* <!-- container Start--> */}
                                            <div className="row aos-init aos-animate" data-aos="fade-up" data-aos-duration="400">
                                                <div className="col-md-12 col-12">
                                                    <div className="grid-main-members-gap">
                                                        {speakersData.map((member, index) => (
                                                            <div
                                                                key={index}
                                                                className={`each-member-gap ${index >= 3 ? 'member-row-gap' : ''}`}
                                                            >
                                                                <div className="grid-res-gap member-resp-gap">
                                                                    <div className="grid-res-item">
                                                                        <Image
                                                                            src={member.image}
                                                                            alt={member.name}
                                                                            title={member.name}
                                                                            width={200}
                                                                            height={200}
                                                                            className="rounded-circle img-fluid"
                                                                        />
                                                                    </div>
                                                                    <div className="inner-content">
                                                                        <h3>{member.name}</h3>
                                                                        <p className="members-p1 member-country">{member.country}</p>
                                                                        <p className="members-p1">{member.institution}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default speakers