// src/app/components/PDFViewerWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
    ssr: false,
});

interface PDFViewerWrapperProps {
    fileUrl: string;
}

export default function PDFViewerWrapper({ fileUrl }: PDFViewerWrapperProps) {
    return <PDFViewer fileUrl={fileUrl} />;
}
