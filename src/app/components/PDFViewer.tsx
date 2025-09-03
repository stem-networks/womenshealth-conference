'use client';

import dynamic from 'next/dynamic';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Dynamically import Viewer and Worker to avoid SSR issues
const Viewer = dynamic(() => import('@react-pdf-viewer/core').then((mod) => mod.Viewer), {
    ssr: false,
});
const Worker = dynamic(() => import('@react-pdf-viewer/core').then((mod) => mod.Worker), {
    ssr: false,
});

interface PDFViewerProps {
    fileUrl: string;
}

const PDFViewer = ({ fileUrl }: PDFViewerProps) => {
    if (!fileUrl) {
        return <p className="auto-container">No scientific program available.</p>;
    }

    return (
        <div className="auto-container">
            <div className="scientific-program-container">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={fileUrl} />
                </Worker>
            </div>
        </div>
    );
};

export default PDFViewer;

