"use client";

import Link from "next/link";
import { ApiResponse, IndexPageData, SessionItem } from '@/types';

interface SessionsComponentProps {
  generalSessionInfo: ApiResponse;
  onelinerSessionInfo: IndexPageData;
}

const SessionsComponent = ({ generalSessionInfo, onelinerSessionInfo }: SessionsComponentProps) => {
  const general = generalSessionInfo?.data || {};
  const onelinerSession = onelinerSessionInfo?.oneliner?.sessions?.content || '';
  const sessions: SessionItem[] = onelinerSessionInfo?.sessions || [];

  // Validate sessions
  const validSessions = Array.isArray(sessions) ? sessions.filter(item => !!item?.text?.trim()) : [];

  const splitIndex = Math.ceil(validSessions.length / 2);
  const firstList = validSessions.slice(0, splitIndex);
  const secondList = validSessions.slice(splitIndex);

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
            <p>{onelinerSession || 'Explore our diverse sessions designed to enrich your experience.'}</p>
          </div>

          <div
            className="col-md-4 sq_mobhide session_wra155 wow fadeInUp"
            data-wow-delay="400ms"
            data-wow-duration="1600ms"
          >
            <div className="sq_mainbox">
              <div className="sq_box1"></div>
              <div className="sq_box2"></div>
              <span className="nur_wrap1">{general?.clogotext || "Public Health"}</span>
              <span className="nur_wrap2">CONFERENCE</span>
              <span className="nur_wrap3">{general?.full_length_dates || "Date TBA"}</span>
              <span className="nur_wrap4">{general?.venue_p2 || "Venue TBA"}</span>
            </div>
          </div>

          <div
            className="col-md-8 mar_mk55 wow fadeInUp"
            data-wow-delay="400ms"
            data-wow-duration="1800ms"
          >
            <div className="session-right-block">
              {validSessions.length > 0 ? (
                <>
                  <div className="add_wrap_session">
                    <ul>
                      {firstList.map((session, index) => (
                        <li key={`first-${index}`}>
                          <span>{session.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="add_wrap_session">
                    <ul>
                      {secondList.map((session, index) => (
                        <li key={`second-${index}`}>
                          <span>{session.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p>No session topics available at the moment. Please check back later.</p>
              )}
            </div>

            <div className="list-of-topics-navigation-block">
              <p>
                Explore{" "}
                <Link href="/list-of-topics" title="List Of Topics">
                  all topics for {general?.confkeyword || "our conference"}.
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
