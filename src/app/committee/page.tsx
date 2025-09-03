import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

interface Member {
    id: number;
    image: string;
    name: string;
    country: string;
    institution: string;
    altText: string;
}

const committee = () => {

    const members: Member[] = [
        {
            id: 1,
            image: "/images/images/Thomas.png",
            name: "Thomas J. Webster",
            country: "United States",
            institution: "Hebei University of Technology",
            altText: "Thomas J. Webster"
        },
        {
            id: 2,
            image: "/images/images/ravi_maharjan.webp",
            name: "Ravi Maharjan",
            country: "South Korea",
            institution: "Dongguk University",
            altText: "Ravi Maharjan"
        },
        {
            id: 3,
            image: "/images/images/giovanni.webp",
            name: "Giovanni Pagano",
            country: "Italy",
            institution: "University of Naples Federico II",
            altText: "Giovanni Pagano"
        },
        {
            id: 4,
            image: "/images/images/keerti_Maheshwari.jpeg",
            name: "Keerti Maheshwari",
            country: "India",
            institution: "Delhi Pharmaceutical Sciences and Research University",
            altText: "Keerti Maheshwari"
        },
        {
            id: 5,
            image: "/images/images/Jaswanth.webp",
            name: "B.H. Jaswanth Gowda",
            country: "United Kingdom",
            institution: "Queen's University Belfast",
            altText: "B.H. Jaswanth Gowda"
        },
        {
            id: 6,
            image: "/images/images/rodica_olteanu.jpg",
            name: "Rodica Olteanu",
            country: "Romania",
            institution: "Colentina Clinical Hospital",
            altText: "Rodica Olteanu"
        }
        // {
        //   id: 7,
        //   image: "/images/images/member7.jpg",
        //   name: "Dr. Sarah Johnson",
        //   country: "Canada",
        //   institution: "University of Toronto",
        //   altText: "Dr. Sarah Johnson"
        // },
        // {
        //   id: 8,
        //   image: "/images/images/member8.jpg",
        //   name: "Prof. Michael Chen",
        //   country: "Australia",
        //   institution: "University of Sydney",
        //   altText: "Prof. Michael Chen"
        // },
        // {
        //   id: 9,
        //   image: "/images/images/member9.jpg",
        //   name: "Dr. Elena Rodriguez",
        //   country: "Spain",
        //   institution: "University of Barcelona",
        //   altText: "Dr. Elena Rodriguez"
        // },
        // {
        //   id: 10,
        //   image: "/images/images/member10.jpg",
        //   name: "Prof. James Wilson",
        //   country: "Germany",
        //   institution: "Technical University of Munich",
        //   altText: "Prof. James Wilson"
        // }
    ];

    // Split members into rows of 3 for better layout control
    const memberRows = [];
    for (let i = 0; i < members.length; i += 3) {
        memberRows.push(members.slice(i, i + 3));
    }

    return (
        <div>
            {/* <Head>
                <title>{planning_committee ? planning_committee[0]?.title : ''}</title>
                <meta name="description" content={planning_committee ? planning_committee[0]?.content : ''} />
                <meta name="keywords" content={planning_committee ? planning_committee[0]?.meta_keywords : ''} />
                <link rel="canonical" href={canonicalUrl} />
            </Head> */}
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
            <div className="speakers-sections members-main-block">
                <div className='auto-container'>
                    <div className='row clearfix'>
                        <div className='col-lg-12 col-md-12 mar_center'>
                            <div className='row clearfix'>
                                <div className='col-lg-12 col-md-12 wow fadeInUp animated' data-wow-delay='400ms'
                                    data-wow-duration='1000ms'>

                                    <section className="blog">
                                        <div className="row aos-init aos-animate"
                                            data-aos="fade-up"
                                            data-aos-duration="400">
                                            <div className="col-md-12 col-12">
                                                {memberRows.map((row, rowIndex) => (
                                                    <div key={`row-${rowIndex}`} className="grid-main-members-gap">
                                                        {row.map((member) => (
                                                            <div key={member.id} className={`each-member-gap ${rowIndex > 0 ? 'member-row-gap' : ''}`}>
                                                                <div className="grid-res-gap member-resp-gap">
                                                                    <div className="grid-res-item">
                                                                        <Image
                                                                            src={member.image}
                                                                            alt={member.altText}
                                                                            title={member.name}
                                                                            width={200}
                                                                            height={200}
                                                                            className="rounded-circle img-fluid"
                                                                            priority={rowIndex === 0} // Priority for first row only
                                                                        />
                                                                    </div>
                                                                    <div className="inner-content">
                                                                        <h3>{member.name}</h3>
                                                                        <p className='members-p1 member-country'>{member.country}</p>
                                                                        <p className='members-p1'>{member.institution}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
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