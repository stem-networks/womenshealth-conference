import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { Metadata } from "next";
import { ApiResponse } from "@/types";

interface Speaker {
    id: number;
    image: string;
    name: string;
    institution: string;
    country: string;
    altText: string;
}

const membersData: Speaker[] = [
    {
        id: 1,
        image: "/images/images/david.webp",
        name: "David Zechman",
        institution: "The Zechman Group",
        country: "USA",
        altText: "David Zechman",
    },
    {
        id: 2,
        image: "/images/images/irina.webp",
        name: "Irina Koyfman",
        institution: "Affinity Expert",
        country: "USA",
        altText: "Irina Koyfman",
    },
    {
        id: 3,
        image: "/images/images/lisa.webp",
        name: "Lisa Grubb",
        institution: "Johns Hopkins School of Nursing",
        country: "USA",
        altText: "Lisa Grubb",
    },
    {
        id: 4,
        image: "/images/images/paraskevi.webp",
        name: "Paraskevi Theofilou",
        institution: "University of Peloponnese",
        country: "Greece",
        altText: "Paraskevi Theofilou",
    },
    {
        id: 5,
        image: "/images/images/Baljit.webp",
        name: "Baljit Kaur Gill",
        institution: "Hong kong metropolitan university",
        country: "China",
        altText: "Baljit Kaur Gill",
    },
    {
        id: 6,
        image: "/images/images/Conway.webp",
        name: "Kelly J. Conway",
        institution: "Rocky mountain university",
        country: "USA",
        altText: "Kelly J. Conway",
    },
    {
        id: 7,
        image: "/images/images/Laurin.webp",
        name: "Laurin Mooney",
        institution: "Resilience Engineering Association",
        country: "France",
        altText: "Laurin Mooney",
    },
    {
        id: 8,
        image: "/images/images/Nirupama.webp",
        name: "Nirupama Esther Jerome",
        institution: "Pinnacle Clinical Research",
        country: "USA",
        altText: "Nirupama Esther Jerome",
    },
    {
        id: 9,
        image: "/images/images/sergey_suchkov.webp",
        name: 'Sergey Suchkov',
        institution: 'R&D Director of the National Center for Human Photosynthesis',
        country: 'Mexico',
        altText: 'Sergey Suchkov',
    },
    {
        id: 10,
        image: "/images/images/simon_treissman.webp",
        name: 'Dr. Simon Treissman',
        institution: 'Founder and CEO',
        country: 'Canada',
        altText: 'Dr. Simon Treissman',
    },

    {
        id: 11,
        image: "/images/images/vanitha_rajakumar.webp",
        name: 'Vanitha Rajakumar',
        country: 'Kuwait',
        institution: 'Royale Hayat Hospital',
        altText: 'Vanitha Rajakumar',
    },
    {
        id: 12,
        image: "/images/images/prabha_Grace.jpg",
        name: 'Prabha Grace',
        institution: 'Carmel College of Nursing',
        country: 'India',
        altText: 'Prabha Grace',
    },
    {
        id: 13,
        image: "/images/images/qiuyi_yan.webp",
        name: 'Dr. Qiuyi Yan',
        institution: 'Teaching Management Section: The School of Nursing, Gulin Medical University',
        country: 'China',
        altText: 'Dr. Qiuyi Yan',
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
        const meta = generalData?.pages?.planning_committee?.[0] || {
            title: "Planning Committee",
            content: "Explore the Planning Committee members of the conference.",
            meta_keywords: "",
        };

        // Canonical
        // const baseUrl = process.env.BASE_URL || "";
        const canonicalPath = "/committee"; // hardcode since we know this is sessions page
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
        console.error("Metadata generation error guidelines:", error);
        return {
            title: "Planning Committee",
            description: "Explore the Planning Committee members of the conference.",
            keywords: "",
        };
    }
}
const committee = () => {
    return (
        <div>
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title='Navigate to Homepage'>Home</Link> <i className="fa fa-angle-right"></i>
                            <span>Committee</span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">Our Planning Committee</h2>

            <div className="speakers-section first-design">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'>

                                    <div className="">
                                        <div className='members-card-block committee-spacing'>
                                            <div className="row-member row">
                                                {membersData.map((speaker, index) => (
                                                    <div
                                                        className={`col-lg-3 col-md-6 col-sm-6 mb-4 ${index < 4
                                                            ? 'members-specific-space'
                                                            : 'member-spacing'
                                                            }`}
                                                        key={index}
                                                    >
                                                        <div className="card text-center p-3 border">
                                                            <div className="custom-border-wrapper">
                                                                <div className="image-wrapper mb-3">
                                                                    <Image
                                                                        src={speaker.image}
                                                                        alt={speaker.name}
                                                                        title={speaker.name}
                                                                        width={200}
                                                                        height={200}
                                                                        className="rounded-circle img-fluid"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="speaker-details normal-design">
                                                                <h3>{speaker.name}</h3>
                                                                <p>{speaker.institution}</p>
                                                                <p>{speaker.country}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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

export default committee