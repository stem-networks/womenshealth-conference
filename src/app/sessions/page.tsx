"use client";

// import React, { useState } from "react";

import Link from "next/link";
import Head from "next/head";
// import { useRouter } from 'next/router';
import { useAppData } from "../../context/AppDataContext";
import { SessionItem , OnelinerData} from "@/types";

const Sessions = () => {
  const {indexPageData, general, pages } = useAppData();

   const sessions: SessionItem[] = indexPageData?.sessions || []; 

  const splitIndex = Math.ceil(sessions.length / 2);
  const firstList = sessions.slice(0, splitIndex);
  const secondList = sessions.slice(splitIndex);

   const oneliner: OnelinerData = indexPageData?.oneliner || {};
    const sessionContent = oneliner?.sessions?.content || "";

    console.log("test session head", pages?.sessions_meta[0].title);


  return (
    <div>
      <Head>
        <title>{pages?.sessions_meta[0].title || ""}</title>
        <meta name="description" content={pages?.sessions_meta[0].content || ""} />
        <meta name="keywords" content={pages?.sessions_meta[0].meta_keywords || ""} />
        {/* <link rel="canonical" href={canonicalUrl || ""} />  */}
      </Head>
      <div className="session_wrap1" id="sessions-block">
        <div className="clearfix">
          <div className="row clearfix session-img">
            <div
              className="col-md-12 session_wrap_style1 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <h2>Sessions</h2>
              <p>
                {sessionContent
                  ? sessionContent
                  : "Session content will be updated soon."}
              </p>
            </div>
            <div
              className="col-md-4 sq_mobhide session_wra155 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1600ms"
            >
              <div className="sq_mainbox">
                <div className="sq_box1"></div>
                <div className="sq_box2"></div>
                <span className="nur_wrap1">{general?.clogotext ? general?.clogotext : ""}</span>
                <span className="nur_wrap2">CONFERENCE</span>
                <span className="nur_wrap3">
                  {general?.full_length_dates ? general?.full_length_dates : ""}
                </span>
                <span className="nur_wrap4">{general?.venue_p2 ? general?.venue_p2 : ""}</span>
              </div>
            </div>
            <div
              className="col-md-8 mar_mk55 wow fadeInUp"
              data-wow-delay="400ms"
              data-wow-duration="1800ms"
            >
              <div className="session-right-block">
                <div className="add_wrap_session">
                  <ul>
                    {firstList.map((session, index) => (
                      <li key={index}>
                        <span>
                          {session ? session.text : "Upcoming session"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="add_wrap_session">
                  <ul>
                    {secondList.map((session, index) => (
                      <li key={index}>
                        <span>
                          {session ? session.text : "Upcoming session"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigating to List-of-Topics Page */}
              <div className="list-of-topics-navigation-block">
                <p>
                  Explore{" "}
                  <Link href="list-of-topics" title="List Of Topics">
                    all topics for {general?.confkeyword}.
                  </Link>{" "}
                  Submit your abstract to present at the conference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
