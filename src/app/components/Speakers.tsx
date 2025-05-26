// components/Speakers.js

import Image from "next/image";
import Link from "next/link";

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
                Our <span>Speakers</span>
              </h2>
              {/* <p>{importantDatesContent ? importantDatesContent : ""}</p> */}
            </div>
          </div>
          <div className="">
            <div className="members-card-block">
              <div className="row-member row">
                {/* <!-- Speaker 1 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 members-specific-space">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/eliane_silva.webp"
                          alt="Eliane Silva"
                          title="Eliane Silva"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Eliane Silva</h3>
                      <p>University of Porto</p>
                      <p>Portugal</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 2 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 members-specific-space">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/malgorzata_masierek.jpg"
                          alt="Malgorzata Masierek"
                          title="Malgorzata Masierek"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Malgorzata Masierek</h3>
                      <p>Bioton S.A</p>
                      <p>Poland</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 3 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 members-specific-space">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/kayhan_Hulya.JPG"
                          alt="Kayhan Hulya"
                          title="Kayhan Hulya"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Kayhan Hulya</h3>
                      <p>Istanbul University</p>
                      <p>United Kingdom</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 4 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 members-specific-space">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/sadee_Wolfgang.png"
                          alt="Sadee Wolfgang"
                          title="Sadee Wolfgang"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Sadee Wolfgang</h3>
                      <p>The Ohio State University</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 5 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 member-spacing">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/nigel_Smart.jpg"
                          alt="Nigel J Smart"
                          title="Nigel J Smart"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Nigel J Smart</h3>
                      <p>University of Manchester</p>
                      <p>United states</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 6 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 member-spacing">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/khojasteh_Joharchi.jpg"
                          alt="Khojasteh Joharchi"
                          title="Khojasteh Joharchi"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Khojasteh Joharchi</h3>
                      <p>Shahid Beheshti University of Medical Science</p>
                      <p>Iran</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 7 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 member-spacing">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/mirzaeei_shahla.webp"
                          alt="Mirzaeei Shahla"
                          title="Mirzaeei Shahla"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Mirzaeei Shahla</h3>
                      <p>Kermanshah University of Medical Science</p>
                      <p>Iran</p>
                    </div>
                  </div>
                </div>

                {/* <!-- Speaker 8 --> */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4 member-spacing">
                  <div className="card text-center p-3 border">
                    <div className="custom-border-wrapper">
                      <div className="image-wrapper mb-3">
                        <Image
                          src="/images/images/rafael_Vazquez_Duhalt.png"
                          alt="Rafael Vazquez Duhalt"
                          title="Rafael Vazquez Duhalt"
                          width={200}
                          height={200}
                          className="rounded-circle img-fluid"
                        />
                      </div>
                    </div>
                    <div className="speaker-details normal-design">
                      <h3>Rafael Vazquez Duhalt</h3>
                      <p>National Autonomous University of Mexico</p>
                      <p>Mexico</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="members-view-all-btn-block">
            <Link
              href="/speakers"
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
