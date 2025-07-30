// app/sessions/SessionsComponent.tsx

"use client";

import Link from "next/link";

interface Session {
  text?: string;
}

interface GeneralInfo {
  clogotext?: string;
  full_length_dates?: string;
  venue_p1?: string;
  confkeyword?: string;
}

interface SessionsComponentProps {
  generalInfo: GeneralInfo;
  sessions: Session[];
  sessionContent: string;
}

const SessionsComponent = ({
  generalInfo,
  sessions,
  sessionContent,
}: SessionsComponentProps) => {
  const splitIndex = Math.ceil(sessions.length / 2);
  const firstList = sessions.slice(0, splitIndex);
  const secondList = sessions.slice(splitIndex);

  return (
    <div className="session_wrap1" id="sessions-block">
      <div className="clearfix">
        <div className="row clearfix session-img">
          <div
            className="col-md-12 session_wrap_style1 wow fadeInUp"
            data-wow-delay="400ms"
            data-wow-duration="1500ms"
          >
            <h2>Sessions</h2>
            <p>{sessionContent}</p>
          </div>

          <div
            className="col-md-4 sq_mobhide session_wra155 wow fadeInUp"
            data-wow-delay="400ms"
            data-wow-duration="1600ms"
          >
            <div className="sq_mainbox">
              <div className="sq_box1"></div>
              <div className="sq_box2"></div>
              <span className="nur_wrap1">{generalInfo?.clogotext || ""}</span>
              <span className="nur_wrap2">CONFERENCE</span>
              <span className="nur_wrap3">
                {generalInfo?.full_length_dates || ""}
              </span>
              <span className="nur_wrap4">{generalInfo?.venue_p1 || ""}</span>
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
                      <span>{session.text || "Upcoming session"}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="add_wrap_session">
                <ul>
                  {secondList.map((session, index) => (
                    <li key={index}>
                      <span>{session.text || "Upcoming session"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="list-of-topics-navigation-block">
              <p>
                Explore{" "}
                <Link href="/list-of-topics" title="List Of Topics">
                  all topics for {generalInfo?.confkeyword}.
                </Link>{" "}
                Submit your abstract to present at the conference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsComponent;
