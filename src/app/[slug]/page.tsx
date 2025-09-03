import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TopicsGrid from '../components/TopicsGrid';
import { ApiResponse } from "@/types";
import { Metadata } from 'next';
import { getBaseUrl } from "@/lib/getBaseUrl";
// import { getSessionsData } from "@/lib/getSessionsData";

interface TopicContentObject {
    text: string;
}

interface TopicDetails {
    sessionTopic: string;
    metaDescription?: string;
    metaKeywords?: string;
    urlFormat: string;
    content?: (string | TopicContentObject)[] | string;
}

type PageProps = {
    params: Promise<{ slug: string }>; // use Promise
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchGeneralDataStatic(): Promise<ApiResponse> {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/general`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) throw new Error("Failed to fetch general data statically");
    return res.json();
}

//  Fetch all topics
async function fetchAllTopics(): Promise<TopicDetails[]> {
    const res = await fetch(`${getBaseUrl()}/api/session-content`, {
        cache: 'no-store',
    });
    const json = await res.json();
    return json.data ?? [];
}

//  Find a topic by slug
async function fetchTopicBySlug(slug: string): Promise<TopicDetails | null> {
    const topics = await fetchAllTopics();
    return topics.find((item) => item.urlFormat === slug) || null;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;  // resolve the promise

    const generalData = await fetchGeneralDataStatic();
    const topic = await fetchTopicBySlug(slug);

    const meta = {
        title: `${topic?.sessionTopic || 'Topic Not Found'} | ${generalData?.pages?.index?.[0]?.title || "Conference"}`,
        content: topic?.metaDescription || 'No description available.',
        meta_keywords: topic?.metaKeywords || 'Topics, Sessions',
    };

    const canonicalURL = `${getBaseUrl()}/${slug}`;

    return {
        title: meta.title,
        description: meta.content,
        keywords: meta.meta_keywords,
        metadataBase: new URL(getBaseUrl()),
        alternates: {
            canonical: canonicalURL,
        },
    };
}

const TopicPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const topic = await fetchTopicBySlug(slug);

    const allTopics = await fetchAllTopics();

    if (!topic) return notFound();

    // const relatedTopics = allTopics.filter((item) => item.urlFormat !== slug);
    const relatedTopics = allTopics;

    const renderContent = () => {
        if (Array.isArray(topic.content)) {
            return topic.content.map((item, index) => {
                const text = typeof item === 'object' && 'text' in item ? item.text : String(item);
                const isListItem = text.trim().startsWith('*');
                const className = isListItem ? 'session-content-li-items' : 'list-topics-p';

                return (
                    <p key={index} className={className}>
                        {isListItem ? text.replace(/^\*+ /, '') : text}
                    </p>
                );
            });
        } else if (typeof topic.content === 'string') {
            return topic.content.split('\n').map((line, index) => {
                const isListItem = line.trim().startsWith('*');
                const className = isListItem ? 'session-content-li-items' : 'list-topics-p';

                return (
                    <p key={index} className={className}>
                        {isListItem ? line.replace(/^\*+ /, '') : line}
                    </p>
                );
            });
        } else {
            return <p>No detailed content available.</p>;
        }
    };

    return (
        <div>
            <div className="brand_wrap">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link href="/" title="Navigate to Homepage">
                                Home
                            </Link>{' '}
                            <i className="fa fa-angle-right"></i> <span>{topic.sessionTopic}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="session_wrap1" id="sessions-block">
                <div className="clearfix">
                    <div className="row clearfix">
                        <div
                            className="col-md-12 session_wrap_style1 wow fadeInUp"
                            data-wow-delay="400ms"
                            data-wow-duration="1500ms"
                        >
                            <h2>{topic.sessionTopic}</h2>
                            <div className="auto-container">
                                <div className="session-item">{renderContent()}</div>
                            </div>

                            <div className="auto-container topics-block-container">
                                <h3>Other Relevant Topics</h3>
                                <TopicsGrid topics={relatedTopics} className="topics-grid other-topics-block" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
