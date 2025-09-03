// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// export default function ConferenceTabs() {
//   const [activeTab, setActiveTab] = useState<"Day1" | "Day2">("Day1");
//   const [activeSession, setActiveSession] = useState<string>("Coffee Break");

//   // Session content organized by Day
//   const sessionsByDay: Record<
//     "Day1" | "Day2",
//     Record<string, { images: string[]; description: string }>
//   > = {
//     Day1: {
//       "Coffee Break": {
//         images: [
//           "/images/gallery-event/day1/coffee/1.webp",
//           "/images/gallery-event/day1/coffee/2.webp",
//           "/images/gallery-event/day1/coffee/3.webp",
//           "/images/gallery-event/day1/coffee/4.webp",
//           "/images/gallery-event/day1/coffee/5.webp",
//           "/images/gallery-event/day1/coffee/6.webp",
//           "/images/gallery-event/day1/coffee/7.webp",
//           "/images/gallery-event/day1/coffee/8.webp",
//         ],
//         description: "Networking and casual discussions over coffee.",
//       },
//       "Keynotes": {
//         images: [
//           "/images/gallery-event/day1/keynotes/1.webp",
//           "/images/gallery-event/day1/keynotes/2.webp",
//           "/images/gallery-event/day1/keynotes/3.webp",
//           "/images/gallery-event/day1/keynotes/4.webp",
//           "/images/gallery-event/day1/keynotes/5.webp",
//           "/images/gallery-event/day1/keynotes/6.webp",
//           "/images/gallery-event/day1/keynotes/7.webp",
//           "/images/gallery-event/day1/keynotes/8.webp",
//         ],
//         description: "Inspiring keynote sessions from industry leaders.",
//       },
//       "Posters": {
//         images: [
//           "/images/gallery-event/day1/posters/1.webp",
//           "/images/gallery-event/day1/posters/2.webp",
//           "/images/gallery-event/day1/posters/3.webp",
//           "/images/gallery-event/day1/posters/4.webp",
//           "/images/gallery-event/day1/posters/5.webp",
//           "/images/gallery-event/day1/posters/6.webp",
//           "/images/gallery-event/day1/posters/7.webp",
//           "/images/gallery-event/day1/posters/8.webp",
//         ],
//         description: "Poster presentations showcasing innovative research.",
//       },
//       "Oral speakers": {
//         images: [
//           "/images/gallery-event/day1/oral-speakers/1.webp",
//           "/images/gallery-event/day1/oral-speakers/2.webp",
//           "/images/gallery-event/day1/oral-speakers/3.webp",
//           "/images/gallery-event/day1/oral-speakers/4.webp",
//           "/images/gallery-event/day1/oral-speakers/5.webp",
//           "/images/gallery-event/day1/oral-speakers/6.webp",
//           "/images/gallery-event/day1/oral-speakers/7.webp",
//           "/images/gallery-event/day1/oral-speakers/8.webp",
//         ],
//         description: "Oral presentations from selected speakers.",
//       },
//       "Lunch Break": {
//         images: [
//           "/images/gallery-event/day1/lunch/1.webp",
//           "/images/gallery-event/day1/lunch/2.webp",
//           "/images/gallery-event/day1/lunch/3.webp",
//           "/images/gallery-event/day1/lunch/4.webp",
//           "/images/gallery-event/day1/lunch/5.webp",
//           "/images/gallery-event/day1/lunch/6.webp",
//           "/images/gallery-event/day1/lunch/7.webp",
//           "/images/gallery-event/day1/lunch/8.webp",
//         ],
//         description: "Lunch networking session with delegates.",
//       },
//       "Panel Discussion": {
//         images: [
//           "/images/gallery-event/day1/panel-discussion/1.webp",
//           "/images/gallery-event/day1/panel-discussion/2.webp",
//           "/images/gallery-event/day1/panel-discussion/3.webp",
//           "/images/gallery-event/day1/panel-discussion/4.webp",
//           "/images/gallery-event/day1/panel-discussion/5.webp",
//           "/images/gallery-event/day1/panel-discussion/6.webp",
//           "/images/gallery-event/day1/panel-discussion/7.webp",
//           "/images/gallery-event/day1/panel-discussion/8.webp",
//         ],
//         description: "Interactive panel discussions on emerging trends.",
//       },
//     },

//     Day2: {
//       "Coffee Break": {
//         images: [
//           "/images/gallery-event/day2/coffee/1.webp",
//           "/images/gallery-event/day2/coffee/2.webp",
//           "/images/gallery-event/day2/coffee/3.webp",
//           "/images/gallery-event/day2/coffee/4.webp",
//           "/images/gallery-event/day2/coffee/5.webp",
//           "/images/gallery-event/day2/coffee/6.webp",
//           "/images/gallery-event/day2/coffee/7.webp",
//           "/images/gallery-event/day2/coffee/8.webp",
//         ],
//         description: "Networking and casual discussions over coffee.",
//       },
//       "Keynotes": {
//         images: [
//           "/images/gallery-event/day2/keynotes/1.webp",
//           "/images/gallery-event/day2/keynotes/2.webp",
//           "/images/gallery-event/day2/keynotes/3.webp",
//           "/images/gallery-event/day2/keynotes/4.webp",
//           "/images/gallery-event/day2/keynotes/5.webp",
//           "/images/gallery-event/day2/keynotes/6.webp",
//           "/images/gallery-event/day2/keynotes/7.webp",
//           "/images/gallery-event/day2/keynotes/8.webp",
//         ],
//         description: "Inspiring keynote sessions from industry leaders.",
//       },
//       "Posters": {
//         images: [
//           "/images/gallery-event/day2/posters/1.webp",
//           "/images/gallery-event/day2/posters/2.webp",
//           "/images/gallery-event/day2/posters/3.webp",
//           "/images/gallery-event/day2/posters/4.webp",
//           "/images/gallery-event/day2/posters/5.webp",
//           "/images/gallery-event/day2/posters/6.webp",
//           "/images/gallery-event/day2/posters/7.webp",
//           "/images/gallery-event/day2/posters/8.webp",
//         ],
//         description: "Poster presentations showcasing innovative research.",
//       },
//       "Oral speakers": {
//         images: [
//           "/images/gallery-event/day2/oral-speakers/1.webp",
//           "/images/gallery-event/day2/oral-speakers/2.webp",
//           "/images/gallery-event/day2/oral-speakers/3.webp",
//           "/images/gallery-event/day2/oral-speakers/4.webp",
//           "/images/gallery-event/day2/oral-speakers/5.webp",
//           "/images/gallery-event/day2/oral-speakers/6.webp",
//           "/images/gallery-event/day2/oral-speakers/7.webp",
//           "/images/gallery-event/day2/oral-speakers/8.webp",
//         ],
//         description: "Oral presentations from selected speakers.",
//       },
//       "Lunch Break": {
//         images: [
//           "/images/gallery-event/day2/lunch/1.webp",
//           "/images/gallery-event/day2/lunch/2.webp",
//           "/images/gallery-event/day2/lunch/3.webp",
//           "/images/gallery-event/day2/lunch/4.webp",
//           "/images/gallery-event/day2/lunch/5.webp",
//           "/images/gallery-event/day2/lunch/6.webp",
//           "/images/gallery-event/day2/lunch/7.webp",
//           "/images/gallery-event/day2/lunch/8.webp",
//         ],
//         description: "Lunch networking session with delegates.",
//       },
//       "Panel Discussion": {
//         images: [
//           "/images/gallery-event/day2/panel-discussion/1.webp",
//           "/images/gallery-event/day2/panel-discussion/2.webp",
//           "/images/gallery-event/day2/panel-discussion/3.webp",
//           "/images/gallery-event/day2/panel-discussion/4.webp",
//           "/images/gallery-event/day2/panel-discussion/5.webp",
//           "/images/gallery-event/day2/panel-discussion/6.webp",
//           "/images/gallery-event/day2/panel-discussion/7.webp",
//           "/images/gallery-event/day2/panel-discussion/8.webp",
//         ],
//         description: "Interactive panel discussions on emerging trends.",
//       },
//     }
//   };

//   // If session not found in day2 fallback to first session
//   const currentSessions = sessionsByDay[activeTab];
//   const activeSessionSafe =
//     currentSessions[activeSession] ? activeSession : Object.keys(currentSessions)[0];

//   // Scroll to heading
//   const scrollToHeading = () => {
//     const heading = document.getElementById("day-heading");
//     if (heading) {
//       heading.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <div>
//       <section className="tabs-navigation-block">
//         <section className="tab-view-days-block">
//           <div className="auto-container text-center">
//             {/* Tab Navigation */}
//             <div
//               className="nav nav-tabs custom-tabs justify-content-center"
//               role="tablist"
//             >
//               <button
//                 className={`nav-link ${activeTab === "Day1" ? "active" : ""}`}
//                 onClick={() => {
//                   setActiveTab("Day1");
//                   setActiveSession("Coffee Break");
//                   scrollToHeading();
//                 }}
//                 role="tab"
//                 aria-selected={activeTab === "Day1"}
//                 title="Day-1"
//               >
//                 Day-1
//               </button>
//               <button
//                 className={`nav-link ${activeTab === "Day2" ? "active" : ""}`}
//                 onClick={() => {
//                   setActiveTab("Day2");
//                   setActiveSession("Coffee Break");
//                   scrollToHeading();
//                 }}
//                 role="tab"
//                 aria-selected={activeTab === "Day2"}
//                 title="Day-2"
//               >
//                 Day-2
//               </button>
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="tab-content mt-5">
//             <div className="tab-pane active" role="tabpanel">
//               <div className={`${activeTab.toLowerCase()}-main-block`}>
//                 <div className="tab-day-heading">
//                   <div className="auto-container">
//                     <h3 id="day-heading" className="day-heading-text">
//                       {activeTab === "Day1"
//                         ? "Day 1: Insightful Discussions & Groundbreaking Ideas"
//                         : "Day 2: Recognizing Excellence & Expanding Global Insights"}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Dynamic content */}
//                 <div className="days-content-block">
//                   <div className="auto-container">
//                     <div className="days-main-para">
//                       <p>{currentSessions[activeSessionSafe].description}</p>
//                     </div>

//                     {/* Gallery */}
//                     <div className="gallery-grid">
//                       {currentSessions[activeSessionSafe].images.map((img, idx) => (
//                         <div key={idx} className="gallery-card">
//                           <Image
//                             src={img}
//                             alt={activeSessionSafe}
//                             width={300}
//                             height={400}
//                             className="rounded-lg shadow-md"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Session buttons */}
//                 <div className="day-break-blocks mt-6">
//                   <div className="auto-container">
//                     <div className="custom-pill-buttons">
//                       {Object.keys(currentSessions).map((session) => (
//                         <button
//                           key={session}
//                           className={`pill-btn ${activeSessionSafe === session ? "active" : ""
//                             }`}
//                           onClick={() => {
//                             setActiveSession(session);
//                             scrollToHeading();
//                           }}
//                         >
//                           {session}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>

//       <div className="gallery-complete-block">
//         <Link href="./gallery-of-event" className="gallery-complete-btn">
//           Gallery of Complete Event
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ConferenceSessions() {
  const [activeSession, setActiveSession] = useState<string>("Keynotes");

  // Session content (no Day1/Day2 separation now)
  const sessions: Record<string, { images: string[]; description: string }> = {
    "Keynotes": {
      images: [
        "/images/gallery-event/keynotes/1.webp",
        "/images/gallery-event/keynotes/2.webp",
        "/images/gallery-event/keynotes/3.webp",
        "/images/gallery-event/keynotes/4.webp",
        "/images/gallery-event/keynotes/5.webp",
        "/images/gallery-event/keynotes/6.webp",
        "/images/gallery-event/keynotes/7.webp",
        "/images/gallery-event/keynotes/8.webp",
      ],
      description: "Inspiring keynote sessions from industry leaders.",
    },
    "Oral Speakers": {
      images: [
        "/images/gallery-event/oral-speakers/1.webp",
        "/images/gallery-event/oral-speakers/2.webp",
        "/images/gallery-event/oral-speakers/3.webp",
        "/images/gallery-event/oral-speakers/4.webp",
        "/images/gallery-event/oral-speakers/5.webp",
        "/images/gallery-event/oral-speakers/6.webp",
        "/images/gallery-event/oral-speakers/7.webp",
        "/images/gallery-event/oral-speakers/8.webp",
      ],
      description: "Oral presentations from selected speakers.",
    },
    "Panel Discussion": {
      images: [
        "/images/gallery-event/panel-discussion/1.webp",
        "/images/gallery-event/panel-discussion/2.webp",
        "/images/gallery-event/panel-discussion/3.webp",
        "/images/gallery-event/panel-discussion/4.webp",
        "/images/gallery-event/panel-discussion/5.webp",
        "/images/gallery-event/panel-discussion/6.webp",
        "/images/gallery-event/panel-discussion/7.webp",
        "/images/gallery-event/panel-discussion/8.webp",
      ],
      description: "Interactive panel discussions on emerging trends.",
    },
    "Certificate Presentation Ceremony": {
      images: [
        "/images/gallery-event/certificates/1.webp",
        "/images/gallery-event/certificates/2.webp",
        "/images/gallery-event/certificates/3.webp",
        "/images/gallery-event/certificates/4.webp",
        "/images/gallery-event/certificates/5.webp",
        "/images/gallery-event/certificates/6.webp",
        "/images/gallery-event/certificates/7.webp",
        "/images/gallery-event/certificates/8.webp",
      ],
      description: "Interactive panel discussions on emerging trends.",
    },
    "Posters": {
      images: [
        "/images/gallery-event/posters/1.webp",
        "/images/gallery-event/posters/2.webp",
        "/images/gallery-event/posters/3.webp",
        "/images/gallery-event/posters/4.webp",
        "/images/gallery-event/posters/5.webp",
        "/images/gallery-event/posters/6.webp",
        "/images/gallery-event/posters/7.webp",
        "/images/gallery-event/posters/8.webp",
      ],
      description: "Poster presentations showcasing innovative research.",
    },
    "Coffee Break": {
      images: [
        "/images/gallery-event/coffee/1.webp",
        "/images/gallery-event/coffee/2.webp",
        "/images/gallery-event/coffee/3.webp",
        "/images/gallery-event/coffee/4.webp",
        "/images/gallery-event/coffee/5.webp",
        "/images/gallery-event/coffee/6.webp",
        "/images/gallery-event/coffee/7.webp",
        "/images/gallery-event/coffee/8.webp",
      ],
      description: "Networking and casual discussions over coffee.",
    },
    "Lunch Break": {
      images: [
        "/images/gallery-event/lunch/1.webp",
        "/images/gallery-event/lunch/2.webp",
        "/images/gallery-event/lunch/3.webp",
        "/images/gallery-event/lunch/4.webp",
        "/images/gallery-event/lunch/5.webp",
        "/images/gallery-event/lunch/6.webp",
        "/images/gallery-event/lunch/7.webp",
        "/images/gallery-event/lunch/8.webp",
      ],
      description: "Lunch networking session with delegates.",
    },
  };

  // Scroll to heading
  const scrollToHeading = () => {
    const heading = document.getElementById("session-heading");
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <section className="sessions-block">
        {/* <div className="tab-day-heading">
          <div className="auto-container">
            <h3 id="session-heading" className="day-heading-text">
              Conference Sessions & Highlights
            </h3>
          </div>
        </div> */}

        {/* Session buttons */}
        <div className="day-break-blocks mt-6">
          <div className="auto-container">
            <div className="custom-pill-buttons">
              {Object.keys(sessions).map((session) => (
                <button
                  key={session} title={session}
                  className={`pill-btn ${activeSession === session ? "active" : ""}`}
                  onClick={() => {
                    setActiveSession(session);
                    scrollToHeading();
                  }}
                >
                  {session}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic content */}
        <div className="days-content-block">
          <div className="auto-container">
            {/* <div className="days-main-para">
              <p>{sessions[activeSession].description}</p>
            </div> */}

            {/* Gallery */}
            <div className="gallery-grid">
              {sessions[activeSession].images.map((img, idx) => (
                <div key={idx} className="gallery-card">
                  <Image
                    src={img}
                    alt={activeSession}
                    width={300}
                    height={400}
                    className="rounded-lg shadow-md"
                    title={activeSession}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      <div className="gallery-complete-block">
        <Link href="./gallery-of-event" className="gallery-complete-btn" title="View Complete Gallery">
          View Complete Gallery
        </Link>
      </div>
    </div>
  );
}
