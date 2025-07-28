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
];

const Speakers = () => {
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
                Our <span>Planning Committee</span>
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

          <div className="members-view-all-btn-block">
            <Link
              href="/committee"
              title="View All"
              className="view-more-speakers-btn"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
