'use client';

import Image from "next/image";
import Link from "next/link";

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
];


const Speakers = () => {
  return (
    <div className="speakers-sections members-main-block">
      <div className="import_wrap import-wrapping">
        <div className="auto-container clearfix">
          <div className="row test-imp-row">
            <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="200ms"
              data-wow-duration="1000ms">
              <h2>Our <span>Speakers 2025</span></h2>

            </div>
          </div>

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

          <div className='members-view-all-btn-block'>
            <Link href='/speakers' title="View All" className="view-more-speakers-btn">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
