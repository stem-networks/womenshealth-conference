'use client';

import Image from "next/image";
// import Link from "next/link";

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
    image: "/images/images/Ephraim_Suhir.jpg",
    name: "Ephraim Suhir",
    institution: "Portland State University",
    country: "USA",
    altText: "Ephraim Suhir",
  },
  {
    id: 2,
    image: "/images/images/Milan.webp",
    name: "Milan Kooplikkattil Sadan",
    institution: "Imperial College London",
    country: "UK",
    altText: "Milan Kooplikkattil Sadan",
  },
  {
    id: 3,
    image: "/images/images/john.webp",
    name: "John Zhou",
    institution: "University of Technology Sydney",
    country: "Australia",
    altText: "John Zhou",
  },
  {
    id: 4,
    image: "/images/images/nasimuddin.webp",
    name: "Nasimuddin",
    institution: "Institute for Infocomm Research",
    country: "Singapore",
    altText: "Nasimuddin",
  },
  {
    id: 5,
    image: "/images/images/Junling.webp",
    name: "Junling Shi",
    institution: "Northwestern Polytechnical University",
    country: "China",
    altText: "Junling Shi",
  },
  {
    id: 6,
    image: "/images/images/Yuhong.webp",
    name: "Yuhong Zhao",
    institution: "North University of China",
    country: "China",
    altText: "Yuhong Zhao",
  },
  {
    id: 7,
    image: "/images/images/sergey.webp",
    name: "Sergey Suchkov",
    institution:
      "N.D. Zelinskii Institute for Organic Chemistry of the Russian Academy of Sciences, Moscow",
    country: "Russia",
    altText: "Sergey Suchkov",
  },
  {
    id: 8,
    image: "/images/images/sait.webp",
    name: "Sait Eren San",
    institution: "Kocaeli University",
    country: "Turkey",
    altText: "Sait Eren San",
  },
];

const Members = () => {
  return (
    <div className="speakers-section first-design">
      <div className="import_wrap">
        <div className="auto-container clearfix">
          <div className="row test-imp-row">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="200ms"
              data-wow-duration="1000ms"
            >
              <h2>
                Our <span>Planning Committee 2025</span>
              </h2>
            </div>
          </div>

          <div className="">
            <div className="members-card-block">
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

          {/* <div className="members-view-all-btn-block">
            <Link
              href="/committee"
              title="View All"
              className="view-more-speakers-btn"
            >
              View All
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Members;
