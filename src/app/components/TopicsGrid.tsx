// components/TopicsGrid.tsx

import React from 'react';
import Link from 'next/link';

interface Topic {
    urlFormat: string;
    sessionTopic: string;
}

interface TopicsGridProps {
    topics: Topic[];
    className?: string; // optional to allow dynamic grid class
}

const TopicsGrid: React.FC<TopicsGridProps> = ({ topics, className = 'topics-grid' }) => {
    return (
        <div className={className}>
            {topics.length > 0 ? (
                topics.map((topic, index) => (
                    <div key={index} className="topic-item">
                        <Link
                            href={`/${topic.urlFormat}`}
                            title={topic.sessionTopic}
                            className="topic-link"
                        >
                            {topic.sessionTopic}
                        </Link>
                    </div>
                ))
            ) : (
                <p>No topics available at the moment.</p>
            )}
        </div>
    );
};

export default TopicsGrid;
