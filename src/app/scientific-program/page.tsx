// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { useAppData } from '../../context/AppDataContext';
// import PDFViewer from '../components/PDFViewer';

// const ScientificProgram = () => {
//     const { general } = useAppData();
//     const fileUrl = general?.csname ? `${general.csname}_tentative_program.pdf` : '';

//     return (
//         <div>
//             {/* Breadcrumb */}
//             <div className="brand_wrap">
//                 <div className="auto-container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <Link href="/">Home</Link> <i className="fa fa-angle-right"></i>
//                             <span>Scientific Program</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Title */}
//             <h2 className="abs_wrap5 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1000ms">
//                 Scientific Program
//             </h2>

//             {/* PDF Viewer */}
//             <PDFViewer fileUrl={fileUrl} />
//         </div>
//     );
// };

// export default ScientificProgram;

import React from 'react'

const ScientificProgram = () => {
  return (
    <div>page</div>
  )
}

export default ScientificProgram
