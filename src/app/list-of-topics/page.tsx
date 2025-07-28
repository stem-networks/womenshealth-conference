// app/list-of-topics/page.tsx

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ApiResponse } from "@/types";
import TopicsGrid from '../components/TopicsGrid';
import { getBaseUrl } from "@/lib/getBaseUrl";

interface Topic {
    sessionTopic: string;
    urlFormat: string;
}

// const SESSION_API_URL = process.env.SESSION_API_URL as string;
// const BASE_URL = process.env.BASE_URL || "";


async function fetchGeneralDataStatic(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch general data statically");
    return res.json();
}

async function fetchTopics(): Promise<Topic[]> {
    try {
        const baseUrl = getBaseUrl();
        const res = await fetch(`${baseUrl}/api/session-content`, {
            next: { revalidate: 60 }, // ISR (optional)
        });
        if (!res.ok) throw new Error("Failed to fetch topics");

        // const data = await res.json();
        // const topics: Topic[] = data.filter((item: Topic) => item.sessionTopic && item.urlFormat);
        // return topics;
        const json = await res.json();
        const raw = json.data ?? [];
        const topics: Topic[] = Array.isArray(raw)
            ? raw.filter((item: Topic) => item.sessionTopic && item.urlFormat)
            : [];
        return topics;
    } catch (error) {
        console.error("Error loading topics:", error);
        return [];
    }
}

export async function generateMetadata(): Promise<Metadata> {
    try {
        const generalData = await fetchGeneralDataStatic();
        const general = generalData?.data || {};
        const topics = await fetchTopics();

        const meta = {
            title: `List of Topics - ${generalData?.pages?.index?.[0]?.title || "Conference"}`,
            content: `Explore topics related to ${general?.confkeyword || "the conference"}. If you’re interested in presenting on any of these subjects, you’re welcome to submit your abstract.`,
            meta_keywords: topics.map(topic => topic.sessionTopic).join(', '),
        };

        const canonicalPath = "/list-of-topics";
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
        console.error("Metadata generation error sessions:", error);
        return {
            title: "List of Topics",
            description: "Explore the topics related to the conference.",
            keywords: "",
        };
    }
}

const ListOfTopics = async () => {

    const topics = await fetchTopics();

    return (
        <div>
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title="Navigate to Homepage">Home</Link> <i className="fa fa-angle-right"></i>
                            <span>List of Topics</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="session_wrap1" id="sessions-block">
                <div className="clearfix">
                    <div className="row clearfix">
                        <div className="col-md-12 session_wrap_style1 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <h2>List of Topics</h2>
                            <div className="auto-container">
                                <TopicsGrid topics={topics} className="topics-grid list-border-block" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfTopics;
