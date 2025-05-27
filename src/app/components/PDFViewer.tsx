// 'use client';

// import React from 'react';
// import dynamic from 'next/dynamic';
// import { Worker } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// const Viewer = dynamic(
//     () => import('@react-pdf-viewer/core').then((mod) => mod.Viewer),
//     { ssr: false }
// );

// interface PDFViewerProps {
//     fileUrl: string;
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
//     if (!fileUrl) {
//         return <p className="auto-container">No scientific program available.</p>;
//     }

//     return (
//         <div className="auto-container">
//             <div className="scientific-program-container">
//                 <Worker workerUrl="/pdfjs/pdf.worker.min.js">
//                     <Viewer fileUrl={fileUrl} />
//                 </Worker>
//             </div>
//         </div>
//     );
// };

// export default PDFViewer;
